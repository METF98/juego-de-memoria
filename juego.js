const simbolos = [
  {valor: "❤️", volteada: false},
  {valor: "🧡", volteada: false},
  {valor: "🌙", volteada: false}
];
let cartas = [...simbolos, ...simbolos];
let carta_1 = null;
let carta_2 = null;
let tablero = document.getElementById("tablero");

document.addEventListener("DOMContentLoaded", () => {

  console.log(cartas);

  crearCarta(cartas);
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      selectCard(card);
    });
  })
})

function crearCarta(cartas) {
  cartas.sort(() => Math.random() - 0.5);

  for (let i = 0; i < cartas.length; i++) {
    let carta = document.createElement("div");
    let valor = document.createElement("p");
    carta.classList.add("card","w-full", "h-full", "bg-blue-500", "flex", "items-center", "justify-center");
    valor.classList.add("hidden");
    carta.id = i;
    valor.textContent = cartas[i].valor;
    carta.appendChild(valor);
    tablero.appendChild(carta);
  }
}

function selectCard(card) {
  let car_id = card.id;
  let tablero = cartas[car_id];
  console.log(tablero.volteada);
  if(tablero.volteada) {
    alert("Carta ya seleccionada");
  }else {
    let volteada = card.children[0];
    volteada.classList.remove("hidden");
    volteada.classList.add("block");
  }
}