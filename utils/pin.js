class Pin {
    id
    street
    latitude
    longitude
    color

    constructor(street,lat,long,col) {
        this.street = street;
        this.latitude = lat;
        this.longitude = long;
        this.color = col;
    }
}
module.exports = Pin;