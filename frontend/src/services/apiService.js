import {getAccessToken} from '@/lib/helpers';

const apiService = {
  get: async function (url) {
    console.log ('get', url);
    const accessToken = getAccessToken ();
    return new Promise ((resolve, reject) => {
      fetch (`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then (response => response.json ())
        .then (json => {
          resolve (json);
        })
        .catch (error => {
          reject (error);
        });
    });
  },

  postUpdate: async function (url, data, method) {
    const accessToken = getAccessToken ();
    return new Promise ((resolve, reject) => {
      fetch (`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
        method: method,
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then (response => response.json ())
        .then (json => {
          console.log ('Reponse: ', json);
          resolve (json);
        })
        .catch (error => {
          reject (error);
        });
    });
  },

  postFile: async function (url, data, method) {
    const accessToken = getAccessToken ();
    return new Promise ((resolve, reject) => {
      fetch (`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
        method: method,
        body: data,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then (response => response.json ())
        .then (json => {
          console.log ('Reponse: ', json);
          resolve (json);
        })
        .catch (error => {
          reject (error);
        });
    });
  },
  delete: async function (url) {
    const accessToken = getAccessToken ();
    return new Promise ((resolve, reject) => {
      fetch (`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }).catch (error => {
        reject (error);
      });
    });
  },
  deleteBulk: async function (url, data) {
    const accessToken = getAccessToken();
    console.log("delete", url, data);
    return new Promise((resolve, reject) => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json", // Set Content-Type header
            },
            body: JSON.stringify(data), // Use the data parameter directly
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting books');
            }
            return response.json();
        })
        .then(data => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
},


  postWithoutToken: async function (url, data) {
    console.log ('post', url, data);

    return new Promise ((resolve, reject) => {
      fetch (`${process.env.NEXT_PUBLIC_API_HOST}/${url}`, {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then (response => response.json ())
        .then (json => {
          console.log ('Response:', json);

          resolve (json);
        })
        .catch (error => {
          reject (error);
        });
    });
  },
};

export default apiService;
