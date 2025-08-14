const simbolos = [
  { valor: "❤️", volteada: false, emparejada: false },
  { valor: "🧡", volteada: false, emparejada: false },
  { valor: "🌙", volteada: false, emparejada: false },
];

let array_cartas = [
  ...simbolos.map((c) => ({ ...c })),
  ...simbolos.map((c) => ({ ...c })),
];
let cartasVolteadas = [];
let tablero = document.getElementById("tablero");
let bloquearjuego = false;

document.addEventListener("DOMContentLoaded", () => {
  jugar();
});

function jugar() {
  crearCarta(array_cartas);
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      if (bloquearjuego) return;
      selectCarta(card);
    });
  });
}

function crearCarta(cartas) {
  cartas.sort(() => 0.5 - Math.random());

  tablero.innerHTML = "";

  for (let i = 0; i < cartas.length; i++) {
    let carta = document.createElement("div");
    let valor = document.createElement("p");
    carta.classList.add(
      "card",
      "md:w-70",
      "md:h-50",
      "w-50",
      "h-50",
      "bg-blue-500",
      "flex",
      "items-center",
      "justify-center",
      "cursor-pointer",
      "rounded-lg",
      "shadow-xl",
      "shadow-zinc-950/50"
    );
    valor.classList.add("opacity-0", "text-6xl");
    carta.id = i;
    valor.textContent = cartas[i].valor;
    carta.appendChild(valor);
    tablero.appendChild(carta);
  }
}

function selectCarta(carta) {
  let carta_id = carta.id;
  let cartaData = array_cartas[carta_id];

  if (cartaData.volteada || cartaData.emparejada) {
    alert("Carta ya seleccionada");
    return;
  }

  let valorElement = carta.children[0];
  gsap.to(carta, {
    rotateY: 180,
    duration: 0.5,
  });

  gsap.fromTo(valorElement,{
    x: -50,
  }, {
    x: 0,
    duration: 0.5,
    onStart: () => {
      valorElement.classList.remove("opacity-0");
      valorElement.classList.add("opacity-100");
    }
  });

  cartaData.volteada = true;
  cartasVolteadas.push({ ...cartaData, index: parseInt(carta_id) });

  if (cartasVolteadas.length === 2) {
    bloquearjuego = true;
    setTimeout(() => {
      const [carta1, carta2] = cartasVolteadas;

      if (carta1.valor === carta2.valor) {
        array_cartas[carta1.index].emparejada = true;
        array_cartas[carta2.index].emparejada = true;
      } else {
        [carta1, carta2].forEach((c) => {
          let card = document.querySelectorAll(".card")[c.index];
          card.children[0].classList.remove("opacity-100");
          card.children[0].classList.add("opacity-0");
          array_cartas[c.index].volteada = false;
        });
      }
      if (array_cartas.every((c) => c.emparejada)) {
        alert("Ganaste");
        window.location.reload();
      } else {
        cartasVolteadas = [];
        bloquearjuego = false;
      }
    }, 500);
  }
}
