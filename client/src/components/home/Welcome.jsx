import { Button, ButtonToolbar, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Welcome = () => (
  <Jumbotron>
    <h1>Welcome to the Workout Tracker!</h1>
    <p>Use the sign in or sign up buttons below to get started.</p>
    <ButtonToolbar>
      <LinkContainer to={'signup'}><Button bsStyle="primary" bsSize="large">Sign Up</Button></LinkContainer>
      <LinkContainer to={'signin'}><Button bsStyle="primary" bsSize="large">Sign In</Button></LinkContainer>
    </ButtonToolbar>
  </Jumbotron>
);

export default Welcome;
