const http = require("http");
const Order = require("./controllerorder");
const { getReqData } = require("./util");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    // /api/order : GET
    if (req.url === "/api/order" && req.method === "GET") {
        
        // get the order.
        const order = await new Order().getOrder();

        console.log(order)
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(order));
    }

    // /api/order/:id : GET
    else if (req.url.match(/\/api\/order\/([0-9]+)/) && req.method === "GET") {
        try {
            // get id from url
            const id = req.url.split("/")[3];
            // get order
            const order = await new order().getorder(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(order));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/order/:id : DELETE
    else if (req.url.match(/\/api\/order\/([0-9]+)/) && req.method === "DELETE") {
        try {
            // get the id from url
            const id = req.url.split("/")[3];
            // delete order
            let message = await new order().deleteorder(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify({ message }));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/order/:id : UPDATE
    else if (req.url.match(/\/api\/order\/([0-9]+)/) && req.method === "PATCH") {
        try {
            // get the id from the url
            const id = req.url.split("/")[3];
            // update order
            let updated_order = await new order().updateorder(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify(updated_order));
        } catch (error) {
            // set the status code and content type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/order/ : POST
    else if (req.url === "/api/order" && req.method === "POST") {
        // get the data sent along
        let order_data = await getReqData(req);
        // create the order
        let order = await new order().createorder(JSON.parse(order_data));
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        //send the order
        res.end(JSON.stringify(order));
    }

    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});