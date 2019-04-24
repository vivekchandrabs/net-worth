from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Category(models.Model):

	title = models.CharField(max_length=100)
	description = models.TextField()
	user = models.ForeignKey(User, blank=True,null=True,on_delete=models.SET_NULL)

	def __str__(self):
		return f"{self.title} | {self.user}"

class Expense(models.Model):

	categories = models.ForeignKey(Category, default=3, null=True,on_delete = models.SET_NULL)
	title = models.CharField(max_length=100)
	description = models.TextField()
	cost = models.IntegerField(default=0)
	timestamp = models.DateTimeField()
	user = models.ForeignKey(User,null=True, on_delete=models.SET_NULL)

	def __str__(self):
		return f"{self.title} | {self.user} | {self.categories}"

class Income(models.Model):

	categories = models.ForeignKey(Category, null=True,on_delete = models.SET_NULL)
	title = models.CharField(max_length=100)
	description = models.TextField()
	money = models.IntegerField(default=0)
	timestamp = models.DateTimeField()
	user = models.ForeignKey(User, null=True,on_delete=models.SET_NULL)