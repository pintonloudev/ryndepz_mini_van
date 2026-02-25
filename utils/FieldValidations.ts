
interface return_objects {
    valid: boolean,
    error: string
}

export const validateEmail = (email: string): return_objects[] => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return [{ valid: false, error: "Please enter a valid email address" }]
    } else {
        return [{ valid: true, error: "" }]
    }
};

export const validatePassword = (password: string): return_objects[] => {
    if (password.length < 8) {
        return [{ valid: false, error: "Password must be 8 characters or more" }]
    } else {
        return [{ valid: true, error: "" }]
    }
};