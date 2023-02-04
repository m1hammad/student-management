import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Alert, Container, Button, ListGroup} from 'react-bootstrap';

export default function Course() {

    const [courseName, setCourseName] = useState('');
    const [courses, setCourses] =useState([]);
    const [successMessage, setSuccessMessage] = useState(false); 

    const Axios = axios.create({
        baseURL: `http://localhost:3333/api/`
    });

    const handleSubmit = e => {
        e.preventDefault();
        Axios.post(`/course/add`, {courseName})
        .then( (() => {
            setCourseName("");
            setSuccessMessage(true);
            setTimeout(() => setSuccessMessage(false), 5000)
        }))
        .catch(error => console.log(error.response))
    };

    useEffect( () => {
        Axios.get(`/course/list`)
        .then( response => {
            console.log(response.data) 
            setCourses(response.data);
        })
        .catch( error => console.log(error))
    }, [successMessage]);

  return (
    <div>
        {successMessage ? <Alert variant='success' onClose = {() => setSuccessMessage(false)} dismissible='true'>New course added</Alert> : null}
        <div className='d-flex m-2'><h1 className="text-center">Add Courses</h1></div>

        <Container className='w-50 d-inline-flex'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mt-1 mb-2'>
                    <Form.Label>Course name</Form.Label>
                    <Form.Control name="courseName" onChange={ e => {setCourseName(e.target.value)}} type="string" required placeholder='Enter course name here' />  
                </Form.Group>
                <Button type='submit' className="signInBtn button-margin mt-2 mb-1">Submit</Button> 
            </Form>
        </Container>

        <ListGroup className='m-2 w-50'>
            {courses.map((course,index) => (
                <ListGroup.Item key={index}>{course.courseName}</ListGroup.Item>
            ))}
        </ListGroup>
    </div>
  )
}
