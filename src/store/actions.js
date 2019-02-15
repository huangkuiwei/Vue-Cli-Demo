import http from 'axios'

const actions = {
  getRedPackCount({commit}) {
    http.post('api/teamredpack/redpackNum', {
      activityCode: 'teamredpack'
    }).then(data => {
      commit('redPackNum', data)
    })
  }
};

export default actions