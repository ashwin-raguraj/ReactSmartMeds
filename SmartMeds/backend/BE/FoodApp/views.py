from django.shortcuts import render

# Create your views here.
from django.views import View
from django.http import JsonResponse,HttpResponse
from django.core import serializers
from django.urls import reverse
from .models import Patient,Doctor,Consultation,PatientLogin,DoctorLogin,PatientImg,Notification
import json
from django.views.decorators.csrf import csrf_exempt

from .Sequence.alert import alert
from .Sequence.script import sequence
from .Sequence.fail import fail
#from .FaceRecognition.FaceAuth.face_html_try import FaceAuthFunction
from .FaceRecognition.FaceAuth.face5 import FaceAuthFunction




class SignupView(View):
    @csrf_exempt
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)
        existing_patient = None
        existing_doctor= None
        print('Received data:', data)

        if data['userType'] == 'patient':
            existing_patient = Patient.objects.filter(email=data['email']).first()
            existing_patient = Patient.objects.filter(patient_id=data['patientId']).first()
            print(existing_patient)
        # Check if the user already exists in the database
        if data['userType'] == 'doctor':
            existing_doctor = Doctor.objects.filter(email=data['email']).first()
            print(existing_doctor)
        
        
        # existing_user = User.objects.filter(email=data[0]['email']).first()
        if existing_patient or existing_doctor is not None:
            print(existing_patient)
            return JsonResponse({'error': 'User with this email already exists'})
        else:
            if data['userType'] == 'doctor':
                
                    doctor = Doctor(
                    email=data['email'], 
                    password=data['password'], 
                    first_name=data['firstName'],
                    last_name=data['lastName'],
                    doctor_id = data['patientId'],
                    hospital = data['hospital'],
                    department = data['department']
                    )
                    doctor.save()
            if data['userType'] == 'patient':
                
                    patient = Patient(
                    email=data['email'], 
                    password=data['password'], 
                    first_name=data['firstName'],
                    last_name=data['lastName'],
                    patient_id = data['patientId'],
                    age = data['age'],
                    #patient_image = data['patientImage']
                    )
                    # if 'patient_image' in data and data['patient_image']:
                    #     image_data = data['patient_image'].split(';base64,')
                    #     if len(image_data) == 2:
                    #         image_content = ContentFile(base64.b64decode(image_data[1]), name='patient_image.jpg')
                    #         patient.patient_image.save('patient_image.jpg', image_content)
                    print(patient)
                    patient.save()
           
            return JsonResponse({'success': True})



class PatientSignoutView(View):
    def get(self, request):
        # Perform signout logic
        
        PatientLogin.objects.all().delete()
        # Return a JSON response or any other response if needed
        return JsonResponse({'message': 'Signout successful'})
    
class DoctorSignoutView(View):
    def get(self, request):
        # Perform signout logic
        
        DoctorLogin.objects.all().delete()
        # Return a JSON response or any other response if needed
        return JsonResponse({'message': 'Signout successful'})
    

class LoginView(View):
    @csrf_exempt
    def post(self, request):
        # Deserialize JSON data from request body
        data = json.loads(request.body)        
        existing_user = None
        print('Received data:', data)
     
       
        #Check if the user already exists in the database
        if data['userType'] == 'patient':
            existing_user = Patient.objects.filter(patient_id=data.get('id'), password=data.get('password')).first()
        else:
            existing_user = Doctor.objects.filter(doctor_id=data.get('id'), password=data.get('password')).first()
    
        
        if existing_user is not None:
           
           if data['userType'] == 'patient':
                patient_id= existing_user.patient_id
                #storing user id for session 
                patient=PatientLogin(patient_id_id=patient_id)
                patient.save()
                
    
                return JsonResponse({'success':True})
           else:
                doctor_id= existing_user.doctor_id
            
                doctor=DoctorLogin(doctor_id_id=doctor_id)
                doctor.save()
                return JsonResponse({'success':True})
            #return JsonResponse({'success':True})
        else:
            return JsonResponse({'error': 'User does not exist'})
      


