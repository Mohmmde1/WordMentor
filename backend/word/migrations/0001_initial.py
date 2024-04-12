# Generated by Django 4.2.11 on 2024-04-11 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('restored_at', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('author', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('entry', models.CharField(max_length=100)),
                ('ipa', models.CharField(max_length=100)),
                ('meaning', models.TextField()),
                ('request', models.CharField(max_length=100)),
                ('response', models.CharField(max_length=100)),
                ('result_code', models.CharField(max_length=100)),
                ('result_msg', models.CharField(max_length=100)),
                ('version', models.CharField(max_length=100)),
                ('ten_degree', models.IntegerField(default=0)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
