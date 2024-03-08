import { Request, Response } from "express";
import { ZParams, ZUser_Updation, ZUsers } from "../types/data-integrity";
import { prisma } from "../database";
import jwt from "jsonwebtoken";

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let validateRequestBody = ZUsers.safeParse(req.body);
    if (!validateRequestBody?.success) {
      return res.status(400).send({ message: "Please send valid data" });
    }

    let existingUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      });
      return res.status(201).send({
        message: "User created",
      });
    }

    return res.status(409).send({ message: "User already exists" });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let validateRequestBody = ZUsers.safeParse(req.body);
    if (!validateRequestBody?.success) {
      return res.status(400).send({ message: "Please send valid data" });
    }

    let existingUser = await prisma.user.findFirst({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    if (existingUser) {
      const token: string = jwt.sign(
        { email: existingUser?.email },
        process.env.SECRET_KEY as string,
        { expiresIn: "1m" }
      );
      const refreshToken: string = jwt.sign(
        { email: existingUser?.email },
        process.env.SECRET_KEY as string,
        { expiresIn: "2m" }
      );

      return res.status(201).send({
        message: "User logged-in successfully",
        id: existingUser?.id,
        email: existingUser?.email,
        token,
        refreshToken,
      });
    }

    return res.status(401).send({ message: "User doesn't exist" });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export const updateUser = async (req: Request, res: Response):Promise<Response> => {
  try {
    let validateParams = ZParams.safeParse(req.params);
    let validateRequestBody = ZUser_Updation.safeParse(req.body);

    if (!validateParams?.success || !validateRequestBody?.success) {
      return res.status(400).send({ message: "Please send valid params" });
    }

    let varifyUser = await prisma.user.findUnique({
      where: {
        id: Number(req?.params?.id),
        email: (req as any).email,
      },
    });

    if (varifyUser) {
      let updatedData = await prisma.user.update({
        where: {
          id: Number(req?.params?.id),
        },
        data: {
          ...req.body,
        },
      });

      if ((req as any)?.regenerateToken) {
        return res.status(200).send({
          message: "Updated Successfully",
          token: (req as any).token,
          refreshToken: (req as any).refreshToken,
          email: updatedData?.email,
          username: updatedData?.username,
          password: updatedData?.password,
        });
      }

      return res.status(200).send({
        message: "Updated Successfully",
        email: updatedData?.email,
        username: updatedData?.username,
        password: updatedData?.password,
      });
    }

    return res.status(401).send({ message: "UnAuthorised" });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export const deleteUser = async(req: Request, res: Response):Promise<Response> => {
  try {
    let validateParams = ZParams.safeParse(req.params);

    if (!validateParams?.success) {
      return res.status(400).send({ message: "Please send valid params" });
    }

    let varifyData = await prisma.user.findFirst({
        where: {
          id: Number(req?.params?.id),
          email: (req as any).email,
        },
    });

    if(varifyData){

        await prisma.user.delete({
            where:{
                id: Number(req?.params?.id)
            }
        });

        return res.status(200).send({
            message:" User deleted successfully"
        })

    }

    return res.status(401).send({ message: "UnAuthorised" });

  } catch (error) {
    return res.status(500).send({ error });
  }
};
