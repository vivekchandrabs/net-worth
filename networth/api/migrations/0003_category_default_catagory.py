# Generated by Django 2.1 on 2019-04-16 14:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20190415_1655'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='default_catagory',
            field=models.IntegerField(choices=[(1, 'FOOD'), (2, 'RENT'), (3, 'SALARY')], default=True),
        ),
    ]