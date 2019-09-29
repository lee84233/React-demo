/**
 * title: 登录
 */
import {Component} from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {List, InputItem, WingBlank, Button, Modal, WhiteSpace, Flex, Icon} from 'antd-mobile';

import styles from './user.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      password: '',
      loginBtnStatus: {
        text: '登录',
        loading: false,
        disabled: false
      }
    };
  }

  onChange(type, value) {
    this.setState({
      [type]: value
    });
  }

  login() {
    let activeStyle = {
      text: '登录',
      loading: false,
      disabled: false
    };
    let disabledStyle = {
      text: '登录中',
      loading: true,
      disabled: true
    };
    this.setState({
      loginBtnStatus: disabledStyle
    });

    if (this.state.phone === '138 0000 0000' && this.state.password === '666666') {
      this.props.dispatch({
        type: 'application/setToken',
        token: 'sui bian xie ge token.'
      });
      router.push('/person');
    } else {
      Modal.alert('提示信息', '手机号：13800000000，密码：666666', [
        {
          text: '确定',
          onPress: () => {
            this.setState({
              loginBtnStatus: activeStyle
            });
          }
        }
      ]);
    }
  }

  render() {
    return [
      <WhiteSpace key="none1" size="xl" />,
      <Flex key="appInfo" justify="center">
        <Flex.Item />
        <Flex.Item style={{textAlign: 'center'}}>
          <Icon type="loading" size="lg" />
          <p>爱的魔力转圈圈</p>
        </Flex.Item>
        <Flex.Item />
      </Flex>,
      <WhiteSpace key="none2" size="xl" />,
      <List key="loginForm">
        <InputItem
          type="phone"
          placeholder="请输入手机号"
          clear
          value={this.state.phone}
          onChange={this.onChange.bind(this, 'phone')}
        >
          手机号
        </InputItem>
        <InputItem
          type="password"
          placeholder="请输入密码"
          clear
          maxLength="6"
          value={this.state.password}
          onChange={this.onChange.bind(this, 'password')}
        >
          密码
        </InputItem>
      </List>,
      <WingBlank key="loginBtn" size="lg" className={styles.loginBtnCnt}>
        <Button
          type="primary"
          loading={this.state.loginBtnStatus.loading}
          disabled={this.state.loginBtnStatus.disabled}
          onClick={this.login.bind(this)}
        >
          {this.state.loginBtnStatus.text}
        </Button>
      </WingBlank>
    ];
  }
}

let mapStateToProps = state => {
  let {token} = state.application;
  return {token};
};

export default connect(mapStateToProps)(Login);
