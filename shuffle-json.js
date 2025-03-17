const fs = require('fs');
const { execSync } = require('child_process');

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// List of JSON files to shuffle
const files = [
  './fannoise/stations.json',
  './whitenoise/whitenoise.json'
];

files.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Shuffle the appropriate array
    if (jsonData.station) {
      jsonData.station = shuffle(jsonData.station);
    }
    if (jsonData.noise) {
      jsonData.noise = shuffle(jsonData.noise);
    }

    // Write the shuffled array back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    console.log(`${filePath} shuffled successfully.`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

// Commit and push changes to GitHub
try {
  execSync('git add .');
  execSync('git commit -m "Shuffled JSON files"');
  execSync('git push origin main');
  console.log('Changes pushed to GitHub.');
} catch (error) {
  console.error('Error updating GitHub:', error.message);
}
