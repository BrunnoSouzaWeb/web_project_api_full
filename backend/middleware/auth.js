import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  console.log("dentro do auth");
  ////console.log("req.headers");
  ///console.log(req.headers);

  const route = req.originalUrl; // Rota completa
  console.log(`Middleware executado na rota: ${route}`); // Log da rota completa

  const { authorization } = req.headers;

  console.log("authorization");
  console.log(authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Autorização é necessária" });
  }

  const token = authorization.replace("Bearer ", "");

  console.log("token recuperado");
  console.log(token);

  let payload;

  try {
    payload = jwt.verify(token, "default_secret");
  } catch (e) {
    const err = new Error("Não autorizado");
    err.statusCode = 403;

    next(err);
  }

  req.user = payload;
  console.log("dentro22 do auth");
  console.log(req.user);
  console.log(payload);

  next();
};
