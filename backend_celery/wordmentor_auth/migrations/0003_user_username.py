# Generated by Django 5.0.3 on 2024-03-31 01:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wordmentor_auth', '0002_user_deleted_at_user_restored_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='default', max_length=150, unique=True, verbose_name='username'),
            preserve_default=False,
        ),
    ]
