from rest_framework import mixins, viewsets, status
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import IntegrityError

from settings.models import Profile
from trainedmodels.models import TrainedModel
from .models import Assessment
from .serializers import AssessmentSerializer

class AssessmentViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = AssessmentSerializer

    def create(self, request):
        try:
            assessment_data = request.data
            profile_id = assessment_data.get('profile')
            selected_words = assessment_data.get('selected_words', [])
            unselected_words = assessment_data.get('unselected_words', [])
            
            # Check if profile_id is provided
            if profile_id is None:
                return Response({"error": "Profile ID is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Retrieve the profile object or raise a NotFound exception if not found
            profile = get_object_or_404(Profile, id=profile_id)
            print('profile', profile)
            # Check if both selected and unselected words are provided
            if not selected_words or not unselected_words:
                return Response({"error": "Both selected_words and unselected_words are required"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create a new assessment for the profile
            assessment = Assessment.objects.create(profile=profile)
            serializer = self.get_serializer(assessment)

            # Add selected and unselected words to the profile's known_words and unknown_words
            profile.known_words.add(*selected_words)
            profile.unknown_words.add(*unselected_words)
            profile.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except IntegrityError:
            # Handle IntegrityError if assessment creation fails due to database constraints
            return Response({"error": "IntegrityError occurred while creating assessment"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            # Handle other exceptions
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
