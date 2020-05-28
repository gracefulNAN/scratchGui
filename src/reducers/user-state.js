import keyMirror from 'keymirror';

const NOT_LOGINED = "NOT_LOGINED";
const YES_LOGINED = "YES_LOGINED";

const UserState = keyMirror({
  [NOT_LOGINED]: null,
  [YES_LOGINED]: null,
});

const UserStates = Object.keys( UserState );

// 初始化用户数据、登录状态
const initialState = {
  error: null,
  userData: null,
  loginState: UserState.NOT_LOGINED,
};

// 是否登录: 返回值: bool
const getIsLogined = loginState => (
  loginState === UserState.YES_LOGINED
);

// reducer
const reducer = function ( state, action ) {
  if ( typeof state === "undefined" ) state = initialState;
  switch (action.type) {
    case NOT_LOGINED:
        return Object.assign({}, state, {
            loginState: action.loginState
        });
    case YES_LOGINED:
        return Object.assign({}, state, {
            loginState: action.loginState
        });
    default:
        return state;
  }
};

// action
const notLogin = function (status) {
  return {
      type: NOT_LOGINED,
      loginState: status,
  };
};
const yesLogin = function (status) {
  return {
      type: YES_LOGINED,
      loginState: status,
  };
};

const setNotLogin = function () {
  return notLogin(NOT_LOGINED);
}
const setLogin = function () {
  return yesLogin(YES_LOGINED);
}


export {
  reducer as default,
  initialState as userStateInitialState,
  UserStates,
  UserState,
  getIsLogined,
  setNotLogin,
  setLogin,
};
