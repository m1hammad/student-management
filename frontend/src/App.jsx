import {Nav, Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Student from './student/Student';
import Course from './course/Course';

function App() {
  return (
    <div>
      <Navbar bg='dark'>
        <Nav as='ul'>
          <Nav.Item as='li'>
            <Nav.Link href='/' className='text-white'>Homepage</Nav.Link>
          </Nav.Item>

          <Nav.Item as='li'>
            <Nav.Link href='/student' className='text-white'>Students</Nav.Link>
          </Nav.Item>

          <Nav.Item as='li'>
            <Nav.Link href='/course' className='text-white'>Courses</Nav.Link>
          </Nav.Item>

          <Nav.Item as='li'>
            <Nav.Link href='/score' className='text-white'>Results</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>

      <Router>
        <Routes>
          <Route path='/student' element={<Student />}/>
          <Route path='/course' element={<Course />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
