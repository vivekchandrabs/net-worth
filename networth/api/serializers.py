from rest_framework import serializers
from api.models import Category,Expense,Income

class CategorySerializer(serializers.ModelSerializer):

	class Meta:

		model = Category
		fields = "__all__"

class ExpenseSerializer(serializers.ModelSerializer):

	class Meta:

		model = Expense
		fields = "__all__"
		depth = 1

class IncomeSerializer(serializers.ModelSerializer):

	class Meta:

		model = Income
		fields = "__all__"
		depth = 1
