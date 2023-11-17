/* PAGE TRANSITIONS */
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    link.addEventListener('click', function (event) {
      const targetPage = this.getAttribute('href');
      const targetBlank = this.getAttribute('target') === '_blank';

      if (!targetBlank) {
        event.preventDefault();
        document.body.classList.add('page-hidden');

        setTimeout(function () {
          window.location.href = targetPage;
        }, 500);
      }
    });
  });

  window.addEventListener('load', function () {
    document.body.classList.remove('page-hidden');
  });
});

/* MENU APPEARS AND DISAPPEARS  */
const body = document.body;
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset

  if (currentScroll <= 0) {
    body.classList.remove("scroll-up")
  }

  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up")
    body.classList.add("scroll-down")
  }

  if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-down")
    body.classList.add("scroll-up")
  }

  lastScroll = currentScroll;
});

/* MENU NAVIAGTION */
function toggleNav() {
  var sidelist = document.querySelector('.sidelist');
  var menuBtn = document.querySelector('.menu-bt i');

  if (sidelist.style.display === 'flex') {
    // Si el sidelist está visible, lo ocultamos y cambiamos el ícono a fa-bars
    sidelist.style.display = 'none';
    menuBtn.classList.remove('fa-close');
    menuBtn.classList.add('fa-bars');
    // Habilitar el scroll en el fondo de la página cuando se cierra el sidelist
    body.style.overflow = '';
    document.documentElement.style.overflow = '';
  } else {
    // Si el sidelist está oculto, lo mostramos y cambiamos el ícono a fa-close
    sidelist.style.display = 'flex';
    menuBtn.classList.remove('fa-bars');
    menuBtn.classList.add('fa-close');
    // Deshabilitar el scroll en el fondo de la página cuando se abre el sidelist
    body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
}

/* LOGO- ANIMATION */
window.addEventListener('load', (event) => {
  let logos = document.querySelectorAll('.logo');

  logos.forEach(function (logo) {
    logo.classList.add('animate-logo'); // Cambia el color del texto a rojo
    // Agrega más cambios de estilo aquí según tus necesidades
  });
});

/* TOOGLE */
const DARK_MODE = 'dark';
const LIGHT_MODE = 'light';

const themeToggle = document.getElementById('themeToggle');

const setLightMode = () => {
  document.body.classList = LIGHT_MODE;
  localStorage.setItem('colorMode', LIGHT_MODE);
};

const setDarkMode = () => {
  document.body.classList = DARK_MODE;
  localStorage.setItem('colorMode', DARK_MODE);
};

const colorModeFromLocalStorage = () => {
  return localStorage.getItem('colorMode');
};

const colorModeFromPreferences = () => {
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? LIGHT_MODE
    : DARK_MODE; // If preference is set or does not match anything (dark is default)
};

const loadAndUpdateColor = () => {
  // local storage has precedence over the prefers-color-scheme
  const color = colorModeFromLocalStorage() || colorModeFromPreferences();
  themeToggle.checked = color === LIGHT_MODE;
  themeToggle.checked ? setLightMode() : setDarkMode();
};

// when the toggle state changes, change the color mode
themeToggle.addEventListener('change', () => {
  themeToggle.checked ? setLightMode() : setDarkMode();
});

// when the prefers-color-scheme changes, this event will be emitted
// event reflects the media query, if it matches, the new color is dark, else it is light
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
  event.matches ? setLightMode() : setDarkMode();
});

// Load the right color on startup - localStorage has precedence
loadAndUpdateColor();


/* TABS */
function changeTab(tab) {
  // Obtener todos los botones de pestañas
  var tabButtons = document.getElementsByClassName("tab-button__about");

  // Eliminar la clase 'active' de todos los botones
  for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  // Agregar la clase 'active' al botón clicado
  var activeButton = document.getElementById(tab + "Btn");
  activeButton.classList.add("active");

  // Llamar a la función showTab con el nombre de la pestaña
  showTab(tab);
}

function showTab(tabName) {
  // Oculta todos los bloques de contenido
  var tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(function (tab) {
    tab.classList.remove('active');
  });

  // Muestra el bloque de contenido correspondiente a la pestaña seleccionada
  document.getElementById(tabName).classList.add('active');
}

