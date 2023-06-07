document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('container');
  fetch('https://data.nasa.gov/resource/gh4g-9sfh.json')
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        let html = '';

        for (let i = 0; i < 6; i++) {
          const objeto = data[i];
          const keys = Object.keys(objeto);

          html += '<ul>';
          keys.forEach(key => {
            html += `<li>${key}: ${objeto[key]}</li>`;
          });
          html += '</ul>';

          // Agregar marcadores al mapa
          const lat = parseFloat(objeto.reclat);
          const lon = parseFloat(objeto.reclong);
          const desc = objeto.name;

          const marker = L.marker([lat, lon]).addTo(map);
          marker.bindPopup(desc);
          
        }

        container.innerHTML = html;
        const searchButton = document.getElementById('searchButton');
        searchButton.addEventListener('click', function() {
        const searchInput = document.getElementById('searchInput').value;
        const selectedOption = document.getElementById('selectOption').value;
        
        filter(data, searchInput, selectedOption);//Funcion de filtrado fuera del scope
        });
        
        
        
        
        //Convierte tarjetas en botones y disparador
        const ulButon = container.getElementsByTagName('ul');
        Array.from(ulButon).forEach((ulElement, index) => {
          ulElement.addEventListener('click', () => {
            let clickedObject = data[index]; // Guardar el objeto correspondiente al ul clicado en una variable
            contenido(clickedObject);
          });
          ulElement.style.cursor = 'pointer'; // Cambia el cursor al pasar sobre los botones.
        });
      } else {
        container.innerHTML = 'Error: No data';
      }
    })
    .catch(error => {
      container.innerHTML = 'Error: Failed to fetch';
      console.error(error);
    });
  });



  
//Funcion de filtro de tarjetas
  function filter(data, searchInput, selectedOption) {
    let filteredObjects = [];
    const regex = new RegExp(searchInput, 'i');
    const container = document.getElementById('container');
    if (selectedOption ==='name'){
      for (let i = 0; i < data.length; i++) {
      if (regex.test(data[i].name)) {
        filteredObjects.push(data[i]);
        container.innerHTML='';
      }
    }
    
    let html = '';
    
    filteredObjects.forEach(objeto => {
      const keys = ["name", "mass", "year", "reclat", "reclong"];
      
      html += '<ul>';
      keys.forEach(key => {
      html += `<li>${key}: ${objeto[key]}</li>`;
      });
      
      html += '</ul>';
      container.innerHTML= html;// pinta la busqueda
      
      //Resetea los marcadores del mapa
     // markers = [];
      //markers += 
     // map.removeLayer(markers[i]);
        

      //Modo boton
      const ulButon = container.getElementsByTagName('ul');
        Array.from(ulButon).forEach((ulElement, index) => {
          ulElement.addEventListener('click', () => {
            let clickedObject = data[index]; // Guardar el objeto correspondiente al ul clicado en una variable
            contenido(clickedObject);
          });
          ulElement.style.cursor = 'pointer'; // Cambia el cursor al pasar sobre los botones.
        });
    });
  }else if(selectedOption ==='year') {

//console.log('nada')
  }
   
  };
  
  





//Pinta en el escaparate la tarjeta clickada
function contenido(objeto) {
  const details = document.getElementById('details');
  details.innerHTML = '';

  setTimeout(() => {
    let html = '<ul>';

    for (const key in objeto) {
      html += `<li>${key}: ${objeto[key]}</li>`;
    }

    html += '</ul>';
    details.innerHTML = html;
  }, 500);
}

//mapa en el escaparate
var map = L.map('map').setView([51.505, -0.09], 0);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 10,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

