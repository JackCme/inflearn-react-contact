import React, { Component } from 'react'
import Contact from './Contact'

export class App extends Component {
    state = {
        name: '',
    }

    render() {
        return (
            <Contact />
        )
    }
}

export default App
