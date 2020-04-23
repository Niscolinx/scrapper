const initialState = 0;

const getSession = (originalAction) => {
  return (dispatch, getState) => {
    originalAction.payload = getState().session[originalAction._sender.tab.id];
    return originalAction;
  }
};

export default {
  'GET_SESSION': getSession // the action to proxy and the new action to call
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SESSION':
      return state + (action.payload || 1);
    default:
      return state;
  }
};
