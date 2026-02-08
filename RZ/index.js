const viewMenuBtn = document.querySelector('.hero button');
const menuSection = document.querySelector('#menu');

viewMenuBtn.addEventListener('click', () => {

  menuSection.scrollIntoView({
    behavior: 'smooth'

  });

});