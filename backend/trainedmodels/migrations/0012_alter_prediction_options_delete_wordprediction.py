# Generated by Django 5.0.6 on 2024-05-25 14:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        (
            "trainedmodels",
            "0011_alter_prediction_options_remove_prediction_words_and_more",
        ),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="prediction",
            options={
                "verbose_name": "Prediction",
                "verbose_name_plural": "Predictions",
            },
        ),
        migrations.DeleteModel(
            name="WordPrediction",
        ),
    ]
