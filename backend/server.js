const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors("https://social-app-five-gules.vercel.app/login"));
app.use(express.json());
app.use(express.urlrncoded({extended:true}));

app.use('/',(req,res)=>{
  res.send({
    activeStatus:true,
    error:false,
  })
})
app.use("/api/login", require("./routes/auth.js"));
app.use("/api/posts", require("./routes/post.js"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
