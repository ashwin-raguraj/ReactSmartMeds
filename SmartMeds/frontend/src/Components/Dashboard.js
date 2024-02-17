import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import axios from 'axios';
import Calendar from './Calendar';
import './Dashboard.css'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const Dashboard = () => {
  const [patientInfo, setPatientInfo] = useState({});
  const [consultationDetails, setConsultationDetails] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [medicationCalendar, setMedicationCalendar] = useState([]);

  const fetchDashboardData = async () => {
    try {
      // const patientResponse = await axios.get('http://localhost:3030/patient-info');
      // if (patientResponse && patientResponse.data) {
      //   setPatientInfo(patientResponse.data);
      // }

      const consultationResponse = await axios.get('http://127.0.0.1:8000/consultations/');
      if (consultationResponse && consultationResponse.data) {
        setConsultationDetails(consultationResponse.data);
      }

      const doctorResponse = await axios.get('http://localhost:3030/doctorinfo/');
      if (doctorResponse && doctorResponse.data) {
        // console.log(doctorResponse.data);
        setDoctorInfo(doctorResponse.data);
      }
       // Fetch Prescription Details
       const prescriptionResponse = await axios.get('http://localhost:3030/prescription-details');
       if (prescriptionResponse && prescriptionResponse.data) {
         setPrescriptionDetails(prescriptionResponse.data);
       }
 
       // Fetch Medication Calendar
       const calendarResponse = await axios.get('http://localhost:3030/medication-calendar');
       if (calendarResponse && calendarResponse.data) {
         setMedicationCalendar(calendarResponse.data);
       }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    
    <div className='dashboard'>
      <nav>
        <Navbar2 />
      </nav>
      <body className='dashboard-body'>
      {/* <div className="bg-img position-relative d-flex justify-content-center">
              <div className="fg-content d-flex flex-column justify-content-center align-items-center gap-5 ">
                <h1 className>Welcome </h1> 
              </div>
            </div> */}
        <div className='container'>
          <div className='row'>
            {/* Patient Information Section */}
            <div className='col-md-4'>
              <div className='container pb-5'>
                <h2 className='pt-5'>Patient Information</h2>
                <div className='container p-0 m-0'>
                  {/* <p>Patient ID: {patientInfo.patientId}</p>
                  <p>Name: {patientInfo.firstName} {patientInfo.lastName}</p>
                  <p>Age: {patientInfo.age}</p>
                  <p>Email: {patientInfo.email}</p> */}
                  <p>Patient ID: 101</p>
                  <p>Name: ABCD EFG</p>
                  <p>Age: 56</p>
                  <p>Email: abcd@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Consultation Details Section */}
            <div className='col-md-4'>
              <div className='container pb-5'>
                <h2 className='pt-5'>Consultation Details</h2>
                
                <div className='container p-0 m-0'>
                {consultationDetails.map((consultation, index) => (
                          <div key={index}>
                            <p>Date: {consultation.date}</p>
                            <p>Comment: {consultation.comment}</p>
                            {/* Iterate over each medicine within the consultation */}
                            <ul>
                              {/* {consultation.medicines.map((medicine, medIndex) => (
                                <li key={medIndex}>
                                  <p>Medicine Name: {medicine.medname}</p>
                                  <p>Dosage: {medicine.dosage}</p>
                                  <p>Quantity: {medicine.qty}</p>
                                </li>
                              ))} */}
                            </ul>
                          </div>
                        ))}
              
                      {/* <p>Date:  {consultationDetails.date}</p>
                      <p>Comment: {consultationDetails.comment}</p> */}
                       {/* <p>Date: 19-Jan-2024</p>
                      <p>Comment: Medicines have been updated</p> */}
                    
                  
                </div>
              </div>
            </div>

            {/* Doctor Information Section */}
            <div className='col-md-4'>
              <div className='container pb-5'>
                <h2 className='pt-5'>Doctor Information</h2>
                <div className='container p-0 m-0'>
                {doctorInfo.map((doctor, index) => (
                <div key={index} className='col-md-4'>
                  <div className='container pb-5'>
                    <h2 className='pt-5'>Doctor Information</h2>
                    <div className='container p-0 m-0'>
                      <p>Doctor ID: {doctor.doctor_id}</p>
                      <p>Name: {doctor.firstName} {doctor.lastName}</p>
                      <p>Hospital: {doctor.hospital}</p>
                      <p>Department: {doctor.department}</p>
                      <p>Email: {doctor.email}</p>
                    </div>
                  </div>
                </div>
              ))}
                            
                  {/* <p>Doctor ID: {doctorInfo.doctor_id}</p>
                  <p>Name: {doctorInfo.firstName} {doctorInfo.lastName}</p>
                  <p>Hospital: {doctorInfo.hospital}</p>
                  <p>Department: {doctorInfo.department}</p>
                  <p>Email: {doctorInfo.email}</p> */}
                   {/* <p>Doctor ID: BH405</p>
                  <p>Name: Dr. XYZ</p>
                  <p>Hospital: BH Hospital</p>
                  <p>Department: Oncology</p>
                  <p>Email: xyz@bh.org</p> */}
                </div>
              </div>
            </div>
          </div>
          {/* Medication History Section */}
          <div className='row mt-5'>
            <div className='col-md-12'>
              <div className='container pb-5'>
                <h2 className='pt-5'>Medication History</h2>
                {/* Prescription Details */}
                <div className='container p-0 m-0'>
                  <h3>Prescription Details</h3>
                  <table className='table'>
                    <thead>
                      <tr>
                        {/* <th scope='col'>Serial Number</th> */}
                        <th scope='col'>Medicine Name</th>
                        <th scope='col'>Dosage</th>
                        <th scope='col'>Qty</th>
                        <th scope='col'>Days</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                          {/* <td>{prescription.serialNumber}</td>
                          <td>{prescription.medicineName}</td>
                          <td>{prescription.dosage}</td>
                          <td>{prescription.qty}</td>
                          <td>{prescription.days}</td> */}
                          {/* <td>1</td> */}
                          <td>Panadol</td>
                          <td>10mg</td>
                          <td>20</td>
                          <td>20</td>
                        
                      
                    </tbody>
                  </table>
                </div>

                {/* Medication Calendar */}
                <div className='container p-0 m-0'>
                  <h3>Medication Calendar</h3>
                  <Calendar medicationCalendar={medicationCalendar} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
