const asyncHandler = require("express-async-handler");
const { User } = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");

const getInitials = (fullName) => {
    const names = fullName.trim().split(" ");
    const initials = names.length === 1
        ? names[0][0].toUpperCase()
        : names.slice(0, 2).map(n => n[0].toUpperCase()).join("");
    return initials;
};

const getRandomEmeraldShade = () => {
    const hue = Math.floor(Math.random() * 20) + 140; // 140–159
    const saturation = Math.floor(Math.random() * 30) + 70; // 70–99%
    const lightness = Math.floor(Math.random() * 20) + 40; // 40–59%
    return { h: hue, s: saturation, l: lightness };
};

const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
        Math.round(
            255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))))
        )
            .toString(16)
            .padStart(2, "0");
    return `${f(0)}${f(8)}${f(4)}`;
};

const getTextColorForLightness = (l) => {
    if (l < 45) return "FFFFFF";
    if (l < 55) return "FFBF00";
    return "000000";
};

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

const getUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select("-password").lean();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching user data" });
    }
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

        await user.deleteOne();

        res.status(200).json({
            message: "Account and associated tasks & notifications deleted successfully",
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
    logoutUser,
    deleteUser,
    getUser,
    updateUser
}