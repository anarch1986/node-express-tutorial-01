const fs = require('fs');
const path = require('path');

const productPath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = callBack => {
    fs.readFile(productPath, (err, fileContent) => {
        if (err) {
            callBack([]);
        } else {
            callBack(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(productPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callBack) {
        getProductsFromFile(callBack);
    }

    static findById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            callback(product);
        })
    }
}