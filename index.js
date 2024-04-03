// Seleciona o elemento com o ID "rideList" do DOM
const rideListElement = document.querySelector("#rideList");

// Obtém todas as viagens do armazenamento local
const allRides = getAllrides();

// Itera sobre todas as viagens presentes no armazenamento local
allRides.forEach(async ([id, value]) => {
  // Analisa o valor da viagem de volta para um objeto JavaScript
  const ride = JSON.parse(value);
  // Adiciona o ID da viagem ao objeto ride
  ride.id = id;

  // Obtém a primeira posição registrada na viagem
  const firstPosition = ride.data[0];

  // Obtém dados de localização da primeira posição
  const firstLocationData = await getLocationData(
    firstPosition.latitude,
    firstPosition.longitude
  );

  // Cria um novo elemento <li> para exibir o ID da viagem e a localização
  const itemElement = document.createElement("li");

  // Cria um elemento <div> para a cidade
  const cityDiv = document.createElement("div");
  // Define o texto do elemento <div> como a cidade e o país da localização
  cityDiv.innerText = `${firstLocationData.city}-${firstLocationData.countryCode}`;
 
  // Cria um elemento <div> para a velocidade máxima
  const maxSpeedDiv = document.createElement("div");
  // Define o texto do elemento <div> como a velocidade máxima da viagem
  maxSpeedDiv.innerText = getMaxSpeed(ride.data);

  // Adiciona a div da cidade à li
  itemElement.appendChild(cityDiv);
  // Adiciona a div da velocidade máxima à li
  itemElement.appendChild(maxSpeedDiv);
  // Adiciona o elemento <li> à lista de viagens no DOM
  rideListElement.appendChild(itemElement);
});

// Função assíncrona para obter dados de localização com base em latitude e longitude
async function getLocationData(latitude, longitude) {
  const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
  const response = await fetch(url);
  return await response.json();
}

// Função para calcular a velocidade máxima na viagem
function getMaxSpeed(positions) {
  let maxSpeed = 0;
  positions.forEach(position => {
    if (position.speed != null && position.speed > maxSpeed) {
      maxSpeed = position.speed;
    }
  });
  return (maxSpeed * 3.6).toFixed(1); // Converte a velocidade de m/s para km/h e arredonda para uma casa decimal
}
