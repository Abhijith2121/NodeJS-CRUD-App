const fs = require("fs")
const fsPromise=fs.promises
const path=require("path")
module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  console.log(id,typeof id);
  const filePath= path.join(__dirname,"..","data","movies.json")
  console.log(__dirname);
  console.log(filePath);
  const movies = JSON.parse(fs.readFileSync(filePath,'utf-8') )
  
    if (req.url === "/api/movies") {
     
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify(movies));
      res.end();
    } 
    else if ((id)) {
      res.setHeader("Content-Type", "application/json");
      let filteredMovie = movies.filter((movie) => {
        return movie.id === id;
      });
  
      if (filteredMovie.length > 0) {
        res.statusCode = 200;
        res.write(JSON.stringify(filteredMovie));
        res.end();
      } else {
        res.statusCode = 404;
        res.write(
          JSON.stringify({ title: "Not Found", message: "Movie not found" })
        );
        res.end();
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
    }
  };