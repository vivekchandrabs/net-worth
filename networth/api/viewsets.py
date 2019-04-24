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
import datetime

#for the add category button and the delete catgory button.
class CategoryViewSet(viewsets.ModelViewSet):
	'''
	This viewset is for manageing the categories 
	Add, Delete, update category can be done.
	'''
	queryset = Category.objects.all()
	serializer_class = CategorySerializer
	permission_classes = (IsAuthenticated,)

	def create(self,request):
		'''
		:method:POST:
		creates a new category.
		'''

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
		'''
		method:GET:
		returns the list of categories.
		'''

		user = self.request.user
		categories = Category.objects.filter(user = user)
		return categories 

#for the add expense button
class ExpenseViewSet(viewsets.ModelViewSet):

	'''
	This viewset is for managing the expense.
	serializer: ExpenseSerializer
	permission_classes IsAuthenticated.
	'''
	serializer_class = ExpenseSerializer
	permission_classes = [IsAuthenticated,]

	def create(self,request):
		'''
		:method:POST:
		creating the new expense.
		'''

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
							user = user,
							timestamp = datetime.datetime.now()
							)
		expense.save()
		ex = ExpenseSerializer(expense)
		return Response(ex.data)


	def get_queryset(self):
		'''
		:method:GET:
		returns a list of expenses according to the month given.
		'''
		print("here")
		user = self.request.user
		print(self.request.method)

		if self.request.method == "GET":
			month = self.request.GET.get("month")
		else:
			month = self.request.data["month"]

		expense = Expense.objects.filter(user = user,timestamp__month=month)
		return expense


#for the add income button.
class IncomeViewSet(viewsets.ModelViewSet):
	'''
	This view set is for the managing the income.
	add, delete, update income.
	serializer: IncomeSerializer
	permission_classes: IsAuthenticated.
	'''
	queryset = Income.objects.all()
	serializer_class = IncomeSerializer
	permission_classes = [IsAuthenticated,]

	def create(self,request):
		'''
		:method:POST:
		for creating a new income.
		'''
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
						user = user,
						timestamp = datetime.datetime.now()
						)
		income.save()
		income = IncomeSerializer(income)
		return Response(income.data)
	
	def get_queryset(self):
		'''
		:method:GET:
		this returns a list of incomes of the user according to the month
		'''
		user = self.request.user

		if self.request.method == "GET":
			month = self.request.GET.get('month')
		else:
			month = self.request.data["month"]

		income = Income.objects.filter(user = user,timestamp__month=month)
		return income

#for the edit expense button
class MonthExpenseViewSet(viewsets.ModelViewSet):
	serializer_class = ExpenseSerializer
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		user = self.request.user
		
		# print(self.request.data)
		month = self.request.GET.get('month')
		print(month)
		query = Expense.objects.filter(timestamp__month=month, user = user)
		return query
# for the edit income button.
class MonthIncomeViewSet(viewsets.ModelViewSet):
	serializer_class = IncomeSerializer
	permission_classes = (IsAuthenticated,)

	def get_queryset(self):
		print(self.request.data)
		month = self.request.GET.get('month')
		query = Income.objects.filter(timestamp__month=month)
		return query

class SignupViewSet(viewsets.ModelViewSet):
	'''
	This is for the creating a new user.
	permission_classes: AllowAny
	'''

	permission_classes = (AllowAny,)

	def create(self,request):
		'''
		:method:POST:
		To create a new user.
		'''
		username = request.data['username']
		password = request.data['password']
		email = request.data['email']

		user = User.objects.create_user(username = username, email=email, password = password)
		# token = Token.objects.create(user=user)
		# print(token)
		return redirect('/dashboard/')

#for pie chart data in dash board// expense
class AllMonthExpenseViewSet(viewsets.ViewSet):
	'''
	This is for returning the list of expense.
	permission_classes: IsAuthenticated.
	'''

	permission_classes = (IsAuthenticated,)

	def list(self, request):
		'''
		:method:GET,
		returns the list of expenses according to the year.
		'''
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

