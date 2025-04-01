import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.render('inicio', { error: 'Correo o contraseña incorrectos', success: null });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.render('inicio', { error: 'Error al iniciar sesión', success: null });
  }
};

export const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.render('inicio', { error: 'El correo ya está registrado', success: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();

    res.render('inicio', { error: null, success: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.render('inicio', { error: 'Error al registrar usuario', success: null });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/inicio');
};

// Middleware para verificar autenticación
export const verificarAutenticacion = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/inicio'); // Redirige a la página de inicio de sesión si no hay token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.id; // Guarda el ID del usuario en la solicitud
    next(); // Continúa con la siguiente función
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.redirect('/inicio'); // Redirige a la página de inicio de sesión si el token no es válido
  }
};
