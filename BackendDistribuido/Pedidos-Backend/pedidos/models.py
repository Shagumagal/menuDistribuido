from django.db import models

# Create your models here.
from django.db import models

class Pedido(models.Model):
    cliente = models.CharField(max_length=100)
    platillos = models.JSONField()  # puedes guardar IDs de menú o textos
    estado = models.CharField(max_length=50, default="pendiente")  # pendiente | en_preparacion | entregado
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Pedido #{self.id} - {self.cliente}"
    