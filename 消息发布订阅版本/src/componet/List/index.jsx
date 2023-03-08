import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {
    state = {
        isFirst: true, // 是否为第一次打开页面
        isLoading: false, // 标识是否处于加载中
        error: '', // 存储请求相关的错误信息
        users: [], // 用户列表
    }

    // 初始化渲染后调用，只调用一次，消息订阅就写在这里
    componentDidMount() {
        // 订阅消息
        // 这个subscribe函数接收两个参数，第一个参数是消息名，第二个参数是回调函数
        // 回调函数接收两个参数，第一个参数是消息名，第二个参数是传递的数据
        this.token = PubSub.subscribe('message', (msg, stateObj) => {
            // console.log(msg); // message订阅
            this.setState(stateObj)
        })
        console.log(this.token);
    }

    componentWillUnmount() {
        // 取消订阅
        PubSub.unsubscribe(this.token)
    }

    render() {
        const { users, error, isFirst, isLoading } = this.state;
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
