const endpoint = 'http://10.22.18.227:1337/api/User';

class UserService {
  static getUsers() {
    return fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static postUserExample(value) {
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.status;
        } else if (response.status !== 201) {
          if (JSON.parse(response._bodyText).invalidAttributes.Email) {
            return { Error: 'Email' };
          }
          return response.status;
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default UserService;
