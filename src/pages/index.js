/**
 * title: 菜单列表
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {List, Badge, Toast} from 'antd-mobile';

import {getDishList} from '../service/dish';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    // 获取列表
    if (!this.props.dishList.length) {
      // start loading
      Toast.loading('加载中', 0);
      getDishList('dish/list').then(res => {
        let list = res.code === 200 ? res.data : [];
        list = list.map(dish => {
          dish.orderNum = 0;
          return dish;
        });

        this.props.dispatch({
          type: 'application/setDishList',
          list
        });

        // end loading
        Toast.hide();
      });
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  // 点菜
  orderFun(index) {
    let dish = {...this.props.dishList[index]};
    this.props.dispatch({
      type: 'application/addDish',
      dish
    });
  }

  render() {
    return (
      <List>
        {this.props.dishList.map((dish, index) => (
          <List.Item
            key={dish.id}
            thumb={dish.image}
            wrap={true}
            multipleLine={true}
            arrow="horizontal"
            onClick={this.orderFun.bind(this, index)}
            extra={<Badge text={dish.orderNum} />}
            className="home-dish_item"
          >
            {dish.name}
            <List.Item.Brief>{dish.desc}</List.Item.Brief>
          </List.Item>
        ))}
      </List>
    );
  }
}

// redux
let mapStateToProp = state => {
  let {dishList, orderList} = state.application;
  return {dishList, orderList};
};

export default connect(mapStateToProp)(Home);
