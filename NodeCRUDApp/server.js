const http = require("http")
require('dotenv').config()

let movies = require("./data/movies.json")
const getReq = require("./methods/get-request")
const postReq = require("./methods/post-request")
const deleteReq = require("./methods/delete-request")
const putReq = require("./methods/put-request")
const PORT = process.env.PORT || 5001

const server = http.createServer((req,res)=>{
    const method = req.method
    req.movies=movies
    switch(method){
        case "GET":
            getReq(req,res)
            break;
        case "POST":
            postReq(req,res)
            break;
        case "PUT":
            putReq(req,res)
            break;
        case "DELETE":
            deleteReq(req,res)
            break;
        default:
            res.setHeader('Content-Type','application/JSOn')
            res.statusCode=404
            res.write=JSON.stringify({message:"Not found"})
    }
})

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})