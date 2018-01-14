var sjcl = require('./sjcl.js')

// UUID generating function
function uuidv4() {
 return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
   var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
   return v.toString(16);
 });
}

// Generate a new pub/sec key pair, only called once
function KeyPair(){
    var EncPair = sjcl.ecc.elGamal.generateKeys(256)
    var SignPair = sjcl.ecc.ecdsa.generateKeys(256)
    this.EncPair = EncPair;
    this.SignPair = SignPair
    this.uuid = uuidv4();
    this.userDict = [];
}


// Encrypt and send message using receivers pub key
function EncryptMsg(msg, pub){
    return sjcl.encrypt(pub, msg);
}

// Decrypt and return message using senders sec key
KeyPair.prototype.DecryptMsg = function(encMsg, sec){
    var msg = sjcl.decrypt(sec,encMsg)

    return msg;
}

// Sign a msg using senders private key
function SignMsg(msg, SignSec){
    return SignSec.sign(sjcl.hash.sha256.hash(msg));
}

// Verify a msg using receivers pub key
KeyPair.prototype.VerifyMsg = function(msg, SignPub){
    var verMsg = SignPub.verify(sjcl.hash.sha256.hash(msg), sig)

    return verMsg;
}

// Send a message to a receivers pub key
KeyPair.prototype.SendMsg = function(msg, EncPub, SignSec){
    sigMsg = SignMsg(msg, SignSec);
    encMsg = EncryptMsg(sigMsg, EncPub)

    return encMsg;
}

// SERIALIZATION //

// Serialize public key
KeyPair.prototype.SerializeEncPublicKey = function(){
  var pub = this.EncPair.pub.get();
  return sjcl.codec.base64.fromBits(pub.x.concat(pub.y));
}

KeyPair.prototype.SerializeSignPublicKey = function(){
  var pub = this.SignPair.pub.get();
  return sjcl.codec.base64.fromBits(pub.x.concat(pub.y));
}

// Unserialized public key
KeyPair.prototype.UnserializeEncPublicKey = function(pub){
  return new sjcl.ecc.elGamal.publicKey(
    sjcl.ecc.curves.c256,
    sjcl.codec.base64.toBits(pub)
)
}

// Unserialized public key
KeyPair.prototype.UnserializeSignPublicKey = function(pub){
  return new sjcl.ecc.ecdsa.publicKey(
    sjcl.ecc.curves.c256,
    sjcl.codec.base64.toBits(pub)
)
}

// Serialize public key
KeyPair.prototype.SerializeEncSecretKey = function(){
  var sec = this.EncPair.sec.get();
  return sjcl.codec.base64.fromBits(sec)
}

// Serialize public key
KeyPair.prototype.SerializeSignSecretKey = function(){
  var sec = this.SignPair.sec.get();
  return sjcl.codec.base64.fromBits(sec);
}

// Unserialized public key
KeyPair.prototype.UnserializeEncSecretKey = function(sec){
  return new sjcl.ecc.elGamal.secretKey(
      sjcl.ecc.curves.c256,
      sjcl.ecc.curves.c256.field.fromBits(sjcl.codec.base64.toBits(sec))
  )
}

KeyPair.prototype.UnserializeSignSecretKey = function(sec){
  return new sjcl.ecc.ecdsa.secretKey(
      sjcl.ecc.curves.c256,
      sjcl.ecc.curves.c256.field.fromBits(sjcl.codec.base64.toBits(sec))
  )
}


module.exports = KeyPair;
