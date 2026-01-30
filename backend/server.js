const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;
// app.use(cors("https://social-app-five-gules.vercel.app"));
dotenv.config();
app.use(cors({
  origin: "https://social-app-five-gules.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// app.use('/',(req,res)=>{
//   res.send({
//     activeStatus:true,
//     error:false,
//   })
// })
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/posts", require("./routes/post.js"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
