# Generated by Django 5.0.6 on 2024-05-18 14:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("books", "0004_remove_book_profiles_book_profile"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="book",
            name="restored_at",
        ),
    ]
