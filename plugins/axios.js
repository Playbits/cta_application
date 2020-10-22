/* eslint-disable */

export default function ({ $axios, auth, redirect }) {
  $axios.setHeader('Content-Type', 'application/json', ['post'])
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      return error.response
    }
  })
}
