function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
}

function esPasswordValido(password) {
    const regex = /^[a-zA-Z0-9]{8}$/; 
    return regex.test(password);
}