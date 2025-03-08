const express = require('express');
const app = express();
const port = 5000;
const mongoDb = require("./db");
mongoDb();

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://to-do-list-ezu6.onrender.com"
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // ✅ Allows cookies/session

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // ✅ Handle preflight requests
  }

  next();
});

  

app.use(express.json());  
app.use('/api', require("./Routes/Createuser"));  
app.use('/api', require("./Routes/ListData"));

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
