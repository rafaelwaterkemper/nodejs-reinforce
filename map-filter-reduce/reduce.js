const FindHeroes = require('./service')

Array.prototype.myReduce = function(callback, initial) {
    let total = typeof initial !== undefined ? initial : this[0]
    for (let index = 0; index <= this.length - 1; index++) {
        total = callback(total, this[index])
    }
    return total
}

testReduce()

async function testReduce() {
    const { results } = await FindHeroes('a');

    const heights = results.map(heroe => parseInt(heroe.height))

    // const total = heights.reduce((before, after) => {
    //     return before + after
    // }, 0);

    // console.log(`Total heigth of heroes that contains 'a' in your name is ${total}`)

    const total = heights.myReduce((before, after) => {
        return before + after
    }, 0);

    console.log(`Total heigth of heroes that contains 'a' in your name is ${total}`)
}