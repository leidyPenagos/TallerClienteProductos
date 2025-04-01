import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  cantidad: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Producto', productoSchema);
