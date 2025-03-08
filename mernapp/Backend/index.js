const express = require('express');
const app = express();
const port = 5000;
const mongoDb = require("./db");
mongoDb();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // ✅ Allow DELETE
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
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
