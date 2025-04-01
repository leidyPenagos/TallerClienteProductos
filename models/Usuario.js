import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'], 
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'], 
    maxlength: [50, 'El nombre no puede exceder los 50 caracteres'] 
  },
  email: { 
    type: String, 
    required: [true, 'El correo electrónico es obligatorio'], 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'El correo electrónico no es válido'] 
  },
  password: { 
    type: String, 
    required: [true, 'La contraseña es obligatoria'], 
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'] 
  }
}, { timestamps: true });

export default mongoose.model('Usuario', usuarioSchema);
