# Generated by Django 2.0.10 on 2019-03-31 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0007_auto_20180624_1435'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='reviewer',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
