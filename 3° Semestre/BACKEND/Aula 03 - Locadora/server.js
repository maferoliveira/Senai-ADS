require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const clientesRoutes = require("./src/routes/clientes.routes");
const carrosRoutes = require("./src/routes/carros.routes");

app.use(clientesRoutes);
app.use(carrosRoutes);

app.listen(process.env.PORT_APP, ()=>{
    console.log("Online na porta " + process.env.PORT_APP);
});