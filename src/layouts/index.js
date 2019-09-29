/**
 * title: 鲁菜馆
 */
import React, {Component} from 'react';
import Tabbar from '../components/tabbar';

import styles from './index.css';

class BasicLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 显示Tabar的页面
      tabbarPage: ['/', '/order', '/person']
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  // 显示 Tabbar
  showTabbar() {
    if (this.state.tabbarPage.includes(this.props.location.pathname)) {
      return true;
    }
    return false;
  }

  // tabPanel className
  tabPanelClassName() {
    let className = ['weui-tab__panel'];
    if (!this.showTabbar()) className.push(styles['weui-tab__panel']);
    return className.join(' ');
  }

  render() {
    return (
      <div className="page">
        <div className="page__bd">
          <div className={this.tabPanelClassName()}>{this.props.children}</div>
          {this.showTabbar() ? <Tabbar /> : ''}
        </div>
      </div>
    );
  }
}

export default BasicLayout;
