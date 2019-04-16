from rest_framework import serializers
from api.models import Category,Expense,Income

class CategorySerializer(serializers.ModelSerializer):

	class Meta:

		model = Category
		fields = ('title', 'description',)

class ExpenseSerializer(serializers.ModelSerializer):

	class Meta:

		model = Expense
		fields = ('categories', 'title', 'description', 'cost')
		depth = 1

class IncomeSerializer(serializers.ModelSerializer):

	class Meta:

		model = Income
		fields = ('categories', 'title', 'description', 'money')
		depth = 1
