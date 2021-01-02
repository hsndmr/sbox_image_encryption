importScripts('sha512.js');
importScripts('mersenne-twister.js');
importScripts('image-encryption.js');

onmessage = function(e) {
      let imageEncryption = new ImageEncryption(e.data[0]);
      if(e.data[2]){
        imageEncryption.encryptionImage(e.data[1])
          .then((imageData) => {
            postMessage(imageData);
        });
      } else {
        imageEncryption.decryptionImage(e.data[1])
          .then((imageData) => {
            postMessage(imageData);
        });
      }
      
}