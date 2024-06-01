
const mElement = document.getElementById('m');
const cElement = document.getElementById('c');
const resElement = document.getElementById('res');


document.getElementById('encryptBtn').addEventListener('click', function() {
    const message = mElement.value;
    const key = cElement.value; 
    if(!test(key)||!test(message)){
        alert("Le message et la clé doivent être composés uniquement de caractères alphabétiques et d'espaces.")
        if(!test(key)){cElement.value = ""}
        if(!test(message)){mElement.value = ""}
        return false;
    }
    else{
    resElement.style.opacity="1";
    const encryptedMessage = encryptDecrypt(message, key,'encrypt');
    resElement.innerHTML = encryptedMessage; }
});

document.getElementById('decryptBtn').addEventListener('click', function() {
    const encryptedMessage = mElement.value;
    const key = cElement.value; 
    if(!test(key)||!test(encryptedMessage)){
        alert("Le message et la clé doivent être composés uniquement de caractères alphabétiques et d'espaces.")
        if(!test(key)){cElement.value = ""}
        if(!test(message)){mElement.value = ""}
        return false;
    }
    else{
        resElement.style.opacity="1";
    const decryptedMessage = encryptDecrypt(encryptedMessage, key,'decrypt');
    resElement.innerHTML = decryptedMessage; 
    }
});
function encryptDecrypt(message, key, mode) {
    let result = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const keyLength = key.length;
    if (!key || key.length === 0) {
        return "Invalid key. Please enter an alphabetic key.";
    }
    key = key.replace(/[^a-zA-Z]/g, '').toLowerCase();
  
    for (let i = 0; i < message.length; i++) {
        let charIndex;
        if (/[\d\s\+\-\*\/]/.test(message[i])) {
            result += message[i];
            continue;
        }

        charIndex = alphabet.indexOf(message[i].toLowerCase());

        if (charIndex === -1) {
            result += message[i];
            continue;
        }

        let keyIndex = i % keyLength;
        let keyChar = key[keyIndex];
  
        if (mode === 'encrypt') {
            charIndex += keyChar.charCodeAt(0) - 97;
        } else if (mode === 'decrypt') {
            charIndex -= keyChar.charCodeAt(0) - 97;
            if (charIndex < 0) charIndex += 26;
        }
  
        if (charIndex > 25) charIndex %= 26;
  
        if (message[i] === message[i].toUpperCase()) {
            result += alphabet.charAt(charIndex).toUpperCase();
        } else {
            result += alphabet.charAt(charIndex);
        }
    }
  
    return result;
}
function test(str) {
    return /^[a-zA-Z\s]+$/.test(str);
}