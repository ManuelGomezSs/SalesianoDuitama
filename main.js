const nav = document.getElementById("nav");
const footer = document.getElementById("footer");
let navTime;
let footerTime;

const TypeWriter = function(txtElement, words, wait = 2000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = "";
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
};

function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  new TypeWriter(txtElement, words, wait);
}

TypeWriter.prototype.type = function() {
  const current = this.wordIndex % this.words.length;
  const fullTxt = this.words[current];

  //comprobar si la palabra se esta borrando
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  //Insertar texto dentro del elemento
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //typescript inicial
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  //revisar si la palabra esta completa
  if (!this.isDeleting && this.txt === fullTxt) {
    typeSpeed = this.wait;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.wordIndex++;

    //pausar despues de escribir
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), typeSpeed);
};

//crear NavBar y Footer desaparecer
window.addEventListener("mousemove", () => {
  nav.classList.remove("hideNav");
  footer.classList.remove("hideNav");
  clearTimeout(navTime);
  clearTimeout(footerTime);

  mouseTimeout();
});

function mouseTimeout() {
  navTime = setTimeout(() => nav.classList.add("hideNav"), 1500);
  footerTime = setTimeout(() => footer.classList.add("hideNav"), 1500);
}

init();
