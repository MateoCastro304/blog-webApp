
import express from 'express'
import bodyParser from 'body-parser'

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('index.ejs');
})

app.get('/create', (req,res) => {
    res.render('create.ejs');
})

app.get('/about', (req,res) => {
    res.render('about.ejs');
})

app.listen(port, ()=> {
    console.log('Listen on Port: ' + port);
});