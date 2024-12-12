document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active'); 
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const banner = document.querySelector('.bannerCalasanz');
  

  banner.addEventListener('click', function() {
      window.location.href = 'index.html'; 
  });
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("index-body")) {
      document.body.style.overflow = "hidden";
  } else {
      document.body.style.overflow = "auto";
  }
});


function loadCalendar() {
  fetch("http://localhost:3000/actividades")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al cargar datos: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        renderCalendar(data);
      } else {
        throw new Error("El JSON no contiene la clave 'actividades'.");
      }
    })
    .catch(error => {
      console.error("Error al cargar el calendario:", error);
    });
}

function renderCalendar(activities) {
  const calendarDiv = document.getElementById("calendar");

  const daysOfWeek = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  daysOfWeek.forEach(day => {
    const headerDiv = document.createElement("div");
    headerDiv.className = "calendar-day-header";
    headerDiv.innerText = day;
    calendarDiv.appendChild(headerDiv);
  });

  const firstDayOfMonth = new Date(2024, 11, 1).getDay();
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  for (let i = 0; i < offset; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.className = "calendar-day empty";
    calendarDiv.appendChild(emptyDiv);
  }

  for (let i = 1; i <= 31; i++) {
    const day = i < 10 ? `0${i}` : i;
    const dateKey = `2024-12-${day}`;
    const dayDiv = document.createElement("div");
    dayDiv.className = "calendar-day";
    dayDiv.setAttribute("data-date", dateKey);

    const modalId = `modal-${dateKey}`;
    const modal = document.createElement("div");
    modal.id = modalId;
    modal.className = "modal";

    if (activities && activities[dateKey]) {
      // Ordenar las actividades por hora
      const sortedActivities = activities[dateKey].sort((a, b) => a.hora.localeCompare(b.hora));

      // Mostrar solo la hora y la actividad en el día
      dayDiv.innerHTML = `<strong>${day}</strong><br>${sortedActivities.map(a => `${a.hora} - ${a.actividad}`).join("<br>")}`;

      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Actividades para el día ${dateKey.split("-")[2]} de diciembre</h2>
          ${sortedActivities
            .map(
              a => `
              <p>
                <strong>${a.hora}:</strong> ${a.actividad}<br>
                <em>${a.descripcion || "Sin descripción"}</em>
              </p>`
            )
            .join("")}
        </div>
      `;
    } else {
      // Día sin actividades
      dayDiv.innerHTML = `<strong>${day}</strong>`;
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Actividades para el día ${dateKey.split("-")[2]} de diciembre</h2>
          <p>No hay actividades para este día.</p>
        </div>
      `;
    }

    document.body.appendChild(modal);

    dayDiv.addEventListener("click", () => {
      modal.style.display = "block";
    });

    modal.querySelector(".close").addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    calendarDiv.appendChild(dayDiv);
  }
}


//====================
// NOTICIOAS


function fetchNoticias() {
  // URL de la API donde están las noticias
  const url = 'http://localhost:3000/noticias';

  // Realizamos el fetch para obtener los datos
  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Error al cargar las noticias');
          }
          return response.json();
      })
      .then(data => {
          // Suponemos que `data` es un array de noticias
          mostrarNoticias(data);
      })
      .catch(error => {
          console.error('Error al obtener las noticias:', error);
      });
}

function mostrarNoticias(noticias) {
  // Seleccionamos el contenedor donde se mostrarán las noticias
  const noticiasGrid = document.querySelector('.noticias-grid');
  
  // Limpiamos cualquier contenido previo
  noticiasGrid.innerHTML = '';

  // Creamos los elementos para cada noticia
  noticias.slice(0, 4).forEach(noticia => {  // Solo mostramos las primeras 4 noticias
      const noticiaElement = document.createElement('div');
      noticiaElement.classList.add('noticia-card');

      // Agregamos una imagen
      const img = document.createElement('img');
      img.src = "../img/" + noticia.imagen; // Asegúrate de que la URL de la imagen sea válida
      img.alt = noticia.titulo;
      noticiaElement.appendChild(img);

      // Agregamos el título de la noticia
      const titulo = document.createElement('h4');
      titulo.textContent = noticia.titulo;
      noticiaElement.appendChild(titulo);

      // Agregamos la descripción de la noticia
      const descripcion = document.createElement('p');
      descripcion.textContent = noticia.descripcion;
      noticiaElement.appendChild(descripcion);

      // Agregamos la noticia al contenedor
      noticiasGrid.appendChild(noticiaElement);
  });
}


