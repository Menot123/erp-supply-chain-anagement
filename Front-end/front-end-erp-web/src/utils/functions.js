export const validateData = (fieldCheck, dataCheck) => {
    const missingFields = [];

    fieldCheck.forEach(field => {
        if (!dataCheck[field]) {
            missingFields.push(field);
        }
    });

    return missingFields;
};

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}


