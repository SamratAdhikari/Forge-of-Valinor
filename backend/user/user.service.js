import User from "./user.model.js";
import bcrypt from "bcrypt";
import genTokenAndSetCookie from "../utils/gen.token.js";
import { generateCombinedElement } from "../utils/generate.combined.element.js";

// ! Signup user helper
export const signup = async (req, res) => {
    try {
        const { email, username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res
                .status(400)
                .send({ success: false, message: "Passwords don't match" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({
                success: false,
                message: "Email already registered...",
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user with default elements
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
        });

        if (!newUser) {
            return res
                .status(400)
                .send({ success: false, message: "Invalid user data" });
        }

        genTokenAndSetCookie(newUser._id, res);

        await newUser.save();

        return res.status(201).send({
            success: true,
            message: "Signup successful",
            userDetails: newUser,
        });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

// ! Login user helper
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        const isPasswordMatch = await bcrypt.compare(
            password,
            user?.password || ""
        );

        if (!isPasswordMatch || !user) {
            return res
                .status(400)
                .send({ success: false, message: "Invalid credentials" });
        }

        genTokenAndSetCookie(user._id, res);

        return res.status(200).send({
            success: true,
            message: "Login successful",
            user,
        });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
};

// ! Logout user helper
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res
            .status(200)
            .send({ success: true, message: "Logout successful" });
    } catch (error) {
        return res.status(400).send({ success: false, message: error.message });
    }
};

// ! Show elements helper
export const showElements = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .send({ success: false, message: "User not found" });
        }

        res.status(200).send({
            success: true,
            message: "User elements retrieved successfully",
            elements: user.elements,
        });
    } catch (error) {
        return res.status(400).send({ success: false, message: error.message });
    }
};

// ! Add elements helper
export const addElements = async (req, res) => {
    const { element1, element2 } = req.body;
    const userId = req.user._id;

    try {
        // Generate the combined element
        const { combinedName, combinedEmoji } = await generateCombinedElement(
            element1,
            element2
        );

        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res
                .status(404)
                .send({ success: false, message: "User not found" });
        }

        // Check if the element already exists in user's collection
        const existingElement = user.elements.find(
            (item) => item.name === combinedName
        );

        if (existingElement) {
            return res.status(200).send({
                success: true,
                message: `Existing element obtained`,
                element: existingElement,
                new: false,
            });
        }

        // Add new element to user's elements array
        const newElement = { name: combinedName, emoji: combinedEmoji };
        user.elements.push(newElement);

        // Save the updated user document
        await user.save();

        return res.status(200).send({
            success: true,
            message: `New element obtained`,
            element: newElement,
            new: true,
        });

        // error
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
};
