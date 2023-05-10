import axios from "axios";

// const API_URL = "https://magento246.com/rest/all/V1/integration/admin/token";
const API_URL = "http://magento245.local/rest/all/V1/integration/admin/token";

const login = (username, password) => {
  let data = JSON.stringify({
    "username": username,
    "password": password
  });
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: API_URL,
    headers: { 
      'Content-Type': 'application/json', 
    },
    data : data
  };
return axios
    .request(config)
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  login,
  logout,
};