// Seleciona o elemento com o ID "rideList" do DOM
const rideListElement = document.querySelector("#rideList");

// Obtém todas as viagens do armazenamento local
const allRides = getAllrides();

// Itera sobre todas as viagens
allRides.forEach(([id, value]) => {
    // Analisa o valor da viagem de volta para um objeto JavaScript
    const ride = JSON.parse(value);
    // Adiciona o ID da viagem ao objeto ride
    ride.id = id;
    // Cria um novo elemento <li> para exibir o ID da viagem
    const itemElement = document.createElement("li");
    // Define o texto do elemento <li> como o ID da viagem
    itemElement.innerText = ride.id;
    // Adiciona o elemento <li> à lista de viagens no DOM
    rideListElement.appendChild(itemElement);
});
