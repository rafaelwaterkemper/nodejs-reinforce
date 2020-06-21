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
        console.log(JSON.stringify(usuario))
        return obterTelefone();
    })
    .then(telefone => {
        console.log(JSON.stringify(telefone))
        return obterEndereco();
    })
    .then(endereco => {
        console.log(JSON.stringify(endereco))
    })
    .catch(err => console.log(err))