# Generated by Django 5.0.6 on 2024-06-10 02:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trainedmodels', '0016_bookprediction_usertrainedmodel_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usertrainedmodel',
            name='file_path',
            field=models.CharField(max_length=255),
        ),
    ]