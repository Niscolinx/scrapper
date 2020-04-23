const initialState = 0;

const getSession = (originalAction) => {
  return (dispatch, getState) => {
    originalAction.payload = getState().session[originalAction._sender.tab.id];
    return originalAction;
  }
};


export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SESSION': return getSession()
    default:
      return state;
  }
};
