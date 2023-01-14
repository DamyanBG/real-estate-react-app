export const homeFormnItialValues = {
    title: '',
    city: '',
    neighborhood: '',
    address: '',
    longitude: '',
    latitude: '',
    price: '',
    size: '',
    year: '',
    description: '',
};

export const homeFormValidateConditions = (values) => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required';
    } else if (values.title.length < 3 || values.title.length > 150) {
        errors.title = 'min 3 chars max 150';
    }
    if (!values.city) {
        errors.city = 'Required';
    } else if (values.city.length < 3 || values.city.length > 150) {
        errors.city = 'min 3 chars max 150';
    }
    if (!values.neighborhood) {
        errors.neighborhood = 'Required';
    } else if (values.neighborhood.length < 3 || values.neighborhood.length > 150) {
        errors.neighborhood = 'min 3 chars max 150';
    }
    if (values.address.length < 3 || values.address.length > 150) {
        errors.address = 'min 3 chars max 150';
    }
    if (values.longitude.length > 50) {
        errors.longitude = 'max 50 chars';
    }
    if (values.latitude.length > 50) {
        errors.latitude = 'max 50 chars';
    }
    if (!values.price) {
        errors.price = 'Required';
    } else if (values.price.length > 50) {
        errors.price = 'max 50 chars';
    } else if (isNaN(values.price)) {
        errors.price = 'must be a valid number';
    }
    if (!values.size) {
        errors.size = 'Required';
    } else if (values.size.length > 50) {
        errors.size = 'max 50 chars';
    } else if (isNaN(values.size)) {
        errors.size = 'must be a valid number';
    }
    if (!values.year) {
        errors.year = 'Required';
    } else if (values.year.length > 5) {
        errors.year = 'max 5 chars';
    } else if (isNaN(values.year)) {
        errors.year = 'must be a valid number';
    }
    if (!values.description) {
        errors.description = 'Required';
    } else if (values.description.length < 5 || values.description.length > 150) {
        errors.description = 'min 5 chars max 150';
    }
    return errors;
};
