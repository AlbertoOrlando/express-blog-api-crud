const express = require("express")
const app = express()
const port = 3000
const postsRouter = require("./routers/posts")
const errorHandler = require("./middleware/errorHandler")
const notFound = require("./middleware/notFound")


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Home del mio Blog")
})

app.use("/posts", postsRouter)

app.use(errorHandler)

app.use(notFound)


app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`);
})