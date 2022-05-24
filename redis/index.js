const express = require('express');
const axios = require('axios');
const redis = require('redis');
const app = express();
const port = 4000;
const client = redis.createClient();

client.on("error", (error) => {
 console.error(error);
});

client.on("connect", (error) => {
  console.log('connected');
 });
app.get('/data/:searchtext', (req, res) => {
 try {
   const searchtext = req.params.searchtext;
   client.get(searchtext, async (err, data) => {
     if (data) {
        return res.status(200).send({
         error: false,
         message: `Data for ${searchtext} from the cache`,
         data: JSON.parse(data)
       })
     } else { 
         const recipe = await axios.get(`https://jsonplaceholder.typicode.com/${searchtext}`);
         client.setex(searchtext, 1020, JSON.stringify(recipe.data));
         return res.status(200).send({
           error: false,
           message: `Data for ${searchtext} from the server`,
           data: recipe.data
         });
     }
   }) 
 } catch (error) {
     console.log(error)
 }
});

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});