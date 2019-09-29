import {Component} from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import {TabBar} from 'antd-mobile';

import styles from './tabbar.css';

class Tabbar2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noRenderContent: true,
      hidden: false,
      list: [
        {
          key: 'home',
          title: '首页',
          selected: false,
          iconName: 'manage',
          dot: false,
          cntUrl: '/'
        },
        {
          key: 'shopCar',
          title: '购物车',
          selected: false,
          iconName: 'service',
          dot: false,
          cntUrl: '/order'
        },
        {
          key: 'people',
          title: '我的',
          selected: false,
          iconName: 'people',
          dot: false,
          cntUrl: '/person'
        }
      ]
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let {pathname} = nextProps.location,
      clickIndex = 0;
    switch (pathname) {
    case '/':
      clickIndex = 0;
      break;
    case '/order':
      clickIndex = 1;
      break;
    case '/person':
      clickIndex = 2;
      break;
    default:
      clickIndex = 0;
    }

    prevState.list = prevState.list.map((bar, index) => {
      bar.selected = clickIndex === index ? true : false;
      return bar;
    });

    return prevState;
  }

  iconHtml(selected, name) {
    name = selected ? `${name}_fill` : name;
    return <i className={`iconfont icon-${name} ${styles['iconfont']}`} />;
  }

  badgeNum(key) {
    let num = 0;
    if (key === 'shopCar') {
      num = this.props.orderList.length;
    }
    return num;
  }

  render() {
    return (
      <TabBar noRenderContent={this.state.noRenderContent} hidden={this.state.hidden}>
        {this.state.list.map((bar, index) => (
          <TabBar.Item
            key={bar.key}
            title={bar.title}
            dot={bar.dot}
            badge={this.badgeNum(bar.key)}
            icon={this.iconHtml(bar.selected, bar.iconName)}
            selectedIcon={this.iconHtml(bar.selected, bar.iconName)}
            selected={bar.selected}
            onPress={() => {
              router.push(bar.cntUrl);
            }}
          />
        ))}
      </TabBar>
    );
  }
}

let mapStateToProp = state => {
  let {orderList} = state.application;
  return {orderList};
};

export default withRouter(connect(mapStateToProp)(Tabbar2));
