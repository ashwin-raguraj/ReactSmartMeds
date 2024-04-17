
import React, { useState, useEffect } from 'react';
import Navbar3 from './Navbar3';
import Footer from './Footer';
import axios from 'axios';
import './PatientPage.css';

const PatientPage = () => {

 
    
    
  const [patients, setPatients] = useState([{
    doctor_id: '', // Assuming the doctor_id will be filled later
    patient_id: '',
    comment: '',
    date: new Date().toISOString().split('T')[0],
    medicines: [],
  }]);
  const [selectedPatient, setSelectedPatient] = useState({
     // Assuming the doctor_id will be filled later
    patient_id: '',
    
  });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    doctor_id: '', // Assuming the doctor_id will be filled later
    patient_id: '',
    comment: '',
    date: new Date().toISOString().split('T')[0],
    medicines: [],
  });
  const quantityOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  const [doctorInfo, setDoctorInfo] = useState([]);
  const timeOptions = [];
  for (let hour = 6; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  const handleAddMedicine = () => {
    // Create a new medicine object with default values
    const newMedicine = {
      medName: '',
      dosage: '',
      qty: '',
       timeToConsume: '06:00',
    };
  
    // Add the new medicine to the medicines array in the form data
    setFormData({ ...formData, medicines: [...formData.medicines, newMedicine] });
  };
  
  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines.splice(index, 1);
    setFormData({ ...formData, medicines: updatedMedicines });
  };
  
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      // const response = await axios.get('http://localhost:3030/doc/patients/');
      const response = await axios.get('http://127.0.0.1:8000/doc/patients/');
      if (response && response.data) {
        setPatients(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    try{
      const doctorResponse = await axios.get('http://127.0.0.1:8000/docdash/');
      if (doctorResponse && doctorResponse.data) {
        setDoctorInfo(doctorResponse.data);
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const handlePatientClick = (patient) => {
    if (selectedPatient === patient) {
      setSelectedPatient(null);
    } else {
      setSelectedPatient(patient);
    }
  };

  const handleNewConsultation = (patient) => {
    setShowForm(true);
    setFormData({
      ...formData,
      doctor_id: doctorInfo.doctor_id, // Replace 'your-doctor-id' with the actual doctor ID
      patient_id: patient.patient_id,
      comment: '',
      date: new Date().toISOString().split('T')[0],
      medicines: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend
      const response = await axios.post('http://localhost:3030/consultation', formData);
      console.log(response.data); // Log the response from the backend
      // Optionally, you can update the UI or show a success message here
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMedicineChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="patient-page">
      <Navbar3 />
      <div className='page'>
        
      <div className="patient-list">
      <h1>Your Patients </h1>
      
        {patients.map((patient) => (
          <div
            key={patient.patient_id}
            className={`patient-tile ${selectedPatient === patient ? 'active' : ''}`}
            onClick={() => handlePatientClick(patient)}
          >
            <div className="patient-info">
              <p>Patient ID: {patient.patient_id}</p>
              <p>Name: {patient.first_name} {patient.last_name}</p>
            </div>
            <button className="new-consultation-button" onClick={() => handleNewConsultation(patient)}>New Consultation</button>
          </div>
        ))}
      </div>
    
      {selectedPatient && (
        <div className="patient-details">
          <h1>Patient Information</h1>
          <div className="patient-info">
            <p>Patient ID: {selectedPatient.patient_id}</p>
            <p>Name: {selectedPatient.first_name} {selectedPatient.last_name}</p>
            <p>Age: {selectedPatient.age}</p>
            <p>Email: {selectedPatient.email}</p>
            
            {/* Add more patient details here */}
          </div>
          {showForm && (
            <div className="consultation-form">
              <h2>New Consultation</h2>
              <div className='formconsult'>
                <form onSubmit={handleSubmit}>
                  {/* Form inputs go here */}
                  <label htmlFor="doctor_id">Doctor ID:</label>
                  <input type="text" id="doctor_id" name="doctor_id" value={formData.doctor_id} onChange={handleChange} readOnly />
                  <label htmlFor="patient_id">Patient ID:</label>
                  <input type="text" id="patient_id" name="patient_id" value={formData.patient_id} onChange={handleChange} readOnly />
                  <label htmlFor="comment">Comment:</label>
                  <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange}></textarea>
                  <label htmlFor="date">Date:</label>
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
                  {/* <label htmlFor="medicine">Select Medicine:</label> */}
                
                  
                  <table>
                <thead>
                  <tr>
                    <th>Medicine Name</th>
                    <th>Dosage</th>
                  <th>Quantity</th>
                    <th>Time</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                  {formData.medicines.map((medicine, index) => (
                    <tr key={index}>
                      <td>
                      <select id="medicine" name="medicine" onChange={handleMedicineChange}>
                    <option value='' disabled>Select Medicine</option>
                    <option value='Medicine1'>Medicine1</option>
                    <option value='Medicine2'>Medicine2</option>
                    {/* Add more options as needed */}
                  </select>
                      </td>
                      <td>
                        <input type="text" value={medicine.dosage} onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)} />
                      </td>
                      <td>
                        <select value={medicine.qty} onChange={(e) => handleMedicineChange(index, 'qty', e.target.value)}>
                          {quantityOptions.map((qty, idx) => (
                            <option key={idx} value={qty}>
                              {qty}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <select value={medicine.timeToConsume} onChange={(e) => handleMedicineChange(index, 'timeToConsume', e.target.value)}>
                          {timeOptions.map((time, idx) => (
                            <option key={idx} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <button type="button" onClick={() => handleRemoveMedicine(index)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="addbutton" onClick={handleAddMedicine}>Add Medicine</button>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
          <div className='foot'>
            <Footer />
          </div>
      </div>
      </div>
    
  );
};

export default PatientPage;
