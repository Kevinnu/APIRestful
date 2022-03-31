const fs = require('fs');

class Soporte{
    constructor(){}
    Productos =
    [
        {
          "title": "television",
          "precio": 5400,
          "thumbnail": "url ficticia",
          "id": 1
        },
        {
          "title": "Radio",
          "precio": 5400,
          "thumbnail": "url ficticia",
          "id": 2
        },
        {
          "title": "musica",
          "precio": 35400,
          "thumbnail": "url ficticia",
          "id": 3
        },
        {
          "title": "estereo",
          "precio": 1000,
          "thumbnail": "url ficticia",
          "id": 4
        },
        {
          "title": "Casa",
          "precio": 125400,
          "thumbnail": "url ficticia",
          "id": 5
        },
        {
          "title": "estufa",
          "precio": 400,
          "thumbnail": "url ficticia",
          "id": 6
        }
      ]
}

class Container {
    constructor(file) {
        this.file = file;
    }
    getProducts() {
        try {
            if (!fs.existsSync(this.file)) {
                console.log('No existe el archivo')
                let error = "No existe el archivo"
                return error;
            } else {
                let leer = fs.readFileSync(this.file);
                if (leer == '') {
                    console.log('Archivo vacio');
                    let mensaje = "el archivo no existe";
                    return mensaje;
                } else {
                    let arrJson = JSON.parse(leer)
                    return arrJson;
                }
            }
        } catch (error) {
            throw error;
        }

    }

    getProductById(id) {
        try {
            const products = this.getProducts();
            const encontrar = products.find(element => element.id == id);
            if (encontrar === undefined) {
                return { "Error": "No existe el elemento" }
            } else {
                return encontrar;
            }
        }
        catch (error) {
            throw error;
        }
    }


    addProduct(productJson) {
        try {
            const products = this.getProducts();
            const productNew = productJson;

            if (products == "No existe el archivo") {
                let str = JSON.stringify(productNew, null, 2);
                fs.writeFileSync(this.file, str);
                let mensaje = `${this.file} fue creado exitosamente ID:1`
                console.log(mensaje)
                return mensaje;
            } else {
                let leer = fs.readFileSync(this.file, 'utf-8');
                let arrJson = JSON.parse(leer);
                let idLength = arrJson.length;
                let id;
                if (idLength == 0) {
                    id = 1;
                } else {
                    id = arrJson[idLength - 1].id + 1;
                }
                const obj = {
                    "title": productNew.title,
                    "precio": productNew.price,
                    "thumbnail": productNew.thumbnail,
                    "id": id
                }
                arrJson.push(obj);
                let str = JSON.stringify(arrJson, null, 2);
                fs.writeFileSync('./archivo.txt', str);
                const mensaje = `elemento agregado exitosamente ID:${id}`
                console.log(mensaje)
                return mensaje
            }
        } catch (error) {
            console.log('No se pudo guardar el archivo: ' + error)
        }
    }
    editProductById(id, newData) {
        const products = this.getProducts();
        const index = products.findIndex(prod => prod.id == parseInt(id));
        if (index == -1) {
            const mensaje = `No existe el elemento con ID: ${id}`;
            console.log(mensaje);
            return mensaje;
        } else {
            let dataCount = 0;
            if (newData.title) { products[index].title = newData.title; dataCount++ }
            if (newData.price) { products[index].price = newData.price; dataCount++ }
            if (newData.thumbnail) { products[index].thumbnail = newData.thumbnail; dataCount++ }
            products[index].id = id;
            const mensaje = `El producto ${newData.title} ID: ${id} fue actualizado!, datos actualizados: ${dataCount}`;
            const productString = JSON.stringify(products, null, 2);
            fs.writeFileSync('./archivo.txt', productString);
            console.log(mensaje);
            return mensaje;
        }
    }
    deleteProductById(id) {
        const products = this.getProducts();
        const product = this.getProductById(id);
        const index = products.findIndex(prod => prod.id == parseInt(id));
        if (index == -1) {
            return `El ID: ${id} no existe`
        } else {
            products.splice(index, 1);
            const productString = JSON.stringify(products, null, 2);
            fs.writeFileSync('./archivo.txt', productString);
            return `El elemento ${product.title} ID: ${product.id} fue eliminado exitosamente`;
        }

    }
}

container = new Container('./archivo.txt');

module.exports = container;