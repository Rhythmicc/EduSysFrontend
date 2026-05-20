import axios from 'axios'

const request = (opts) => {
  return axios({
    url: opts.url || opts.uri,
    method: opts.method || 'GET',
    data: opts.json !== true ? opts.json : undefined,
    headers: opts.headers
  }).then(r => r.data)
}

export default request
