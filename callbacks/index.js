const util = require('util')

function obterUsuario(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: 'Alladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '99998888',
            ddd: 48
        })
    }, 2000)
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'chega mais',
            numero: 7
        })
    }, 2000)
}

obterUsuario(function (err, usuario) {
    if (err) {
        console.log(`Falha na otenção do usuário, cause: ${err.message}`)
        return;
    }
    obterTelefone(usuario.id, function (err2, telefone) {
        if (err2) {
            console.log(`Falha na otenção do telefone do usuário, cause: ${err.message}`)
            return;
        }
        obterEndereco(usuario.id, function (err3, endereco) {
            if (err3) {
                console.log(`Falha na otenção do telefone do usuário, cause: ${err.message}`)
                return;
            }
            console.log(`
                Nome: ${usuario.nome},
                Rua: ${endereco.rua},
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        })
    })
});

//for use promisify, function should follow callback pattern fn(err, result)

const obterUsuarioAsync = util.promisify(obterUsuario);

obterUsuarioAsync()
    .then(usuario => {
        console.log(`User from async fn using promisify: `, JSON.stringify(usuario))
    })