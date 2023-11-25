"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidationError = void 0;
const admin_bro_1 = require("admin-bro");
exports.createValidationError = (originalError) => {
    const errors = Object.keys(originalError.errors).reduce((memo, key) => {
        const { message, kind, name } = originalError.errors[key];
        return {
            ...memo,
            [key]: {
                message,
                type: kind || name,
            },
        };
    }, {});
    return new admin_bro_1.ValidationError(errors);
};
//# sourceMappingURL=create-validation-error.js.map