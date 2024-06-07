from django.contrib import admin

from .models import Word, WordNet

admin.site.register(Word)
admin.site.register(WordNet)