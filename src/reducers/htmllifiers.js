
const SB3_HTMLFILE = 'htmlfile';

const initialState = {
  [SB3_HTMLFILE]:{}
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case SB3_HTMLFILE:
        return Object.assign({}, state, {
          [SB3_HTMLFILE]: action.file,
        });
    default:
        return state;
    }
};

const setHtmlFile = file => ({
    type: SB3_HTMLFILE,
    file: file
});

export {
  reducer as default,
  initialState as fileInitialState,
  setHtmlFile
};
