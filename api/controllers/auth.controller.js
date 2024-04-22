import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
    //db operations

    const {username,email,password}=req.body;
    const hi = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
     
    if(hi){
        return res.status(500).json({message: "User already exist"})
    }
    if( password && email && username){
    try{
        
        //HASH THE PASSWORD
        const hashedPassword = await bcrypt.hash(password,10);
            // console.log(hashedPassword)
            
            //CREATE A NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
            data:{
                username,
                email,
                password: hashedPassword,
            }
        })
    
        // console.log(newUser)
        
        res.status(201).json({message: "User created successfully"})
      
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to create the user!"})
    }
   }
   else{
   res.status(500).json({message: "Fill all the details!"})
   }

}
export const login = async (req, res) => {
    const {username , password} = req.body;

    try{

        // Check if user exist
        if(username && password){
        const user = await prisma.user.findUnique({
            where:{username}
        })

        if(!user) res.status(401).json({message: "Invalid credentials"})
        
        // check if password is correct

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) res.status(401).json({message: "Invalid credentials"})
        
        // generate cookie token and send to user   

        const age= 1000*60*60*24*7

        const token = jwt.sign({
            id: user.id,
            isAdmin:false,
        },process.env.JWT_SECRET_KEY,
        {expiresIn: age}
        );

        const {password:userPassword,...userInfo} = user

        res.cookie("token",token,{
            httpOnly: true,
            // secure: true,
            maxAge: age,
        }).status(200).json(userInfo)
     }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message: "Failed to login!"})
    }
}
export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message:"Logout Successful"})
}