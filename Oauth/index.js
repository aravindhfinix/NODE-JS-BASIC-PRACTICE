const express=require('express');
const passport=require('passport');
const app=express()
require('./oauth2')

app.get( '/',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/log', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));


app.get('/protected', (req, res) => {
  res.send(`Hello`);
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

const port=process.env.PORT||3000
app.listen(port,()=>{
console.log(`server running at port ${port}`)
})
