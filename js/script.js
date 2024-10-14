


// Calculando usando Web Worker e mostrando tempo de execução
function calcularMatrizCliente() {
    const tamanho = parseInt(document.getElementById('matrix-size').value);

    if (!tamanho || tamanho <= 0) {
        document.getElementById('resultado-matriz-cliente').textContent = "Informe um tamanho válido!";
        return;
    }

    // Inicia a medição de tempo
    let start = performance.now();

    // Web Worker para cálculo da matriz
    const worker = new Worker('js/worker.js');
    worker.postMessage({ tamanho: tamanho });

    worker.onmessage = function(e) {
        // Finaliza a medição de tempo
        let end = performance.now();
        let tempoExecucao = end - start;

        // Exibe o resultado e o tempo de execução
        document.getElementById('resultado-matriz-cliente').textContent = `${e.data}. Tempo de execução no cliente: ${tempoExecucao.toFixed(2)} ms`;
    };

    worker.onerror = function(error) {
        document.getElementById('resultado-matriz-cliente').textContent = "Erro no cálculo!";
    };
}

// Função para calcular a matriz no servidor
function calcularMatrizServidor() {
    const tamanho = parseInt(document.getElementById('matrix-size').value);

    if (!tamanho || tamanho <= 0) {
        document.getElementById('resultado-matriz-servidor').textContent = "Informe um tamanho válido!";
        return;
    }

    // Envia os dados para o servidor
    fetch('php/calculos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ operacao: 'matriz', tamanho: tamanho })
    })
    .then(response => response.json())
    .then(data => {
        // Exibe o resultado e o tempo de execução que veio do servidor
        document.getElementById('resultado-matriz-servidor').textContent = `${data.resultado}. Tempo de execução no servidor: ${data.tempoExecucao.toFixed(2)} segundos`;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado-matriz-servidor').textContent = "Erro ao calcular no servidor!";
    });
}

// Função para calcular vetor no cliente
function calcularVetorCliente() {
    const tamanho = parseInt(document.getElementById('vetor-size').value);

    if (!tamanho || tamanho <= 0) {
        document.getElementById('resultado-vetor-cliente').textContent = "Informe um tamanho válido!";
        return;
    }

    // Inicia a medição de tempo
    let start = performance.now();

    let vetorA = gerarVetor(tamanho);
    let vetorB = gerarVetor(tamanho);
    let somaVetores = somarVetores(vetorA, vetorB);

    // Finaliza a medição de tempo
    let end = performance.now();
    let tempoExecucao = end - start;

    document.getElementById('resultado-vetor-cliente').textContent = `Soma de dois vetores de tamanho ${tamanho} calculada no cliente! Tempo de execução: ${tempoExecucao.toFixed(2)} ms`;
}

// Função para calcular vetor no servidor
function calcularVetorServidor() {
    const tamanho = parseInt(document.getElementById('vetor-size').value);

    if (!tamanho || tamanho <= 0) {
        document.getElementById('resultado-vetor-servidor').textContent = "Informe um tamanho válido!";
        return;
    }

    // Envia os dados para o servidor
    fetch('php/calculos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ operacao: 'vetor', tamanho: tamanho })
    })
    .then(response => response.json())
    .then(data => {
        // Exibe o resultado e o tempo de execução que veio do servidor
        document.getElementById('resultado-vetor-servidor').textContent = `${data.resultado}. Tempo de execução no servidor: ${data.tempoExecucao.toFixed(2)} segundos`;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado-vetor-servidor').textContent = "Erro ao calcular no servidor!";
    });
}

// Função para calcular série no cliente (Fibonacci ou Fatorial)
function calcularSerieCliente() {
    const tipo = document.getElementById('serie-type').value;
    const valor = parseInt(document.getElementById('serie-value').value);

    if (!valor || valor <= 0) {
        document.getElementById('resultado-serie-cliente').textContent = "Informe um valor válido!";
        return;
    }

    let start = performance.now();
    let resultado;

    if (tipo === 'fibonacci') {
        resultado = calcularFibonacci(valor);
    } else if (tipo === 'fatorial') {
        resultado = calcularFatorial(valor);
    }

    let end = performance.now();
    let tempoExecucao = end - start;

    document.getElementById('resultado-serie-cliente').textContent = `Resultado ${tipo}: ${resultado}. Tempo de execução: ${tempoExecucao.toFixed(2)} ms`;
}

// Função para calcular derivada ou integral no cliente
function calcularDerivadaIntegralCliente() {
    const tipo = document.getElementById('calculo-type').value;
    const valor = parseFloat(document.getElementById('calculo-value').value);

    if (isNaN(valor)) {
        document.getElementById('resultado-derivada-integral-cliente').textContent = "Informe um valor válido!";
        return;
    }

    let start = performance.now();
    let resultado;

    if (tipo === 'derivada') {
        resultado = `Derivada de x^2 em ${valor}: ${2 * valor}`; // Exemplo 
    } else if (tipo === 'integral') {
        resultado = `Integral de x de 0 a ${valor}: ${(valor ** 2) / 2}`; // Exemplo 
    }

    let end = performance.now();
    let tempoExecucao = end - start;

    document.getElementById('resultado-derivada-integral-cliente').textContent = `${resultado}. Tempo de execução: ${tempoExecucao.toFixed(2)} ms`;
}

