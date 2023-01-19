const menu = document.querySelector(".menu");
const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");

function toggleMenu() {
  menu.classList.toggle("menu_opened");
}

openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);

const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const menuLink = document.querySelector(`.menu a[href="#${id}"]`);

      if (entry.isIntersecting) {
        document.querySelector(".menu a.selected").classList.remove("selected");
        menuLink.classList.add("selected");
      }
    });
  },
  { rootMargin: "-30% 0px -70% 0px" }
);

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", function () {
    menu.classList.remove("menu_opened");
  });

  const hash = menuLink.getAttribute("href");
  const target = document.querySelector(hash);
  if (target) {
    observer.observe(target);
  }
});

const downloadLink = document.querySelector('.profile-btn');

// Define la ruta del archivo a descargar
const filePath = '/cvRaulJaimes.pdf';

// Asigna un manejador de evento click al enlace
downloadLink.addEventListener('click', function() {
  // Utiliza la función fetch para descargar el archivo
  fetch(filePath)
    .then(response => {
      // Crea un objeto Blob a partir de la respuesta
      return response.blob();
    })
    .then(blob => {
      // Crea un enlace clicable utilizando el objeto Blob
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'cvRaulJaimes.pdf';
      downloadLink.click();
      // Libera la URL creada
      URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error(error);
    });
});
