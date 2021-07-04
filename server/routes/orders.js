const { Order } = require('../models/order')
const { OrderItem } = require('../models/order-item')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const orderList = await Order.find().populate({path:'orderItems', populate:'product'});
    if (!orderList) {
        res.status(500).json({ success: false })
    }
    res.send(orderList);
})
router.post('/', async (req, res) => {
    const orderItemsIds = Promise.all (req.body.orderItems.map(async orderitem =>{
        let newOrderItem = new OrderItem({
            qte:orderitem.qte,
            product:orderitem.product
        })
        newOrderItem = await newOrderItem.save()
        return newOrderItem._id
    }))
    const orderItemIds = await orderItemsIds
    console.log(req.body);
    let order = new Order({
        orderItems: orderItemIds,
        name: req.body.name,
        total_price: req.body.total_price,
        date:req.body.date
    })
    order = await order.save()
    if (!order)
        return res.status(400).send('the order cannout created')
    res.send(order)
})
module.exports = router;