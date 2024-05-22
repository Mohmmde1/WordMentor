from rest_framework import serializers
from .models import Word

class WordSerializer(serializers.ModelSerializer):
    meaning = serializers.JSONField()

    class Meta:
        model = Word
        fields = '__all__'

class WordListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ['id', 'entry']
