
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
