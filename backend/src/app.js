import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";


const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use("/api/trips", tripRoutes);

 app.get("/",(req,res)=>{
    res.json({message:"BEst of luck"});
});

export default app;