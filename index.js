const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

dotenv.config();
const PORT = process.env.PORT || 9000
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
  console.log("Mongo is connected!");
}).catch((e) => {
    console.log(e)
})

app.use("/api/pins", pinRoute)
app.use("/api/users", userRoute)



app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT} !!!`);
});