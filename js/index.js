function mostrarLibros() {
    const userObj = JSON.parse(localStorage.getItem('userObj'));
    const librosGenFav = document.getElementById("libros-genFav");
    const generoFavoritoSpan = document.getElementById("generoFavorito");
    let html = "";

    if (userObj && userObj.generoFavorito && userObj.generoFavorito !== 'todos') {
        fetch("https://raw.githubusercontent.com/vmazzulla/libros/main/datos.json")
            .then((response) => response.json())
            .then((data) => {
                data.forEach((libro) => {
                    if (libro.genero === userObj.generoFavorito) {
                        html += `
                        <a href="#popup${libro.titulo.replace(/\s+/g, '')}">
                            <div class="gallery">
                                <img src="${libro.portada}">
                                <div class="info">
                                    <div class="datos">
                                        <div class="nombre">${libro.titulo}</div>
                                        <div class="autor">${libro.autor}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <div id="popup${libro.titulo.replace(/\s+/g, '')}" class="overlay">
                            <div class="popup">
                                <button type="button" class="close" onClick="history.go(-1)">x</button>
                                <p class="nombre">${libro.titulo}</p>
                                <p>${libro.sinopsis}</p>
                                <button class="boton leido" data-titulo="${libro.titulo}">Leído</button>
                                <button class="boton quiero-leer" data-titulo="${libro.titulo}">Quiero leer</button>
                                <button class="boton leyendo" data-titulo="${libro.titulo}">Leyendo</button>
                            </div>
                        </div>`;
                    }
                });
                librosGenFav.innerHTML = html;

                document.querySelectorAll('.boton.leido').forEach(button => {
                    button.addEventListener('click', function() {
                        const titulo = this.getAttribute('data-titulo');
                        let librosLeidos = JSON.parse(localStorage.getItem('librosLeidos')) || [];
                        if (!librosLeidos.includes(titulo)) {
                            librosLeidos.push(titulo);
                            localStorage.setItem('librosLeidos', JSON.stringify(librosLeidos));
                            alert(`El libro "${titulo}" ha sido marcado como leído.`);
                        } else {
                            alert(`El libro "${titulo}" ya está marcado como leído.`);
                        }
                    });
                });

                document.querySelectorAll('.boton.quiero-leer').forEach(button => {
                    button.addEventListener('click', function() {
                        const titulo = this.getAttribute('data-titulo');
                        let librosQuieroLeer = JSON.parse(localStorage.getItem('librosQuieroLeer')) || [];
                        if (!librosQuieroLeer.includes(titulo)) {
                            librosQuieroLeer.push(titulo);
                            localStorage.setItem('librosQuieroLeer', JSON.stringify(librosQuieroLeer));
                            alert(`El libro "${titulo}" ha sido marcado como "Quiero leer".`);
                        } else {
                            alert(`El libro "${titulo}" ya está marcado como "Quiero leer".`);
                        }
                    });
                });

                document.querySelectorAll('.boton.leyendo').forEach(button => {
                    button.addEventListener('click', function() {
                        const titulo = this.getAttribute('data-titulo');
                        let librosLeyendo = JSON.parse(localStorage.getItem('librosLeyendo')) || [];
                        if (!librosLeyendo.includes(titulo)) {
                            librosLeyendo.push(titulo);
                            localStorage.setItem('librosLeyendo', JSON.stringify(librosLeyendo));
                            alert(`El libro "${titulo}" ha sido marcado como "Leyendo".`);
                        } else {
                            alert(`El libro "${titulo}" ya está marcado como "Leyendo".`);
                        }
                    });
                });
            })
            .catch((error) => console.error("Error al cargar los libros", error));

        generoFavoritoSpan.innerHTML = userObj.generoFavorito;
    } else {
        generoFavoritoSpan.innerHTML = '<button id="seleccionar" onclick="location.href=\'perfil.html\'">Seleccionar</button>';
    }
}

function carousel() {
    let carouselInner = document.getElementById("carousel-inner");
    let html = "";
    let slide = 1;
    fetch("https://raw.githubusercontent.com/vmazzulla/libros/main/datos.json")
        .then((response) => response.json())
        .then((data) => {
            let isActive = true;
            data.forEach((libro) => {
                if (libro.popular === "si") {
                    html += `
                    <div class="carousel-item ${isActive ? 'active' : ''}">
                        <img class="d-block w-100" src="${libro.portada}" alt="${slide}" style="border-radius: 8px; height: 380px;">
                    </div>`;
                    isActive = false;
                    slide++;
                }
            });
            carouselInner.innerHTML = html;
        })
        .catch((error) => console.error("Error al cargar los libros", error));
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarLibros();
    carousel();
});