class ConsultationView(View):
    def post(self, request):
        data = json.loads(request.body)
        doctor_id = DoctorLogin.objects.first().doctor_id
        print(doctor_id)
        medicines_json = json.dumps(data['medicines'])
        consultation = Consultation.objects.create(
                patient_id_id=data['patient_id'],
                # doctor_id_id=data['doctor_id'],
                doctor_id_id=doctor_id.doctor_id,
                comment=data.get('comment', ''),
                date=data['date'],
                medicines=medicines_json
                  )
        return JsonResponse({'success': True, 'consult_id': consultation.consult_id}, status=201)
       
        
    def get(self, request):
        patient_id = PatientLogin.objects.first().patient_id

        print(patient_id)
        consultations = Consultation.objects.filter(patient_id=patient_id)
        #print(patient_id)
        consultation_list = []
        for consultation in consultations:
          
            medicines = json.loads(consultation.medicines)
            # print(medicines)
            consultation_dict = {
                'consult_id': consultation.consult_id,
                'patient_id': consultation.patient_id_id,
                'doctor_id': consultation.doctor_id_id,
                'comment': consultation.comment,
                'date': consultation.date,
                'medicines': medicines
            }
            consultation_list.append(consultation_dict)
        # print(consultation_list)
        return JsonResponse(consultation_list, status=200,safe=False)
    

class DocInfoView(View):       
        
    def get(self, request):
    
        patient_id = PatientLogin.objects.first().patient_id
        consultation = Consultation.objects.filter(patient_id=patient_id).first()
       
        if consultation:
            doc_id = consultation.doctor_id.doctor_id  # Access the ID attribute directly
            #print(doc_id)  # Print the value of doc_id
            
            doctor = Doctor.objects.filter(doctor_id=doc_id).last()
            
            if doctor:
                doctor_id = doctor.doctor_id
            doctor = Doctor.objects.filter(doctor_id=doctor_id).first()
            doctor_list=[]
            doctor_info = [{
                    'doctor_id': doctor.doctor_id,
                    'firstName': doctor.first_name,
                    'lastName': doctor.last_name,
                    'department': doctor.department,
                    'hospital': doctor.hospital,
                    'email': doctor.email,
                }]
            # doctor_list.append(doctor_info)
            return JsonResponse(doctor_info, status=200,safe=False)
  
        else:
            return JsonResponse({'error': 'Consultation not found'}, status=404)
    
class PatientInfoView(View):       
        
    def get(self, request):
        patient_id = PatientLogin.objects.first().patient_id
        print(patient_id)
        patient = Patient.objects.get(patient_id=patient_id.patient_id) # Assuming you want to return info for the first patient
        data = {
            'patient_id': patient.patient_id,
            'firstName': patient.first_name,
            'lastName': patient.last_name,
            'age': patient.age,
            'email': patient.email,
        }
        return JsonResponse(data)
    
class DocDash(View):       
        
    def get(self, request):
    
        doctor_id = DoctorLogin.objects.first().doctor_id
        print(doctor_id)
        
        doctor_info = [{
                    'doctor_id': doctor_id.doctor_id,
                    'firstName': doctor_id.first_name,
                    'lastName': doctor_id.last_name,
                    'department': doctor_id.department,
                    'hospital': doctor_id.hospital,
                    'email': doctor_id.email,
                }]
            # doctor_list.append(doctor_info)
        return JsonResponse(doctor_info, status=200,safe=False)
  

class DocPatientView(View):       
        
    def get(self, request):
        # Assuming you have a way to authenticate the doctor and get their ID
        doctor_id = DoctorLogin.objects.first().doctor_id  # Assuming the authenticated user is a doctor
        
        # Filter consultations based on the doctor's ID
        consultations = Consultation.objects.filter(doctor_id=doctor_id)
        
        patient_ids_seen = set()  # Store unique patient IDs
        
        patient_info_list = []
        for consultation in consultations:
            patient_id = consultation.patient_id.patient_id
            if patient_id not in patient_ids_seen:
                # Get patient information related to each unique patient ID
                patient_ids_seen.add(patient_id)
                patient = consultation.patient_id
                patient_info = {
                    'patient_id': patient.patient_id,
                    'first_name': patient.first_name,
                    'last_name': patient.last_name,
                    'email': patient.email,
                    'age': patient.age,
                    'patient_image': str(patient.patient_image),  # Assuming patient_image is a file field
                    'comment': consultation.comment,
                    'date': consultation.date,
                    'medicines': json.loads(consultation.medicines)  # Assuming medicines is a comma-separated string
                }
                patient_info_list.append(patient_info)
        
        return JsonResponse(patient_info_list, safe=False)

