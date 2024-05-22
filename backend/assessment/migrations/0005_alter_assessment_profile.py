# Generated by Django 5.0.6 on 2024-05-22 13:02

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assessment', '0004_remove_assessment_deleted_at'),
        ('settings', '0010_remove_profile_deleted_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assessment',
            name='profile',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assessment', to='settings.profile'),
        ),
    ]
