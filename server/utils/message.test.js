var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'test@test.com';
    var text = 'This is a test';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'test@test.com';
    var latitude = '45.8989568';
    var longitude = '-64.3678208';
    var url = 'https://www.google.com/maps?q=45.8989568,-64.3678208';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});

  });
});