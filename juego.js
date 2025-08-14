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

/**
 * @description Funcion que muestra el mensaje de bienvenida
 * @returns {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function welcome(){
  let modal_message_container = document.createElement("div");
  let message_container = document.createElement("div");
  let message = document.createElement("p");

  modal_message_container.classList.add(
    "w-screen",
    "h-screen",
    "fixed",
    "top-0",
    "left-0",
    "bg-zinc-900/50",
    "z-1",
    "flex",
    "justify-center",
    "items-center",
    "cursor-pointer"
  );
  message_container.classList.add(
    "flex",
    "flex-col",
    "gap-4",
    "items-center",
    "justify-center",
    "bg-zinc-300",
    "p-4",
    "rounded-lg",
    "cursor-pointer"
  );
  message.classList.add(
    "text-zinc-900",
    "text-2xl",
    "font-bold",
    "text-center",
    "cursor-pointer"

  );

  message.textContent = "Bienvenido al Juego de Memoria 🎉 Preciona o da click para iniciar";

  document.body.appendChild(modal_message_container);
  modal_message_container.appendChild(message_container);
  message_container.appendChild(message);

  document.addEventListener("click", () => {
    modal_message_container.remove();
    return;
  });
}

/**
 * @description Funcion que inicia el juego
 * @returns {void}
 * @author Miguel Ticaray
 * @version 1.0
 *
 */
function jugar() {
  welcome();
  crearCarta(array_cartas);
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      if (bloquearjuego) return;
      selectCarta(card);
    });
  });
}

/**
 * @description Funcion que crea las cartas
 * @param {Array} cartas - Array de cartas
 * @returns {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
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

/**
 * @description Funcion que selecciona la carta
 * @param {Array} carta - Carta seleccionada
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
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
          gsap.to(card, {
            rotateY: 0,
            duration: 0.5,
            onStart: () => {
              card.children[0].classList.remove("opacity-100");
              card.children[0].classList.add("opacity-0");
              array_cartas[c.index].volteada = false;
            }
          });
        });
      }
      verificarGanador();
      cartasVolteadas = [];
      bloquearjuego = false;
    }, 1000);
  }

}

/**
 * @description Funcion que verifica si el jugador ha ganado
 * @returns {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function verificarGanador() {
  if (array_cartas.every((c) => c.emparejada)) {
    let modal_message_container = document.createElement("div");
    let message_container = document.createElement("div");
    let message = document.createElement("p");

    modal_message_container.classList.add(
    "w-screen",
    "h-screen",
    "fixed",
    "top-0",
    "left-0",
    "bg-zinc-900/50",
    "z-1",
    "flex",
    "justify-center",
    "items-center",
    "cursor-pointer"
    );
    message_container.classList.add(
      "flex",
      "flex-col",
      "gap-4",
      "items-center",
      "justify-center",
      "bg-zinc-300",
      "p-4",
      "rounded-lg",
      "cursor-pointer"
    );
    message.classList.add(
      "text-zinc-900",
      "text-2xl",
      "font-bold",
      "text-center",
      "cursor-pointer"
    );

    message.textContent = "🎊¡GANASTE!🎊 \n Preciona o da click para jugar de nuevo";

    document.body.appendChild(modal_message_container);
    modal_message_container.appendChild(message_container);
    message_container.appendChild(message);

    document.addEventListener("click", () => {
      modal_message_container.remove();
      window.location.reload();
    });
  }
}