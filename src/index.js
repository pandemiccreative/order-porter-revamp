require('./less/style.less');
require('bootstrap-webpack!../bootstrap.config.js');

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

let sidebarManip = {
  domCache: {
    sidebar: document.getElementById('op_l-sidebar'),
    sidebarToggle: document.querySelector('.op_sidebar--toggle'),
    btnToggle: document.querySelector('.op_menuToggle'),
    menuItems: document.querySelectorAll('.op_mainNav--navItem')
  },
  initListeners: function(){
    [...this.domCache.menuItems].map((item, i) => {
      function callback(){
        if(!state.isAnimating) cardManip.jumpToCard(i);
      }
      item.addEventListener('click', callback);
    });
  },
  setActiveItem: function(cardIndex){
    const menuItems = this.domCache.menuItems;
    [...menuItems].map((item) => { item.className = item.className.replace(/ ?is-active/g, ''); });
    if([...menuItems].length > cardIndex ){
      menuItems[cardIndex].className = menuItems[cardIndex].className + ' is-active';
    } else{
      menuItems[menuItems.length - 1].className = menuItems[menuItems.length - 1].className + ' is-active';
    }
  }
};

let cardManip = {
  domCache: {
    menuItems: document.querySelectorAll('.op_mainNav--navItem'),
    cardHolder: document.querySelector('.l-cardRow'),
    cards: document.querySelectorAll('.l-card'),
    fwdBtns: document.querySelectorAll('.op_btn--fwd'),
    backBtns: document.querySelectorAll('.op_btn--back')
  },
  init: function(){
    this.cacheInfo(this.domCache.cards);
    this.initCards(this.domCache.cards);
    this.initListeners();
    sidebarManip.initListeners();
  },
  cacheInfo: function(cards){
    this.cardWidth = Math.max(...[...cards].map((card) => { return card.offsetWidth + 40; }));
    this.cardHeights = [...cards].map((card) => { return card.offsetHeight; });
  },
  initCards: function(cards){
    this.setWidths(cards);
    this.setCurrentCard(cards, 0);
    this.setNextCard(cards, 1);
  },
  initListeners: function(){
    [...this.domCache.fwdBtns].map((btn, i) => {
      btn.addEventListener('click', () => {
        this.moveFwd(this.domCache.cards, i + 1);
      });
    });
    [...this.domCache.backBtns].map((btn, i) => {
      btn.addEventListener('click', () => {
        this.moveBack(this.domCache.cards, i);
      });
    });
  },
  scrollTop: function(){
    window.scrollTo(0,0);
  },
  setWidths: function(cards){
    [...cards].map((card) => { card.style.width = this.cardWidth - 40 + 'px'; });
  },
  jumpToCard: function(cardIndex){
    if(this.domCache.cards[cardIndex]){
      if(cardIndex !== state.card){
        state.isAnimating = true;
        if(cardIndex > state.card){
          this.setNextCard(this.domCache.cards, cardIndex);
          window.setTimeout(() => {
            this.setCurrentCard(this.domCache.cards, cardIndex);
          }, 1);
          this.setPrevCard(this.domCache.cards, state.card);
          window.setTimeout(() => {
            this.domCache.cards[cardIndex - 1].className = this.domCache.cards[cardIndex - 1].className.replace(/ ?is-current/g, '');
            this.domCache.cards[cardIndex - 1].className = this.domCache.cards[cardIndex + 1].className.replace(/ ?is-current/g, '');
            this.setPrevCard(this.domCache.cards, cardIndex - 1);
            this.setNextCard(this.domCache.cards, cardIndex + 1);
          }, 750);
        } else{
          this.setPrevCard(this.domCache.cards, cardIndex);
          window.setTimeout(() => {
            this.setCurrentCard(this.domCache.cards, cardIndex);
          }, 1);
          this.setNextCard(this.domCache.cards, state.card);
          window.setTimeout(() => {
            this.setPrevCard(this.domCache.cards, cardIndex - 1);
            this.setNextCard(this.domCache.cards, cardIndex + 1);
          }, 750);
        }
        window.setTimeout(() => {
          state.isAnimating = false;
        }, 750);
      }
    }
  },
  setCurrentCard: function(cards, cardIndex){
    if((parseInt(this.domCache.cardHolder.style.height, 10) || 0) < this.cardHeights[cardIndex]){
      this.domCache.cardHolder.style.height = this.cardHeights[cardIndex] + 'px';
    } else{
      window.setTimeout(() => {
        this.domCache.cardHolder.style.height = this.cardHeights[cardIndex] + 'px';
      }, 750);
    }
    cards[cardIndex].style.left = '0px';
    cards[cardIndex].className = cards[cardIndex].className.replace(/ ?is-prev| ?is-current| ?is-next/g, '');
    // debugger;
    cards[cardIndex].className += ' is-current';
    // debugger;
    sidebarManip.setActiveItem(cardIndex);
    state.card = cardIndex;
  },
  setNextCard: function(cards, cardIndex){
    [...cards].map((card) => { card.className = card.className.replace(/ ?is-next/g, ''); });
    if(cards[cardIndex]){
      cards[cardIndex].style.left = this.cardWidth + 'px';
      cards[cardIndex].className = cards[cardIndex].className.replace(/ ?is-prev| ?is-next/g, '');
      cards[cardIndex].className += ' is-next';
      window.setTimeout(() => {
        if(state.card !== cardIndex) cards[cardIndex].className = cards[cardIndex].className.replace(/ ?is-current/g, '');
      }, 750);
    }
  },
  setPrevCard: function(cards, cardIndex){
    [...cards].map((card) => { card.className = card.className.replace(/ ?is-prev/g, ''); });
    if(cards[cardIndex]){
      cards[cardIndex].style.left = - this.cardWidth + 'px';
      cards[cardIndex].className = cards[cardIndex].className.replace(/ ?is-prev| ?is-next/g, '');
      cards[cardIndex].className += ' is-prev';
      window.setTimeout(() => {
        if(state.card !== cardIndex) cards[cardIndex].className = cards[cardIndex].className.replace(/ ?is-current/g, '');
      }, 750);
    }
  },
  moveFwd: function(cards, nextIndex){
    this.setCurrentCard(cards, nextIndex);
    if(cards[nextIndex + 1]) this.setNextCard(cards, nextIndex + 1);
    this.setPrevCard(cards, nextIndex - 1);
    this.scrollTop();
  },
  moveBack: function(cards, prevIndex){
    this.setCurrentCard(cards, prevIndex);
    this.setNextCard(cards, prevIndex + 1);
    if(cards[prevIndex - 1]) this.setPrevCard(cards, prevIndex - 1);
    this.scrollTop();
  }
};

