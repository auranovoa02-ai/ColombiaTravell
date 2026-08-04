document.addEventListener("DOMContentLoaded", function () {

    // Si estamos en la página de Destinos, cargar las tarjetas
    if (document.getElementById("contenedorTarjetas") || document.getElementById("buscarDestino")) {
        inicializarDestinosVuelos();
    }

    // Si estamos en la página de Login/Registro, cargar eventos de autenticación
    if (document.getElementById("formLogin") || document.getElementById("formRegistro")) {
        inicializarLogin();
    }
});

/* ==========================================================================
   1. MÓDULO DE DESTINOS, AEROLÍNEAS Y PRECIOS (destinos.html)
   ========================================================================== */
function inicializarDestinosVuelos() {

    const vuelos = [
        {
            id: 1,
            pais: "Colombia",
            ciudad: "Cartagena",
            imagen: "https://images.unsplash.com/photo-1583531172005-814191b8b6c0?auto=format&fit=crop&w=600&q=80",
            descripcion: "Disfruta del encanto colonial, sus murallas y hermosas playas en el Caribe.",
            aerolinea: "Avianca",
            precio: 120,
            moneda: "USD"
        },
        {
            id: 2,
            pais: "Francia",
            ciudad: "París",
            imagen: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
            descripcion: "La capital del arte y la gastronomía. Visita la icónica Torre Eiffel.",
            aerolinea: "Air France",
            precio: 850,
            moneda: "USD"
        },
        {
            id: 3,
            pais: "Japón",
            ciudad: "Tokio",
            imagen: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80",
            descripcion: "Una metrópolis fascinante que fusiona tecnología avanzada y tradición.",
            aerolinea: "Japan Airlines",
            precio: 1100,
            moneda: "USD"
        },
        {
            id: 4,
            pais: "España",
            ciudad: "Madrid",
            imagen: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=600&q=80",
            descripcion: "Capital vibrante con arte imponente, plazas históricas y vida nocturna única.",
            aerolinea: "Iberia",
            precio: 780,
            moneda: "USD"
        },
        {
            id: 5,
            pais: "México",
            ciudad: "Cancún",
            imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
            descripcion: "Aguas turquesas y playas de arena blanca en la emblemática Riviera Maya.",
            aerolinea: "Aeroméxico",
            precio: 350,
            moneda: "USD"
        },
        {
            id: 6,
            pais: "Estados Unidos",
            ciudad: "Nueva York",
            imagen: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&q=80",
            descripcion: "La gran manzana: rascacielos, Times Square y espectáculos de Broadway.",
            aerolinea: "American Airlines",
            precio: 490,
            moneda: "USD"
        },
        {
            id: 7,
            pais: "Italia",
            ciudad: "Roma",
            imagen: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
            descripcion: "Historia milenaria, el Coliseo y la inconfundible gastronomía italiana.",
            aerolinea: "ITA Airways",
            precio: 820,
            moneda: "USD"
        },
        {
            id: 8,
            pais: "Brasil",
            ciudad: "Río de Janeiro",
            imagen: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80",
            descripcion: "Famosa por sus playas de Copacabana e Ipanema y la vista del Cristo Redentor.",
            aerolinea: "LATAM Airlines",
            precio: 410,
            moneda: "USD"
        },
        {
            id: 9,
            pais: "Inglaterra",
            ciudad: "Londres",
            imagen: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
            descripcion: "Iconos arquitectónicos, el Big Ben, palacios reales y museos de clase mundial.",
            aerolinea: "British Airways",
            precio: 890,
            moneda: "USD"
        }
    ];

    const contenedor = document.getElementById("contenedorTarjetas");
    const buscarInput = document.getElementById("buscarDestino");
    const btnBuscar = document.getElementById("btnBuscar");
    const mensajeBusqueda = document.getElementById("mensajeBusqueda");

    if (!contenedor) return;

    let favoritos = JSON.parse(localStorage.getItem("favoritosVuelos")) || [];

    function renderizarTarjetas(lista) {
        contenedor.innerHTML = "";

        if (lista.length === 0) {
            if (mensajeBusqueda) mensajeBusqueda.classList.remove("d-none");
            return;
        } else {
            if (mensajeBusqueda) mensajeBusqueda.classList.add("d-none");
        }

        lista.forEach(item => {
            const esFavorito = favoritos.includes(item.id);
            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4";

            col.innerHTML = `
                <div class="card h-100 shadow-sm rounded-4">
                    <img src="${item.imagen}" class="card-img-top rounded-top-4" alt="${item.ciudad}">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <h5 class="card-title mb-0 fw-bold">${item.ciudad}, ${item.pais}</h5>
                            <span class="badge text-bg-danger ${esFavorito ? '' : 'd-none'}" id="badge-${item.id}">Favorito</span>
                        </div>
                        <p class="card-text text-muted small">${item.descripcion}</p>

                        <div class="flight-info mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="fw-semibold text-secondary">✈️ Aerolínea:</span>
                                <span class="fw-bold text-dark">${item.aerolinea}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="fw-semibold text-secondary">🏷️ Vuelo desde:</span>
                                <span class="fs-5 fw-bold text-success">$${item.precio} ${item.moneda}</span>
                            </div>
                        </div>

                        <div class="mt-auto d-flex justify-content-between gap-2">
                            <button class="btn ${esFavorito ? 'btn-danger' : 'btn-outline-danger'} w-50 btn-fav" data-id="${item.id}">
                                ${esFavorito ? '❤ Favorito' : '♡ Favorito'}
                            </button>
                            <a href="#" class="btn btn-outline-primary w-50">Reservar</a>
                        </div>
                    </div>
                </div>
            `;
            contenedor.appendChild(col);
        });

        asignarEventosFavoritos();
    }

    function filtrarVuelos() {
        if (!buscarInput) return;
        const texto = buscarInput.value.toLowerCase().trim();
        const resultados = vuelos.filter(v => 
            v.pais.toLowerCase().includes(texto) ||
            v.ciudad.toLowerCase().includes(texto) ||
            v.aerolinea.toLowerCase().includes(texto)
        );
        renderizarTarjetas(resultados);
    }

    function asignarEventosFavoritos() {
        document.querySelectorAll(".btn-fav").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = parseInt(this.getAttribute("data-id"));
                const badge = document.getElementById(`badge-${id}`);

                if (favoritos.includes(id)) {
                    favoritos = favoritos.filter(favId => favId !== id);
                    this.classList.remove("btn-danger");
                    this.classList.add("btn-outline-danger");
                    this.textContent = "♡ Favorito";
                    if (badge) badge.classList.add("d-none");
                } else {
                    favoritos.push(id);
                    this.classList.remove("btn-outline-danger");
                    this.classList.add("btn-danger");
                    this.textContent = "❤ Favorito";
                    if (badge) badge.classList.remove("d-none");
                }

                localStorage.setItem("favoritosVuelos", JSON.stringify(favoritos));
            });
        });
    }

    if (btnBuscar) btnBuscar.addEventListener("click", filtrarVuelos);
    if (buscarInput) buscarInput.addEventListener("input", filtrarVuelos);

    renderizarTarjetas(vuelos);
}

