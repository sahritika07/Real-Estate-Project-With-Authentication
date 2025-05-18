import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js";



const app= express()
const port = process.env.PORT || 4000
connectDB();

// const allowedOrigins = ['http://localhost:5173']


app.use(express.json());
app.use(cookieParser());
// app.use(cors({orgin: allowedOrigins, credentials:true}))



// const allowedOrigins = ['http://localhost:5173', 'https://real-estate-project-backend-xz9f.onrender.com']

// app.use(cors(
//   // {
//   // origin: allowedOrigins[0],
//   // credentials: true,
// // }
// ));


app.use(cors({
  origin: 'https://real-estate-project-frontend.onrender.com',
  credentials: true
}));


// API Endpoints
app.get('/', (req,res)=> res.send("API Working"))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port ,()=> {
    console.log(`Server started on PORT:${port}`)
});