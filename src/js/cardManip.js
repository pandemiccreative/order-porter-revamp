import sidebarManip from './sidebar.js';
import state from './state.js';

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
  cacheInfo: function(){
      this.domCache.cardWidth = this.domCache.cardHolder.offsetWidth + 40;
      this.domCache.cardHeights = [...this.domCache.cards].map((card) => { return card.offsetHeight; });
  },
  initCards: function(cards){
    this.setWidths(cards);
    this.setCurrentCard(cards, 0);
    // this.setNextCard(cards, 1);
  },
  resize: function(){
    this.cacheInfo(this.domCache.cards);
    this.setWidths(this.domCache.cards);
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
    if((parseInt(this.domCache.cardHolder.style.height, 10) || 0) < this.domCache.cardHeights[cardIndex]){
      this.domCache.cardHolder.style.height = this.domCache.cardHeights[cardIndex] + 'px';
    } else{
      window.setTimeout(() => {
        this.domCache.cardHolder.style.height = this.domCache.cardHeights[cardIndex] + 'px';
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

module.exports = cardManip;
