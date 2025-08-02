const asyncHandler = require("express-async-handler");
const { User } = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
const { cloudinary } = require("../utils/cloudinary");
const { mongoose } = require("mongoose");
const { Product } = require("../model/ProductModel");
const { getInitials, hslToHex, getRandomEmeraldShade, getTextColorForLightness } = require("../utils/placeHolderUtils");
const { Order } = require("../model/OrderModel");

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 8 || password.length > 20) {
            return res.status(400).json({
                message: "Password must be between 8 and 20 characters",
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already in use." });
        }

        const user = new User({
            name,
            email,
            password,
        });

        const initials = getInitials(name);
        const { h, s, l } = getRandomEmeraldShade();
        const bgColor = hslToHex(h, s, l);
        const textColor = getTextColorForLightness(l);

        const DEFAULT_IMAGE_URL = `https://placehold.co/150x150/${bgColor}/${textColor}?text=${initials}&font=inter`;
        user.image = DEFAULT_IMAGE_URL;

        await user.save();

        const token = generateToken(user._id);

        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            sameSite: "none",
            secure: true,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.error("Email or password not provided");
            return res.status(400).json({ message: "Please add email and password" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ message: "User Not Found, please create an account" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = generateToken(user._id);
        if (user && isMatch) {
            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400),
                sameSite: "none",
                secure: true,
            });

            const { _id, name, email, image } =
                user;

            res.status(200).json({
                _id,
                name,
                email,
                image
            });
        } else {
            console.error("Unexpected error during login for user:", email, token);
            res.status(500).json("Something went wrong, please try again");
        }
    } catch (error) {
        console.log("Error during login process:", error);
        return res.status(500).json({ message: error.message });
    }
});

const updateUserProfileImage = async (req, res) => {
    try {
        const userId = req.userId;
        const image = req.file?.path;
        const public_id = req.file?.filename;

        if (!image) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.imagePublicId) {
            await cloudinary.uploader.destroy(user.imagePublicId);
        }

        user.image = image;
        user.imagePublicId = public_id;

        await user.save();

        res.status(200).json({
            message: "Profile image updated successfully",
            image: user.image,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUserProfileImage = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.imagePublicId) {
        await cloudinary.uploader.destroy(user.imagePublicId);
    }

    const initials = getInitials(user.name);
    const { h, s, l } = getRandomEmeraldShade();
    const bgColor = hslToHex(h, s, l);
    const textColor = getTextColorForLightness(l);

    user.image = `https://placehold.co/150x150/${bgColor}/${textColor}?text=${initials}&font=inter`;
    user.imagePublicId = null;

    await user.save();

    res.status(200).json({
        message: "Profile image deleted and reset to initials",
        image: user.image,
    });
});

const getUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId)
            .populate('products')
            .populate('orders')
            .select("-password")
            .lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching user data" });
    }
});

const toggleCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity = 1 } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const user = await User.findById(req.userId);
  if (!user) {
    res.status(401);
    throw new Error("Unauthorized: User not found");
  }

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.quantity < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  const itemIndex = user.cart.findIndex(
    (item) => item.product && item.product.toString() === productId
  );

  if (itemIndex !== -1) {
    user.cart.splice(itemIndex, 1);
    await user.save();
    const updatedUser = await User.findById(req.userId).populate("cart.product");
    return res.status(200).json({
      message: "Product removed from cart",
      cart: updatedUser.cart,
    });
  }

  user.cart.push({ product: productId, quantity });
  await user.save();

  const updatedUser = await User.findById(req.userId).populate("cart.product");
  res.status(200).json({
    message: "Product added to cart",
    cart: updatedUser.cart,
  });
});

const getCart = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId).populate('cart.product');
    res.status(200).json(user.cart);
});

const updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { name } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name;

        const isDefaultImage =
            user.image?.includes("placehold.co") && user.image?.includes("?text=");
        if (isDefaultImage) {
            const initials = getInitials(name);
            const { h, s, l } = getRandomEmeraldShade();
            const bgColor = hslToHex(h, s, l);
            const textColor = getTextColorForLightness(l);

            user.image = `https://placehold.co/150x150/${bgColor}/${textColor}?text=${initials}&font=inter`;
        }
        user.imagePublicId = null;

        const updatedUser = await user.save();
        const { password, ...userData } = updatedUser.toObject();

        res.status(200).json({ updatedUser: userData });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.imagePublicId) {
            await cloudinary.uploader.destroy(user.imagePublicId);
        }

        await user.deleteOne();

        res.status(200).json({
            message: "Account and associated data deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting user and associated data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        const { name, email } = req.user;

        res.cookie("token", "", {
            path: "/",
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true,
        });

        res.status(200).json({ message: "Logout Successful" });
    } catch (error) {
        console.error("Error in logoutUser:", error.message);
        res.status(500).json({ message: "Logout failed" });
    }
});

module.exports = {
    registerUser,
    loginUser,
    updateUserProfileImage,
    deleteUserProfileImage,
    toggleCart,
    getCart,
    logoutUser,
    deleteUser,
    getUser,
    updateUser
}