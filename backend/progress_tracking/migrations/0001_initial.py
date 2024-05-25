# Generated by Django 5.0.6 on 2024-05-25 11:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('settings', '0012_remove_profile_known_words_and_more'),
        ('word', '0003_remove_word_deleted_at'),
    ]

    operations = [
        migrations.CreateModel(
            name='WordProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(default='unknown', max_length=20)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='word_progress', to='settings.profile')),
                ('word', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='word_progress', to='word.word')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]