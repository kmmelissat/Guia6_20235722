import { Request, Response } from "express";
import User from "../models/Users";
import { hashPassword, validatePassword } from "../utils/auth";
import { validationResult } from "express-validator";

export const login = async (req: Request, res: Response) => {
    let errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error('invalid credentials');
        return res.status(401).json({
            error: error.message,
        });
    }

    const isPasswordValid = await validatePassword (password, user.password);
    
    if (!isPasswordValid) {
        const error = new Error("invalid credentials");
        return res.status(401).json({
            error: error.message,
        });
    }

    res.status(200).json('authenticated');
}


export const createAccount = async (req: Request, res: Response) => {

    let errors=validationResult(req)
    console.log(errors)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }  ;  //valida los datos del usuario

    const {name, email, password, username} = req.body;

    const userExists = await User.findOne({email});
    if(userExists) {
        res.status(400).json({message: "User already exists for this email address"});
        return;
        }

    const usernameExists = await User.findOne({username});
    if(usernameExists) {
        res.status(400).json({message: "User already exists for this username"});
        return
        }

    // Create a new user
    const user= new User(req.body);
    user.password = await hashPassword(password);
    await user.save();
    res.status(201).json({message:'Datos del usuario registrados con exito'});
    }  ;  //crea un usuario en la base de datos

