const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { loadNuxt, build } = require('nuxt')
const isDev = process.env.NODE_ENV !== 'production'

const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('tiny'))
app.post('/test', (req, res) => {
    console.log(req.body);
})
app.use('/products', productsRoutes);
app.use('/users', usersRoutes)
app.use('/orders',ordersRoutes)

mongoose.connect('mongodb+srv://admin:192ds28745@cluster0.vg3rn.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'test'
    }).then(() => {
        console.log('connection avec success')
    }).catch((err) => { console.log(err); })

async function start() {
    // We get Nuxt instance
    const nuxt = await loadNuxt(isDev ? 'dev' : 'start')

    // Render every route with Nuxt.js
    app.use(nuxt.render)

    // Build only in dev mode with hot-reloading
    if (isDev) {
        build(nuxt)
    }
    // Listen the server
    app.listen(3000, () => {
        console.log('server run with 3000 port');
    })
}

start()
