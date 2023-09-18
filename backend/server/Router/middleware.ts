import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "Iamaggodboy";

// Extend the Request interface to include a 'user' property
declare module 'express' {
  interface Request {
    user?: any; // Replace 'any' with the appropriate type if necessary
  }
}

const getUserById = (req: Request, res: Response, next: NextFunction): void => {
  const token: string | undefined = req.header('auth-token');

  if (!token) {
    res.status(401).send({ error: "Please enter valid information" });
    return;
  }

  try {
    const data: any = jwt.verify(token, JWT_SECRET); // Replace 'any' with the appropriate type if necessary
    req.user = data.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Please enter a valid token");
  }
};

export default getUserById;
