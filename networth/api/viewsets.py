from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import render,redirect

from api.models import Category,Expense,Income
from api.serializers import CategorySerializer, ExpenseSerializer, IncomeSerializer

class CategoryViewSet(viewsets.ModelViewSet):

	queryset = Category.objects.all()
	serializer_class = CategorySerializer



class ExpenseViewSet(viewsets.ModelViewSet):

	queryset = Expense.objects.all()
	serializer_class = ExpenseSerializer

class IncomeViewSet(viewsets.ModelViewSet):

	queryset = Income.objects.all()
	serializer_class = IncomeSerializer

	

class MonthExpenseViewSet(viewsets.ModelViewSet):
	serializer_class = ExpenseSerializer

	def get_queryset(self):
		month = self.request.data['month']
		print(self.request.data)
		query = Expense.objects.filter(timestamp__month=month)
		return query

