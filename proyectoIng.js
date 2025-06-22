class Slot{
    constructor(){
        this.free = 0;
    }
    get updatedFree(){
        return this.free;
    }
    set updateFree(free){
        if (this.free === 0){
            this.free = 1;
        } else {
            this.free = 0;
        }
    }
}
class Floor{
    constructor(){
        this.arrSlot = [];
    }

    createFloor(){
        for(let i = 0; i < 5; i++){
            const obj = new Slot();
            this.arrSlot.push(obj);
        }
    }

    lookingForSlot(){
        for (let i = 0; i < this.arrSlot.length;i++){
            if (this.arrSlot[i].updatedFree === 1){
                return i;
            }
        }
        return -1;
    }

    changeFreeValue(nslot){
        this.arrSlot[nslot].updateFree = 1;
    }

}
class Parking{
    constructor(){
        this.arrFloor = [];
    }
    createParkingLot(){
        for (let i = 0; i < 7; i++){
            const obj = new Floor();
            obj.createFloor();
            this.arrFloor.push(obj);
        }
    }
    lookingforSlotFloor(){
        for (let i = 0; i < 7; i++){
            const temp = this.arrFloor[i].lookingForSlot();
            if (temp !== -1){
                return temp + (i + 1) *10;
            }
        }
        return -1;
    }
    changeFreeValue(nfloor, nslot){
        this.arrFloor[nfloor].changeFreeValue(nslot);
    }
}

const obj = new Parking();
obj.createParkingLot();
function changeFreeValue(nfloor, nslot){
    obj.changeFreeValue(nfloor, nslot);
}
function lookingForSlotFloor(){
    return obj.lookingforSlotFloor();
}

const buttons = document.querySelectorAll('.color-toggle');

buttons.forEach(button => {
  button.addEventListener('click', function () {
    this.classList.toggle('green');
    this.classList.toggle('red');
    let num = button.textContent;
    let firstDigit = Math.floor(num/10);
    let secondDigit = num%10;
    changeFreeValue(firstDigit-1, secondDigit);
  });
});


const button = document.getElementById('buscador');
button.addEventListener('click', function () {
    if (lookingForSlotFloor() === -1){
        document.getElementById('resultado').textContent= "No se encontraron estacionamientos disponibles";
    }
    else
    document.getElementById('resultado').textContent = "Debera dirigirse al estacionamiento: " + lookingForSlotFloor();
});