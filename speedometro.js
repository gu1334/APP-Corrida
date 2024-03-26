const speedElement = document.querySelector("#speed");
const startBtn = document.querySelector("#Start");
const stopBtn = document.querySelector("#Stop");
let whatchID = null;

startBtn.addEventListener("click", () => {
  if (whatchID) return;

  function handleSucess(position) {
    console.log(position);
    speedElement.innerText = position.coords.speed
      ? (position.coords.speed * 3.6).toFixed(1)
      : 0;
  }
  function handleErro(error) {
    console.log("erro.msg");
  }

  const options = { enableHighAccuracy: true };

  whatchID = navigator.geolocation.watchPosition(
    handleSucess,
    handleErro,
    options
  );

  startBtn.classList.add("d-none");
  stopBtn.classList.remove("d-none");
  console.log("botão start");
});

stopBtn.addEventListener("click", () => {
    if(!whatchID)
    return
  navigator.geolocation.clearWatch(whatchID);
  whatchID = null;
  startBtn.classList.remove("d-none");
  stopBtn.classList.add("d-none");
  console.log("botão stop");
});
