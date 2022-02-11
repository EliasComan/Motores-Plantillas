const handlebars = require('express-handlebars')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const Contenedor = require('../Ej2')
const objContenedor = new Contenedor();
const datos =  objContenedor.getAll()
const PORT = 8080;
const app = express();


//MIDDLEWEARS
app.use(morgan('tiny'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static('public'))

//ENGINE
app.engine('hbs', handlebars.engine({
    extname:'.hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
    })
)



app.get('/', (req,res) => {
    res.render('./partials/formulario')

})

app.get('/productos', (req, res ) => {
        
        res.render('./partials/productos',{datos:datos, exist:true})
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



