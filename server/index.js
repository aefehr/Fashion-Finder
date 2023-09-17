// server/index.js
const express = require("express");
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const cors = require('cors');
var fs = require('fs')

const PORT = process.env.PORT || 3002;

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
  };
  
app.use(cors(corsOptions));
//app.use(cors());

// Set up multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const apiKey = 'c32c9b1717409f1b12757a610d3b10aebff0ee42e204e82e0ee2542efaecd70f';
      const imageUrl = req.file.path; // Path to the uploaded image
      const data = new FormData();
      
      data.append('api_key', apiKey);
      data.append('image', fs.createReadStream(imageUrl));
  
      const config = {
        method: 'post',
        url: 'https://cloudapi.lykdat.com/v1/global/search',
        data: data,
        headers: {
          ...data.getHeaders() // Include necessary headers for FormData
        }
      };
  
      const response = await axios(config);
      console.log(JSON.stringify(response.data));
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});