class Player {
    constructor(name, country) {
        this.name = name;
        this.country = country;
    }

    getDetails() {
        return { name: this.name, country: this.country }
    }
}

const mashrafi = new Player("Mashrafi", "Bangladesh");

const { nam, country } = mashrafi.getDetails();

console.log(`${nam} is from ${country}`)