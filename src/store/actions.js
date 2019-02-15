import http from '../http/http'

const actions = {
  getRedPackCount({commit}, params) {
    http.post('api/teamredpack/redpackNum', params).then(data => {
      commit('redPackNum', data)
    })
  }
};

export default actions