import mongoose from "mongoose"
// import uniqueValidator from "mongoose-unique-validator"
//TODO: set up order schema, if needed, reference video 20 near end of vid
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "can't be blank"],
      ref: "User",
    },
  },
  { timestamps: true }
)

const Order = mongoose.model("Order", orderSchema)

export default Order
