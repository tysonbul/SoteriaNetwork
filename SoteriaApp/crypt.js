var sjcl = require('./sjcl.js')


// Generate a new pub/sec key pair, only called once
function KeyPair(){
    var pair = sjcl.ecc.elGamal.generateKeys(256)
    this.pair = pair;
    this.userDict = [];
}

// Serialize public key
KeyPair.prototype.SerializePublicKey = function(pub){
  pub = sjcl.codec.base64.fromBits(pub.x.concat(pub.y));
}

// Unserialized public key
KeyPair.prototype.UnserializePublicKey = function(pub){
  pub = sjcl.codec.base64.fromBits(pub.x.concat(pub.y));
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

// SERIALIZATION //

// Serialize public key
KeyPair.prototype.SerializePublicKey = function(){
  return sjcl.codec.base64.fromBits(this.pair.pub.x.concat(this.pair.pub.y));
}

// Unserialized public key
KeyPair.prototype.UnserializePublicKey = function(pub){
  return new sjcl.ecc.elGamal.publicKey(
    sjcl.ecc.curves.c256, 
    sjcl.codec.base64.toBits(pub)
)
}

// Serialize public key
KeyPair.prototype.SerializeSecretKey = function(){
  return sjcl.codec.base64.fromBits(this.pair.sec)
}

// Unserialized public key
KeyPair.prototype.UnserializeSecretKey = function(sec){
  return new sjcl.ecc.elGamal.secretKey(
    sjcl.ecc.curves.c256,
    sjcl.ecc.curves.c256.field.fromBits(sjcl.codec.base64.toBits(sec))
)
}

module.exports = KeyPair;

var a = new KeyPair();
console.log(a)