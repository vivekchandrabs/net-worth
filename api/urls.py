from django.urls import path,include
from rest_framework.routers import DefaultRouter
from api.viewsets import CategoryViewSet, ExpenseViewSet, IncomeViewSet, MonthExpenseViewSet, SignupViewSet


router = DefaultRouter()
router.register(r'month', MonthExpenseViewSet, base_name="MonthExpense")
router.register(r'category',CategoryViewSet)
router.register(r'expense',ExpenseViewSet)
router.register(r'income',IncomeViewSet)
router.register(r'signup',SignupViewSet, base_name="Signup")

urlpatterns = [
	
	path('',include(router.urls)),

]