const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema= new Schema({
    username:String,
    address:[
        {
            _id: false,
            location:String,
            city:String
        }
    ]
});

const User = mongoose.model('User', userSchema);
const addUsers=async()=>{
    let user1=new User({
        username:"sherlockholmes",
        address:[
            {
                location:"street no 1",
                city:"sultanpur"
            }
        ]
    });
    user1.address.push({
        location:"street no 1",
        city:"london"
    });
    let result = await user1.save();
    console.log(result);
}
addUsers();