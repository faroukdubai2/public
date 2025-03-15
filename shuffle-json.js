const fs = require('fs');

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Read the JSON file
const filePath = './fannoise/stations.json';
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Shuffle the stations array
jsonData.station = shuffle(jsonData.station);

// Write the shuffled array back to the JSON file
fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

console.log('JSON list shuffled successfully.');
