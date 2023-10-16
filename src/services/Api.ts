import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:44379/api/",
});

export default Api;
