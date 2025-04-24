import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  mobile: string;
  selectedCrypto: string;
  selectedBroker: {
    id: string;
    name: string;
    minCommission: number;
    maxCommission: number;
    rating: number;
    reviews: number;
  };
  transferDetails: {
    walletAddress: string;
    preferredTimeSlot: Date;
    cryptoType: string;
  };
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  selectedCrypto: { type: String, required: true },
  selectedBroker: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    minCommission: { type: Number, required: true },
    maxCommission: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true }
  },
  transferDetails: {
    walletAddress: { type: String, required: true },
    preferredTimeSlot: { type: Date, required: true },
    cryptoType: { type: String, required: true }
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema); 