from django.contrib import admin
from .models import Product


class ProductAdmin(admin.ModelAdmin):
  list_display = ('id', 'name')
  list_display_links = ('id', 'name')
  search_fields = ('name', 'description')
  list_per_page = 20


admin.site.register(Product, ProductAdmin)
