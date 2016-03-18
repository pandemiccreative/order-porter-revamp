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
    backBtns: document.querySelectorAll('.op_btn--back'),
    inputContainers: document.querySelectorAll('.op_input--container')
  },
  card: 0,
  isAnimating: false
};

let formManip = {
  domCache: {
    inputContainers: document.querySelectorAll('.op_input--container'),
    sameCInfoCheck: document.querySelector('.same-as-cInfo'),
    sameSInfoCheck: document.querySelector('.same-as-shipping'),
    cInfoCard: document.querySelector('.op_cInfo'),
    sInfoCard: document.querySelector('.op_shipCard'),
    bInfoCard: document.querySelector('.op_billing')
  },
  init: function(){
    this.checkVals();
    this.initListeners();
  },
  checkVals: function(){
    [...this.domCache.inputContainers].map((container) => {
      if(container.querySelector('.op_input--text')){
        if(container.querySelector('.op_input--text').value && container.querySelector('.op_input--text').value !== null){
          container.querySelector('.op_input--label').className += ' is-shrunk';
        } else{
          container.querySelector('.op_input--label').className = container.querySelector('.op_input--label').className.replace(/ is-shrunk/gi, '');
        }
      }
      if(container.querySelector('.op_input--email')){
        if(container.querySelector('.op_input--email').value && container.querySelector('.op_input--email').value !== null){
          container.querySelector('.op_input--label').className += ' is-shrunk';
        } else{
          container.querySelector('.op_input--label').className = container.querySelector('.op_input--label').className.replace(/ is-shrunk/gi, '');
        }
      }
      if(container.querySelector('.op_input--password')){
        if(container.querySelector('.op_input--password').value && container.querySelector('.op_input--password').value !== null){
          container.querySelector('.op_input--label').className += ' is-shrunk';
        } else{
          container.querySelector('.op_input--label').className = container.querySelector('.op_input--label').className.replace(/ is-shrunk/gi, '');
        }
      }
    });
  },
  initListeners: function(){
    [...this.domCache.inputContainers].map((container) => {
      if(container.querySelector('.op_input--text')){
        container.querySelector('.op_input--text').addEventListener('focus', this.shrink);
        container.querySelector('.op_input--text').addEventListener('blur', this.unShrink);
        container.querySelector('.op_input--label').addEventListener('click', () => {
          container.querySelector('.op_input--text').focus();
        });
      }
      if(container.querySelector('.op_input--email')){
        container.querySelector('.op_input--email').addEventListener('focus', this.shrink);
        container.querySelector('.op_input--email').addEventListener('blur', this.unShrink);
        container.querySelector('.op_input--label').addEventListener('click', () => {
          container.querySelector('.op_input--email').focus();
        });
      }
      if(container.querySelector('.op_input--password')){
        container.querySelector('.op_input--password').addEventListener('focus', this.shrink);
        container.querySelector('.op_input--password').addEventListener('blur', this.unShrink);
        container.querySelector('.op_input--label').addEventListener('click', () => {
          container.querySelector('.op_input--password').focus();
        });
      }
    });
    this.domCache.sameCInfoCheck.addEventListener('click', (e) => {
      this.copyCInfo(e);
    });
    this.domCache.sameSInfoCheck.addEventListener('click', (e) => {
      this.copySInfo(e);
    });
  },
  shrink: function(e){
    e.target.parentNode.querySelector('.op_input--label').className += ' is-shrunk';
  },
  unShrink: function(e){
    let labelClass = e.target.parentNode.querySelector('.op_input--label').className;
    if(!e.target.value || e.target.value === null) e.target.parentNode.querySelector('.op_input--label').className = labelClass.replace(/ is-shrunk/gi, '');
  },
  copyCInfo: function(e){
    const parentCard = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;

    const inputs = {
      cName: parentCard.querySelector('.op_shipCard--sName'),
      add1: parentCard.querySelector('.op_shipCard--sAdd1'),
      add2: parentCard.querySelector('.op_shipCard--sAdd2'),
      city: parentCard.querySelector('.op_shipCard--sCity'),
      state: parentCard.querySelector('.op_shipCard--sState'),
      zip: parentCard.querySelector('.op_shipCard--sZip'),
      country: parentCard.querySelector('.op_shipCard--sCountry')
    };

    const cInputs = {
      cName: this.domCache.cInfoCard.querySelector('.op_cInfo--company'),
      add1: this.domCache.cInfoCard.querySelector('.op_cInfo--add1'),
      add2: this.domCache.cInfoCard.querySelector('.op_cInfo--add2'),
      city: this.domCache.cInfoCard.querySelector('.op_cInfo--city'),
      state: this.domCache.cInfoCard.querySelector('.op_cInfo--state'),
      zip: this.domCache.cInfoCard.querySelector('.op_cInfo--zip'),
      country: this.domCache.cInfoCard.querySelector('.op_cInfo--country')
    };

    if(e.target.checked){
      inputs.cName.value = cInputs.cName.value;
      inputs.add1.value = cInputs.add1.value;
      inputs.add2.value = cInputs.add2.value;
      inputs.city.value = cInputs.city.value;
      inputs.state.value = cInputs.state.value;
      inputs.zip.value = cInputs.zip.value;
      inputs.country.value = cInputs.country.value;
    } else {
      if(inputs.cName.value === cInputs.cName.value) inputs.cName.value = '';
      if(inputs.add1.value === cInputs.add1.value) inputs.add1.value = '';
      if(inputs.add2.value === cInputs.add2.value) inputs.add2.value = '';
      if(inputs.city.value === cInputs.city.value) inputs.city.value = '';
      if(inputs.state.value === cInputs.state.value) inputs.state.value = '';
      if(inputs.zip.value === cInputs.zip.value) inputs.zip.value = '';
      if(inputs.country.value === cInputs.country.value) inputs.country.value = '';
    }

    this.checkVals();
  },
  copySInfo: function(e){
    const parentCard = e.target.parentNode.parentNode.parentNode.parentNode;

    const inputs = {
      add1: parentCard.querySelector('.op_billing--add1'),
      add2: parentCard.querySelector('.op_billing--add2'),
      city: parentCard.querySelector('.op_billing--city'),
      state: parentCard.querySelector('.op_billing--state'),
      zip: parentCard.querySelector('.op_billing--zip')
    };

    const bInputs = {
      add1: this.domCache.sInfoCard.querySelector('.op_shipCard--sAdd1'),
      add2: this.domCache.sInfoCard.querySelector('.op_shipCard--sAdd2'),
      city: this.domCache.sInfoCard.querySelector('.op_shipCard--sCity'),
      state: this.domCache.sInfoCard.querySelector('.op_shipCard--sState'),
      zip: this.domCache.sInfoCard.querySelector('.op_shipCard--sZip')
    };

    if(e.target.checked){
      inputs.add1.value = bInputs.add1.value;
      inputs.add2.value = bInputs.add2.value;
      inputs.city.value = bInputs.city.value;
      inputs.state.value = bInputs.state.value;
      inputs.zip.value = bInputs.zip.value;
    } else {
      if(inputs.add1.value === bInputs.add1.value) inputs.add1.value = '';
      if(inputs.add2.value === bInputs.add2.value) inputs.add2.value = '';
      if(inputs.city.value === bInputs.city.value) inputs.city.value = '';
      if(inputs.state.value === bInputs.state.value) inputs.state.value = '';
      if(inputs.zip.value === bInputs.zip.value) inputs.zip.value = '';
    }

    this.checkVals();
  }
};

