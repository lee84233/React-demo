export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
    initialState: {}
    // plugins: [require('dva-logger')()]
  }
};
