# Generated by Django 5.0.6 on 2024-05-25 00:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trainedmodels', '0009_trainedmodel_status_prediction'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='prediction',
            name='trained_model',
        ),
        migrations.AddField(
            model_name='prediction',
            name='trained_model_version',
            field=models.CharField(default='0.1', max_length=20),
            preserve_default=False,
        ),
    ]