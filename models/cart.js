const fs = require('fs');
const path = require('path');

const cartPath = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');


module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(cartPath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const exisitngProductIndex = cart.products.findIndex(product => product.id === id);
            const exisitngProduct = cart.products[exisitngProductIndex];
            let updatedProduct;
            if (exisitngProduct) {
                updatedProduct = { ...exisitngProduct };
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products =[...cart.products];
                cart.products[exisitngProductIndex] = updatedProduct;

            } else {
                updatedProduct = {id: id, quantity: 1 };
                cart.products =[...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(cartPath, JSON.stringify(cart), err => {
                console.log(err);
            })        
        });
    }
}