export const emailValidationRules = {
    required: "Email is required",
    pattern: {
        value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
        message: "Invalid email format",
    },
};
