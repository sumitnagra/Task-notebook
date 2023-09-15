
import UserModel from '../modles/Userschema.js'
import bcryptjs from 'bcryptjs'
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken'

const JWT_SECRET = "Iamaggodboy";

class Usercontroller {
    static createUser = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let user = await UserModel.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "user already exist " })
            }
            const salt = await bcryptjs.genSalt(10);
            const secPass = await bcryptjs.hash(req.body.password, salt);

            const strongPass = await UserModel.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email
            });

            const data ={
                user: {
                    id: strongPass.id
                }
            }
            const jwtData = jwt.sign(data, JWT_SECRET);
            res.send({ jwtData })
        } catch (error) {
            console.log(error)
        }
    }

    static Login = async (req, res) => {
        let success=false;
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const { email, password } = req.body;
        try {
            let result =await UserModel.findOne({ email });
            if (!result) {
                return res.status(400).json({ error: "Please enter correct email" })
            }

            const passwordCompare = await bcryptjs.compare(password, result.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please enter correct email" })
            }
            const data = {
                user: {
                    id: result.id
                }
            }
            const jwtData = jwt.sign(data, JWT_SECRET);
            success=true;
            res.send({success ,jwtData })

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static getUser=async(req,res)=>{
        try {
           const userId=req.user.id;
            const user=await UserModel.findById(userId).select("-password")
            res.send(user)
        } catch (error) {
            console.log(error)
            res.send("please use correct information ")
        }

    }
}

export default Usercontroller;