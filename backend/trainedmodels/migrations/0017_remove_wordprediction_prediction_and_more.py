# Generated by Django 5.0.6 on 2024-06-11 01:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trainedmodels', '0016_bookprediction_usertrainedmodel_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='wordprediction',
            name='prediction',
        ),
        migrations.RemoveField(
            model_name='trainedmodel',
            name='profile',
        ),

        migrations.DeleteModel(
            name='Prediction',
        ),
        migrations.DeleteModel(
            name='TrainedModel',
        ),
        migrations.DeleteModel(
            name='WordPrediction',
        ),
    ]
