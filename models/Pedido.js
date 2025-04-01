import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  productos: [{ 
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  estado: { type: String, enum: ['Pendiente', 'Enviado', 'Entregado'], default: 'Pendiente' }
}, { timestamps: true });

export default mongoose.model('Pedido', pedidoSchema);
