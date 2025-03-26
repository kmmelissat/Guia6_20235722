import { Router, Request, Response } from "express";
import { createAccount, login } from "./controllers/User.Controller";
import { body } from "express-validator";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send('Bienvenido a la API');
});

router.post("/auth/register", [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isString().isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    body("username").isString().notEmpty().withMessage("Username is required")],

    async (req: Request, res: Response) => {
    createAccount(req, res);
    });


    router.post('/auth/login',
      [
          body('email').isEmail().withMessage('Invalid email'),
          body('password').isString().notEmpty().withMessage('Password must be at least 8 characters long'),
      ],
      async (req: Request, res: Response) => {
          login(req, res);
      }
  )
  

export default router;

