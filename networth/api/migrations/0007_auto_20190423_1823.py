# Generated by Django 2.1 on 2019-04-23 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20190423_1651'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='income',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]