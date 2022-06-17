// save event in the database
const CollectsSchema = require("./schemas/collectsSchema");

function saveCollects(data,res){
    const collects = new CollectsSchema({
        user_id: data.user_id,
        pin_id: data.pin_id,
        material_type: data.material_type,
        quantity: data.quantity
    });
    collects.save();
    res.writeHead(200,{'Content-type' : 'application/json'});
    res.end(JSON.stringify("true"));
}

function getAllCollects(res){
    CollectsSchema.find()
        .then((result) =>{
            res.writeHead(200,{'Content-type' : 'application/json'});
            res.end(JSON.stringify(result));
        })
        .catch((err) => {
            console.log(err);
        });
}

function deleteCollects(collects_id,res) {
    CollectsSchema.find()
        .then((result) =>{
            result.forEach((object) => {
                    res.writeHead(200,{'Content-type' : 'application/json'});
                    CollectsSchema.findByIdAndDelete(collects_id, function (err) {
                        if (err) {
                            res.end(JSON.stringify("false"));
                        } else {
                            res.end(JSON.stringify("true"));
                        }
                    })
            })
        })
}

module.exports = {
    saveCollects,
    getAllCollects,
    deleteCollects
}