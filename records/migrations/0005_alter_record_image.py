# Generated by Django 3.2.9 on 2021-12-08 12:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('records', '0004_alter_record_type_of_record'),
    ]

    operations = [
        migrations.AlterField(
            model_name='record',
            name='image',
            field=models.CharField(default=None, max_length=700),
        ),
    ]