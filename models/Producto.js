import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre del producto es obligatorio'], 
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'], 
    maxlength: [100, 'El nombre no puede exceder los 100 caracteres'] 
  },
  descripcion: { 
    type: String, 
    maxlength: [500, 'La descripción no puede exceder los 500 caracteres'] 
  },
  precio: { 
    type: Number, 
    required: [true, 'El precio es obligatorio'], 
    min: [0, 'El precio debe ser un número positivo'] 
  },
  stock: { 
    type: Number, 
    default: 0, 
    min: [0, 'El stock no puede ser negativo'] 
  },
  cliente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cliente', 
    required: [true, 'El cliente es obligatorio'] 
  }
}, { timestamps: true });

export default mongoose.model('Producto', productoSchema);
