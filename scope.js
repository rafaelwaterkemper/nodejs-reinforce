function Outer() {

    this.criarQuadrado = function() {
        this.desenhar();
    }

    this.desenhar = function() {
        console.log('desenhando quadrado')
    }
}

function OuterFactory() {

    function desenhar() {
        console.log('desenhando')
    }

    function criarQuadrado() {
        desenhar();
    }
    return {
        desenhar,
        criarQuadrado
    }
}

// const outerO = new Outer();
// const externa = outerO.criarQuadrado
const outerFactory = OuterFactory()
// outerFactory.criarQuadrado();
var callable = outerFactory.criarQuadrado

// function another(criacao) {
//     console.log(this)
//     criacao();
// }

// another(outerO.criarQuadrado)