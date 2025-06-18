from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Pedido
from .serializers import PedidoSerializer

class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all().order_by('-creado')
    serializer_class = PedidoSerializer
