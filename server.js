const express = require('express');
const container = require('./controllers/index');
const {Router} = express;
const app = express();
const router = Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/', (request, response) => {
    response.send(container.getProducts());
})

router.post('/', (request, response) => {
    let product = request.body;
    response.send(container.addProduct(product));
})

router.put('/:id', (request, response) => {
    let id = request.params.id;
    let newData = request.body;
    response.send(container.editProductById(id, newData));
})

router.get('/:id', (request, response) => {
    let id = request.params.id;
    response.send(container.getProductById(id));
})

router.delete('/:id', (request, response) => {
    let id = request.params.id;
    response.send(container.deleteProductById(id));
})


app.use('/api/productos',router);

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.on("error", error => { console.log(`El errore es: ${error}`); });