let sidebarManip = {
  domCache: {
    sidebar: document.getElementById('op_l-sidebar'),
    sidebarToggle: document.querySelector('.op_sidebar--toggle'),
    btnToggle: document.querySelector('.op_menuToggle'),
    menuItems: document.querySelectorAll('.op_mainNav--navItem')
  },
  init: function(){
    this.initListeners();
  },
  initListeners: function(){
    [...this.domCache.menuItems].map((item, i) => {
      function callback(){
        if(!state.isAnimating) cardManip.jumpToCard(i);
      }
      item.addEventListener('click', callback);
    });

    this.domCache.sidebarToggle.addEventListener('click', (e) => {this.hideSidebar(e);});
    this.domCache.btnToggle.addEventListener('click', (e) => {this.hideBtn(e);});
  },
  setActiveItem: function(cardIndex){
    const menuItems = this.domCache.menuItems;
    [...menuItems].map((item) => { item.className = item.className.replace(/ ?is-active/g, ''); });
    if([...menuItems].length > cardIndex ){
      menuItems[cardIndex].className = menuItems[cardIndex].className + ' is-active';
    } else{
      menuItems[menuItems.length - 1].className = menuItems[menuItems.length - 1].className + ' is-active';
    }
  },
  showBtn: function(){
    this.domCache.btnToggle.style.left = '0px';
  },
  hideSidebar: function(){
    this.domCache.sidebar.style.left = '-' + this.domCache.sidebar.offsetWidth + 'px';
    window.setTimeout(() => {this.showBtn();}, 500);
  },
  showSidebar: function(){
    this.domCache.sidebar.style.left = '0px';
  },
  hideBtn: function(){
    this.domCache.btnToggle.style.left = '-' + (this.domCache.btnToggle.offsetWidth + 10) + 'px';
    window.setTimeout(() => {this.showSidebar();}, 250);
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
    sidebarManip.init();
    formManip.init();
    packageManip.init();
  },
  cacheInfo: function(cards){
    this.cardWidth = this.domCache.cardHolder.offsetWidth + 40;
    // this.cardWidth = Math.max(...[...cards].map((card) => { return card.offsetWidth + 40; }));
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
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.moveBack(this.domCache.cards, i);
      });
    });
  },
  resize: function(){
    this.cacheInfo(this.domCache.cards);
    this.setWidths(this.domCache.cards);
  },
  scrollTop: function(el, to, dur){
    if(dur <= 0) return;
    console.log(el, to, dur);
    const diff = to - el.scrollTop;
    console.log(diff);
    const perTick = diff / dur * 10;
    console.log(perTick);

    setTimeout(() => {
      el.scrollTop = el.scrollTop + perTick;
      if(el.scrollTop === to) return;
      this.scrollTop(el, to, dur - 10);
    }, 10);
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
      resize();
    } else{
      window.setTimeout(() => {
        this.domCache.cardHolder.style.height = this.cardHeights[cardIndex] + 'px';
        resize();
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
    window.setTimeout(() => {
      resize();
    }, 751);
    this.scrollTop(document.body, 0, 250);
  },
  moveBack: function(cards, prevIndex){
    console.log('test')
    this.setCurrentCard(cards, prevIndex);
    this.setNextCard(cards, prevIndex + 1);
    if(cards[prevIndex - 1]) this.setPrevCard(cards, prevIndex - 1);
    window.setTimeout(() => {
      resize();
    }, 751);
    this.scrollTop(document.body, 0, 250);
  }
};

let packageManip = {
  domCache: {
    radioBtns: document.querySelectorAll('.op_qPackage--inRadio'),
    packages: document.querySelectorAll('.op_qPackage')
  },
  init: function(){
    this.initListeners();
  },
  initListeners: function(){
    [...this.domCache.radioBtns].map((btn) => {
      btn.addEventListener('change', (e) => {
        this.toggleSelected(e);
      });
    });
  },
  toggleSelected: function(e){
    [...this.domCache.packages].map((pkg) => {
      pkg.className = pkg.className.replace(/ is-selected/gi, '');
    });
    const pPkg = e.target.parentNode.parentNode.parentNode.parentNode;
    pPkg.className += ' is-selected';
  }
};

window.onload = resize;
window.onresize = resize;

function resize(){
  document.querySelector('.op_sidebar').style.minHeight = 'auto';
  const body = document.body;
  const html = document.documentElement;

  cardManip.resize();

  const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  document.querySelector('.op_sidebar').style.minHeight = height + 'px';
}

cardManip.init();
