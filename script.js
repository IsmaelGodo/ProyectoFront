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
          }
  
          container.innerHTML = html;
  
          const ulButon = container.getElementsByTagName('ul');
          Array.from(ulButon).forEach((ulElement, index) => {
            ulElement.addEventListener('click', () => {
              let clickedObject = data[index]; // Guardar el objeto correspondiente al ul clicado en una variable
            otraFuncion(clickedObject);
            });
            ulElement.style.cursor = 'pointer'; // Cambia el cursor al pasar sobre los botones.
          });
        } else {
          container.innerHTML = 'Error: No data available';
        }
      })
      .catch(error => {
        container.innerHTML = 'Error: Failed to fetch data';
        console.error(error);
      });
  });

  function otraFuncion(objeto) {
    const container2 = document.getElementById('container2');
    container2.innerHTML = ''; 
  
    setTimeout(() => {
      let html = '<ul>';
    
      for (const key in objeto) {
        html += `<li>${key}: ${objeto[key]}</li>`;
      }
    
      html += '</ul>';
      container2.innerHTML = html;
    }, 500);
  }
  
  