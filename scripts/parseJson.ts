const fs = require('fs');
const path = require('path');

function parseRecipeData(){
    try {
        const filePath = path.join(__dirname, '../data/data.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(jsonData);
        return data;
    } catch (error) {
        console.error('Error parsing recipe data:', error);
        return null;
    }
}

module.exports = parseRecipeData;