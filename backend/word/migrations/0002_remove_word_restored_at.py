# Generated by Django 5.0.6 on 2024-05-18 14:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("word", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="word",
            name="restored_at",
        ),
    ]
