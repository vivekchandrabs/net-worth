from django.shortcuts import render,redirect
from django.views.generic.base import TemplateView
from django.views.generic import View
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class Home(View):

	def get(self,request):
		return render(request, 'home.html')

def dashboard(request):
	return render(request, 'dash.html')

def expense(request):
	print(request.user)
	return render(request,'expense.html')

