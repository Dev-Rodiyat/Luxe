const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Notification = require("./notificationModel");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    imagePublicId: { type: String, default: null },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
      }
    ],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }]
  },
  {
    timestamps: true,
    minimize: false,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

userSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  const userId = this._id;

  try {
    await Notification.deleteMany({ user: userId });
    console.log(`Cleaned up notifications for user ${userId}`);
    next();
  } catch (error) {
    console.error('Error cleaning up user-related data:', error);
    next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
