import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; // To connect the component to redux
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';

// import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
    // destructuring variable props into only setAlert
    // Disclaimer for useState. It takes an object or variable as variable state, and returns the very object and also a function to update that object.
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    // We call setFormData, then make a copy of the object using ...formdata, then with [e.target.name] we are using whatever the name tag of the input field is as the key, then the value of the input.
    const onSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger'); // Send it to alerts.js on actions
        } else {
            register({ name, email, password });
            // Making a register request without redux ---
            // const newUser = {
            //     name,
            //     email,
            //     password
            // };
            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     };
            //     const body = JSON.stringify(newUser);
            //     const res = await axios.post('/api/users', body, config);
            //     // We make the response, using the endpoint api/users, the data sent, and the config, which we need the headers for,
            //     console.log(res.data);
            // } catch (err) {
            //     console.error(err.response.data);
            // }
        }
    };
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Create Your Account
            </p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name} // Setting the value according to the state above
                        onChange={e => onChange(e)} // When this input field changes, we call a function that accepts the event as the argument
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        minLength='6'
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        minLength='6'
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input
                    type='submit'
                    className='btn btn-primary'
                    value='Register'
                />
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    );
};
Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
    // mapStateToProps react redux built in fucntion, takes the state as default parameter
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(
    // We add the setAlert action in order to use it as a argument on Register function (it becomes available on props) but we destructure it and use only setAlert.
    mapStateToProps,
    { setAlert, register }
)(Register);
