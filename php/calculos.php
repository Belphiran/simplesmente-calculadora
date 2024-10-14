<?php

ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', 'C:Documents\Logs\php_errors.log');

header('Content-Type: application/json');

// Recebe os dados JSON do cliente
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['operacao'])) {

    // Função para gerar um vetor com números aleatórios
function gerarVetor($tamanho) {
    $vetor = [];
    for ($i = 0; $i < $tamanho; $i++) {
        $vetor[] = rand(0, 9); // Gera números aleatórios entre 0 e 9
    }
    return $vetor;
}

// Função para calcular fatorial de grandes números usando BCMath
function fatorialGrande($n) {
    $resultado = '1';
    for ($i = 2; $i <= $n; $i++) {
        $resultado = bcmul($resultado, (string)$i);
    }
    return $resultado;
}


// Função para somar dois vetores
function somarVetores($vetorA, $vetorB) {
    $tamanho = count($vetorA);
    $vetorSoma = [];
    for ($i = 0; $i < $tamanho; $i++) {
        $vetorSoma[] = $vetorA[$i] + $vetorB[$i];
    }
    return $vetorSoma;
}

// Função para calcular a derivada numérica de uma função em um ponto
function calcularDerivada($funcao, $ponto) {
    $h = 0.00001;
    $derivada = ($funcao($ponto + $h) - $funcao($ponto)) / $h;
    return $derivada;
}

// Função para calcular a integral numérica de uma função em um intervalo
function calcularIntegral($funcao, $a, $b, $n = 1000) {
    $h = ($b - $a) / $n;
    $integral = 0;
    for ($i = 0; $i < $n; $i++) {
        $x = $a + $i * $h;
        $integral += $funcao($x) * $h;
    }
    return $integral;
}


// Função para multiplicar duas matrizes grandes
function multiplicarMatrizes($matrizA, $matrizB) {
    $linhasA = count($matrizA);
    $colunasA = count($matrizA[0]);
    $colunasB = count($matrizB[0]);
    $resultado = array_fill(0, $linhasA, array_fill(0, $colunasB, 0));

    for ($i = 0; $i < $linhasA; $i++) {
        for ($j = 0; $j < $colunasB; $j++) {
            for ($k = 0; $k < $colunasA; $k++) {
                $resultado[$i][$j] += $matrizA[$i][$k] * $matrizB[$k][$j];
            }
        }
    }

    return $resultado;
}



function gerarMatrizGauss($tamanho) {
    $matriz = [];
    for ($i = 0; $i < $tamanho; $i++) {
        $linha = [];
        for ($j = 0; $j < $tamanho + 1; $j++) {
            $linha[] = rand(0, 9); // Gera números aleatórios entre 0 e 9
        }
        $matriz[] = $linha;
    }
    return $matriz;
}




// Função para eliminação de Gauss - APENAS NUMERO -0, não conseguii encontrar o erro
function eliminacaoGaussServidor(&$matriz) {
    $n = count($matriz);

    for ($i = 0; $i < $n; $i++) {
        // Encontrar o pivô máximo na coluna atual
        $max = $i;
        for ($k = $i + 1; $k < $n; $k++) {
            if (abs($matriz[$k][$i]) > abs($matriz[$max][$i])) {
                $max = $k;
            }
        }

        // Trocar a linha atual com a linha que tem o maior pivô, se necessário
        if ($i != $max) {
            $temp = $matriz[$i];
            $matriz[$i] = $matriz[$max];
            $matriz[$max] = $temp;
        }

        // Verificar se o pivô é muito pequeno ou zero
        if (abs($matriz[$i][$i]) < 1e-10) {
            error_log("Erro: pivô muito pequeno ou igual a zero.");
            return array_fill(0, $n, "Solução indefinida ou múltiplas soluções"); // Melhorar a mensagem de erro
        }

        // Eliminação
        for ($k = $i + 1; $k < $n; $k++) {
            $fator = $matriz[$k][$i] / $matriz[$i][$i];
            for ($j = $i; $j < $n + 1; $j++) {
                $matriz[$k][$j] -= $fator * $matriz[$i][$j];
            }
        }
    }

    // Resolver o sistema triangular superior
    $solucao = array_fill(0, $n, 0);
    for ($i = $n - 1; $i >= 0; $i--) {
        $soma = 0;
        for ($j = $i + 1; $j < $n; $j++) {
            $soma += $matriz[$i][$j] * $solucao[$j];
        }
        $solucao[$i] = ($matriz[$i][$n] - $soma) / $matriz[$i][$i];
    }

    return $solucao;
}







    $operacao = $data['operacao'];
    $tamanho = isset($data['tamanho']) ? intval($data['tamanho']) : null;

    switch ($operacao) {
        case 'fibonacci':
            if (isset($data['numero'])) {
                $numero = intval($data['numero']);
                $start = microtime(true);
                $fibSequence = [0, 1];
                for ($i = 2; $i < $numero; $i++) {
                    $fibSequence[] = $fibSequence[$i - 1] + $fibSequence[$i - 2];
                }
                $end = microtime(true);
                $tempoExecucao = $end - $start;

                echo json_encode([
                    'resultado' => 'Sequência de Fibonacci até o termo ' . $numero . ': ' . implode(', ', $fibSequence),
                    'tempoExecucao' => $tempoExecucao
                ]);
            } else {
                echo json_encode([
                    'resultado' => 'Número não fornecido',
                    'tempoExecucao' => null
                ]);
            }
            break;

        case 'fatorial':
            if (isset($data['numero'])) {
                $numero = intval($data['numero']);
                $start = microtime(true);
                $resultado = fatorialGrande($numero);
                $end = microtime(true);
                $tempoExecucao = $end - $start;

                echo json_encode([
                    'resultado' => "Fatorial de $numero: $resultado",
                    'tempoExecucao' => $tempoExecucao
                ]);
            } else {
                echo json_encode([
                    'resultado' => 'Número não fornecido',
                    'tempoExecucao' => null
                ]);
            }
            break;

        case 'sistema_linear':
            if (isset($data['matriz']) && isset($data['vetor'])) {
                $matriz = $data['matriz'];
                $vetor = $data['vetor'];
                $start = microtime(true);
                $resultado = resolverSistemaLinearPHP($matriz, $vetor);
                $end = microtime(true);
                $tempoExecucao = $end - $start;

                echo json_encode([
                    'resultado' => 'Solução do sistema: ' . implode(', ', $resultado),
                    'tempoExecucao' => $tempoExecucao
                ]);
            } else {
                echo json_encode([
                    'resultado' => 'Dados não fornecidos',
                    'tempoExecucao' => null
                ]);
            }
            break;


            case 'gauss':
                if (isset($data['matriz'])) {
                    $matriz = $data['matriz'];
                    $start = microtime(true);
                    $resultado = eliminacaoGaussServidor($matriz);
                    $end = microtime(true);
                    $tempoExecucao = $end - $start;
    
                    echo json_encode([
                        'resultado' => 'Solução do sistema: ' . implode(', ', $resultado),
                        'tempoExecucao' => $tempoExecucao
                    ]);
                } else {
                    echo json_encode(['resultado' => 'Matriz não fornecida', 'tempoExecucao' => null]);
                }
                break;


        case 'determinante':
            if (isset($data['matriz'])) {
                $matriz = $data['matriz'];
                $start = microtime(true);
                $determinante = calcularDeterminantePHP($matriz);
                $end = microtime(true);
                $tempoExecucao = $end - $start;

                echo json_encode([
                    'resultado' => 'Determinante: ' . $determinante,
                    'tempoExecucao' => $tempoExecucao
                ]);
            } else {
                echo json_encode([
                    'resultado' => 'Matriz não fornecida',
                    'tempoExecucao' => null
                ]);
            }
            break;

        case 'simulacao_performance':
            if (isset($data['iteracoes']) && isset($data['tipo'])) {
                $iteracoes = intval($data['iteracoes']);
                $tipo = $data['tipo'];
                $start = microtime(true);

                if ($tipo === 'potencia') {
                    for ($i = 0; $i < $iteracoes; $i++) {
                        pow(10, 20);
                    }
                } elseif ($tipo === 'raiz_quadrada') {
                    for ($i = 0; $i < $iteracoes; $i++) {
                        sqrt(1000);
                    }
                } else {
                    echo json_encode(['resultado' => 'Tipo de operação inválido', 'tempoExecucao' => null]);
                    exit;
                }

                $end = microtime(true);
                $tempoExecucao = $end - $start;

                echo json_encode([
                    'resultado' => "Simulação de $iteracoes iterações ($tipo) completada",
                    'tempoExecucao' => $tempoExecucao
                ]);
            } else {
                echo json_encode(['resultado' => 'Número de iterações ou tipo de operação não fornecido', 'tempoExecucao' => null]);
            }
            break;

            case 'derivada':
                if (isset($data['valor'])) {
                    $ponto = floatval($data['valor']);
                    $start = microtime(true);
            
                    // Defina a função que deseja derivar
                    $funcao = function($x) {
                        return pow($x, 2); // Exemplo: f(x) = x^2
                    };
            
                    $resultado = calcularDerivada($funcao, $ponto);
                    $end = microtime(true);
                    $tempoExecucao = $end - $start;
            
                    echo json_encode([
                        'resultado' => "Derivada em $ponto: $resultado",
                        'tempoExecucao' => $tempoExecucao
                    ]);
                } else {
                    echo json_encode([
                        'resultado' => 'Valor não fornecido',
                        'tempoExecucao' => null
                    ]);
                }
                break;
            
            case 'integral':
                if (isset($data['valor'])) {
                    $limiteSuperior = floatval($data['valor']);
                    $limiteInferior = 0; // Pode ajustar conforme necessário
                    $start = microtime(true);
            
                    // Defina a função que deseja integrar
                    $funcao = function($x) {
                        return $x; // Exemplo: f(x) = x
                    };
            
                    $resultado = calcularIntegral($funcao, $limiteInferior, $limiteSuperior);
                    $end = microtime(true);
                    $tempoExecucao = $end - $start;
            
                    echo json_encode([
                        'resultado' => "Integral de $limiteInferior a $limiteSuperior: $resultado",
                        'tempoExecucao' => $tempoExecucao
                    ]);
                } else {
                    echo json_encode([
                        'resultado' => 'Valor não fornecido',
                        'tempoExecucao' => null
                    ]);
                }
                break;


                case 'multiplicar_matrizes':
                    if (isset($data['matrizA']) && isset($data['matrizB'])) {
                        $matrizA = $data['matrizA'];
                        $matrizB = $data['matrizB'];
                        $start = microtime(true);
                        $resultado = multiplicarMatrizes($matrizA, $matrizB);
                        $end = microtime(true);
                        $tempoExecucao = $end - $start;
                
                        echo json_encode([
                            'resultado' => 'Resultado da multiplicação de matrizes: ' . json_encode($resultado),
                            'tempoExecucao' => $tempoExecucao
                        ]);
                    } else {
                        echo json_encode([
                            'resultado' => 'Matrizes não fornecidas',
                            'tempoExecucao' => null
                        ]);
                    }
                    break;
                
            

        case 'matriz':
            if (isset($data['tamanho'])) {
                $tamanho = intval($data['tamanho']);
                $start = microtime(true);

                // Simulação de algum processamento para a matriz (por exemplo, preencher a matriz)
                $matriz = array_fill(0, $tamanho, array_fill(0, $tamanho, rand(0, 10)));

                $end = microtime(true);
                $tempoExecucao = $end - $start;

                echo json_encode([
                    'resultado' => "Matriz de tamanho {$tamanho} processada",
                    'tempoExecucao' => $tempoExecucao
                ]);
            } else {
                echo json_encode(['resultado' => 'Tamanho da matriz não fornecido', 'tempoExecucao' => null]);
            }
            break;

        case 'vetor':
            if (isset($data['tamanho'])) {
                $tamanho = intval($data['tamanho']);
                $start = microtime(true);
                $vetorA = gerarVetor($tamanho);
                $vetorB = gerarVetor($tamanho);
                $somaVetores = somarVetores($vetorA, $vetorB);
                $end = microtime(true);
                $tempoExecucao = $end - $start;

                echo json_encode([
                    'resultado' => 'Soma de dois vetores de tamanho ' . $tamanho . ': ' . implode(', ', $somaVetores),
                    'tempoExecucao' => $tempoExecucao
                ]);
            } else {
                echo json_encode(['resultado' => 'Tamanho do vetor não fornecido', 'tempoExecucao' => null]);
            }
            break;

        default:
            echo json_encode(['resultado' => 'Operação inválida', 'tempoExecucao' => null]);
            break;
    }
} else {
    echo json_encode(['resultado' => 'Dados inválidos', 'tempoExecucao' => null]);
}
