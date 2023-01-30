import "./assets/sass/style.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import "normalize.css/normalize.css";


setTimeout(() => {
  (function () {
    const closeBanner = document.querySelector(".c-banner__close");
    closeBanner.addEventListener("click", (event) => {
      const banner = event.target.parentNode;
      banner.classList.add("collapse");

      banner.addEventListener("transitionend", (event) => {
        if (event.target === this) {
          this.remove();
        }
      });
    });
  })();
}, 200);
