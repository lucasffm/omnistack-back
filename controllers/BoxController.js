const Box = require('../config/models/Box');

class BoxController {
  async store(req, res) {
    const box = await Box.create({ title: 'Rocketseat' });
    return res.send(box);
  }
}

module.exports = new BoxController();
