document.addEventListener("DOMContentLoaded", function() {
    // Cargar datos guardados al cargar la página
    const userObj = JSON.parse(localStorage.getItem('userObj'));
    if (userObj) {
        document.getElementById('nombre').value = userObj.nombre || '';
        document.getElementById('apellido').value = userObj.apellido || '';
        document.getElementById('email').value = userObj.email || '';
        document.getElementById('gen-fav').value = userObj.generoFavorito || 'todos';
        document.getElementById('usuario').textContent = userObj.nombre || 'Usuario';
    } else {
        // Asegúrate de que los campos estén vacíos si no hay datos guardados
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('email').value = '';
        document.getElementById('gen-fav').value = 'todos';
        document.getElementById('usuario').textContent = 'Usuario';
    }

    // Guardar datos al enviar el formulario
    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtén los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const email = document.getElementById('email').value;
        const generoFavorito = document.getElementById('gen-fav').value;

        // Crea un objeto userObj con los valores del formulario
        const userObj = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            generoFavorito: generoFavorito
        };

        // Guarda el objeto userObj en localStorage
        localStorage.setItem('userObj', JSON.stringify(userObj));

        // Actualiza el nombre del usuario en el título
        document.getElementById('usuario').textContent = nombre;

        // Muestra el mensaje de confirmación
        document.getElementById('confirmationMsg').style.display = 'block';
        setTimeout(() => {
            confirmationMsg.style.display = 'none';
        }, 3000);
    });

    // Cargar libros desde localStorage y mostrarlos en los fieldsets correspondientes
    cargarLibros();

    // Añadir evento de clic al botón de cerrar sesión
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('userObj');
        localStorage.removeItem('librosLeidos');
        localStorage.removeItem('librosLeyendo');
        localStorage.removeItem('librosQuieroLeer');
        window.location.href = 'index.html';
    });
});

function cargarLibros() {
    const librosLeidos = JSON.parse(localStorage.getItem('librosLeidos')) || [];
    const librosLeyendo = JSON.parse(localStorage.getItem('librosLeyendo')) || [];
    const librosQuieroLeer = JSON.parse(localStorage.getItem('librosQuieroLeer')) || [];

    const librosLeidosDiv = document.getElementById('libros-leidos');
    const librosLeyendoDiv = document.getElementById('libros-leyendo');
    const librosTbrDiv = document.getElementById('libros-tbr');

    librosLeidosDiv.innerHTML = librosLeidos.map(titulo => `
        <div class="libro-item">
            <p>${titulo}</p>
            <button class="eliminar" data-titulo="${titulo}" data-lista="librosLeidos">x</button>
        </div>
    `).join('');
    librosLeyendoDiv.innerHTML = librosLeyendo.map(titulo => `
        <div class="libro-item">
            <p>${titulo}</p>
            <button class="eliminar" data-titulo="${titulo}" data-lista="librosLeyendo">x</button>
        </div>
    `).join('');
    librosTbrDiv.innerHTML = librosQuieroLeer.map(titulo => `
        <div class="libro-item">
            <p>${titulo}</p>
            <button class="eliminar" data-titulo="${titulo}" data-lista="librosQuieroLeer">x</button>
        </div>
    `).join('');

    // Añadir eventos de clic a los botones de eliminación
    document.querySelectorAll('.eliminar').forEach(button => {
        button.addEventListener('click', function() {
            const titulo = this.getAttribute('data-titulo');
            const lista = this.getAttribute('data-lista');
            eliminarLibro(titulo, lista);
        });
    });
}

function eliminarLibro(titulo, lista) {
    let libros = JSON.parse(localStorage.getItem(lista)) || [];
    libros = libros.filter(libro => libro !== titulo);
    localStorage.setItem(lista, JSON.stringify(libros));
    cargarLibros(); // Actualizar la lista de libros
}




