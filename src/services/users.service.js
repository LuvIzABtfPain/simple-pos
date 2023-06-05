import axios from "axios";
const API_URL = "http://magento245.local/rest/V1/customers/search?searchCriteria[filterGroups][0][filters][0][field]=firstname&searchCriteria[filterGroups][0][filters][0][value]=%&searchCriteria[filterGroups][0][filters][0][condition_type]=like";

const getAllUsers = () => {
let adminToken = localStorage.getItem('user');
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: API_URL,
    headers: { 
      Authorization: `Bearer ${adminToken}`,
    },
  };
return axios
    .request(config)
    .then((response) => {
      return response.data;
    });
};

export default getAllUsers;