// save pin in the database
const PinSchema = require("./schemas/pinSchema");

function savePin(data,res){
 const pin = new PinSchema({
     street: data.street,
     latitude: data.latitude,
     longitude: data.longitude,
     reports_number : 0,
     color: 'green',
     common: data.common,
     plastic: data.plastic,
     metal: data.metal,
     paper: data.paper
 });
 pin.save();
 res.writeHead(200,{'Content-type' : 'application/json'});
 res.end(JSON.stringify("true"));
}

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
}

function deletePin(data,res) {
    PinSchema.find()
        .then((result) =>{
            result.forEach((object) => {
                object.street = object.street.replace(/\+/g, " ");
                if(object.street === data.street)
                {
                    PinSchema.findByIdAndDelete(object.id, function (err) {
                        if (err) {
                            res.writeHead(404,{'Content-type' : 'application/json'});
                            res.end(JSON.stringify("false"));
                        } else {
                            res.writeHead(200,{'Content-type' : 'application/json'});
                            res.end(JSON.stringify("true"));
                        }
                    })
                }
            })
        })
}

function patchPinQuarter(data,res) {
    PinSchema.updateOne({_id:data.pin_id}, {$set : {quarter:data.quarter}}, function(err,funRes) {
        if(err) {
            res.writeHead(404,{'Content-type' : 'application/json'});
            res.end(JSON.stringify("false"));
        }
        else{
            console.log("1 document updated");
            res.writeHead(202,{'Content-type' : 'application/json'});
            res.end(JSON.stringify("true"));
        }
    })
}

module.exports = {
    savePin,
    getAllPins,
    deletePin,
    patchPinQuarter
}