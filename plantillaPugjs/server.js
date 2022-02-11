const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Contenedor = require('../Ej2')
const objContenedor = new Contenedor();
const datos =   objContenedor.getAll()
const PORT = 8080;
const app = express();


//MIDDLEWEARS
app.use(morgan('tiny'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))

//ENGINE
app.set('views','views');
app.set('view engine', 'pug');


app.get('/', (req, res ) => {
    res.render('formulario.pug', {titulo: 'INGRESAR PRODUCTO'})
})

app.get('/productos', (req,res) => {
    res.render('productos.pug',{datos:datos})
})

app.post('/productos', (req, res) => {
    const lastId = datos[datos.length-1].id;
    const data = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        id:lastId+1
    }
    datos.push(data)
    res.redirect('/')
    
})





const server = app.listen(PORT, () => {
    console.log('Escuchando en el puerto' + PORT);
})

server.on('err', (error) => {
    console.log(error)
})





