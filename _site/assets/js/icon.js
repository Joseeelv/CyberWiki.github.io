document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".os-label").forEach(function (osLabel) {
    const osIconSpan = osLabel.querySelector(".os-icon");
    if (!osIconSpan) return;

    const os = osIconSpan.dataset.os.toLowerCase();

    let iconHtml = "";
    if (os.includes("linux")) {
      iconHtml = '<i class="fa-brands fa-linux"></i>';
    } else if (os.includes("windows")) {
      iconHtml = '<i class="fa-brands fa-windows"></i>';
    }
    if (iconHtml) {
      osIconSpan.innerHTML = iconHtml;
    }

    // Asegura que el contenedor sea visible
    osLabel.style.visibility = "visible";
  });
  document.querySelectorAll("os-label").forEach(function (osLabel) {
    const osIconSpan = osLabel.querySelector(".os-icon");
    if (!osIconSpan) return;

    const os = osIconSpan.dataset.os.toLowerCase();

    let iconHtml = "";
    if (os.includes("linux")) {
      iconHtml = '<i class="fa-brands fa-linux"></i>';
    } else if (os.includes("windows")) {
      iconHtml = '<i class="fa-brands fa-windows"></i>';
    }
    if (iconHtml) {
      osIconSpan.innerHTML = iconHtml;
    }

    // Asegura que el contenedor sea visible
    osLabel.style.visibility = "visible";
  });
});
