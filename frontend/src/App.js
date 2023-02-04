import {Nav, Navbar } from 'react-bootstrap';

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
    </div>
  );
}

export default App;
