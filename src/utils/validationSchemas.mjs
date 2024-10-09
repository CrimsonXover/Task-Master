export const emailRules = {
    notEmpty: {
        errorMessage: 'Email address is required.',
    },
    isEmail: {
        errorMessage: 'Please enter a valid email address.',
    },
    trim: true
}

export const emailValidation = {
    email: emailRules,
}

export const createUserValidation = {
    email: emailRules,
    password: {
        notEmpty: {
            errorMessage: 'Password is required.',
        },
        isLength: {
            options: {
                min: 8,
                max: 16
            },
            errorMessage: 'Password must be between 8 and 16 characters.',
        }
    },
    displayName: {
        notEmpty: {
            errorMessage: 'Display Name is required.',
        },
        isLength: {
            options: {
                min: 3,
                max: 32
            },
            errorMessage: 'Display Name must be between 3 and 32 characters.',
        },
        trim: true
    }
}

export const updateUserValidation = {
    displayName: {
        optional: true,
        isLength: {
            options: {
                min: 3,
                max: 32
            },
            errorMessage: 'Display Name must be between 3 and 32 characters.',
        },
        trim: true
    }
}

export const changePasswordValidation = {
    oldPassword: {
        notEmpty: {
            errorMessage: 'Old Password is required.',
        },
        isLength: {
            options: {
                min: 8,
                max: 16
            },
            errorMessage: 'Old Password must be between 8 and 16 characters.',
        }
    },
    newPassword: {
        notEmpty: {
            errorMessage: 'New Password is required.',
        },
        isLength: {
            options: {
                min: 8,
                max: 16
            },
            errorMessage: 'New Password must be between 8 and 16 characters.',
        }
    },
}

export const loggingUserValidation = {
    email: emailRules,
    password: {
        notEmpty: {
            errorMessage: 'Password is required.',
        }
    }
}

export const verifyUserValidation = {
    email: emailRules,
    verificationCode: {
        notEmpty: {
            errorMessage: 'Verification code is required.',
        },
        isLength: {
            options: {
                min: 6,
                max: 6
            },
            errorMessage: 'Verification code must be exactly 6 characters.',
        }
    }
}

export const resetPasswordValidation = {
    email: emailRules,
    resetCode: {
        notEmpty: {
            errorMessage: 'Reset code is required.',
        },
        isLength: {
            options: {
                min: 6,
                max: 6
            },
            errorMessage: 'Reset code must be exactly 6 characters.',
        }
    },
    newPassword: {
        notEmpty: {
            errorMessage: 'Password is required.',
        },
        isLength: {
            options: {
                min: 8,
                max: 16
            },
            errorMessage: 'Password must be between 8 and 16 characters.',
        }
    }
}