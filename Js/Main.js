
    const galleryImg = document.querySelector('.gallery-img');
    const gallerySec = document.querySelector('.gallery-preview');

    function handleScroll() {
        const rect = gallerySec.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
            galleryImg.style.transform = "scale(1.08)";
        } else {
            galleryImg.style.transform = "scale(1)";
        }
    }

    

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('open');
}
window.addEventListener("scroll", handleScroll,() => {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
