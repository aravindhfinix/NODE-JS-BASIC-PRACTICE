const express = require('express')
const { pinata } = require('./pinata');
const app = express()


app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/api/v1/pinata', pinata)

app.get('/api/v1/test',(req,res)=>{res.send('working')})

/**
 * 404 not found exception handler
 */
app.use((req, res, next) => {
    return res.send('Requested route not found', 404);
});

app.listen(5000, () => { console.log('sever started on port 5000') })