from django.urls import path,include
from webserver.views import Home,dashboard,expense,logout
urlpatterns = [
	path('', Home.as_view()),
	path('dashboard/',dashboard),
	path('expense/',expense),
	path('logout/',logout),
]