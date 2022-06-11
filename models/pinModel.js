// save pin in the database
const PinSchema = require("./schemas/pinSchema");

function savePin(Pin){
 const pin = new PinSchema({
  latitude: Pin.latitude,
  longitude: Pin.longitude,
  color: Pin.color
 });
 pin.save();
};

function getAllPins(res){
 PinSchema.find()
     .then((result) =>{
         res.writeHead(200,{'Content-type' : 'application/json'});
         res.end(JSON.stringify(result));
     })
     .catch((err) => {
      console.log(err);
     });
};

module.exports = {
 savePin,
 getAllPins
}