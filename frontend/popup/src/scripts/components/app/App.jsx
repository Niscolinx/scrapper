import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../event/src/reducers/actions/burgerIndex'


const getSession = () => {
  const data = {
    type: GET_SESSION,
    payload: {} //payload is the data/object that is resolved by the promise
  };
console.log(data)
  return data;
};
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // promise returned from `dispatch()`
    this.props.dispatch(getSession())
      .then((data) => {
        console.log('this is the data from backend', data)
        // the response data
      })
      .catch((err) => {
        (console.log('this is the error from backend', err))
        // something broke in the background store
      });
  }

  render() {
    return (
      <div>
        {this.props.session && this.props.users[this.props.session.userId].name}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    auth: state.auth.tokenId,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onInitAuth: (email, password, isLogin) => dispatch(actions.initAuth(email, password, isLogin))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
