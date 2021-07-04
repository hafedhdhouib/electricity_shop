const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    ref: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    },
    price:{
        type:Number,
        required: true,
        min:0
    }
})
productSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});
exports.Product = mongoose.model('Product', productSchema);