/* TOOLSTACK - SCROLLER */
const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });

    // Agregar eventos de mouseover y mouseout para pausar y reanudar la animación
    scroller.addEventListener("mouseover", pauseAnimation);
    scroller.addEventListener("mouseout", resumeAnimation);
  });
}

function pauseAnimation(event) {
  const scrollerInner = event.currentTarget.querySelector(".scroller__inner");
  scrollerInner.style.animationPlayState = "paused";
}

function resumeAnimation(event) {
  const scrollerInner = event.currentTarget.querySelector(".scroller__inner");
  scrollerInner.style.animationPlayState = "running";
}

/* FAQ */
document.querySelectorAll('.accordion__question').forEach((item) => {
  item.addEventListener('click', (event) => {
    console.log('click!');
    let accCollapse = item.nextElementSibling;

    if (!item.classList.contains('collapsing')) {
      // Open accordion item
      if (!item.classList.contains('open')) {
        console.log('toggle accordion button');

        accCollapse.style.display = 'block';
        let accHeight = accCollapse.clientHeight;
        console.log(accHeight);

        setTimeout(() => {
          accCollapse.style.height = accHeight + 'px';
          accCollapse.style.display = '';
        }, 1);

        accCollapse.classList = 'accordion__collapse collapsing';

        setTimeout(() => {
          console.log('open accordion content');
          accCollapse.classList = 'accordion__collapse collapse open';
        }, 300);
      }
      // Close accordion item
      else {
        // Remove "collapse open" from .accordion__collapse, add "collapsing"
        accCollapse.classList = 'accordion__collapse collapsing';

        setTimeout(() => {
          accCollapse.style.height = '0px';
        }, 1);

        // After X amount of time, remove "collapsing" class and add "collapse" class
        setTimeout(() => {
          console.log('close accordion content');
          accCollapse.classList = 'accordion__collapse collapse';
          accCollapse.style.height = '';
        }, 300);
      }

      item.classList.toggle('open');
    }
  });
});

/* RECOMMENDED READINGS */
function filterCards(category) {
  const cards = document.querySelectorAll('.card-recommended');

  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category').toLowerCase();
    const isVisible = category === 'all' || cardCategory === category.toLowerCase();

    // Agrega o quita la clase 'hidden' según la visibilidad
    if (isVisible) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  // Actualizar el estado de los botones de las tabs
  const tabButtons = document.querySelectorAll('.tab-button__recommended');
  tabButtons.forEach(button => {
    button.classList.remove('active');
    if (button.textContent.toLowerCase() === category.toLowerCase()) {
      button.classList.add('active');
    }
  });
}

// Mostrar todas las cards al cargar la página
filterCards('all');

/* TABS PROJECTS */
function filterCardsProjects(category) {
  const cards = document.querySelectorAll('.card-project');

  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category').toLowerCase();
    const isVisible = category === 'all' || cardCategory === category.toLowerCase();

    // Agrega o quita la clase 'hidden' según la visibilidad
    if (isVisible) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  // Actualizar el estado de los botones de las tabs
  const tabButtons = document.querySelectorAll('.tab-button__recommended');
  tabButtons.forEach(button => {
    button.classList.remove('active');
    if (button.textContent.toLowerCase() === category.toLowerCase()) {
      button.classList.add('active');
    }
  });
}

// Mostrar todas las cards al cargar la página
filterCardsProjects('all');

/* TABS BLOG */
function filterCardsBlog(category) {
  const cards = document.querySelectorAll('.card-blog');

  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category').toLowerCase();
    const isVisible = category === 'all' || cardCategory === category.toLowerCase();

    // Agrega o quita la clase 'hidden' según la visibilidad
    if (isVisible) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  // Actualizar el estado de los botones de las tabs
  const tabButtons = document.querySelectorAll('.tab-button__recommended');
  tabButtons.forEach(button => {
    button.classList.remove('active');
    if (button.textContent.toLowerCase() === category.toLowerCase()) {
      button.classList.add('active');
    }
  });
}

// Mostrar todas las cards al cargar la página
filterCardsBlog('all');

/* PROGRESS BAR */
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let pos = document.documentElement.scrollTop;

  let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);

  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(var(--ancent)${scrollValue}%, var(--text-3) ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;