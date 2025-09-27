const fs = require('fs');
const path = require('path');

const folder = './';
const outputFile = 'streams_all.json';

const files = [
  'streams_1-100.json',
  'streams_101-200.json',
  'streams_201-300.json',
  'streams_301-400.json',
  'streams_401-500.json',
  'streams_501-600.json',
  'streams_601-700.json',
  'streams_701-800.json',
  'streams_801-900.json',
  'streams_901-1000.json'
];

let merged = [];

for (const file of files) {
  const fullPath = path.join(folder, file);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  
  if (Array.isArray(data)) {
    merged = merged.concat(data);
  } else {
    merged.push(data);
  }
}

fs.writeFileSync(outputFile, JSON.stringify(merged, null, 2), 'utf-8');
console.log(`Merged ${files.length} files into ${outputFile}`);