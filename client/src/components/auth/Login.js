import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

// import axios from 'axios';

const Login = ({ login, isAuthenticated }) => {
    // Disclaimer for useState. It takes an object or variable as variable state, and returns the very object and also a function to update that object.
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    // We call setFormData, then make a copy of the object using ...formdata, then with [e.target.name] we are using whatever the name tag of the input field is as the key, then the value of the input.
    const onSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };
    // Redirect if logged in

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }
    return (
        <Fragment>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Sign in to your Account
            </p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        minLength='6'
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>

                <input
                    type='submit'
                    className='btn btn-primary'
                    value='Login'
                />
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </Fragment>
    );
};
Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    // mapStateToProps react redux built in fucntion, takes the state as default parameter
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(
    mapStateToProps,
    { login }
)(Login);
