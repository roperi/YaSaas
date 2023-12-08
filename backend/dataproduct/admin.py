# myproject/admin.py
from django.contrib import admin
from .models import ValuableData, AnotherValuableData, BasicData


class BasicDataAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'value')
    search_fields = ('name', 'description')


class ValuableDataAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'value')
    search_fields = ('name', 'description')


class AnotherValuableDataAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'value')
    search_fields = ('name', 'description')


admin.site.register(BasicData, BasicDataAdmin)
admin.site.register(ValuableData, ValuableDataAdmin)
admin.site.register(AnotherValuableData, AnotherValuableDataAdmin)
