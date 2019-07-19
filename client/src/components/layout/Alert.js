import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; // We need this everytime we want to use an action or access the app state

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    )); // destructuring variable props into only alerts (props is our component state, and we added the alert to it on the alert.js reducer)

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
}); // Accessing the state and using it with the prop, inside the component.
export default connect(
    mapStateToProps,
    {}
)(Alert); // Getting the array redux state to a prop on this component (Alert.js)
