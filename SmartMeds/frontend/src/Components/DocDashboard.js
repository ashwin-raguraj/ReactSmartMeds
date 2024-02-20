import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import Footer from './Footer';
import axios from 'axios';
import ProductSlider from './ProductSlider'
import Calendar from './Calendar';
import './Dashboard.css'
import SearchBar from './SearchBar'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';


const DocDashboard = () => {
  const [patientInfo, setPatientInfo] = useState({});
  const [consultationDetails, setConsultationDetails] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [medicationCalendar, setMedicationCalendar] = useState([]);
  const [recommended, setrecommended] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  }


  const fetchDashboardData = async () => {
    try {

      const doctorResponse = await axios.get('http://127.0.0.1:8000/docinfo/');
      if (doctorResponse && doctorResponse.data) {
        setDoctorInfo(doctorResponse.data);
      }
      
      const patientResponse = await axios.get('http://localhost:3030/patient-info');
      if (patientResponse && patientResponse.data) {
        setPatientInfo(patientResponse.data);
      }

      const consultationResponse = await axios.get('http://localhost:3030/consultation-details');
      if (consultationResponse && consultationResponse.data) {
        setConsultationDetails(consultationResponse.data);
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
      <div className="bg-img position-relative d-flex justify-content-center">
              <div className="fg-content d-flex flex-column justify-content-center align-items-center gap-5 ">
              {doctorInfo.map((doctor, index) => (
        <div key={index}>
          
          <h1>Dr. {doctor.firstName} {doctor.lastName}</h1>
          
        </div>
      ))}
                
                <SearchBar onSearchResults={handleSearchResults} />
              </div>
            </div>
            {searchResults.length > 0 &&
              <div className="container pb-5">
                <h2 className='pt-5'>Search Results</h2>
                <div className="container p-0 m-0">
                  {/* {searchResults.map(results => 
                      <li key={results.id}>{results.name}</li>
                    )} */}
                  <ProductSlider data={searchResults}/>
                  
                </div>
              </div>
            }
        <div className='container'>
         
        <div className="container pb-5">
              <h2 className='pt-5'>Your Patients</h2>
              <div className="container p-0 m-0">
                
                <ProductSlider data={recommended}/>
              </div>
            </div>
          <div className='col-md-4'>
              <div className='container pb-5'>
                <h2 className='pt-5'>Doctor Information</h2>
                <div className='container p-0 m-0'>
                  {/* <p>Doctor ID: {doctorInfo.doctorId}</p>
                  <p>Name: {doctorInfo.firstName} {doctorInfo.lastName}</p>
                  <p>Hospital: {doctorInfo.hospital}</p>
                  <p>Department: {doctorInfo.department}</p>
                  <p>Email: {doctorInfo.email}</p> */}
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
        </div>
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default DocDashboard;
