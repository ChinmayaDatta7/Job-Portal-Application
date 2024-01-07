export class UserModel {
  constructor(name, email, password, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  static createUser(user) {
    users.push(user);
    return user;
  }

  static isValidUser(email, password) {
    return users.find(
      (user) => user.email === email && user.password === password
    );
  }

  static getUsers() {
    return users;
  }

  static getUserById(id) {
    return users.find((user) => user.id === id);
  }

  static getUserByEmail(email) {
    return users.find((user) => user.email === email);
  }

  static deleteUserById(id) {
    users = users.filter((user) => user.id !== id);
    return;
  }
}

var users = [
  new UserModel("Chinmaya", "lsrschinmayat@gmail.com", "123456", "1"),
];