/* ==========================================================================
   2. MÓDULO DE AUTENTICACIÓN (login.html)
   ========================================================================== */
function inicializarLogin() {
    const formRegistro = document.getElementById("formRegistro");
    const formLogin = document.getElementById("formLogin");
    const mensajeRegistro = document.getElementById("mensajeRegistro");
    const mensajeLogin = document.getElementById("mensajeLogin");

    document.querySelectorAll(".btn-ver-pass").forEach(boton => {
        boton.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const input = document.getElementById(targetId);
            if (input) {
                input.type = input.type === "password" ? "text" : "password";
                this.textContent = input.type === "password" ? "Mostrar" : "Ocultar";
            }
        });
    });

    if (formRegistro) {
        formRegistro.addEventListener("submit", function (e) {
            e.preventDefault();
            const correo = document.getElementById("correoReg").value.trim().toLowerCase();
            const pass = document.getElementById("passReg").value;
            const passConfirm = document.getElementById("passConfirmReg").value;

            if (pass !== passConfirm) {
                mensajeRegistro.innerHTML = `<div class="alert alert-danger">Las contraseñas no coinciden.</div>`;
                return;
            }

            let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
            if (usuarios.some(u => u.correo === correo)) {
                mensajeRegistro.innerHTML = `<div class="alert alert-warning">Este correo ya está registrado.</div>`;
                return;
            }

            usuarios.push({ correo: correo, contrasena: pass });
            localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
            mensajeRegistro.innerHTML = `<div class="alert alert-success">¡Registro exitoso! Ya puede iniciar sesión.</div>`;
            formRegistro.reset();
        });
    }

    if (formLogin) {
        formLogin.addEventListener("submit", function (e) {
            e.preventDefault();
            const correo = document.getElementById("correoLogin").value.trim().toLowerCase();
            const pass = document.getElementById("passLogin").value;

            let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
            const usuarioValido = usuarios.find(u => u.correo === correo && u.contrasena === pass);

            if (usuarioValido) {
                localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));
                mensajeLogin.innerHTML = `<div class="alert alert-success">¡Bienvenido/a <strong>${correo}</strong>!</div>`;
                formLogin.reset();
            } else {
                mensajeLogin.innerHTML = `<div class="alert alert-danger">Correo o contraseña incorrectos.</div>`;
            }
        });
    }
}