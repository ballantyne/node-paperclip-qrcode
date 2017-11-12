
const Jimp        = require('jimp');
const klass       = require('klass');
const QrCode      = require('qrcode-reader');

module.exports    = klass(function(paperclip) {
  this.paperclip  = paperclip;
}).methods({

  perform: function(options, next) {

    var self      = this;
    var attribute;
    
    if (options.attribute) {
    
      attribute   = options.attribute;
    
    } else {
      
      attribute   = 'qrcode';
    
    }
    
    Jimp.read(self.paperclip.file().file.buffer, function(err, image) {
      if (err) {
        console.error(err);
      }
      
      var qr = new QrCode();
      qr.callback = function(err, value) {
      
        var object = {};
        if (value && value.result) {
          object[attribute] = value.result;
        }

        if (next) {
          next(err, object);
        }     
      
      };
    
      qr.decode(image.bitmap);
    
    });
  }

});
