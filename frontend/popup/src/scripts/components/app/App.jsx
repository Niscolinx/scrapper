import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../../event/src/reducers/actions/burgerIndex'
import {tweeted} from '../../../../../event/src/index'

let jsonData = []
class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }
      

    render() {
        return (
            <div>
                {console.log('It is working wella')}
                {tweeted}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        auth: state.auth.tokenId,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onInitAuth: () => dispatch(actions.tweetFunc()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
