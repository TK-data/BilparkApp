const endpoint = 'http://10.224.217.141:1337/api/User';
// Ikke skriv om emil sin kode
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
