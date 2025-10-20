window.openModal = function(imgSrc) {
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");

  modal.style.display = "flex"; 
  setTimeout(() => modal.classList.add("show"), 10);
  modalImg.src = imgSrc;

  // Reiniciar zoom al abrir
  modalImg.classList.remove("zoomed");

  // Toggle zoom al hacer clic en la imagen
  modalImg.onclick = (e) => {
    e.stopPropagation(); // evitar cerrar modal al hacer zoom
    modalImg.classList.toggle("zoomed");
  };
};

window.closeModal = function() {
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");
  modalImg.classList.remove("zoomed");
  modal.classList.remove("show");
  setTimeout(() => modal.style.display = "none", 300);
};

// Cerrar si se hace clic fuera de la imagen
window.onclick = function(event) {
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");
  if (event.target === modal) closeModal();
};
