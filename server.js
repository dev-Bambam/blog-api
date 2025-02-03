import dotenv from 'dotenv'
dotenv.config({path: './config.env'})
import app from './app.js'
import { DBconnection } from './config/db.js';

const port = process.env.PORT || 3000;
DBconnection()
app.listen(port, () => {
   console.log(`Blog API listening at http://localhost:${port}`);
});
