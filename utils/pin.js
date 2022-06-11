class Pin {
    id
    latitude
    longitude
    color

    constructor(lat,long,col) {
        this.latitude = lat;
        this.longitude = long;
        this.color = col;
    }
}
module.exports = Pin;