# Generated by Django 5.0.6 on 2024-05-18 14:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("settings", "0007_remove_profile_task"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="profile",
            name="has_taken_assessment",
        ),
    ]
