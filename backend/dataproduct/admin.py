# myproject/admin.py
from django.contrib import admin
from .models import ValuableData, AnotherValuableData, BasicData
from easyaudit.admin import RequestEventAdmin
from easyaudit.models import RequestEvent


class BasicDataAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'value')
    search_fields = ('name', 'description')


class ValuableDataAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'value')
    search_fields = ('name', 'description')


class AnotherValuableDataAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'value')
    search_fields = ('name', 'description')


class MyRequestEventAdmin(RequestEventAdmin):
    list_display = ['datetime', 'user_link', 'method', 'url', 'query_string', 'remote_ip']


admin.site.register(BasicData, BasicDataAdmin)
admin.site.register(ValuableData, ValuableDataAdmin)
admin.site.register(AnotherValuableData, AnotherValuableDataAdmin)

# Custom easy audit
admin.site.unregister(RequestEvent)
admin.site.register(RequestEvent, MyRequestEventAdmin)