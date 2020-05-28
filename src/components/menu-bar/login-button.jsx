import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';// 国际化
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import Button from '../button/button.jsx';
import styles from './login-button.css';
import {openLoginModal} from '../../reducers/modals.js'

const LoginButton = ({
  className,
  onClick
}) => (
  <Button
    className={classNames(
      className, 
      styles.loginButton
    )}
    onClick={ onClick }
  >
    {/* <FormattedMessage
      defaultMessage="Login"
      description="Label for login"
      id="gui.menuBar.login"
    /> */}
    登录
  </Button>
);
  


LoginButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

LoginButton.defaultProps = {
  onClick: () => {}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(openLoginModal())
});

export default connect(mapStateToProps,mapDispatchToProps)(LoginButton);