# Generated by Django 5.0.6 on 2024-05-25 15:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('progress_tracking', '0005_delete_wordprediction'),
        ('trainedmodels', '0012_alter_prediction_options_delete_wordprediction'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='prediction',
            options={},
        ),
        migrations.CreateModel(
            name='WordPrediction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('prediction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='word_predictions', to='trainedmodels.prediction')),
                ('progress_word', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='word_progress_predictions', to='progress_tracking.wordprogress')),
            ],
            options={
                'verbose_name': 'Prediction',
                'verbose_name_plural': 'Predictions',
            },
        ),
    ]
