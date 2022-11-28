import axios from "axios";
import { END_POINT } from './utils';

// this initiates a connection instance as web clinet
// talking to the flask server.
// use this for session persistence.
export default axios.create({
    baseURL: END_POINT
  });
