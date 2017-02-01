import _find from 'lodash/find';
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup,
  HelpBlock, Row, Well } from 'react-bootstrap';
import { connect } from 'react-redux';
import validate from 'validate.js';

import { submitSignIn, updateSignInField, updateSignInFields } from '../../redux/actions/session';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.getField = this.getField.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  getField(name) {
    return _find(this.props.session.signIn.fields, { name });
  }

  validateForm() {
    let valid = false;

    const fields = this.props.session.signIn.fields;
    const constraints = {
      password: {
        presence: true
      },
      email: {
        presence: true,
        email: true
      }
    };

    const errors = validate({
      email: this.getField('email').value,
      password: this.getField('password').value
    }, constraints);

    if (errors) {
      fields.forEach((field) => {
        const f = this.getField(field.name);
        if (errors[field.name]) {
          f.valid = false;
          f.errorMsg = errors[field.name][0];
        } else {
          f.valid = true;
          f.errorMsg = '';
        }
      });
    } else {
      valid = true;
    }

    this.props.updateSignInFields(fields);

    return valid;
  }

  submitForm() {
    if (!this.validateForm()) {
      return false;
    }

    const details = {
      email: this.getField('email').value,
      password: this.getField('password').value
    };

    this.props.submitSignIn(details);

    return true;
  }

  handleChange(event) {
    this.props.updateSignInField(event.target.name, event.target.value);
  }

  render() {
    if (!this.props.session.signIn.fields) {
      return (
        <Row />
      );
    }

    const email = this.getField('email');
    const password = this.getField('password');

    return (
      <Row>
        <Col xs={12}>
          <h1>Sign In</h1>
        </Col>
        <Col xs={12}>
          <Alert
            bsStyle="danger"
            hidden={!this.props.session.signIn.showError}
            onDismiss={this.onDismissError}
          >
            <strong>{this.props.session.signIn.errorMsg}</strong>
          </Alert>
          <Well>
            <Form horizontal>

              <FormGroup
                controlId="formHorizontalEmail"
                validationState={email.valid ? null : 'error'}
              >
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={4}>
                  <FormControl
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email.value}
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                </Col>
                <Col sm={4}>
                  {email.valid ? null : <HelpBlock>{email.errorMsg}</HelpBlock>}
                </Col>
              </FormGroup>

              <FormGroup
                controlId="formHorizontalMessage"
                validationState={password.valid ? null : 'error'}
              >
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={4}>
                  <FormControl
                    name="password"
                    type="password"
                    rows={3}
                    placeholder="Password"
                    value={password.value}
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                </Col>
                <Col sm={4}>
                  {password.valid ? null : <HelpBlock>{password.errorMsg}</HelpBlock>}
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button
                    type="button"
                    disabled={this.props.session.signIn.isLoading}
                    onClick={!this.props.session.signIn.isLoading ? this.submitForm : null}
                  > Sign In </Button>
                </Col>
              </FormGroup>
            </Form>
          </Well>
        </Col>
      </Row>
    );
  }
}

SignIn.propTypes = {
  session: React.PropTypes.shape({
    signIn: React.PropTypes.shape({
      isLoading: React.PropTypes.bool,
      showError: React.PropTypes.bool,
      showSuccess: React.PropTypes.bool,
      errorMsg: React.PropTypes.string,
      fields: React.PropTypes.arrayOf(React.PropTypes.object)
    })
  }).isRequired,
  updateSignInField: React.PropTypes.func.isRequired,
  updateSignInFields: React.PropTypes.func.isRequired,
  submitSignIn: React.PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    session: state.reducers.session
  }
);

const mapDispatchToProps = dispatch => (
  {
    submitSignIn: (details) => {
      dispatch(submitSignIn(details));
    },
    updateSignInField: (name, value) => {
      dispatch(updateSignInField(name, value));
    },
    updateSignInFields: (fields) => {
      dispatch(updateSignInFields(fields));
    }
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
