
/* you need to manually change this IP during production.
Gonna make a config file and make a production one that will point
to the actual host of our backend.
*/
const endpoint = 'http://10.22.23.243:1337/api/User';

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

  static postUserExample() {
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Address: 'Krok81',
        Fname: 'Tom',
        Lname: 'Buttonpress',
        FuelDay: 2,
        CompanyID: 123123,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default UserService;
