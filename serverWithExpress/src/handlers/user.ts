import prisma from "../db";
import { Prisma } from "@prisma/client";
import { password, createJWT, comparePassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
  console.log("createNewUser", req.body);
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await password(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return res.status(409).json({ message: "Username already exists" });
    }
    throw err;
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePassword(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "not a valid user" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};

//todo: why we are using the async and await instead can we use in auth as hashsunc something like
