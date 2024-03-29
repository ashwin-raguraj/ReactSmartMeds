import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import axios from 'axios';
import './Dashboard.css';
import Box from '@mui/material/Box';

const Dashboard = () => {
  const [patientInfo, setPatientInfo] = useState({});
  const [consultationDetails, setConsultationDetails] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const patientResponse = await axios.get('http://127.0.0.1:8000/patientinfo/');
      if (patientResponse && patientResponse.data) setPatientInfo(patientResponse.data);

      const consultationResponse = await axios.get('http://127.0.0.1:8000/consultations/');
      if (consultationResponse && consultationResponse.data) {
        setConsultationDetails(consultationResponse.data);
      }

      const doctorResponse = await axios.get('http://127.0.0.1:8000/docinfo/');
      if (doctorResponse && doctorResponse.data) {
        setDoctorInfo(doctorResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleConsultationSelect = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedConsultation = consultationDetails.find(
      (consultation) => consultation.consult_id === selectedId
    );
    setSelectedConsultation(selectedConsultation);
  };

  return (
    <div className='dashboard'>
      <nav>
        <Navbar2 />
      </nav>
      <div className="bg-img2 position-relative d-flex justify-content-center"></div>
      <div className='dashboard-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='container pb-5'>
                <Box
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    height: '350px',
                    width: '300px',
                    padding: '16px',
                    marginBottom:'px',
                    '&:hover': { backgroundColor: 'primary.light' },
                  }}
                >
                  <h2 className='pt-5'>Patient Information</h2>
                  <div className='container p-0 m-0'>
                    <p>Patient ID: {patientInfo.patient_id}</p>
                    <p>Name: {patientInfo.firstName} {patientInfo.lastName}</p>
                    <p>Age: {patientInfo.age}</p>
                    <p>Email: {patientInfo.email}</p>
                  </div>
                </Box>
              </div>
            </div>
            
            <div className='col-md-4'>
              <div className='container pb-5'>
                <h2 className='pt-5'>Last Consultation Details</h2>
                <div className='container p-0 m-0'>
                  
                  {consultationDetails.length > 0 && (
                    <div>
                      <p>Date: {consultationDetails[0].date}</p>
                      <p>Consultation ID: {consultationDetails[0].consult_id}</p>
                      <p>Comment: {consultationDetails[0].comment}</p>
                    </div>
                  )}
                  
                </div>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='container pb-5'>
                <h2 className='pt-5'>Your Doctor </h2>
                <div className='container p-0 m-0'>
                  {doctorInfo.map((doctor, index) => (
                    <div key={index}>
                      <p>Doctor ID: {doctor.doctor_id}</p>
                      <p>Name: Dr. {doctor.firstName} {doctor.lastName}</p>
                      <p>Hospital: {doctor.hospital}</p>
                      <p>Department: {doctor.department}</p>
                      <p>Email: {doctor.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='last'>
            <div className='col-md-4'>
              <h2 className='pt-5'>Previous Consultations</h2>
              <div className='container p-0 m-0'>
                <select className='form-select' onChange={handleConsultationSelect}>
                  <option value=''>Select Consultation</option>
                  {consultationDetails.map((consultation) => (
                    <option key={consultation.consult_id} value={consultation.consult_id}>
                      Consultation ID: {consultation.consult_id} - Date: {consultation.date}
                    </option>
                  ))}
                </select>
                {selectedConsultation && (
                  <div>
                    <p>Date: {selectedConsultation.date}</p>
                    {doctorInfo.map((doctor, index) => (
                      <div key={index}>
                        <p>Doctor ID: {doctor.doctor_id}</p>
                        <p>Doctor: Dr. {doctor.firstName} {doctor.lastName}</p>
                      </div>
                    ))}
                    <p>Comment: {selectedConsultation.comment}</p>
                    <ul>
                      {selectedConsultation.medicines.map((medicine, index) => (
                        <li key={index}>
                          <p>Medicine Name: {medicine.medname}</p>
                          <p>Dosage: {medicine.dosage}</p>
                          <p>Quantity: {medicine.qty}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>

          <div className='row mt-5'>
            <div className='col-md-12'>
              <div className='container pb-5'>
                <div className='container p-0 m-0'>
                  <h3>Current Prescription</h3>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'>Medicine Name</th>
                        <th scope='col'>Dosage</th>
                        <th scope='col'>Qty</th>
                        <th scope='col'>Days</th>
                        <th scope='col'>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultationDetails.length > 0 &&
                        consultationDetails[0].medicines.map((medicine, index) => (
                          <tr key={index}>
                            <td>{medicine.medname}</td>
                            <td>{medicine.dosage}</td>
                            <td>{medicine.qty}</td>
                            <td>{medicine.days}</td>
                            <td>{medicine.time}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
