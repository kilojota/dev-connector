import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
const Education = ({ education, deleteEducation }) => {
    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school} </td>
            <td className='hide-sm'>{edu.degree}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
                {// Formating the ugly date with Moment
                edu.to === null ? (
                    ' Now'
                ) : (
                    <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
                ) // Evaluating if 'to' value is null, which means the education is current
                }
            </td>
            <td>
                <button
                    className='btn btn-danger'
                    onClick={() => deleteEducation(edu._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )); // passed in with the profile via mapStateToProps, we have access to education
    return (
        <Fragment>
            <h2 className='my-2'>Education Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
};

export default connect(
    null,
    { deleteEducation }
)(Education);
