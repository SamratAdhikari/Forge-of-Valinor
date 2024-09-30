import Yup from "yup";

export const signupValidationSchema = Yup.object({
    email: Yup.string().email().trim().lowercase().max(50).required(),
    username: Yup.string().trim().max(12).min(3).required(),
    password: Yup.string().trim().min(6).required(),
});

export const loginValidationSchema = Yup.object({
    email: Yup.string().email().trim().lowercase().max(50).required(),
    password: Yup.string().trim().min(6).required(),
});
