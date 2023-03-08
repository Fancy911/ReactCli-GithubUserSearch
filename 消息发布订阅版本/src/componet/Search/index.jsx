import React, { Component } from 'react'
import PubSub from 'pubsub-js'
// import axios from 'axios'

export default class Search extends Component {
    search = async() => {
        // 获取输入框的值
        const { input: {value: keyword} } = this 
        // 发送请求前检查，如果输入框有输入值才发送请求
        if (keyword) {
            // 发送请求前，通知List进行状态更新，表明这是第一次加载，且处于加载中
            PubSub.publish('message', {
                isFirst: false, 
                isLoading: true
            })
            // 发送网络请求-axios写法
            // axios.get(`https://api.github.com/search/users?q=${keyword}`).then(
            //     response => {
            //         // 请求成功后，通知List进行状态更新，user数据更新，加载完成
            //         PubSub.publish('message', {
            //             isLoading: false, 
            //             users: response.data.items
            //         })
            //     },
            //     error => {
            //         // 请求失败后，通知List进行状态更新，err数据更新，加载完成
            //         PubSub.publish('message', {
            //             isLoading: false, 
            //             error: error.message
            //         })
            //     }
            // )

            // 发送网络请求-fetch写法
            // fetch(`https://api.github.com/search/users?q=${keyword}`).then(
            //     response => {
            //         console.log("联系服务器成功"); // 哪怕是404，也会走这里
            //         // console.log(response.json());
            //         return response.json()
            //     },
            //     // error => {
            //     //     console.log("联系服务器失败"); // 一般，只有网络不通才会走这里
            //     //     return new Promise(() => {}) // 中断promise链,没必要返回一个undefined,去走下面的then，所以返回一个pending状态的promise
            //     // }
            // ).then(
            //     response => {
            //         console.log("获取数据成功");
            //         // 数据返回成功后，通知List进行状态更新，user数据更新，加载完成
            //         PubSub.publish('message', {
            //             isLoading: false, 
            //             users: response.items
            //         })
            //     }
            // ).catch(
            //     error => {
            //         console.log("获取数据失败"); // 一般，只有网络不通才会走这里
            //         // 请求失败后，通知List进行状态更新，err数据更新，加载完成
            //         PubSub.publish('message', {
            //             isLoading: false, 
            //             error: error.message
            //         })
            //     }
            // )

            // 由于fetch返回的是一个promise，所以可以使用async await来简化代码
            // 发送网络请求-async await写法
            // 又由于await只能等来成功的promise，所以需要在fetch前面加上try catch
            try {
                const response = await fetch(`https://api.github.com/search/users?q=${keyword}`) 
                const data = await response.json()
                // 数据返回成功后，通知List进行状态更新，user数据更新，加载完成
                PubSub.publish('message', {
                    isLoading: false,
                    users: data.items
                })
            } catch (error) {
                // 请求失败后，通知List进行状态更新，err数据更新，加载完成
                PubSub.publish('message', {
                    isLoading: false,
                    error: error.message
                })
            }
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