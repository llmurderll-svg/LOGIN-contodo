//Declaramos los componentes que e necesitaràm
const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const connectDB= require('./config/db');
const cors = require('cors');
require('dotenv').config({
    path: './config/config.env'
})
//Iniciamos la aplicaciòn
const app = express();
//Coneccionj a la DB
connectDB();
app.use(express.json());
//Config solo para desarrollo
//MOrgan da info de cada request
//Cors permite lidiar con react en port 3000
if(process.env.NODE_ENV === 'development'){
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'));
}
//Cargar todas las rutas
const authRouter = require('./routes/auth.route');
const { connect } = require('mongoose');
app.use('/api/',authRouter);


app.use((req,res,next)=>{
    res.status(404).json({
        success: false,
        message: "Page Not Founded"
    })
});
//Usamos el puerto de salida declarado en el archivo de Config
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`App listening in port ${PORT}`);
});