cardManip.init();
console.log(cardManip)

// function setPages(cards){
//   const heights = cards.map((card) => card.offsetHeight);
//   state.domCache.cardHolder.style.height = Math.max(...heights) + 'px';
//   // console.log(state.domCache.cardHolder.style.height)
//   cards.map((card, i) => {
//     card.style.width = card.offsetWidth + 'px';
//     card.style.left = i * (card.offsetWidth + 40) + 'px';
//   });
// }

// setPages([...state.domCache.cards]);

// function moveFwd(){
//   [...state.domCache.cards].map((card) => {
//     card.style.left = parseInt(card.style.left, 10) - (card.offsetWidth + 40) + 'px';
//   });
// }
//
// function moveBack(){
//   [...state.domCache.cards].map((card) => {
//     card.style.left = parseInt(card.style.left, 10) + (card.offsetWidth + 40) + 'px';
//   });
// }

function showBtn(){
  state.domCache.btnToggle.style.left = '0px';
}

function hideSidebar(){
  state.domCache.sidebar.style.left = '-' + state.domCache.sidebar.offsetWidth + 'px';
  window.setTimeout(showBtn, 500);
}

function showSidebar(){
  state.domCache.sidebar.style.left = '0px';
}

function hideBtn(){
  state.domCache.btnToggle.style.left = '-' + (state.domCache.btnToggle.offsetWidth + 10) + 'px';
  window.setTimeout(showSidebar, 250);
}

function activateMenuItem(curPage){
  switch(curPage){
  case 0:
    state.domCache.menuItems[0].className += ' is-active';
    break;
  }
}

activateMenuItem(state.page);

state.domCache.sidebarToggle.addEventListener('click', hideSidebar);
state.domCache.btnToggle.addEventListener('click', hideBtn);
// [...state.domCache.fwdBtns].map((btn) => {
//   btn.addEventListener('click', moveFwd);
// });
// [...state.domCache.backBtns].map((btn) => {
//   btn.addEventListener('click', moveBack);
// });

window.onload = resize;
window.onresize = resize;

function resize(){
  const body = document.body;
  const html = document.documentElement;

  const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  document.querySelector('.op_sidebar').style.minHeight = height + 'px';
}
