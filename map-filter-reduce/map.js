var findHeroes = require('./service')

Array.prototype.meuMap = function (callback) {
    const newArray = []
    for (let index = 0; index < this.length - 1; index++) {
        let returned = callback(this[index], index)
        newArray.push(returned)
    }
    return newArray
}

async function testMap() {
    const heroes = await findHeroes('a')

    // const names = heroes.results.map((heroe) => {
    //     return heroe.name;
    // })
    // 
    // console.log(names)

    const namesFromMyMap = heroes.results.meuMap((item, index) => {
        return `[${index}] - ${item.name}`
    })

    console.log(namesFromMyMap)

}

testMap();