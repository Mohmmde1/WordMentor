
from rest_framework import serializers


from .models import UserWordProgress



class UserWordProgressSerializer(serializers.ModelSerializer):
    word = serializers.SerializerMethodField()
    class Meta:
        model = UserWordProgress    
        fields = ['created_at', 'word', 'is_known']
    
    def get_word(self, obj):
        return obj.word_meaning.word.word

        
