let lastScroll = 0;
const header = document.querySelector('.header');
const scrollThreshold = 100; // Cantidad de scroll antes de ocultar/mostrar

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Si estamos al inicio de la página, siempre mostramos el header
    if (currentScroll <= 0) {
        header.classList.remove('hidden');
        return;
    }
    
    // Si hemos scrolleado más que el threshold...
    if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
        // Scrolling hacia abajo
        if (currentScroll > lastScroll) {
            header.classList.add('hidden');
        } 
        // Scrolling hacia arriba
        else {
            header.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    }
}); 