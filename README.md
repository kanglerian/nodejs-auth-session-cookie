# NodeJS Authentication with Session & Cookie

Ini adalah source code untuk aktivitas login di Express JS menggunakan Session & Cookie. Ada beberapa dependencies yang terlebih dahulu harus di install diantaranya:

1. nodemon@2.0.16
2. express@4.17.1
3. ejs@3.1.6
4. cookie-parser@1.4.6
5. express-ejs-layouts@2.5.0
6. express-session@1.17.3

## Inisialisasi

Disini kita perlu untuk menginisialisasi dependenciesnya.

```js
/* Inisialisasi ExpressJS dengan Port */
const express = require('express');
const app = express();
const port = 3000;

/* Inisialisasi Express Layouts dan View Engine */
const expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.use(expressLayouts);

/* Inisialisasi Static & Url Encoded */
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

/* Inisialisasi Authentication atau Middleware */
var auth = require('./middlewares/auth');

/* Inisialisasi Session & Cookie Parser */
const session = require('express-session');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(session({secret:'ayumiwedding123'}));

/* Inisialisasi Apps */
app.listen(port, (req, res) => {
    console.log(`Apps run on http://localhost:${port}`);
});
```

## Set Route Login

Disini kita akan membuat sebuah route untuk membuka halaman login dan untuk proses login.

```js
/* membuat halaman login */
app.get('/', (req, res) => {
    res.render('login', {
        layout: 'layouts/template'
    });
});

/* data dummy untuk username & password */
const account = [
    {
        username: "admin",
        password: "admin"
    }
];

/* proses login dan menyimpan session */
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
```
## Set Route Dashboard

Disini kita akan membuat sebuah route `dashboard` yang nantinya tidak akan bisa dibuka jika belum melakukan proses login.

```js
/* membuat route dashboard dan menambahkan authentication */
app.get('/dashboard', auth.checkLogin, (req, res) => {
    res.render('dashboard', {
        layout: 'layouts/template'
    });
});
```

## Set Route Logout

Disini kita akan membuat sebuah route `logout` yang nantinya akan menghapus session.

```js
/* menghapus session menggunakan destroy */
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            alert("Gagal logout!");
        }else{
            res.redirect('/');
        }
    });
});
```

## Membuat Middlewares Authentication

Disini kita akan membuat sebuah middlewares yang nantinya akan melakukan pemeriksaan sebelum mengakses sebuah route yang dipasang middleware ini.

```js
const Auth = {
    checkLogin: (req, res, next) => {
        if(!req.session.logged_in){
            return res.redirect('/');
        }
        next();
    },
    checkStatus: (req, res, next) => {
        if(!req.session.status){
            return res.redirect('/');
        }
        next();
    }
};

module.exports = Auth;
```
