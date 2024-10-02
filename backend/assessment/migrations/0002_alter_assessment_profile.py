# Generated by Django 4.2.11 on 2024-04-16 05:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('settings', '0005_profile_has_taken_assessment'),
        ('assessment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assessment',
            name='profile',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='settings.profile'),
        ),
    ]
