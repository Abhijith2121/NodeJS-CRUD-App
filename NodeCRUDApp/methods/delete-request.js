const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];

    if (baseUrl === '/api/movies/') {
        try {
            const filePath = path.join(__dirname, '..', 'data', 'movies.json');
            const existingData = fs.readFileSync(filePath, 'utf-8');
            const movies = JSON.parse(existingData);

            const movieIndex = movies.findIndex(movie => movie.id === id);
            if (movieIndex === -1) {
                res.writeHead(404, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ title: "Not Found", message: "Movie not found" }));
                return;
            }

            const updatedMovies = movies.filter(movie => movie.id !== id);
            fs.writeFileSync(filePath, JSON.stringify(updatedMovies), 'utf-8');

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Deleted successfully" }));
        } catch (err) {
            console.log(err);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ title: "Internal Server Error", message: "An error occurred while deleting the movie" }));
        }
    } 
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
};
