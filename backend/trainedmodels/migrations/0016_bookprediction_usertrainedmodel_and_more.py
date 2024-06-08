# Generated by Django 5.0.6 on 2024-06-08 12:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0007_userbook'),
        ('progress_tracking', '0006_userwordprogress'),
        ('settings', '0013_userprofile'),
        ('trainedmodels', '0015_remove_wordprediction_created_at_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookPrediction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('from_page', models.IntegerField()),
                ('to_page', models.IntegerField()),
                ('trained_model_version', models.CharField(max_length=50)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.userbook')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserTrainedModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('file_path', models.FileField(upload_to='models/')),
                ('is_ready', models.BooleanField(default=False)),
                ('version', models.CharField(max_length=50)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='settings.userprofile')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='WordPredictionMapping',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('prediction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='trainedmodels.bookprediction')),
                ('word_progress', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='progress_tracking.userwordprogress')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
