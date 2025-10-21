// conectarse a la API y obtener datos de personas aleatorias
async function cargarPersonas() {
    const contenedor = document.getElementById('root');
    contenedor.innerHTML = '<p>Cargando datos...</p>';
    try {
    const respuesta = await fetch('https://randomuser.me/api/?results=10');
    if (!respuesta.ok) throw new Error('Respuesta no OK: ' + respuesta.status);
    const datos = await respuesta.json();
    mostrarPersonas(datos.results);
    } catch (error) {
    contenedor.innerHTML = '<p>Error al cargar los datos. Revisa la consola para más detalles.</p>';
    console.error('Error en cargarPersonas:', error);
    }
}

/*
    {personas} -> array de objetos persona
    funcion para mostrar las personas en el DOM
*/
function mostrarPersonas(personas) {
    const contenedor = document.getElementById('root');
    contenedor.innerHTML = '';

    personas.forEach(p => {
    const s = document.createElement('section');
    s.className = 'card';
    s.innerHTML = `
        <img src="${p.picture.medium}" alt="Foto de ${p.name.first}" width="96" height="96">
        <h3>${p.name.first} ${p.name.last}</h3>
        <p><strong>Género:</strong> ${p.gender}</p>
        <p><strong>Ubicación:</strong> ${p.location.country}</p>
        <p><strong>Email:</strong> ${p.email}</p>
        <p><strong>Nac:</strong> ${new Date(p.dob.date).toLocaleDateString()}</p>
    `;
    contenedor.appendChild(s);
    });
}

// funcion para iniciar la carga de personas al cargar el script
cargarPersonas();