import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    stationId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    FinalDate: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Reservation", reservationSchema);
