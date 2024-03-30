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

// customerSchema.pre('findOneAndDelete', async()=> {
//   console.log("This is pre")
// });

customerSchema.post('findOneAndDelete', async(customer)=>{
  if (customer.order.length) {
    let data=await Order.deleteMany({_id:{$in:customer.order}})
    console.log(data);
  }
});
const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model('Customer', customerSchema);

//functions
const findCustomer=async()=>{
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
};



//add customer and orders
const addCust=async()=>{
   let newCust= new Customer({
    name:"karan arjun",
   });
  const newOrder= new Order({
    item:"burger",
    price:250
  });
  newCust.order.push(newOrder);
  await newCust.save();
  await newOrder.save();
  console.log("added new customer");
}
// addCust();

//delete customer and order
const delCust=async()=>{
  let data= await Customer.findByIdAndDelete('6607ce874bd7f8ef8f1accf3');
  console.log(data);
  console.log("data has been delete");
}
delCust();














// const addCustomer=async()=>{
// //     let cust1=new Customer({
// //         name:"rahul kumar"
// //     })
// //   let order1= await Order.findOne({item:"chips"});
// //   let order2= await Order.findOne({item:"chocolate"});
// //   cust1.order.push(order1);
// //   cust1.order.push(order2);
// //   let result= await cust1.save();
// //   console.log(result);
//   let result= await Customer.find();
//   console.log(result);

// }
// addCustomer();



// const addOrder=async()=>{
//     let res=await Order.insertMany([
//         {item:"samosa",price:12},
//         {item:"chips",price:10},
//         {item:"chocolate",price:40}
//     ])
//     console.log(res);
// }
// addOrder();