# pie chart for the dash board // income.
class AllMonthIncomeViewSet(viewsets.ViewSet):

	permission_classes = [IsAuthenticated,]

	def list(self, request):
		'''
		:method:GET,
		returns the list of expenses according to the year.
		'''
		data = {}
		user = request.user
		expense = Income.objects.filter(timestamp__year=2019, user = user)
		for i in expense:
			if i.categories.title in data:
				data[i.categories.title] += i.money
			else:
				data[i.categories.title] = i.money
		
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


#for income bar chart in the dash board.
class BarChartIncomeViewSet(viewsets.ViewSet):

	permissions_classes = (IsAuthenticated,)

	def list(self, request):

		months = [0,0,0,0,0,0,0,0,0,0,0,0]
		labels = []
		user = request.user
		income = Income.objects.filter(user = user)

		income_data = {}

		for i in income:
			m = i.timestamp.month - 1
			months[m] = months[m] + i.money
		
		income_data["data"] = months

		print(income_data)
		return Response(income_data)


# for expense bar chart in the dash board.
class BarChartExpenseViewSet(viewsets.ViewSet):
	permissions_classes = (IsAuthenticated,)

	def list(self, request):

		months = [0,0,0,0,0,0,0,0,0,0,0,0]
		labels = []
		user = request.user
		income = Expense.objects.filter(user = user)

		expense_data = {}

		for i in income:
			m = i.timestamp.month - 1
			months[m] = months[m] + i.cost
		
		expense_data["data"] = months

		print(expense_data)
		return Response(expense_data)

#for bar chart data in dash board // expense.
class IncomeExpenseViewSet(viewsets.ViewSet):
	'''
	This returns the list of income and expenses of the part
	'''
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

class TableDataViewSet(viewsets.ModelViewSet):
	permission_classes = (IsAuthenticated,)
	queryset = Expense.objects.all()
	serializer_class = ExpenseSerializer

# #pie chart data in expense page.
# class MonthViewSet(viewsets.ViewSet):
# 	permission_classes = (IsAuthenticated,)

# 	def list(self, request):

# 		month = request.GET.get("month")
# 		print(month)
# 		data = {}
# 		user = request.user
# 		expense = Expense.objects.filter(timestamp__month = 4, user = user)
# 		for i in expense:
# 			if i.categories.title in data:
# 				data[i.categories.title] += i.cost
# 			else:
# 				data[i.categories.title] = i.cost
		
# 		labels = []
# 		dataset = []
		
# 		for key,value in data.items():
# 			labels.append(key)
# 			dataset.append(value)

# 		json_data = {}
# 		json_data["labels"] = labels
# 		json_data["data"] = dataset
# 		print("im here")
# 		return Response(json_data)



# #table data in the dash board.
# class TableDataViewSet(viewsets.ViewSet):
# 	permissions_classes = (IsAuthenticated,)

# 	def list(self, request):
# 		user = request.user

# 		expense = Expense.objects.filter(user = user)


# 		label = []
# 		for l in expense:
# 			if l.categories.title not in label:
# 				label.append(l.categories.title)

# 		data = {}
# 		for i in expense:

# 			if i.categories.title in data:
# 				cat = data[i.categories.title]

# 				if i.timestamp.month in cat:
# 					cat[i.timestamp.month] += i.cost

# 				else:

# 					cat[i.timestamp.month] = i.cost

# 				data[i.categories.title] = cat

# 			else:

# 				data[i.categories.title] = {i.timestamp.month:i.cost}
# 				# data[i.categories.title][i.timestamp.month] = data[i.categories.title][i.timestamp.month].append(i.cost)

# 		print(data)
# 		json_data = {}
# 		json_data["labels"] = label
# 		json_data["data"] = data
# 		return Response(json_data)








