import Commander from 'commander'

import { database } from './database.mjs'

import Heroi from './heroi.mjs'

export async function main() {
    console.log(`process.argv ${JSON.stringify(process.argv)}`);

    Commander.version('v1')
        .option('-l, --listar', 'Lista os heróis do arquivo')
        .option('-c, --cadastrar [value]', 'Lista os heróis do arquivo')
        .option('-a, --atualizar [value]', 'Atualiza os dados de um herói')
        .option('-i, --id [value]', 'Id para a ser executado as operações de crud')
        .option('-n, --name [value]', 'Nome do heroi a ser cadastrado')
        .option('-s, --skill [value]', 'Skill do herói a ser cadastrado')
        .option('-r, --remover', 'Remove um herói do arquivo')
        .parse(process.argv)

        const heroi = new Heroi(Commander)

    try {
        if (Commander.listar) {
            const heroes = await database.findAll()
            console.log(`Heroes ${JSON.stringify(heroes)}`)
        }
        if(Commander.cadastrar) {
            const result = await database.save(heroi)
            console.log(`Herói cadastrado ${JSON.stringify(result)}`)
        }
    } catch (err) {
        console.log('Falha na execução do comando: ', err)
    }
}