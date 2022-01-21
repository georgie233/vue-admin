//跨域代理前缀
const API_PROXY_PREFIX = 'http://127.0.0.1:6363/api'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
    LOGIN: `${BASE_URL}/admin/login`,
    INFO: `${BASE_URL}/admin/info`,
    ROUTES: `${BASE_URL}/admin/routes`,
    UPLOAD_FILE: `${BASE_URL}/admin/uploadFile`,
}