// Função para gerar um vetor simples
function gerarVetor(tamanho) {
    let vetor = [];
    for (let i = 0; i < tamanho; i++) {
        vetor.push(Math.floor(Math.random() * 10));
    }
    return vetor;
}

// Função para somar dois vetores
function somarVetores(vetorA, vetorB) {
    let tamanho = vetorA.length;
    let vetorSoma = [];
    for (let i = 0; i < tamanho; i++) {
        vetorSoma.push(vetorA[i] + vetorB[i]);
    }
    return vetorSoma;
}

// Função para calcular Fibonacci
function calcularFibonacci(n) {
    let fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib[n];
}

// Função para calcular fatorial usando BigInt
function calcularFatorial(n) {
    let resultado = 1n;
    for (let i = 2n; i <= BigInt(n); i++) {
        resultado *= i;
    }
    return resultado.toString();
}


// Função para simular performance (potência)
function simularPerformancePotencia(iteracoes) {
    const start = performance.now();
    for (let i = 0; i < iteracoes; i++) {
        Math.pow(10, 20);
    }
    const end = performance.now();
    return (end - start) / 1000; // Tempo em segundos
}

// Função para simular performance (raiz quadrada)
function simularPerformanceRaizQuadrada(iteracoes) {
    const start = performance.now();
    for (let i = 0; i < iteracoes; i++) {
        Math.sqrt(1000);
    }
    const end = performance.now();
    return (end - start) / 1000; // Tempo em segundos
}


// Função para simular performance (potência e raiz quadrada)
function simularPerformanceCliente() {
    const tipo = document.getElementById('performance-tipo').value;
    const iteracoes = parseInt(document.getElementById('loop-count').value);

    if (!iteracoes || iteracoes <= 0) {
        document.getElementById('resultado-performance-cliente').textContent = "Informe um número de iterações válido!";
        return;
    }

    let tempoExecucao;

    if (tipo === 'potencia') {
        tempoExecucao = simularPerformancePotencia(iteracoes);
    } else if (tipo === 'raiz-quadrada') {
        tempoExecucao = simularPerformanceRaizQuadrada(iteracoes);
    }

    if (tempoExecucao !== undefined) {
        document.getElementById('resultado-performance-cliente').textContent = `Tempo de execução (${tipo}): ${tempoExecucao.toFixed(2)} segundos`;
    } else {
        document.getElementById('resultado-performance-cliente').textContent = "Erro ao realizar a simulação de performance!";
    }
}

// Função para calcular série no servidor (Fibonacci ou Fatorial)
function calcularSerieServidor() {
    const tipo = document.getElementById('serie-type').value;
    const valor = parseInt(document.getElementById('serie-value').value);

    if (!valor || valor <= 0) {
        document.getElementById('resultado-serie-servidor').textContent = "Informe um valor válido!";
        return;
    }

    // Envia os dados para o servidor
    fetch('php/calculos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ operacao: tipo, numero: valor })
    })
    .then(response => response.json())
    .then(data => {
        // Exibe o resultado e o tempo de execução que veio do servidor
        document.getElementById('resultado-serie-servidor').textContent = `${data.resultado}. Tempo de execução no servidor: ${data.tempoExecucao.toFixed(2)} segundos`;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado-serie-servidor').textContent = "Erro ao calcular no servidor!";
    });
}

// Função para calcular derivada ou integral no servidor
function calcularDerivadaIntegralServidor() {
    const tipo = document.getElementById('calculo-type').value;
    const valor = parseFloat(document.getElementById('calculo-value').value);

    if (isNaN(valor)) {
        document.getElementById('resultado-derivada-integral-servidor').textContent = "Informe um valor válido!";
        return;
    }

    // Envia os dados para o servidor (é necessário implementar a lógica correspondente no PHP)
    fetch('php/calculos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ operacao: tipo, valor: valor })
    })
    .then(response => response.json())
    .then(data => {
        // Exibe o resultado e o tempo de execução que veio do servidor
        document.getElementById('resultado-derivada-integral-servidor').textContent = `${data.resultado}. Tempo de execução no servidor: ${data.tempoExecucao.toFixed(2)} segundos`;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado-derivada-integral-servidor').textContent = "Erro ao calcular no servidor!";
    });
}

// Função para simular performance no servidor (potência e raiz quadrada)
function simularPerformanceServidor() {
    const tipo = document.getElementById('performance-tipo').value;
    const iteracoes = parseInt(document.getElementById('loop-count').value);

    if (!iteracoes || iteracoes <= 0) {
        document.getElementById('resultado-performance-servidor').textContent = "Informe um número de iterações válido!";
        return;
    }

    // Envia os dados para o servidor
    fetch('php/calculos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ operacao: 'simulacao_performance', iteracoes: iteracoes, tipo: tipo })
    })
    .then(response => response.json())
    .then(data => {
        // Exibe o resultado e o tempo de execução que veio do servidor
        document.getElementById('resultado-performance-servidor').textContent = `${data.resultado}. Tempo de execução no servidor: ${data.tempoExecucao.toFixed(2)} segundos`;
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado-performance-servidor').textContent = "Erro ao calcular no servidor!";
    });
}

