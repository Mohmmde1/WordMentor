# Generated by Django 5.0.6 on 2024-06-11 01:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("progress_tracking", "0006_userwordprogress"),
        ("trainedmodels", "0017_remove_wordprediction_prediction_and_more"),
    ]

    operations = [
        migrations.DeleteModel(
            name="WordProgress",
        ),
    ]
