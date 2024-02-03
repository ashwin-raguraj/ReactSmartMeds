# Generated by Django 4.2.1 on 2024-02-03 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Doctor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('doctor_id', models.CharField(max_length=7, unique=True)),
                ('department', models.CharField(max_length=50)),
                ('hospital', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'doctors',
            },
        ),
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('patient_id', models.CharField(max_length=7, unique=True)),
                ('age', models.PositiveIntegerField()),
                ('patient_image', models.ImageField(blank=True, null=True, upload_to='patient_images/')),
                ('password', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'patients',
            },
        ),
    ]
