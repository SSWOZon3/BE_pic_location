import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { versionKey: false });

reviewSchema.index({ location: '2dsphere' });

export default model('Review', reviewSchema);
