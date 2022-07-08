import axios from "axios";
const Axios = axios.create({
  baseURL: "https://binlearn.neputertech.com/api/",
  timeout: 1000,
});
export default Axios;
