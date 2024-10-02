# Generated by Django 5.0.6 on 2024-06-07 02:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("word", "0003_remove_word_deleted_at"),
    ]

    operations = [
        migrations.CreateModel(
            name="WordNet",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("word", models.CharField(max_length=100, unique=True)),
                ("definition", models.TextField()),
                ("part_of_speech", models.CharField(blank=True, max_length=50)),
                ("example_sentence", models.TextField(blank=True)),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
