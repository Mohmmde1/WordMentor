// import { getAccessToken } from "../lib/actions";

const apiService = {
  postWithoutToken: async function (url, data) {
    console.log("post", url, data);

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default apiService;
