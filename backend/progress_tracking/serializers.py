
from rest_framework import serializers


from .models import UserWordProgress



class UserWordProgressSerializer(serializers.ModelSerializer):
    word_meaning = serializers.SerializerMethodField()
    word = serializers.SerializerMethodField()
    class Meta:
        model = UserWordProgress    
        fields = "__all__"
    
    def get_word(self, obj):
        return obj.word_meaning.word.word

    def get_word_meaning(self, obj):
        return obj.word_meaning.definition
        
