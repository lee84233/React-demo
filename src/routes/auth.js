/*
 * 权限控制，判断登录信息
 * @Author: Bruce.Lee
 * @Date: 2019-03-15 17:06:24
 * @Last Modified by: Bruce.Lee
 * @Last Modified time: 2019-03-18 11:28:24
 */

import {Component} from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {Modal} from 'antd-mobile';

class AuthController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.token) {
      prevState.isAuth = true;
    } else {
      Modal.alert('您未登录', '前去登录？', [
        {
          text: '取消',
          onPress() {
            router.push('/');
          }
        },
        {
          text: '去登录',
          onPress() {
            router.push('/user/login');
          }
        }
      ]);
    }
    return prevState;
  }

  render() {
    let htmlArray = [];
    if (this.state.isAuth) htmlArray.push(this.props.children);
    return htmlArray;
  }
}

let mapStateToProp = state => {
  let {token} = state.application;
  return {token};
};

export default connect(mapStateToProp)(AuthController);
