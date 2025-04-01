import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  pedidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' }]
}, { timestamps: true });

export default mongoose.model('Cliente', clienteSchema);
