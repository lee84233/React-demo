/**
 * title: 页面未找到
 */

import {Component} from 'react';
import router from 'umi/router';
import {Result, Icon} from 'antd-mobile';

class Error_404 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '404 page.'
    };
  }

  render() {
    return (
      <Result
        img={
          <Icon type="cross-circle-o" style={{width: '60px', height: '60px', fill: '#F13642'}} />
        }
        title="页面未找到"
        message="人生除了苟且，还有诗和远方，排骨和汤，烤鸭和涮肥肠，火锅和麻辣烫..."
        buttonText="去点餐"
        buttonType="primary"
        onButtonClick={() => {
          router.push('/');
        }}
      />
    );
  }
}

export default Error_404;
