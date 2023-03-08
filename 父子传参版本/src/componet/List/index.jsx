import React, { Component } from 'react'
import './index.css'

export default class List extends Component {
    render() {
        const { users, error, isFirst, isLoading } = this.props
        return (
            <div className="row">
                {
                    isFirst ? <h2>Enter name to search</h2> :
                    isLoading ? <h2>Loading...</h2> :
                    error ? <h2 style={{color: 'red'}}>{error}</h2> :
                    users.map((userObj) => {
                        return (
                            <div key={userObj.id} className="card">
                                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                                    <img src={userObj.avatar_url} alt='head_portrait' style={{width: '100px'}}/>
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
