const fs  = require('fs');
const path = require('path');

module.exports = (data) => {
    try {
        const filePath = path.join(__dirname, '..', 'data', 'movies.json');
        const existingData = fs.readFileSync(filePath, 'utf-8');
        
        const newData = JSON.parse(existingData).concat(data); 
        fs.writeFileSync(filePath, JSON.stringify(newData), 'utf-8');
    } catch (err) {
        console.log(err);
    }
};
