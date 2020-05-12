import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import CenteredModal from './CenteredModal'
import Login from './Login'
import Register from './Register'


export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    }
  }

 
  render(){
    return (
      <Navbar collapseOnSelect expand="lg" variant="dark" fixed="top" style={{ background: '#88BDBC' }}>
        <Navbar.Brand>Short Stories</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">

            <Nav.Link onClick={() => this.setState({ modal: true})}
            style={{ visibility: this.props.currentUser !== 'guest' ? 'show' : 'hidden' }}>
            Add a story </Nav.Link>
            <Nav.Link  style={{ visibility: this.props.currentUser !== 'guest' ? 'show' : 'hidden' }}>My Stories</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link >Login</Nav.Link>
            <Nav.Link to="http://localhost:5000/users/register" >Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <CenteredModal
          show={this.state.modal}
          onHide={() => this.setState({ modal: false })}
          addAuthor={this.props.currentUser}
          submitForm={this.props.addStory}
          operation='add'
        />
      </Navbar>

    );
  }
}