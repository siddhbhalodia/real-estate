import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt"
export const addMessage = async (req, res) => {
    // console.log("it works")
    try {
       res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(404).json({message:"Failed to add message"});
    }
}
