# Generated by Django 5.0.6 on 2024-05-18 14:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("word", "0002_remove_word_restored_at"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="word",
            name="deleted_at",
        ),
    ]
