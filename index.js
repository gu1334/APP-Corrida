const rideListElemente = document.querySelector("rideList")
const allRides = getAllrides()

allRides.forEach(([id,value])=>{

    const itemElement = document.createElement("li")
    itemElement.innerText = id;
    rideListElemente.appendChild(itemElement)
})



