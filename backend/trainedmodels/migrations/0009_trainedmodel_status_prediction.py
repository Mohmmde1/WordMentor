# Generated by Django 5.0.6 on 2024-05-23 15:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("books", "0006_remove_book_deleted_at"),
        ("settings", "0011_profile_assessment"),
        ("trainedmodels", "0008_remove_trainedmodel_celery_task_id"),
        ("word", "0003_remove_word_deleted_at"),
    ]

    operations = [
        migrations.AddField(
            model_name="trainedmodel",
            name="status",
            field=models.CharField(default="created", max_length=20),
        ),
        migrations.CreateModel(
            name="Prediction",
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
                ("from_page", models.IntegerField()),
                ("to_page", models.IntegerField()),
                (
                    "book",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="predictions",
                        to="books.book",
                    ),
                ),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="predictions",
                        to="settings.profile",
                    ),
                ),
                (
                    "trained_model",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="predictions",
                        to="trainedmodels.trainedmodel",
                    ),
                ),
                ("words", models.ManyToManyField(to="word.word")),
            ],
            options={
                "verbose_name": "Prediction",
                "verbose_name_plural": "Predictions",
            },
        ),
    ]
