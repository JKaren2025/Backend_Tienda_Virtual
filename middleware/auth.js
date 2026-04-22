const jwt = require('jsonwebtoken');

const getSecret = () => process.env.JWT_SECRET || 'mi_secreto_jwt';

const getTokenFromHeader = (req) => {
  const authorization = req.headers.authorization || '';

  if (!authorization.startsWith('Bearer ')) {
    return null;
  }

  return authorization.slice(7).trim();
};

const verifyToken = (token) => jwt.verify(token, getSecret());

const optionalAuth = (req, res, next) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch (error) {
    return res.status(401).send({ mensaje: 'Token invalido o expirado' });
  }
};

const authenticateToken = (req, res, next) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).send({ mensaje: 'Se requiere autenticacion' });
  }

  try {
    req.user = verifyToken(token);
    return next();
  } catch (error) {
    return res.status(401).send({ mensaje: 'Token invalido o expirado' });
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ mensaje: 'Se requiere autenticacion' });
  }

  if (!roles.includes(req.user.rol)) {
    return res.status(403).send({ mensaje: 'No tienes permisos para realizar esta accion' });
  }

  return next();
};

module.exports = {
  optionalAuth,
  authenticateToken,
  requireRole,
};
