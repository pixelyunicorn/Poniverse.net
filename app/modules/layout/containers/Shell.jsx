import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../../../style/vendor.scss';
import './Shell.scss';
import { startAuth, finishAuth } from '../../auth/redux/auth';
import { getLoggedInUser } from '../../user/redux/user';
import { Field, reduxForm } from 'redux-form';
import LoginFormModal from '../../auth/containers/LoginFormModal';

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
class Shell extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    children: PropTypes.object
  };

  render() {
    const { children, user, actions } = this.props;

    console.log(user);

    return (
      <div className="shell">
        <Header user={user} onLoginClick={actions.startAuth} onButtonClick={actions.getLoggedInUser} />
        <main>
          {children}
        </main>
        <Footer />
        <LoginFormModal />
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({startAuth, finishAuth, getLoggedInUser}, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shell);
