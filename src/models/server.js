const express= require('express');
const cors= require('cors');
const { dbConnection } = require('../Database/config');
const cookieParser = require('cookie-parser');


class Server{

    constructor(){
        this.app=express();
        this.port=process.env.PORT;

        this.paths={
            auth:'/api/auth',
            productos:'/api/productos'
        }

        //Conectar Base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

    }



    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors({
            credentials:true,
            origin:['https://jorgemirandam.github.io']
        }));

        // Lectura y parseo del body
        this.app.use(express.json());

        this.app.use(cookieParser());
    }

    routes(){

        this.app.use(this.paths.auth,require('../routes/auth.routes'));
        this.app.use(this.paths.productos,require('../routes/product.routes'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}

module.exports=Server;