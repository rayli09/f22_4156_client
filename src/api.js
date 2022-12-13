import axios from "axios";

const END_POINT = 'http://127.0.0.1:5000';

export const request = axios.create({
    baseURL: END_POINT,
});
// set every request headers with token
request.interceptors.request.use((req) => {
    // skip existed Authorization injection
    if (req.headers.Authorization) {
      return req;
    }
    const token = JSON.parse(localStorage.getItem("userData"))?.token || "";
    if (token) {
      req.headers = {
        Authorization: token,
      };
    }
    return req;
});

export const APIs = {
    async getProfile() {
        // fetch current user's profile
        try {
            const rsp = await request.get('/profile');
            return rsp.data;
        } catch (e) {
            console.error(e);
            return e;
        }
    },
    async getFeed() {
        try {
            const rsp = await request.get('/feed');
            return rsp.data;
        } catch (e) {
            console.error(e);
            return e;
        }
    },
    async getTransfers() {
        // get user's all transfers
        try {
            const rsp = await request.get('/transfer');
            return rsp.data;
        } catch (e) {
            console.error(e);
            return e;
        }
    }
}


