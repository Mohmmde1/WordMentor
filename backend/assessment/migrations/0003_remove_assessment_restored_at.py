# Generated by Django 5.0.6 on 2024-05-18 14:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("assessment", "0002_alter_assessment_profile"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="assessment",
            name="restored_at",
        ),
    ]
