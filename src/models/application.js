export default {
  namespace: 'application',
  state: {
    token: '',
    dishList: [],
    orderList: []
  },
  reducers: {
    setToken(state, {token}) {
      return {...state, token};
    },
    // 添加菜谱lit
    setDishList(state, {list}) {
      let stateCopy = {...state, dishList: list};
      return stateCopy;
    },
    // 点菜
    addDish(state, {dish}) {
      // 更新菜谱list
      let dishList = Object.assign([], state.dishList);
      let dishIndex = dishList.findIndex(item => {
        return dish.id === item.id;
      });
      ++dishList[dishIndex].orderNum;

      // 更新菜单list
      let orderList = Object.assign([], state.orderList);
      let orderIndex = orderList.findIndex(item => {
        return dish.id === item.id;
      });
      if (orderIndex === -1) {
        orderIndex = orderList.length;
        orderList.push(dish);
      }
      ++orderList[orderIndex].orderNum;
      return {
        ...state,
        dishList,
        orderList
      };
    },
    // 删除菜
    removeDish(state, {id}) {
      // 更新菜谱list
      let dishList = Object.assign([], state.dishList);
      let dishIndex = dishList.findIndex(item => {
        return id === item.id;
      });

      // 更新菜单list
      let orderList = Object.assign([], state.orderList);
      let orderIndex = orderList.findIndex(item => {
        return id === item.id;
      });
      if (orderList[orderIndex].orderNum > 1) {
        --orderList[orderIndex].orderNum;
        --dishList[dishIndex].orderNum;
      } else {
        orderList.splice(orderIndex, 1);
        dishList[dishIndex].orderNum = 0;
      }

      return {...state, dishList, orderList};
    }
  }
};
