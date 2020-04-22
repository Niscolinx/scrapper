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
    this.props.dispatch(getSession());
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
