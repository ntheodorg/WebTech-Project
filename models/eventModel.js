// save event in the database
const EventSchema = require("./schemas/eventSchema");

function saveEvent(data,res){
    const event = new EventSchema({
        title: data.title,
        text: data.text,
        eventLink: data.eventLink
    });
    event.save();
    res.writeHead(200,{'Content-type' : 'application/json'});
    res.end(JSON.stringify("true"));
}

function getAllEvents(res){
    EventSchema.find()
        .then((result) =>{
            res.writeHead(200,{'Content-type' : 'application/json'});
            result.forEach((object) => {
                object.title = object.title.replace(/\+/g, " ");
                object.text = object.text.replace(/\+/g, " ");
                object.eventLink = object.eventLink.replace(/\+/g, " ");
            })
            res.end(JSON.stringify(result));
        })
        .catch((err) => {
            console.log(err);
        });
}

function deleteEvent(data,res) {
    EventSchema.find()
        .then((result) =>{
            result.forEach((object) => {
                object.title = object.title.replace(/\+/g, " ");
                if(object.title === data.title)
                {
                    res.writeHead(200,{'Content-type' : 'application/json'});
                    EventSchema.findByIdAndDelete(object.id, function (err) {
                        if (err) {
                            res.end(JSON.stringify("false"));
                        } else {
                            res.end(JSON.stringify("true"));
                        }
                    })
                }
            })
        })
}

module.exports = {
    saveEvent,
    getAllEvents,
    deleteEvent
}