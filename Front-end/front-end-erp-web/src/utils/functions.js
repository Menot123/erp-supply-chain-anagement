export const validateData = (fieldCheck, dataCheck) => {
    const missingFields = [];

    fieldCheck.forEach(field => {
        if (!dataCheck[field]) {
            missingFields.push(field);
        }
    });

    return missingFields;
};