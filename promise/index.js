function obterUsuario() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                nome: 'Alladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                telefone: '99998888',
                ddd: 48
            })
        }, 2000)
    })
}

function obterEndereco(idUsuario) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                rua: 'chega mais',
                numero: 7
            })
        }, 2000)
    })
}

obterUsuario()
    .then(usuario => {
        return obterTelefone()
            .then(telefone => {
                return {
                    usuario: usuario,
                    telefone: telefone
                }
            });
    })
    .then(usuarioWithTelefone => {
        return obterEndereco()
            .then(endereco => {
                return {
                    usuario: usuarioWithTelefone.usuario,
                    telefone: usuarioWithTelefone.telefone,
                    endereco: endereco
                }
            });
    })
    .then(usuarioFullfilled => {
        console.log(JSON.stringify(usuarioFullfilled))
        throw new Error(`Intercepted this error exception`)
    })
    .catch(err => console.log(err.message))