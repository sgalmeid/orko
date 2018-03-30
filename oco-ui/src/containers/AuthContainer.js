import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/auth/actions';
import { Loader } from 'semantic-ui-react';
import WhitelistingComponent from '../components/WhitelistingComponent';
import CredentialsComponent from '../components/CredentialsComponent';

class AuthContainer extends Component {

  componentDidMount() {
    this.props.dispatch(actions.defaultLogin());
  }

  onWhitelist = (token) => {
    this.props.dispatch(actions.whitelist(token));
  };

  onLogin = (userName, password) => {
    this.props.dispatch(actions.login(userName, password));
  };

  render() {
    if (this.props.auth.loading) {
      return <Loader active={true}/>;
    } else if (!this.props.auth.whitelisted) {
      return <WhitelistingComponent
        onApply={this.onWhitelist}
        error={this.props.auth.error}
      />;
    } else if (!this.props.auth.loggedIn) {
      return <CredentialsComponent
        onApply={this.onLogin}
        error={this.props.auth.error}
      />;
    } else {
      return null;
    }
  } 
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(AuthContainer);