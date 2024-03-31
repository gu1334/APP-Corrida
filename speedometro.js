// Seleciona o elemento que exibirá a velocidade
const speedElement = document.querySelector("#speed");

// Seleciona os botões de iniciar e parar
const startBtn = document.querySelector("#Start");
const stopBtn = document.querySelector("#Stop");

// Variável para armazenar o ID do observador de geolocalização
let watchID = null;

// Variável para armazenar os dados da viagem atual
let currentRide = null;

// Adiciona um ouvinte de evento para o clique no botão "Start"
startBtn.addEventListener("click", () => {
  // Se já estiver assistindo a posição, retorna
  if (watchID) return;

  // Função para lidar com o sucesso da obtenção da posição
  function handleSuccess(position) {
    // Adiciona a posição à viagem atual
    addPosition(currentRide, position);
    console.log(position);
    // Atualiza a exibição da velocidade no elemento HTML
    speedElement.innerText = position.coords.speed
      ? (position.coords.speed * 3.6).toFixed(1) // Converte a velocidade de m/s para km/h
      : 0;
  }

  // Função para lidar com erros na obtenção da posição
  function handleError(error) {
    console.log("Erro: " + error.message); // Exibe a mensagem de erro no console
  }

  // Opções para a obtenção da posição
  const options = { enableHighAccuracy: true };

  // Cria uma nova viagem
  currentRide = createNewRide();

  // Inicia a observação da posição do dispositivo
  watchID = navigator.geolocation.watchPosition(
    handleSuccess,
    handleError,
    options
  );

  // Esconde o botão "Start" e exibe o botão "Stop"
  startBtn.classList.add("d-none");
  stopBtn.classList.remove("d-none");
  console.log("Botão Start clicado");
});

// Adiciona um ouvinte de evento para o clique no botão "Stop"
stopBtn.addEventListener("click", () => {
  // Se não estiver assistindo a posição, retorna
  if (!watchID) return;

  // Cancela a observação da posição do dispositivo
  navigator.geolocation.clearWatch(watchID);
  watchID = null;

  // Atualiza o tempo de parada da viagem atual
  updateStopTime(currentRide);
  currentRide = null;

  // Esconde o botão "Stop" e exibe o botão "Start"
  startBtn.classList.remove("d-none");
  stopBtn.classList.add("d-none");
});
