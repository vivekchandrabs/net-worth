from django.urls import path,include
from rest_framework.routers import DefaultRouter
from api.viewsets import *


router = DefaultRouter()

router.register(r'category',CategoryViewSet)
router.register(r'expense',ExpenseViewSet, base_name="expense_list")
router.register(r'income',IncomeViewSet)
router.register(r'signup',SignupViewSet, base_name="Signup")
router.register(r'allmonthexpense',AllMonthExpenseViewSet,base_name="AllMonthExpense")
router.register(r'allmonthincome',AllMonthIncomeViewSet,base_name="AllMonthExpense")
router.register(r'barchartinc',BarChartIncomeViewSet,base_name='BarChartIncome')
router.register(r'barchartexp',BarChartExpenseViewSet,base_name='BarChartIncome')
router.register(r'tabledata',TableDataViewSet, base_name="TableData")
router.register(r'incomedata',IncomeTableViewSet, base_name="IncomeTable")

urlpatterns = [
	
	path('',include(router.urls)),

]