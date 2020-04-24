import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../event/src/reducers/actions/burgerIndex'

console.log('the content of react')

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      this.props.onInitAuth()
  }

  render() {
    let working = 'Working well'
    return (
        <div>
            <div>{working}</div>
            <div>{this.props.loading}</div>
        </div>
    )
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
    onInitAuth: () => dispatch(actions.callTweet())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
