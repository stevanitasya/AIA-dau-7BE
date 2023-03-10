const data = require("./data");

class ControllerOrder {
    // getting all order
    async getOrder() {
        // return all torder
        return new Promise((resolve, _) => resolve(data));
    }

    // getting a single order
    async getorders(id) {
        return new Promise((resolve, reject) => {
            // get the order
            let order = data.find((order) => order.id === parseInt(id));
            if (order) {
                // return the order
                resolve(order);
            } else {
                // return an error
                reject(`order with id ${id} not found `);
            }
        });
    }

    // creating a order
    async createorder(order) {
        return new Promise((resolve, _) => {
            // create a order, with random id and data sent
            let neworder = {
                id: Math.floor(4 + Math.random() * 10),
                ...order,
            };

            // return the new created order
            resolve(neworder);
        });
    }

    // updating a order
    async updateorder(id) {
        return new Promise((resolve, reject) => {
            // get the order.
            let order = data.find((order) => order.id === parseInt(id));
            // if no order, return an error
            if (!order) {
                reject(`No order with id ${id} found`);
            }
            //else, update it by setting completed to true
            order["completed"] = true;
            // return the updated order
            resolve(order);
        });
    }

    // deleting a order
    async deleteorder(id) {
        return new Promise((resolve, reject) => {
            // get the order
            let order = data.find((order) => order.id === parseInt(id));
            // if no order, return an error
            if (!order) {
                reject(`No order with id ${id} found`);
            }
            // else, return a success message
            resolve(`order deleted successfully`);
        });
    }
}
module.exports = ControllerOrder;