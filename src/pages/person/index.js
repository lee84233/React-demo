/**
 * title: 个人中心
 * Routes:
 *   - ./src/routes/auth.js
 */

import React, {Component} from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {List, WhiteSpace, WingBlank, Icon, Flex, Button, Modal} from 'antd-mobile';

import styles from './index.css';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  imgHtml(className, color = '#108ee9') {
    return <i className={`iconfont icon-${className} ${styles['img-icon']}`} style={{color}} />;
  }

  logout() {
    Modal.alert('提示信息', '确认登出？', [
      {
        text: '取消'
      },
      {
        text: '确认',
        onPress: () => {
          router.push('/');
          this.props.dispatch({
            type: 'application/setToken',
            token: ''
          });
        }
      }
    ]);
  }

  render() {
    return (
      <div>
        <WhiteSpace size="xl" />
        <Flex justify="center">
          <Flex.Item />
          <Flex.Item style={{textAlign: 'center'}}>
            <Icon type="loading" size="lg" />
            <p>爱的魔力转圈圈</p>
          </Flex.Item>
          <Flex.Item />
        </Flex>
        <WhiteSpace size="xl" />
        <List>
          <List.Item
            thumb={this.imgHtml('financial_fill', '#2CD7AA')}
            arrow="horizontal"
            onClick={() => {}}
          >
            支付
          </List.Item>
        </List>
        <WhiteSpace />
        <List>
          <List.Item
            thumb={this.imgHtml('like_fill', '#f13642')}
            arrow="horizontal"
            onClick={() => {}}
          >
            收藏
          </List.Item>
          <List.Item
            thumb={this.imgHtml('businesscard_fill')}
            arrow="horizontal"
            onClick={() => {}}
          >
            相册
          </List.Item>
          <List.Item thumb={this.imgHtml('coupons_fill')} arrow="horizontal" onClick={() => {}}>
            卡包
          </List.Item>
          <List.Item
            thumb={this.imgHtml('emoji_fill', '#FFC600')}
            arrow="horizontal"
            onClick={() => {}}
          >
            表情
          </List.Item>
        </List>
        <WhiteSpace />
        <List>
          <List.Item thumb={this.imgHtml('setup_fill')} arrow="horizontal" onClick={() => {}}>
            设置
          </List.Item>
        </List>
        <WhiteSpace size="xl" />
        <WingBlank>
          <Button type="warning" onClick={this.logout.bind(this)}>
            退出登录
          </Button>
        </WingBlank>
      </div>
    );
  }
}

let mapStateToProps = state => {
  let {token} = state.application;
  return {token};
};

export default connect(mapStateToProps)(Index);
