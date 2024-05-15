from settings.models import Profile
from trainedmodels.models import TrainedModel
from rest_framework import mixins, viewsets, status
from rest_framework.response import Response

from .models import Assessment
from .serializers import AssessmentSerializer
from .tasks import fine_tune_bert


class AssessmentViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = AssessmentSerializer

    def create(self, request):
        assessment_data = request.data
        profile_id = assessment_data.get('profile')
        selected_words = assessment_data.get('selected_words')
        unselected_words = assessment_data.get('unselected_words')
        try:
            profile = Profile.objects.get(id=profile_id)

        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

        assessment = Assessment.objects.create(profile=profile)
        serializer = self.get_serializer(assessment)

        # Update the has_taken_assessment boolean value in the profile
        profile.has_taken_assessment = True
        # Add selected and unselected words to the profile's known_words and unknown_words
        profile.known_words.add(*selected_words)
        profile.unknown_words.add(*unselected_words)
        profile.save()
        
        # Fine-tune the BERT model with the labeled data
        labeled_data = profile.extract_data()
        path = f"{profile.user.username}_model"
        fine_tune_bert.delay(labeled_data, path)
        TrainedModel.objects.create(profile=profile, path=path, name=f"{profile.user.username}_model", version="1.0", description="Fine-tuned BERT model")
        return Response(serializer.data, status=status.HTTP_201_CREATED)
