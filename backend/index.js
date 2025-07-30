import path from 'path'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });
import express from 'express';
import bodyParser from 'body-parser';
import pg from "pg";
import fileUpload from 'express-fileupload';
import FormData from 'form-data';
import fs from 'fs';
const tempDir = './temp';
if (!fs.existsSync(tempDir)){
    fs.mkdirSync(tempDir);
}
const app=express();
app.use(fileUpload());
import axios from 'axios';
import cors from 'cors';
app.use(cors());
const db= new pg.Client({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASSWORD,
  port: parseInt(process.env.DBPORT,10),
});

const PORT=parseInt(process.env.PORT,10);
console.log(PORT);
db.connect();
app.use(express.static(path.join(__dirname, '../my-app/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try{
    const existingUser = await db.query("SELECT * FROM users WHERE name = $1", [username]);
    if (existingUser.rows.length > 0) {
      console.log('User already exists');
     res.status(400).json({status:'400', message: 'User already exists,login insted'});
    }
    else{
    await db.query("INSERT INTO users(name,password) VALUES($1,$2)",[username,password]);
    res.status(200).json({status:'200', message: 'Signup successful' });
  }
}
  catch(error){
    res.status(500).json({status:'500', message: error.message});
  }
});
app.post("/login",async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query("SELECT password FROM users WHERE name = $1", [username]);
    if (result.rows.length > 0) {
      if (result.rows[0].password === password) {
        res.status(200).json({ status: '200', message: 'Login successful' });
      } else {
        res.status(400).json({ status: '400', message: 'Invalid Username/Password' });
      }
    } else {
      res.status(401).json({ status: '401', message: 'User does not exist,Sign-up instead' });
    }
  } catch (error) {
    res.status(500).json({ status: '500', message: error.message });
  }
});
app.post('/predict', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ status: '400', message: 'No image uploaded' });
    }
    console.log("prediction");
    const imageFile = req.files.image;
    const tempPath = './temp/' + imageFile.name;
    await imageFile.mv(tempPath);
    const form = new FormData();
    form.append('image', fs.createReadStream(tempPath));

    // Send request to  API
    const response = await axios.post('http://127.0.0.1:6000/predict', form, {
      headers: form.getHeaders()
    });
    fs.unlinkSync(tempPath);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ status: '500', message: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

