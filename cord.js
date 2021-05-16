let Direction = {
    North: 'North',
    South: 'South',
    West: 'West',
    East: 'East'
}

let semiWays = (side1, side2) => {
    if(side1 === side2){
        return 'sm'
    }
    if(side1 === 'North' && side2 === 'South' || side1 === 'South' && side2 === 'North') {
        return 'dif'
    }
    if(side1 === 'East' && side2 === 'West' || side1 === 'West' && side2 === 'East') {
        return 'dif'
    }
}

class CoordinateYT {

    constructor(degree = 0, minute = 0, second = 0, way = Direction.North) {
        this.degree = degree;
        this.minute = minute;
        this.second = second;
        this.way = way;

        if(degree > 180 || -180 >degree) {
            if(way === Direction.West && way === Direction. South) {
                if(degree > 90 && -90 > degree) {
                    console.log(`Incorrect value for latitude`)
                    return null
                }
            }
            console.log(`Incorrect value for longitude`)
            return null
        }
        if(degree === 180 || degree === 90) {
            if(minute > 0 && second > 0) {
                console.log(`Incorrect value for longitude`)
                return null
            }
        }
        if(minute === 59 || 0 > minute){
            console.log(`Incorrect value for minute - ${minute}`)
            return null
        }
        if(second > 59 || 0 > second) {
            console.log(`Incorrect value for minute - ${second}`)
            return null
        }
    }

    toStringF() {
        return `${this.degree}°${this.minute}′${this.second}'' ${this.way}`
    }

    toStringS() {
        return `${this.degree},${this.minute}${this.second}° ${this.way}`
    }

     average (cord1) {
        let degree = this.degree;
        let minute = this.minute;
        let second = this.second;
        let way = this.way
        if(semiWays(cord1.way, way) === 'dif'){
            return new CoordinateYT(
                (degree + cord1.degree) / 2,
                (minute + cord1.minute) / 2,
                (second + cord1.second) / 2,
                `${way}-${cord1.way}`
            )
        }
        if(semiWays(cord1.way, way) === 'sm'){
           return new CoordinateYT(
               (degree + cord1.degree) / 2,
               (minute + cord1.minute) / 2,
               (second + cord1.second) / 2,
               way
           )
        } else {
            console.log(`can't find coordinate average`)
            return null
        }
    }

    static AverageYT (cord1, cord2) {
       if(semiWays(cord1.way, cord2.way) === 'dif') {
           return new CoordinateYT(
               (cord2.degree + cord1.degree) / 2,
               (cord2.minute + cord1.minute) / 2,
               (cord2.second + cord1.second) / 2,
               `${cord1.way}-${cord2.way}`
           )
       } else {
           if(semiWays(cord1.way, cord2.way) === 'sm') {
               return new CoordinateYT(
                   (cord2.degree + cord1.degree) / 2,
                   (cord2.minute + cord1.minute) / 2,
                   (cord2.second + cord1.second) / 2,
                   cord2.way
               )
           } else {
               console.log(`can't find coordinate average`)
               return null
           }
       }
    }
}


console.log('Коректність введених данних')
let NCorrCord = new CoordinateYT(90, 30, 20, 'North')
console.log('')

console.log('Ввід координат')
let cord1 = new CoordinateYT(68, 41,31, 'East')
console.log(cord1.toStringF())
console.log(cord1.toStringS())
console.log('')

console.log('Наявний та поточний')
let cord2 = new CoordinateYT(12, 30, 40, 'North')
let average = new CoordinateYT(12, 30, 40, 'South')
console.log(cord2.average(average).toStringF())
console.log('')

console.log('Вхідні параметри -> об\'єкти')
let cord3 = new CoordinateYT(15, 11, 10, 'West')
let cord4 = new CoordinateYT(23, 29, 32, 'West')
let res = CoordinateYT.AverageYT(cord3, cord4)
console.log(res.toStringS())
