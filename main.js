const express = require("express");
const {router : userRouter} = require("./routes/userRoute");
const {router : contactRouter} = require("./routes/contactRoute");

const app = express();

const port = process.env.PORT;
app.use(express.json());

app.use("/v1",userRouter);
app.use("/v1",contactRouter)

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
});

app.get("/health", (req, res) => {
    return res.status(200).json({"message":"server is running"});
})