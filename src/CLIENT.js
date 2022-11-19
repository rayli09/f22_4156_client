import axios from "axios";
// this initiates a connection instance as web clinet
// talking to the flask server.
// use this for session persistence.
export default axios.create({
    baseURL: 'http://127.0.0.1:5000/'
  });
