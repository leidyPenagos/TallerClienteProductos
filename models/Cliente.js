import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: [/^\S+@\S+\.\S+$/, 'El correo electrónico no es válido'] 
  },
  telefono: { 
    type: String, 
    required: true, 
    minlength: 10, 
    maxlength: 15 
  },
  direccion: { 
    type: String, 
    required: true, 
    maxlength: 255 
  },
  productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }] 
}, { timestamps: true });

export default mongoose.model('Cliente', clienteSchema);
