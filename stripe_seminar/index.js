const express = require('express')
const app = express()
const chalkRainbow = require('chalk-rainbow')
const striperouter = require('./routes/stripe-routes')
const chalk = require('chalk')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => { res.send('welcome to stripe') })
app.use('/stripe', striperouter)

app.use((req, res, next) => {
    res.status(404).json({ error: "requested page not found" })
});

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(chalkRainbow("stripe seminar project is started...."))
    console.log(chalk.greenBright(`server running at port ${port}....`))
})
