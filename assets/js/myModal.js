function openModal() {
  var modal = document.getElementById("myModal");
  var img = document.querySelector(".thumbnail");
  var modalImg = document.getElementById("img01");

  modal.style.display = "block";
  modalImg.src = img.src;
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}
