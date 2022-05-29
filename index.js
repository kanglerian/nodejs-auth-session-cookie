const express = require('express');
const app = express();
const port = 3000;

const expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

var auth = require('./middlewares/auth');

const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(session({secret:'ayumiwedding123'}));

const account = [
    {
        username: "admin",
        password: "admin"
    }
];

app.get('/', (req, res) => {
    res.render('login', {
        layout: 'layouts/template'
    });
});

app.get('/dashboard', auth.checkLogin, (req, res) => {
    res.render('dashboard', {
        layout: 'layouts/template'
    });
});

app.post('/login', (req, res) => {
    session_store = req.session;
    if(req.body.username == "" || req.body.password == ""){
        res.redirect('/');
    }else{
        if(account.length > 0){
            session_store.username = account[0].username;
            session_store.logged_in = true;
            res.redirect('/dashboard');
        }else{
            res.redirect('/');
        }
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            alert("Gagal logout!");
        }else{
            res.redirect('/');
        }
    });
});

app.listen(port, (req, res) => {
    console.log(`Apps run on http://localhost:${port}`);
});