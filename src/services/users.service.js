import axios from "axios";
const API_URL = "http://magento245.local/rest/V1/customers";

const getAllUsers = () => {
  let data = JSON.stringify({
    "search_criteria": {
        "filter_groups": [
            {
                "filters": [
                    {
                        "field": "email",
                        "value": "%",
                        "condition_type": "like"
                    }
                ]
            }
        ]
    }
});
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: API_URL,
    headers: { 
      'Content-Type': 'application/json', 
      "Authorization": "Bearer " + localStorage.getItem('user')
    },

    data : data
  };
return axios
    .request(config)
    .then((response) => {
      console.log(response);

      return response.data;
    });
};

export default getAllUsers;