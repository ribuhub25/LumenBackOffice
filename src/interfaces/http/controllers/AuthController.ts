import { Request, Response } from "express";
import { LoginUser } from "../../../application/use-cases/LoginUser";
import { AuthServiceImpl } from "../../../infrastructure/services/AuthServiceImpl";
import { SignUpuser } from "../../../application/use-cases/SignUpUser";

const authService = new AuthServiceImpl();
const loginUser = new LoginUser(authService);
const signUpUser = new SignUpuser(authService);

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const token = await loginUser.execute(email, password);
    res.status(200).json({ access_token: token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      await signUpUser.execute(email, password);
      res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }

}
