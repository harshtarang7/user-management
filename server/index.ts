import express from 'express'
import { connectDB } from './src/config/db.config';
import userRoutes from "./src/routes/user/user.route";
import productRoutes from "./src/routes/products/product.route";

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
        res.send('got it ')
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(3000,async ()=>{
    await connectDB();
    console.log('server is running here on port 3000')
})
