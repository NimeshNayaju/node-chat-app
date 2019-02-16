const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Harke',
      room: 'Bhaktapur'
    }, {
      id: '2',
      name: 'Dalle',
      room: 'Bhaktapur'
    }, {
      id: '3',
      name: 'Vunti',
      room: 'Kathmandu'
    }]      
  });

  it('should add a new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Melon',
      room: 'Kathmandu'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '3';
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '99';
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    var userId = '2';
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find any user', () => {
    var userId = '100';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  }); 

  it('should return users in room Bhaktapur', () => {
    var userList = users.getUserList('Bhaktapur');

    expect(userList).toEqual(['Harke', 'Dalle']);
  });

  it('should return users in room Kathmandu', () => {
    var userList = users.getUserList('Kathmandu');

    expect(userList).toEqual(['Vunti']);
  });

});