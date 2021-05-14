
class Coordonates{
    longitude;
    lattitude;

    constructor(longitude, lattitude){
        this.longitude = longitude;
        this.lattitude = lattitude;
    }

    toString(){
        return this.longitude + ", "+ this.lattitude;
    }
}