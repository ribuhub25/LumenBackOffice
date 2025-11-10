import { Request, Response } from "express";
import { GetResultsForStore } from "../../../application/use-cases/Filter/GetResultsForStore";
import { FilterServiceImpl } from "../../../infrastructure/services/FilterServiceImpl";

const authService = new FilterServiceImpl();
const getResultsStore = new GetResultsForStore(authService);

export const getResultsForStore = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const result = await getResultsStore.execute(search);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
