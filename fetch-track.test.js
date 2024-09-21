const { parseTrainData } = require('./fetch-track');
const fs = require('fs');
const path = require('path');
const fixture1 = JSON.parse(fs.readFileSync(path.join(__dirname, 'track-data.json'), 'utf8'));

describe('parseTrainData', () => {
  it('should find a track associated with NYP', () => {
    const result = parseTrainData(fixture1);
    expect(result).toEqual(15);
  });
});