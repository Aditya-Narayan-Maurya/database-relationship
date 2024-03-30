const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema= new Schema({
    item:String,
    price:Number
});

const customerSchema= new Schema({
    name:String,
    order:[{ type: Schema.Types.ObjectId, ref: 'Order'}]
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

const addCustomer=async()=>{
//     let cust1=new Customer({
//         name:"rahul kumar"
//     })
//   let order1= await Order.findOne({item:"chips"});
//   let order2= await Order.findOne({item:"chocolate"});
//   cust1.order.push(order1);
//   cust1.order.push(order2);
//   let result= await cust1.save();
//   console.log(result);
  let result= await Customer.find();
  console.log(result);

}
addCustomer();



// const addOrder=async()=>{
//     let res=await Order.insertMany([
//         {item:"samosa",price:12},
//         {item:"chips",price:10},
//         {item:"chocolate",price:40}
//     ])
//     console.log(res);
// }
// addOrder();