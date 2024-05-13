"""
URL configuration for BE project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path

from FoodApp.views import SignupView, LoginView, ConsultationView,DocInfoView,PatientInfoView,get_times,PatientSignoutView,DoctorSignoutView,DocDash,DocPatientView,get_notifications

from django.views.decorators.csrf import csrf_exempt


urlpatterns = [
    path('admin/', admin.site.urls),

    path('signup/',csrf_exempt( SignupView.as_view()), name='signup'),
    path('login/', csrf_exempt( LoginView.as_view()), name='login'),
    path('patient/signout/', PatientSignoutView.as_view(), name='logout'),
   
    path('consultations/',csrf_exempt( ConsultationView.as_view()), name='consultation'),
    path('docinfo/',csrf_exempt( DocInfoView.as_view()), name='docinfo'),
    
    path('patientinfo/',csrf_exempt( PatientInfoView.as_view()), name='patientinfo'),
    path('api/times/', get_times, name='get_times'),
   
   # Doc Dashboard
    path('doctor/signout/', DoctorSignoutView.as_view(), name='signout'),
    path('docdash/',csrf_exempt( DocDash.as_view()), name='docdash'),
    path('doc/patients/',csrf_exempt( DocPatientView.as_view()), name='docpatient'),
    path('api/notifications/', get_notifications, name='get_notifications'),


]