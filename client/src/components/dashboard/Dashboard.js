import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading }
}) => {
    //console.log(props);
    useEffect(() => {
        getCurrentProfile();
    }, []);
    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                <i className='fas fa-user' /> Welcome {user && user.name}
            </p>
            {profile !== null ? (
                <Fragment>
                    <DashboardActions />
                    {profile.experience.length > 0 ? (
                        <Experience experience={profile.experience} />
                    ) : (
                        <div>
                            <h2 className='my-2'>Experience Credentials</h2>
                            <p>Please add your most relevant experiences.</p>
                        </div>
                    )}
                    {profile.education.length > 0 ? (
                        <Education education={profile.education} />
                    ) : (
                        <div>
                            <h2 className='my-2'>Education Credentials</h2>
                            <p>Please fill out your education credentials.</p>
                        </div>
                    )}
                    <div className='my-2'>
                        <button
                            className='btn btn-danger'
                            onClick={() => deleteAccount()}
                        >
                            <i className='fas fa-user-minus' />
                            Delete My Account
                        </button>
                    </div>
                </Fragment>
            ) : (
                // Adding the prop experience to <Experience>
                <Fragment>
                    <p>
                        You have not yet setup a profile, please add some info
                    </p>
                    <Link to='/create-profile' className='btn btn-primary my-1'>
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment> // We check if there is actually an user by doing 'user && user.name' , if there is then display the user.name
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { getCurrentProfile, deleteAccount }
)(Dashboard);
