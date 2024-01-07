const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

//Función para verificar si existe un token en las cookes y si es valido
const verifyToken = async (req, res, next) => {
  //Se obtiene el token de las cookies
  const { TOKEN } = req.cookies;

  //Si no existe un token, manda un status 403
  if (!TOKEN) return res.status(403).json({ok:false, message: "No token provided" });

  try {
    //Varifica si el token es valido
    const decoded = jwt.verify(TOKEN, process.env.SECRET);
    //Se obtiene el id del token
    req.userId = decoded.id;
    //Se obtiene el usuario de la db con el id
    const user = await User.findById(req.userId, { password: 0 });

    //Si no existe un usuario con ese id, manda un status 404
    if (!user) return res.status(404).json({ok:false, message: "No user found" });
    next();
  } catch (error) {
    return res.status(401).json({ok:false, message: "Unauthorized!" });
  }
};






module.exports = { verifyToken,  };
