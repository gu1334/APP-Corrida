// Função para criar uma nova viagem
function createNewRide() {
    // Gera um ID único para a viagem com base no timestamp atual
    const rideID = Date.now();
  
    // Cria um registro de viagem com os dados iniciais
    const rideRecord = {
      data: [], // Array para armazenar os dados de posição durante a viagem
      startTime: rideID, // Horário de início da viagem (timestamp)
      stopTime: null, // Horário de término da viagem (null enquanto a viagem está em andamento)
    };
  
    // Salva o registro de viagem no armazenamento local
    saveRideRecord(rideID, rideRecord);
  
    // Retorna o ID da viagem para referência futura
    return rideID;
  }

  function getAllrides(){
    return Object.entries(localStorage)
  }
  
  // Função para obter o registro de viagem com base no ID da viagem
  function getRideRecord(rideID) {
    // Obtém o registro de viagem do armazenamento local e converte para objeto JavaScript
    return JSON.parse(localStorage.getItem(rideID));
  }
  
  // Função para salvar o registro de viagem no armazenamento local
  function saveRideRecord(rideID, rideRecord) {
    // Converte o registro de viagem para formato JSON e salva no armazenamento local
    localStorage.setItem(rideID, JSON.stringify(rideRecord));
  }
  
  // Função para adicionar uma nova posição à viagem atual
  function addPosition(rideID, position) {
    // Obtém o registro de viagem atual com base no ID da viagem
    const rideRecord = getRideRecord(rideID);
  
    // Cria um novo objeto com os dados da posição atual
    const newData = {
      accuracy: position.coords.accuracy,
      altitude: position.coords.altitude,
      altitudeAccuracy: position.coords.altitudeAccuracy,
      heading: position.coords.heading,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      speed: position.coords.speed,
      timestamp: position.timestamp,
    };
  
    // Adiciona os dados da nova posição ao array de dados da viagem
    rideRecord.data.push(newData);
  
    // Salva o registro de viagem atualizado no armazenamento local
    saveRideRecord(rideID, rideRecord);
  }
  
  // Função para atualizar o horário de término da viagem
  function updateStopTime(rideID) {
    // Obtém o registro de viagem atual com base no ID da viagem
    const rideRecord = getRideRecord(rideID);
  
    // Define o horário de término da viagem como o timestamp atual
    rideRecord.stopTime = Date.now();
  
    // Salva o registro de viagem atualizado no armazenamento local
    saveRideRecord(rideID, rideRecord);
  }
  