from django.contrib import admin
from api.models import Category,Expense,Income
# Register your models here.

admin.site.register([Category, Expense, Income])