export const parseZodError = (errors: any[]) => {
    let errorMessage = "";
    for (const error of errors) {
        const field = error.path.join(".");
        const message = error.message;
        errorMessage += `${field}: ${message}. `;
    }
    return errorMessage;
};