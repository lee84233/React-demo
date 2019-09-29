/**
 * title: 已点菜单
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import {SwipeAction, List, Badge, Result} from 'antd-mobile';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  listHtml() {
    return this.props.orderList.map((dish, index) => (
      <SwipeAction
        key={dish.id}
        right={[
          {
            text: '删除一份',
            style: {
              color: 'white',
              backgroundColor: '#f4333c'
            },
            onPress: () => {
              this.props.dispatch({
                type: 'application/removeDish',
                id: dish.id
              });
            }
          },
          {
            text: '再来一份',
            style: {
              color: 'white',
              backgroundColor: '#108ee9'
            },
            onPress: () => {
              this.props.dispatch({
                type: 'application/addDish',
                dish
              });
            }
          }
        ]}
      >
        <List.Item
          thumb={dish.image}
          wrap={true}
          multipleLine={true}
          arrow="horizontal"
          extra={<Badge text={dish.orderNum} />}
          className="home-dish_item"
        >
          {dish.name}
          <List.Item.Brief>{dish.desc}</List.Item.Brief>
        </List.Item>
      </SwipeAction>
    ));
  }

  noListHtml() {
    return (
      <Result
        imgUrl="https://gw.alipayobjects.com/zos/rmsportal/GIyMDJnuqmcqPLpHCSkj.svg"
        title="未点餐"
        message="人生除了苟且，还有诗和远方，排骨和汤，烤鸭和涮肥肠，火锅和麻辣烫..."
        buttonText="去点餐"
        buttonType="primary"
        onButtonClick={() => {
          router.push('/');
        }}
      />
    );
  }

  render() {
    return <List>{this.props.orderList.length ? this.listHtml() : this.noListHtml()}</List>;
  }
}

let mapStateToProp = state => {
  let {orderList} = state.application;
  return {orderList};
};

export default connect(mapStateToProp)(Index);
