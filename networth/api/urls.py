from django.urls import path,include
from rest_framework.routers import DefaultRouter
from api.viewsets import *


router = DefaultRouter()
router.register(r'monthexp', MonthExpenseViewSet, base_name="MonthExpense")
router.register(r'monthinc', MonthIncomeViewSet, base_name="MonthIncome")
router.register(r'category',CategoryViewSet)
router.register(r'expense',ExpenseViewSet, base_name="expense_list")
router.register(r'income',IncomeViewSet)
router.register(r'signup',SignupViewSet, base_name="Signup")
router.register(r'allmonthexpense',AllMonthViewSet, base_name="AllMonth")
router.register(r'inexp',IncomeExpenseViewSet,base_name='IncomeExpense')
router.register(r'monthexp',MonthViewSet,base_name='Month')
router.register(r'tabledata',TableDataViewSet, base_name="TableData")

urlpatterns = [
	
	path('',include(router.urls)),

]