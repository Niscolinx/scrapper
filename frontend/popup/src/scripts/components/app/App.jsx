import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../event/src/reducers/actions/burgerIndex'


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.onInitAuth()
  }

  render() {
    return (
      <div>
        {this.props.loading}
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
    onInitAuth: () => dispatch(actions.authSuccessCheck())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
