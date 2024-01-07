const {Schema,model}= require('mongoose');

const ProductSchema= new Schema({
    imagen:String,
    categoria:String,
    nombre:String,
    precio:String,
    descripcion:String,
    autor:{type:Schema.Types.ObjectId,ref:'User'}
},{
    timestamps:true
})

const Product= model('Product',ProductSchema);

module.exports=Product;