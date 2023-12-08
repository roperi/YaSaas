from django.contrib import admin
from .models import Pricing, Feature


class ProjectAdmin(admin.ModelAdmin):
  list_display = ('id', 'title')
  list_display_links = ('id', 'title')
  search_fields = ('title', 'features')
  list_per_page = 20


admin.site.register(Pricing)
admin.site.register(Feature)
