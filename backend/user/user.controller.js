import express from "express";
import validateData from "../middleware/validate.data.js";
import protectRoute from "../middleware/protect.route.js";
import {
    addElements,
    login,
    logout,
    showElements,
    signup,
} from "./user.service.js";
import {
    loginValidationSchema,
    signupValidationSchema,
} from "./user.validation.js";

const router = express.Router();

// *POST: signup
router.post("/signup", validateData(signupValidationSchema), signup);

// *POST: login
router.post("/login", validateData(loginValidationSchema), login);

// *POST: logout
router.post("/logout", logout);

// *GET: show all elements
router.get("/show", protectRoute, showElements);

// *POST: add a new element
router.post("/add", protectRoute, addElements);

export default router;
