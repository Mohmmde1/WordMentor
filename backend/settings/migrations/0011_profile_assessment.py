# Generated by Django 5.0.6 on 2024-05-22 13:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("assessment", "0006_remove_assessment_profile"),
        ("settings", "0010_remove_profile_deleted_at"),
    ]

    operations = [
        migrations.AddField(
            model_name="profile",
            name="assessment",
            field=models.OneToOneField(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="profile",
                to="assessment.assessment",
            ),
        ),
    ]
