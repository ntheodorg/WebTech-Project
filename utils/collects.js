class Collects {
    user_id
    pin_id
    material_type
    quantity

    constructor(user_id,pin_id,material_type,quantity) {
        this.user_id = user_id;
        this.pin_id = pin_id;
        this.material_type = material_type;
        this.quantity = quantity;
    }
}
module.exports = Collects;