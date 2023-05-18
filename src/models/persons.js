const mongoose= require ('mongoose'); //Se inyecta la dependencia mongoose
let PersonSchema= new mongoose.Schema({
    nombre: String,
    edad: Number,
    tipoSangre: String,
    nss: String
});

module.exports= mongoose.model('Persons', PersonSchema);