# Generated by Django 5.2 on 2025-06-14 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cliente', models.CharField(max_length=100)),
                ('platillos', models.JSONField()),
                ('estado', models.CharField(default='pendiente', max_length=50)),
                ('creado', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
