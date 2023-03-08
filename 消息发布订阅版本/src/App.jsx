import React, { Component } from 'react'

import Search from './componet/Search'
import List from './componet/List'


export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Search/>
                <List/>
            </div>
        )
    }
}