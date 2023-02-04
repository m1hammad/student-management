import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Table, Alert, Container, Button} from 'react-bootstrap';

export default function Score() {

    const scoreOptions = ["A", "B", "C", "D", "E", "F"];

    const [courseOptions, setCourseOptions] = useState([]);
    const [studentOptions, setStudentOptions] = useState([]);
    const [result, setResult] = useState([]);
    const [course, setCourse] = useState('');
    const [student, setStudent] = useState('');
    const [score, setScore] = useState('');
    const [successMessage, setSuccessMessage] = useState(false); 

    const Axios = axios.create({
        baseURL: `http://localhost:3333/api/`
    });

    useEffect( () => {
        Axios.get(`/course/list`)   // get course data
        .then( response => {
            console.log(response.data)
        })
        .catch( error => console.log(error));

        Axios.get(`/student/list`)      // get student data
        .then( response => {
            console.log(response.data)
        })
        .catch( error => console.log(error));

        Axios.get(`/score/list`)      // get score data
        .then( response => {
            console.log(response.data)
            setResult(response.data)
        })
        .catch( error => console.log(error));
    }, [successMessage])

  return (
    <div>
        {successMessage ? <Alert variant='success' onClose = {() => setSuccessMessage(false)} dismissible='true'>New scores added</Alert> : null}
        <div className='d-flex m-2'><h1 className="text-center">Result Board</h1></div>
        <Container className='w-50 d-inline-flex'>

        </Container>
        <Table bordered hover className='m-2'>
        <thead>
            <tr>
                <th>No.</th>
                <th>Course</th>
                <th>Student</th>
                <th>Grade</th>
            </tr>
        </thead>
        <tbody>
            {result.map( (result,index) => (
                <tr key={index}>
                    <td>{++index}</td>
                    <td>{result.courseId.courseName}</td>
                    <td>{result.studentId.firstName} {result.studentId.familyName}</td>
                    <td>{result.score}</td>
                </tr>
            ))}
        </tbody>
        </Table>
    </div>
  )
}
