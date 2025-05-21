import jwt from "jsonwebtoken";
import { env } from "process";
import bcrypt from "bcrypt";

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword); //gives a promise , so we are doing async over the usage
};

export const password = (password) => {
  return bcrypt.hash(password , 5); //todo: what is 5 here
  //5 is the salt rounds
  //salt rounds is the number of times the password is hashed
  //the higher the number the more secure it is
  //but the more time it takes to hash the password
  //so it is a trade off between security and speed
}

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.name },
    process.env.JWT_SECRET
  );
  return token;
};

//todo: what is the better way to store the jwt token - cookies or local storage in client and server

export const protect = (req, res, next) => {
  //todo: why bearers are used , why not other types and what are they
  const bearer = req.headers.authorization;
  //todo : wht are headers ? how it helps
  console.log("bearer", bearer);

  if (!bearer) {
    res.status(401);
    res.json({ message: "Unauthorized" });
    // next();
    return;
  }
  const [, token] = bearer.split(" "); // we are doing split bcs we ge t the bearer token in the format of Bearer space token
  //Bearer sosadfnkfnwkfnwkfnwekn

  if (!token) {
    res.status(401);
    res.json({ message: "not a valid token" });
    return;
  }

  try {
    console.log("token", token, env.JWT_SECRET);
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Add the user object to the request for later use
    next(); // Call the next middleware function in the stack
  } catch (e) {
    res.status(401);
    res.json({ message: "Invalid token" });
    return;
  }
};

// can api rate limiting is used in the middle ware ?
//so api rate limiting is a mechanism yu would use for an external facing api, like your produc=t is an api
// they look at the ip address , limits how may times an ip address can make a request per second before
// it gets blocked for x amount of times before they are allowed to do it again

//todo: chek how a rte limiting works
