import _ = require("lodash")



class Greeter {
    greeting: string
    
    constructor(message: string) {
        this.greeting = message
    }
    
    greet(): string {
        return this.greeting
    }
}

const greeter = new Greeter("Roo")

console.log(greeter.greet())