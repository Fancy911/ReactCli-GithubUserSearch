import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {
    search = () => {
        // 获取输入框的值
        const { input: {value: keyword} } = this 
        // 解构赋值，这种写法是从this中获取input的value属性，并改名为keyword是双重解构赋值的写法
        // 等同于 const value = this.input.value
        // 也等同于 const { input } = this 然后再 const value = input.value
        // 亦等同于 const { value } = this.input

        // 发送请求前检查，如果输入框有输入值才发送请求
        if (keyword) {
            // 发送请求前，通知App进行状态更新，表明这是第一次加载，且处于加载中
            this.props.updateAppState({ 
                isFirst: false, 
                isLoading: true 
            })
            // 发送网络请求
            axios.get(`https://api.github.com/search/user123s?q=${keyword}`).then(
                response => {
                    // 请求成功后，通知App进行状态更新，user数据更新，加载完成
                    this.props.updateAppState({
                        isLoading: false, 
                        users: response.items
                    })
                },
                error => {
                    // 请求失败后，通知App进行状态更新，err数据更新，加载完成
                    this.props.updateAppState({
                        isLoading: false, 
                        error: error.message
                    })
                }
            )
        }
    }
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input 
                        type="text"
                        placeholder="enter the name you search"
                        ref={input => this.input = input}
                    />&nbsp;
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
}