from django.utils import timezone
from .models import Time
import time

import winsound

# def get_times(request=None):
#     # while True:
#     #     current_time = timezone.now().time()
#     #     print(current_time)

       
#     #     times = Time.objects.filter(time__lte=current_time)
#     #     print(times)
        
#     #     # List to store the times that need to be cleared
#     #     times_to_clear = []

#     #     if times.exists():
            
#     print("Notification: It's time for alert!")
#     alert()
#     a=2
#     b=3
#             # file_path = "C:/Users/ashwi/Desktop/Ashwin/Antony.jpg"
#             #result= FaceAuthFunction(file_path)
#             # print(result)

#             # if result !=0:
#     # print("Authenticated")
#     sequence(a,b)

#             # else:
#             #     print("Authentication Failure")
                
#             # You can trigger any other notification mechanism here
            
#             # Add times to the list to be cleared
#         #     times_to_clear.extend(times)
#         # else:
#         #     print("No")
#         # # Delete the times that need to be cleared
#         # for time_obj in times_to_clear:
#         #     time_obj.delete()

#         # # Fetch the remaining times (if any) after deletion
#         # remaining_times = Time.objects.all()

#         # Wait for 60 seconds before checking again
#     time.sleep(30)
import serial
#     # This part of the code will never be reached, as the loop runs indefinitely
#     return JsonResponse({"status": "success"})
from datetime import datetime
from django.db.models import Subquery, OuterRef
def get_times(request=None):
    current_time = time.strftime('%H:%M')
    print("Current Time:", current_time)
    time_found = False


    consultations = Consultation.objects.all()
    
    for consultation in consultations:
        medicines_data = json.loads(consultation.medicines)
        #print(medicines_data)
        for medicine in medicines_data:
            if medicine.get('time') == current_time:
                a = int(medicine.get('qty')) if medicine.get('medname') == 'Medicine1' else 0
                b = int(medicine.get('qty')) if medicine.get('medname') == 'Medicine2' else 0
                pat_id=consultation.patient_id
                time_found = True  # Set the flag since a matching time is found
                print(pat_id)
                alert()
    
    if not time_found:
        print("Not time for medicine")
        return JsonResponse({"status": "No matching time found"})
    try:
        patient_img = PatientImg.objects.get(patient_id=pat_id)
        image_path = patient_img.image_path
                    # Now you can use 'image_path' as needed
    except PatientImg.DoesNotExist:
            print(f"No image found for patient ID: {pat_id}")
    
    x=FaceAuthFunction(image_path)

         
    if x == 0:
        
        if a > 0 and b > 0:
                # Create notification with pat_id, Medicine1, and qty=a
                Notification.objects.create(patient_id=pat_id, medicine='Medicine1', date=timezone.now(), time=current_time, qty=a)
                # Create notification with pat_id, Medicine2, and qty=b
                Notification.objects.create(patient_id=pat_id, medicine='Medicine2', date=timezone.now(), time=current_time, qty=b)
        elif a > 0:
                # Create notification with pat_id, Medicine1, and qty=a
                Notification.objects.create(patient_id=pat_id, medicine='Medicine1', date=timezone.now(), time=current_time, qty=a)
        elif b > 0:
                # Create notification with pat_id, Medicine2, and qty=b
                Notification.objects.create(patient_id=pat_id, medicine='Medicine2', date=timezone.now(), time=current_time, qty=b)
        fail()
    print(x)
    if x==1:
        print(a)
        print(b)
        sequence(a,b)


    # Wait for 30 seconds before checking again
    #time.sleep(30)
    
    return JsonResponse({"status": "success"})

def get_notifications(request):
    notifications = Notification.objects.all().order_by('-date', '-time').values('id', 'patient_id', 'medicine', 'date', 'time', 'qty')
    data = list(notifications)
    return JsonResponse(data, safe=False)