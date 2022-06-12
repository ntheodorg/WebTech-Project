// save pin in the database
const PinSchema = require("./schemas/pinSchema");

function savePin(Pin){
 const pin = new PinSchema({
     street: Pin.street,
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
         result.forEach((object) => {

             object.street = object.street.replace(/\+/g, " ");

         })
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