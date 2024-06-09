from rest_framework import serializers
from .models import WordMeaning
from assessment.models import WordAssessment

class WordAssessmentListSerializer(serializers.ModelSerializer):
    word = serializers.SerializerMethodField()
    class Meta:
        model = WordAssessment
        fields = ['id', 'word']
        
    def get_word(self, obj):
        return obj.word.word

class WordMeaningSerializer(serializers.ModelSerializer):
    word = serializers.SerializerMethodField()

    class Meta:
        model = WordMeaning
        fields = ['id', 'word', 'definition', 'part_of_speech', 'example_sentence']

    def get_word(self, obj):
        return obj.word.word