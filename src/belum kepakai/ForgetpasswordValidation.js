function Validation(values){
    let errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!values.email.trim()) {
        errors.email = "Email should not be empty";
    } else if(!email_pattern.test(values.email)){
        errors.email = "Email format is invalid";
    }

    return errors;
}

export default Validation;
