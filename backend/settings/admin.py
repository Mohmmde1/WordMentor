from django.contrib import admin

from settings.models import Profile, UserProfile

admin.site.register(Profile)
admin.site.register(UserProfile)
