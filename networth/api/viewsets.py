from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import render,redirect,HttpResponse
from django.contrib.auth.models import User
from api.models import Category,Expense,Income
from api.serializers import CategorySerializer, ExpenseSerializer, IncomeSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.models import Token


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

		return redirect('/api/category/')

	def retrieve(self, request):

		return HttpResponse("done")

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
		title = request.data['title']
		description = request.data['description']
		cost = request.data['cost']
		category_pk = request.data['categories']
		print(category_pk['id'])
		category_instance = Category.objects.get(pk = category_pk['id'])
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
		category_instance = Category.objects.get(pk = category_pk['id'])

		income = Income(categories = category_instance,
						title = title,
						description = description,
						money = money,
						user = user)
		income.save()
		return redirect('/api/income/')
	
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