var sjcl = require('./sjcl.js')


// Generate a new pub/sec key pair, only called once
function KeyPair(){
    var pair = sjcl.ecc.elGamal.generateKeys(256)
    this.pair = pair;
    this.userDict = []
}

// Encrypt and send message using receivers pub key
KeyPair.prototype.EncryptMsg = function(msg, pub){
    var encMsg = sjcl.encrypt(pub, msg);

    return encMsg;
}

// Decrypt and return message using senders sec key
KeyPair.prototype.DecryptMsg = function(encMsg){
    var msg = sjcl.decrypt(this.pair.sec,msg)

    return msg;
}

// Sign a msg using senders private key
KeyPair.prototype.SignMsg = function(msg){
    var sigMsg = this.pair.sec.sign(sjcl.hash.sha256.hash(msg));

    return sigMsg;
}

// Verify a msg using receivers pub key
KeyPair.prototype.VerifyMsg = function(msg){
    var verMsg = pub.verify(sjcl.hash.sha256.hash(msg), sig)

    return verMsg;
}

// Add a user address + alias
KeyPair.prototype.AddUser = function(pub, alias){
    var user = {alias: pub};
    this.userDict.push(user);
}

// Send a message to a receivers pub key
KeyPair.prototype.SendMsg = function(msg, pub){
    sigMsg = KeyPair.SignMsg(msg);
    encMsg = KeyPair.EncryptMsg(msg, pub)

    return encMsg;
}

module.exports = KeyPair;
