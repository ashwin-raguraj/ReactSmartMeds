import React, { useState, useEffect } from 'react';
import Navbar3 from './Navbar3';
import Footer from './Footer';
import axios from 'axios';
import './PatientPage.css';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    comment: '',
    date: new Date().toISOString().split('T')[0],
    medicines: [],
  });
  const quantityOptions = Array.from({ length: 30 }, (_, i) => i + 1);
  const timeOptions = [];
  for (let hour = 6; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  const [consultationCompleted, setConsultationCompleted] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/doc/patients/');
      if (response && response.data) {
        setPatients(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
    
    setConsultationCompleted(false);
    setFormData({
      patient_id: patient.patient_id,
      comment: '',
      date: new Date().toISOString().split('T')[0],
      medicines: [],
    });
  };

  const handleAddMedicine = () => {
    const newMedicine = {
      medname: '',
      dosage: '',
      qty: 0,
      time: '06:00',
      days: 0,
    };
    setFormData({ ...formData, medicines: [...formData.medicines, newMedicine] });
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines.splice(index, 1);
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const consultationData = {
        patient_id: formData.patient_id,
        comment: formData.comment,
        date: formData.date,
        medicines: formData.medicines,
      };
      const response = await axios.post('http://127.0.0.1:8000/consultations/', consultationData);
      console.log(response.data); // Log the response from the backend
      setConsultationCompleted(true);
      setShowForm(false);
      // Optionally, you can update the UI or show a success message here
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMedicineChange = (index, key, value) => {
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index][key] = value;
    setFormData({ ...formData, medicines: updatedMedicines });
  };

  return (
    
    <div className="patient-page">
      <Navbar3 />
      <div className='page'>
        <div className="patient-list">
          <h1>Your Patients</h1>
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
              <button className="new-consultation-button" onClick={() => handlePatientClick(patient)}>New Consultation</button>
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
            </div>
            {showForm ?  (
              <div className="consultation-form">
                <h2>New Consultation</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="comment">Comment:</label>
                  <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange}></textarea>
                  <label htmlFor="date">Date:</label>
                  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
                  <table>
                    <thead>
                      <tr>
                        <th>Medicine Name</th>
                        <th>Dosage</th>
                        <th>Quantity</th>
                        <th>Time</th>
                        <th>Days</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.medicines.map((medicine, index) => (
                        <tr key={index}>
                          <td>
                            <select value={medicine.medname} onChange={(e) => handleMedicineChange(index, 'medname', e.target.value)}>
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
                            <option value={0}>0</option> 
                              {quantityOptions.map((qty, idx) => (
                                <option key={idx} value={qty}>
                                  {qty}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select value={medicine.time} onChange={(e) => handleMedicineChange(index, 'time', e.target.value)}>
                              {timeOptions.map((time, idx) => (
                                <option key={idx} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select value={medicine.days} onChange={(e) => handleMedicineChange(index, 'days', e.target.value)}>
                            <option value={0}>0</option> 
                              {Array.from({ length: 30 }, (_, i) => i + 1).map((day, idx) => (
                                <option key={idx} value={day}>
                                  {day}
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
                  <button type="button" onClick={handleAddMedicine}>Add Medicine</button>
                  <button type="submit">Submit</button>
                  {!showForm && <p>Consultation done!</p>}
                </form>
              </div>
          ) : (
            <div className="consultation-completed">
              <p><FontAwesomeIcon icon={faCheckCircle} fade style={{color: "#4caf50",}} /> Consultation Completed!</p>
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
