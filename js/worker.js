//Worker.js

//ver se ta funfando
// worker.js - ajuda no calculo de matrizes grandes

self.onmessage = function(e) {
    console.log('Worker ativo, recebendo mensagem...');  // Adicionando para ver no console
    const tamanho = e.data.tamanho;
    let matrizA = gerarMatriz(tamanho);
    let matrizB = gerarMatriz(tamanho);
    let somaMatriz = somarMatrizes(matrizA, matrizB);
    self.postMessage(`Soma de matriz ${tamanho}x${tamanho} calculada no cliente!`);
};


function gerarMatriz(tamanho) {
    let matriz = [];
    for (let i = 0; i < tamanho; i++) {
        let linha = [];
        for (let j = 0; j < tamanho; j++) {
            linha.push(Math.floor(Math.random() * 10));
        }
        matriz.push(linha);
    }
    return matriz;
}

function somarMatrizes(matrizA, matrizB) {
    let tamanho = matrizA.length;
    let matrizSoma = [];
    for (let i = 0; i < tamanho; i++) {
        let linha = [];
        for (let j = 0; j < tamanho; j++) {
            linha.push(matrizA[i][j] + matrizB[i][j]);
        }
        matrizSoma.push(linha);
    }
    return matrizSoma;
}


//Multiplicando matrizes grandes

self.onmessage = function(e) {
    console.log('Worker ativo, recebendo mensagem...');  
    const { operacao, matrizA, matrizB, tamanho } = e.data;

    if (operacao === 'soma_matrizes') {
        let matrizA = gerarMatriz(tamanho);
        let matrizB = gerarMatriz(tamanho);
        let somaMatriz = somarMatrizes(matrizA, matrizB);
        self.postMessage(`Soma de matriz ${tamanho}x${tamanho} calculada no cliente!`);
    } else if (operacao === 'multiplicar_matrizes') {
        let matrizA = gerarMatriz(tamanho);
        let matrizB = gerarMatriz(tamanho);
        let produtoMatriz = multiplicarMatrizes(matrizA, matrizB);
        self.postMessage(`Produto de matriz ${tamanho}x${tamanho} calculada no cliente!`);
    }
};

function multiplicarMatrizes(matrizA, matrizB) {
    const tamanho = matrizA.length;
    let resultado = Array(tamanho).fill().map(() => Array(tamanho).fill(0));

    for (let i = 0; i < tamanho; i++) {
        for (let j = 0; j < tamanho; j++) {
            for (let k = 0; k < tamanho; k++) {
                resultado[i][j] += matrizA[i][k] * matrizB[k][j];
            }
        }
    }
    return resultado;
}

