import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import Button from '../button/button.jsx';
import styles from './login.css';
import {closeLoginModal} from '../../reducers/modals.js';
import {setLogin} from '../../reducers/user-state.js'

const SubmitLoginButton = ({
    className,
    onCloseLoginModal,
    onLogin
}) => (
    <div>
        <Button
            className={classNames(
                className,
                styles.SubmitLoginButton
            )}
            onClick={()=>{
                onCloseLoginModal();
                onLogin();
            }}
        >
            {/* <FormattedMessage
                defaultMessage="登录"
                description="Label for submit login"
                id="gui.loginModal.submitLogin"
            /> */}
            登录
        </Button>
    </div>
);
SubmitLoginButton.propTypes = {
    className: PropTypes.string,
    onCloseLoginModal: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
};
SubmitLoginButton.defaultProps = {
    onClick: () => {}
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    onCloseLoginModal: () => dispatch(closeLoginModal()),
    onLogin: () => dispatch(setLogin())
});

export default connect(mapStateToProps,mapDispatchToProps)(SubmitLoginButton);
