import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import axios from 'axios';
import './Dashboard.css';
import Box from '@mui/material/Box';
import { faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    backgroundColor: 'info.main',
                    color: 'white',
                    height: '350px',
                    width: '300px',
                    padding: '10px',
                    marginBottom:'px',
                    marginLeft:'100px',
                    '&:hover': { backgroundColor: 'info.light' },
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
                <Box
                  sx={{
                    backgroundColor: 'info.main',
                    color: 'white',
                    height: '350px',
                    width: '300px',
                    padding: '10px',
                    marginBottom:'px',
                    marginLeft:'100px',
                    '&:hover': { backgroundColor: 'info.light' },
                  }}
                >
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
                </Box>
              </div>
            </div>

            <div className='col-md-4'>
              <div className='container pb-5'>
                <Box
                  sx={{
                    backgroundColor: 'info.main',
                    color: 'white',
                    height: '350px',
                    width: '300px',
                    padding: '10px',
                    marginBottom:'px',
                    marginLeft:'100px',
                    '&:hover': { backgroundColor: 'info.light' },
                  }}
                >
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
                </Box>
              </div>
            </div>
            <div className='last'>
            <div className='col-md-4'>
              <h2 className='pt-5'style={{
                                  padding: '10px',         // Adjust padding as needed
                                  fontSize: '30px',        // Adjust font size as needed
                                  borderRadius: '5px',     // Rounded corners
                                  //border: '1px solid #ccc', // Border color
                                  width: '125%',           // Full width
                                  //backgroundColor: 'rgb(156, 243, 219)', // Background color
                                  color: '#fffff',           // Text color
                
                                }}>Previous Consultations</h2>
              <div className='container p-4'>
                  <select className='form-select mb-4' onChange={handleConsultationSelect}style={{
                                  padding: '10px',         // Adjust padding as needed
                                  fontSize: '18px',        // Adjust font size as needed
                                  borderRadius: '5px',     // Rounded corners
                                  border: '1px solid #ccc', // Border color
                                  width: '100%',           // Full width
                                  backgroundColor: 'rgb(156, 243, 219)', // Background color
                                  color: 'black',           // Text color
                                  //boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', // Box shadow
                                  cursor: 'pointer',       // Cursor on hover
                                }}>
                    <option value=''>Select Consultation</option>
                    {consultationDetails.map((consultation) => (
                      <option key={consultation.consult_id} value={consultation.consult_id}>
                        Consultation ID: {consultation.consult_id} - Date: {consultation.date}
                      </option>
                    ))}
                  </select>

                  {selectedConsultation && (
                    <div className="bg-light p-4 rounded"style={{ width: '100%' }}>
                      <h5 className="mb-4">Consultation Details</h5>
                      <p><strong>Date:</strong> {selectedConsultation.date}</p>
                      {doctorInfo.map((doctor, index) => (
                        <div key={index}>
                          <p><strong>Doctor ID:</strong> {doctor.doctor_id}</p>
                          <p><strong>Doctor:</strong> Dr. {doctor.firstName} {doctor.lastName}</p>
                        </div>
                      ))}
                      <p><strong>Comment:</strong> {selectedConsultation.comment}</p>
                      
                      <ul className="list-styled">
                        {selectedConsultation.medicines.map((medicine, index) => (
                          <li key={index} >
                            <div>
                              <span><strong>Medicine Name:</strong> {medicine.medname}</span><br/>
                              <span><strong>Dosage:</strong> {medicine.dosage}</span><br/>
                              <span><strong>Days:</strong> {medicine.days}</span><br/>
                              <span><strong>Quantity:</strong> {medicine.qty}</span><br/><br/>
                            </div>
                          </li>
                        ))}
                      </ul>
                       {/* Fade-in effect for .bg-img3 */}
                       <div className={`bg-img3 position-relative d-flex justify-content-center ${selectedConsultation ? 'fade-in' : ''}`}></div>
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

                  <h3>  Current Prescription</h3>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'><FontAwesomeIcon icon={faPrescriptionBottleMedical} /> Medicine Name</th>
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