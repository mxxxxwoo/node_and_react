const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 5000

mongoose
    .connect('mongodb+srv://admin:1234@boilerplate-ho4sm.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))

app.get('/', (req, res) => res.send('hello'))
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
