const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    name:{
        type:String,
        required:true
    },
    total_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
    }

})
orderSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id }
})
exports.Order = mongoose.model('Order',orderSchema)
