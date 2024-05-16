const fs = require('fs');
const path = require('path');
const bodyParser = require("../util/body-parser");

module.exports = async (req, res) => {
    let id = req.url.split("/")[3];

    if (req.url.startsWith("/api/movies/") && id) {
        try {
            const body = await bodyParser(req);

            const filePath = path.join(__dirname, '..', 'data', 'movies.json');
            const existingData = fs.readFileSync(filePath, 'utf-8');
            const movies = JSON.parse(existingData);

            const index = movies.findIndex((movie) => movie.id === id);
            if (index === -1) {
                res.statusCode = 404;
                res.write(JSON.stringify({ title: "Not Found", message: "Movie not found" }));
                res.end();
                return;
            }

            movies[index] = { id, ...body };

            fs.writeFileSync(filePath, JSON.stringify(movies), 'utf-8');

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(movies[index]));
        } catch (err) {
            console.log(err);
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                title: "Validation Failed",
                message: "Request body is not valid",
            }));
        }
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
};
