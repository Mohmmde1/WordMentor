# Generated by Django 5.0.3 on 2024-03-30 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('settings', '0002_profile_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='slug',
            field=models.SlugField(default='default', max_length=255, unique=True),
            preserve_default=False,
        ),
    ]