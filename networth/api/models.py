from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Category(models.Model):

	title = models.CharField(max_length=100)
	description = models.TextField()

class Expense(models.Model):

	categories = models.ForeignKey(Category, null=True,on_delete = models.SET_NULL)
	title = models.CharField(max_length=100)
	description = models.TextField()
	cost = models.IntegerField(default=0)
	timestamp = models.DateTimeField(auto_now_add=True)

class Income(models.Model):

	categories = models.ForeignKey(Category, null=True,on_delete = models.SET_NULL)
	title = models.CharField(max_length=100)
	description = models.TextField()
	money = models.IntegerField(default=0)
	timestamp = models.DateTimeField(auto_now_add=True)