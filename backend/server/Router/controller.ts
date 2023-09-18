import { Request, Response } from 'express';
import UserModel, { IUser } from '../modles/Userschema'; // Assuming you have a user model with the appropriate typings
import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "Iamaggodboy";

class UserController {
  static createUser = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      let user = await UserModel.findOne({ email: req.body.email });
      if (user) {
        res.status(400).json({ error: "User already exists" });
        return;
      }
      const salt = await bcryptjs.genSalt(10);
      const secPass = await bcryptjs.hash(req.body.password, salt);

      const strongPass = await UserModel.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: strongPass.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      res.send({ jwtData });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  static login = async (req: Request, res: Response): Promise<void> => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { email, password } = req.body;
    try {
      let result = await UserModel.findOne({ email });
      if (!result) {
        res.status(400).json({ error: "Please enter correct email" });
        return;
      }

      const passwordCompare = await bcryptjs.compare(password, result.password);
      if (!passwordCompare) {
        res.status(400).json({ error: "Please enter correct email" });
        return;
      }
      const data = {
        user: {
          id: result.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, jwtData });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  static getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user.id;
      const user = await UserModel.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };
}

export default UserController;
