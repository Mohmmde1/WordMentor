# Generated by Django 5.0.6 on 2024-06-11 01:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('assessment', '0007_userassessment_wordassessment_and_more'),
        ('settings', '0015_delete_profile'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Assessment',
        ),
    ]
