const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Usuario = db.tbc_usuario;

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send({ mensaje: 'Email y contraseña son requeridos' });
      }

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).send({ mensaje: 'Credenciales inválidas' });
      }

      const passwordHash = usuario.password || '';
      let passwordMatch = false;

      // Si la contraseña en DB está hasheada con bcrypt, comparar; si no, comparar plano
      try {
        passwordMatch = await bcrypt.compare(password, passwordHash);
      } catch (e) {
        passwordMatch = false;
      }

      if (!passwordMatch) {
        // fallback: comparar texto plano (por si las migraciones no han hasheado)
        if (password !== passwordHash) {
          return res.status(401).send({ mensaje: 'Credenciales inválidas' });
        }
      }

      const payload = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      };

      const secret = process.env.JWT_SECRET || 'mi_secreto_jwt';
      const token = jwt.sign(payload, secret, { expiresIn: '2h' });

      return res.status(200).send({ mensaje: 'Login correcto', token, usuario: payload });
    } catch (error) {
      return res.status(500).send({ mensaje: 'Error en el servidor', error });
    }
  }
};
