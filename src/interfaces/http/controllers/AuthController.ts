import { Request, Response } from "express";
import { AuthServiceImpl } from "../../../infrastructure/services/AuthServiceImpl";
import { LoginUser } from "../../../application/use-cases/Auth/LoginUser";
import { SignUpuser } from "../../../application/use-cases/Auth/SignUpUser";
import { SignOutUser } from "../../../application/use-cases/Auth/SignOutUser";

const authService = new AuthServiceImpl();
const loginUser = new LoginUser(authService);
const signUpUser = new SignUpuser(authService);
const signOutUser = new SignOutUser(authService); 

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const token = await loginUser.execute(email, password);
    res.status(200).json({ access_token: token });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export const signOut = async (req: Request, res: Response): Promise<void> => {
  try {
    await signOutUser.execute();
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export const signUp = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      await signUpUser.execute(email, password);
      res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      res.status(400).json({ error: error });
    }

}
