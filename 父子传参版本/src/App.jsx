import React, { Component } from 'react'

import Search from './componet/Search'
import List from './componet/List'


export default class App extends Component {
    state = {
        isFirst: true, // 是否为第一次打开页面
        isLoading: false, // 标识是否处于加载中
        error: '', // 存储请求相关的错误信息
        users: [], // 用户列表
    }

    // 更新App的state
    updateAppState = (stateObj) => {
        this.setState(stateObj)
    }

    render() {
        return (
            <div className="container">
                <Search updateAppState={this.updateAppState}></Search>
                <List {...this.state}></List>
            </div>
        )
    }
}