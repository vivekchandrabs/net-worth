from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import render,redirect,HttpResponse
from django.contrib.auth.models import User
from api.models import Category,Expense,Income
from api.serializers import CategorySerializer, ExpenseSerializer, IncomeSerializer, AllMonthSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.models import Token
import json

class CategoryViewSet(viewsets.ModelViewSet):

	queryset = Category.objects.all()
	serializer_class = CategorySerializer
	permission_classes = (IsAuthenticated,)

	def create(self,request):

		user = request.user
		print(user)
		title = request.data['title']
		description = request.data['description']
		category = Category(title = title,
							description = description,
							user = user)
		category.save()

		category = CategorySerializer(category)
		print(category)
		print(category.data)
		return Response(category.data)

	def get_queryset(self):

		user = self.request.user
		categories = Category.objects.filter(user = user)
		return categories 


class ExpenseViewSet(viewsets.ModelViewSet):

	queryset = Expense.objects.all()
	serializer_class = ExpenseSerializer
	permission_classes = [IsAuthenticated,]

	def create(self,request):
		user = request.user
		print(request.data)
		title = request.data['title']
		description = request.data['description']
		cost = request.data['cost']
		category_pk = request.data['categories']
	
		category_instance = Category.objects.get(pk = category_pk)
		expense = Expense(categories = category_instance,
							title = title,
							description = description,
							cost = cost,
							user = user
							)
		expense.save()
		ex = ExpenseSerializer(expense)
		return Response(ex.data)

	def get_queryset(self):
		user = self.request.user
		expense = Expense.objects.filter(user = user)
		return expense

class IncomeViewSet(viewsets.ModelViewSet):

	queryset = Income.objects.all()
	serializer_class = IncomeSerializer
	permission_classes = [IsAuthenticated,]

	def create(self,request):
		user = request.user
		title = request.data['title']
		description = request.data['description']
		money = request.data['money']
		category_pk = request.data['categories']
		category_instance = Category.objects.get(pk = category_pk)

		income = Income(categories = category_instance,
						title = title,
						description = description,
						money = money,
						user = user)
		income.save()
		income = IncomeSerializer(income)
		return Response(income.data)
	
	def get_queryset(self):
		user = self.request.user
		income = Income.objects.filter(user = user)
		return income


class MonthExpenseViewSet(viewsets.ModelViewSet):
	serializer_class = ExpenseSerializer
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		month = self.request.data['month']
		print(self.request.data)
		query = Expense.objects.filter(timestamp__month=month)
		return query

class SignupViewSet(viewsets.ModelViewSet):

	permission_classes = (AllowAny,)

	def create(self,request):
		username = request.data['username']
		password = request.data['password']
		email = request.data['email']

		user = User.objects.create_user(username = username, email=email, password = password)
		# token = Token.objects.create(user=user)
		# print(token)
		return redirect('/dashboard/')

#for pie chart data in dash board
class AllMonthViewSet(viewsets.ViewSet):
	permission_classes = (IsAuthenticated,)

	def list(self, request):

		data = {}
		user = request.user
		expense = Expense.objects.filter(timestamp__year=2019, user = user)
		for i in expense:
			if i.categories.title in data:
				data[i.categories.title] += i.cost
			else:
				data[i.categories.title] = i.cost
		
		labels = []
		dataset = []
		
		for key,value in data.items():
			labels.append(key)
			dataset.append(value)

		json_data = {}
		json_data["labels"] = labels
		json_data["data"] = dataset
		print("im here")
		return Response(json_data)

#for bar chart data in dash board
class IncomeExpenseViewSet(viewsets.ViewSet):
	permissions_classes = (IsAuthenticated,)

	def list(self, request):
		user = request.user
		income = Income.objects.filter(user = user)
		expense = Expense.objects.filter(user = user)			

		income_data = {}

		for i in income:

			if i.timestamp.month in income_data:
				income_data[i.timestamp.month] += i.money

			else:
				income_data[i.timestamp.month] = i.money

		expense_data = {}

		for i in expense:

			if i.timestamp.month in expense_data:
				expense_data[i.timestamp.month] += i.cost

			else:
				expense_data[i.timestamp.month] = i.cost

		income_dataset = []
		for i,key in income_data.items():
			income_dataset.append(key)

		expense_dataset = []
		for i,key in expense_data.items():
			expense_dataset.append(key)

		json_data = {}
		json_data['income'] = income_dataset
		json_data['expense'] = expense_dataset

		return Response(json_data)

#pie chart data in expense page.
class MonthViewSet(viewsets.ViewSet):
	permission_classes = (IsAuthenticated,)

	def list(self, request):

		data = {}
		user = request.user
		expense = Expense.objects.filter(timestamp__month = 4, user = user)
		for i in expense:
			if i.categories.title in data:
				data[i.categories.title] += i.cost
			else:
				data[i.categories.title] = i.cost
		
		labels = []
		dataset = []
		
		for key,value in data.items():
			labels.append(key)
			dataset.append(value)

		json_data = {}
		json_data["labels"] = labels
		json_data["data"] = dataset
		print("im here")
		return Response(json_data)

#table data in the dash board.
class TableDataViewSet(viewsets.ViewSet):
	permissions_classes = (IsAuthenticated,)

	def list(self, request):
		user = request.user

		expense = Expense.objects.filter(user = user)


		label = []
		for l in expense:
			if l.categories.title not in label:
				label.append(l.categories.title)

		data = {}
		for i in expense:

			if i.categories.title in data:
				cat = data[i.categories.title]

				if i.timestamp.month in cat:
					cat[i.timestamp.month] += i.cost

				else:

					cat[i.timestamp.month] = i.cost

				data[i.categories.title] = cat

			else:

				data[i.categories.title] = {i.timestamp.month:i.cost}
				# data[i.categories.title][i.timestamp.month] = data[i.categories.title][i.timestamp.month].append(i.cost)

		print(data)
		json_data = {}
		json_data["labels"] = label
		json_data["data"] = data
		return Response(json_data)








