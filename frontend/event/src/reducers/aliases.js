const getSession = (originalAction) => {
    return (dispatch, getState) => {
        originalAction.payload = getState().session[originalAction._sender.tab.id];
        return originalAction;
    }
};

export default {
    'GET_SESSION': getSession // the action to proxy and the new action to call
};