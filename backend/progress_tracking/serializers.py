
from rest_framework import serializers


from .models import UserWordProgress



class UserWordProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWordProgress    
        fields = "__all__"
