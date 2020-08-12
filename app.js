const express = require("express");
const path = require('path');
const fs = require("fs");
const app = express();
const port = 80;

//For serving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded())
//set the template engine as pug
app.set('view engine', 'pug')
//set the views directory
app.set('views', path.join(__dirname, 'views'))
// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/pk', (req, res) => {
    const params = {}
    res.status(200).render('pk.pug', params);
})
app.post('/', (req, res) => {
    name = req.body.name
    age = req.body.age
    number = req.body.number
    mail = req.body.mail
    let outputtoWrite = `The name of the client is:${name},age:${age},contact number:${number} and mail is:${mail}`
    fs.writeFileSync('output.txt', outputtoWrite);
    const params = { 'message': 'Your form had been submitted!' }
    res.status(200).render('contact.pug', params);
    console.log(req.body)
})

app.listen(port, () => {
    console.log(`The application started successfully on port: ${port}`);
});