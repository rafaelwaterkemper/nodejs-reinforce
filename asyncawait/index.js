//async return a promise, if other values are returned, a promise resolved is returned with value
async function obterUsuario() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                nome: 'rafael',
                idade: 24,
                dataNascimento: new Date(1996, 7, 21)
            })
        }, 1500)
    })
}

function obterTelefone(usuarioId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                numero: '48 996700317',
                ddd: 48,
                operadora: 'TIM'
            })
        }, 1500)
    })
}

function obterEndereco() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                rua: 'Node hardcore',
                numero: 1548,
                bairro: 'CENTRO'
            })
        }, 1500)
    })
}

obterUsuario().then(value => console.log(value))
// main();

// async turn functions into Promises
async function main() {

    try {
        console.time('measure-execution')
        const usuario = await obterUsuario();
        const results = await Promise.all([
            obterTelefone(usuario.id),
            obterEndereco(usuario.id)
        ])
        console.timeEnd('measure-execution')
        const telefone = results[0]
        const endereco = results[1]

        console.log(`
            nome: ${usuario.nome},
            endereco: ${endereco.rua} - ${endereco.numero},
            telefone: ${telefone.ddd} - ${telefone.numero} 
        `)
    } catch (err) {
        console.log(`Falha na execução ${err}`)
    }
}
