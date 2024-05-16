const express = require("express");
const {router : userRouter} = require("./routes/userRoute");

const app = express();

const port = 8080;
app.use(express.json());

app.use("/v1",userRouter);

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
});

app.get("/health", (req, res) => {
    return res.status(200).json({"message":"server is running"});
})