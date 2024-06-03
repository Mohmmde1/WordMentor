from rest_framework.serializers import ModelSerializer

from word.serializers import WordSerializer
from .models import WordProgress

class WordProgressSerializer(ModelSerializer):
    word = WordSerializer(read_only=True)
    class Meta:
        model = WordProgress    
        fields = "__all__"