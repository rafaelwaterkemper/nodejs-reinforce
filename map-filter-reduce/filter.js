const findHeroes = require('../tests-mocha-nock/service')

Array.prototype.myFilter = function (filter) {
    let newArray = []
    for (index in this) {
        if (!filter(this[index], index, this)) {
            continue
        }

        newArray.push(this[index])
    }
    return newArray
}

testFilter()

async function testFilter() {
    const { results } = await findHeroes('a');

    // const filtered = results.filter((heroe) => {
    //     return heroe.name.toLowerCase().indexOf('lars') !== -1
    // })

    // const filteredNames = filtered.map((heroe) => heroe.name)

    // console.log(`filtered ${filteredNames}`)

    const myFiltered = results.myFilter((heroe, index, lista) => {
        return heroe.name.toLowerCase().indexOf('lars') !== -1
    })

    const myFilteredNames = myFiltered.map((heroe) => heroe.name)

    console.log(`myFilteredNames ${myFilteredNames}`)
}
