# Generated by Django 5.0.6 on 2024-05-18 14:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("settings", "0008_remove_profile_has_taken_assessment"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="profile",
            name="restored_at",
        ),
    ]
