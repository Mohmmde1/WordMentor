# Generated by Django 5.0.5 on 2024-05-09 07:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trainedmodels', '0002_trainedmodel_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trainedmodel',
            name='description',
        ),
    ]
