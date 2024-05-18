from rest_framework import mixins, viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from settings.models import Profile
from trainedmodels.models import TrainedModel
from .models import Assessment
from .serializers import AssessmentSerializer

class AssessmentViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = AssessmentSerializer

    def create(self, request):
        assessment_data = request.data
        profile_id = assessment_data.get('profile')
        selected_words = assessment_data.get('selected_words')
        unselected_words = assessment_data.get('unselected_words')
        
        # Retrieve the profile object or return a 404 error if not found
        profile = get_object_or_404(Profile, id=profile_id)
        
        # Create a new assessment for the profile
        assessment = Assessment.objects.create(profile=profile)
        serializer = self.get_serializer(assessment)

        # Add selected and unselected words to the profile's known_words and unknown_words
        profile.known_words.add(*selected_words)
        profile.unknown_words.add(*unselected_words)
        profile.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
