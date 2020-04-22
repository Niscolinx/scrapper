import React, {Component} from 'react';
import {connect} from 'react-redux';

const getSession = () => {
  const data = {
    type: ACTION_GET_SESSION,
    payload: {} //payload is the data/object that is resolved by the promise
  };

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
        // the response data
      })
      .catch((err) => {
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

const mapStateToProps = (state) => {
  return {
    session: state.session,
    users: state.users
  };
};

export default connect(mapStateToProps)(App);
