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

    const handleSubmit = e => {
        e.preventDefault();
        Axios.post(`/score/add`, {courseId: course, studentId: student, score})
        .then( () => {
            setCourse('');
            setStudent('');
            setScore('');
            setSuccessMessage(true);
            setTimeout( () => setSuccessMessage(false), 5000);
        }).catch(error => console.log(error.response));
    }

    useEffect( () => {
        Axios.get(`/course/list`)   // get course data
        .then( response => {
            // console.log(response.data);
            setCourseOptions(response.data);
        })
        .catch( error => console.log(error));

        Axios.get(`/student/list`)      // get student data
        .then( response => {
            // console.log(response.data);
            setStudentOptions(response.data);
        })
        .catch( error => console.log(error));

        Axios.get(`/score/list`)      // get score data
        .then( response => {
            //console.log(response.data)
            setResult(response.data)
        })
        .catch( error => console.log(error));
    }, [successMessage])

  return (
    <div>
        {successMessage ? <Alert variant='success' onClose = {() => setSuccessMessage(false)} dismissible='true'>New scores added</Alert> : null}
        <div className='d-flex m-2'><h1 className="text-center">Result Board</h1></div>
        <Container className='w-50 d-inline-flex'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mt-1 mb-2'>
                    <Form.Label>Course</Form.Label>
                    <Form.Control as="select" value={course} required onChange={ e => setCourse(e.target.value)}>
                        <option value="" disabled>Select a course</option>
                        {courseOptions.map((course) => (
                            <option key={course._id} value={course._id}>{course.courseName}</option>
                        )
                        )}
                    </Form.Control>
                </Form.Group>

                <Form.Group className='mt-1 mb-2'>
                    <Form.Label>Student</Form.Label>
                    <Form.Control as='select' value={student} required onChange={ e => setStudent(e.target.value)} >
                        <option value="" disabled>Select a course</option>
                        {studentOptions.map( (student) => (
                            <option key={student._id} value={student._id}>{student.firstName} {student.familyName}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className='mt-1 mb-2'>
                    <Form.Label>Grade</Form.Label>
                    <Form.Control as="select" value={score} required onChange={ e => setScore(e.target.value)}>
                        <option value="" disabled>Select a grade</option>
                        {scoreOptions.map((score, index) => (
                            <option key={index} value={score}>{score}</option>
                        )
                        )}
                    </Form.Control>
                </Form.Group>

                <Button type='submit' className="signInBtn button-margin mt-2 mb-1">Submit</Button>
            </Form>
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
