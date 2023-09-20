const express = require('express');
const app = express();
const moongose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
app.use(express.json());
app.use(express.static('./public'))
app.use(cors());


//Routes
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

moongose.connect(process.env.MONGO_URL)
.then(() => console.log('DB connection succefull!'))
.catch((err) => console.log(err) )

app.use('/api/auth',authRoute)
app.use('/api/orders',orderRoute)
app.use('/api/products',productRoute)
app.use('/api/users',userRoute)
app.use('/api/checkout',stripeRoute)

app.listen(process.env.PORT || 5000, () => {
  console.log('Server running on port 5000...')
})
