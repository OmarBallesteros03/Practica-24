const express=require('express'); //inyectamos express
const mongoose=require('mongoose'); //inyectamos mongoose
const personsRoute=require('./src/routes/persons') //inyectamos el router de personas
require('dotenv').config(); //inyectammos la variable de ambiente para MONGODB_URI

mongoose.Promise = global.Promise;
const app = express(); //instanciamos aplicaciones de express
const port = process.env.PORT || 3000; //configuramos puerto de escucha

app.set ('view engine', 'ejs'); //establecemos el valor para el motor de vistas
app.use(express.urlencoded({extended:false}));
app.use(personsRoute); //utilizamos el router de personas

app.use("/assets", express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGODB_URI) //conectamos a base de datos
.then(()=> console.log("Conectado a TEST"))
.catch((error) => console.error(error));

app.listen(port, () => console.log('escuchando en el puerto', port)); //levantar servidor