import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' } 
}, { timestamps: true });

export default mongoose.model('Producto', productoSchema);
