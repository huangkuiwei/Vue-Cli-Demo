import axios from 'axios'

const http = axios.create({
  timeout: 30 * 1000
});

const handleError = error => {
  setTimeout(() => {
    if (!error.handled) {
      alert(error.message)
    }
  }, 0);
  return Promise.reject(error)
};

http.interceptors.response.use(response => {
  if (response.data.code === 0) {
    return response.data.datas
  }
  return handleError(response.data)
}, error => {
  return handleError({
    code: -1,
    message: error.message
  })
});

export default http