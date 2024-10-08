const validateData = (validationSchema) => {
    return async (req, res, next) => {
        // extract data from req.body
        const data = req.body;

        // validate data
        try {
            const validatedData = await validationSchema.validate(data);
            req.body = validatedData;
        } catch (error) {
            return res.status(400).send({ message: error.message });
        }

        // call next function
        next();
    };
};

export default validateData;
