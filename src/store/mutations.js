const mutations = {
  changeMsg(state) {
    state.msg = 'msg is changed'
  },
  addNum(state) {
    state.num++
  },
  redPackNum(state, data) {
    state.redPackNum = data;
    console.log(state.redPackNum)
  }
};

export default mutations;