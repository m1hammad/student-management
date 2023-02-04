import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Table, Alert, Container, Button} from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


export default function Student() {

    const [firstName, setFirstName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [students, setStudents] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false); 
    // validation errors
    const [errorAgeMessage, setErrorAgeMessage] = useState(null); 
    const [errorFirstname, setErrorFirstname] = useState(null);
    const [errorFamilyname, setErrorFamilyname] = useState(null);

    const Axios = axios.create({
        baseURL: `http://localhost:3333/api/`
    })

    const handleSubmit = e => {
        e.preventDefault();
        Axios.post('/student/add', {firstName, familyName, birthDate: birthDate.toISOString()})
        .then( (() => {
            setFirstName("");
            setFamilyName("");
            setBirthDate("");
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 5000)
        }))
            .catch(error => console.log(error.response))
    };

    const handleFirstName = e => {
        if (e.target.value.length < 2)
            setErrorFirstname("First name must have atleast 2 characters");
        else{
            setErrorFirstname('');
            setFirstName(e.target.value);
        }
    }

    const handleFamilyName = e => {
        if (e.target.value.length < 2)
            setErrorFamilyname("Family name must have atleast 2 characters");
        else{
            setErrorFamilyname("");
            setFamilyName(e.target.value);
        }
    }

    const handleAge = e => {
        if(moment().diff(e, 'years') < 10)
            setErrorAgeMessage("Student must be at least 10 years old");
        else{
            setErrorAgeMessage('');
            setBirthDate(e);
        }
    }

    useEffect( () => {
        Axios.get(`/student/list`)
        .then( response => {
          // console.log(response.data) 
          setStudents(response.data);
        })
        .catch( error => console.log(error))
      }, [successMessage]);

  return (
    <div>
        {successMessage ? <Alert variant='success' onClose = {() => setSuccessMessage(false)} dismissible='true'>New Student added</Alert> : null}
        <div className='d-flex m-2'><h1 className="text-center">Student Management</h1></div>
        <Container className='w-50 d-inline-flex'>
            <Form onSubmit={handleSubmit}>

                <Form.Group className='mt-1 mb-2'>
                    <Form.Label>First name</Form.Label>
                    <Form.Control name='firstName' type='string' required onChange={handleFirstName} placeholder='Enter first name here' /> 
                    {errorFirstname && <p style={{color: "red"}}>{errorFirstname}</p>}
                </Form.Group>

                <Form.Group className='mt-1 mb-2'>
                    <Form.Label>Family name</Form.Label>
                    <Form.Control name='familyName' type='string' required onChange={ handleFamilyName } placeholder='Enter family name here' />
                    {errorFamilyname && <p style={{color: "red"}}>{errorFamilyname}</p>}
                </Form.Group>

                <Form.Group className='mt-1 mb-2'>
                    <Form.Label>Date of birth</Form.Label>
                    <ReactDatePicker selected={birthDate} required onChange={ handleAge } showYearDropdown dateFormat="dd/MM/yyyy" className="form-control" />
                    {errorAgeMessage && <p style={{color: "red"}}>{errorAgeMessage}</p>}
                    </Form.Group>
                <Button type='submit' className="signInBtn button-margin mt-2 mb-1">Submit</Button> 

            </Form>
        </Container>
        <Table bordered hover className='m-2'>
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Family Name</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{++index}</td>
              <td>{student.firstName}</td>
              <td>{student.familyName}</td>
              <td>{moment(student.birthDate).format("DD/MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
        </Table>
    </div>
  )
}
