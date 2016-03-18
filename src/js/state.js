let state = {
  domCache: {
    sidebar: document.getElementById('op_l-sidebar'),
    sidebarToggle: document.querySelector('.op_sidebar--toggle'),
    btnToggle: document.querySelector('.op_menuToggle'),
    menuItems: document.querySelectorAll('.op_mainNav--navItem'),
    cardHolder: document.querySelector('.l-cardRow'),
    cards: document.querySelectorAll('.l-card'),
    fwdBtns: document.querySelectorAll('.op_btn--fwd'),
    backBtns: document.querySelectorAll('.op_btn--back')
  },
  card: 0,
  isAnimating: false
};

export default state;
