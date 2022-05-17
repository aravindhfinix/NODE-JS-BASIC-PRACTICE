const express=require('express')
const axios=require('axios')
const app=express()

axios.get('http://google.com')
.then(results=>{
    console.log(results.data)
})
.catch(console.error)