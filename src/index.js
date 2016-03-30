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

let cookieManip = {
  createCookie: function(cname, cvalue, expd){
    let expires = '';
    if(expd){
      let d = new Date();
      d.setTime(d.getTime() + (expd*24*60*60*1000));
      expires = 'expires='+d.toUTCString();
    }
    document.cookie = cname + '=' + cvalue + ';' + expires + ';' + ' path=/';
  },
  getCookie: function(cname){
    const name = cname + '=';
    const ca = document.cookie.split(';');
    let cdata = '';
    ca.map((c) => {
      while(c.charAt(0) === ' ') c = c.substring(1);
      if(c.indexOf(name) === 0){
        cdata = c.substring(name.length, c.length);
      }
    });
    return cdata;
  }
};

let formManip = {
  domCache: {
    inputContainers: document.querySelectorAll('.op_input--container'),
    sameCInfoCheck: document.querySelector('.same-as-cInfo'),
    cInfoCard: document.querySelector('.op_cInfo'),
    bInfoCard: document.querySelector('.op_billing'),
    updateBtn: document.querySelector('.op_addons--updateBtn')
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
    this.domCache.updateBtn.addEventListener('click', () => {
      cookieManip.createCookie('op_updating', 'true');
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
      add1: parentCard.querySelector('.op_billing--add1'),
      add2: parentCard.querySelector('.op_billing--add2'),
      city: parentCard.querySelector('.op_billing--city'),
      state: parentCard.querySelector('.op_billing--state'),
      zip: parentCard.querySelector('.op_billing--zip')
    };

    const cInputs = {
      add1: this.domCache.cInfoCard.querySelector('.op_cInfo--add1'),
      add2: this.domCache.cInfoCard.querySelector('.op_cInfo--add2'),
      city: this.domCache.cInfoCard.querySelector('.op_cInfo--city'),
      state: this.domCache.cInfoCard.querySelector('.op_cInfo--state'),
      zip: this.domCache.cInfoCard.querySelector('.op_cInfo--zip')
    };

    if(e.target.checked){
      inputs.add1.value = cInputs.add1.value;
      inputs.add2.value = cInputs.add2.value;
      inputs.city.value = cInputs.city.value;
      inputs.state.value = cInputs.state.value;
      inputs.zip.value = cInputs.zip.value;
    } else {
      if(inputs.add1.value === cInputs.add1.value) inputs.add1.value = '';
      if(inputs.add2.value === cInputs.add2.value) inputs.add2.value = '';
      if(inputs.city.value === cInputs.city.value) inputs.city.value = '';
      if(inputs.state.value === cInputs.state.value) inputs.state.value = '';
      if(inputs.zip.value === cInputs.zip.value) inputs.zip.value = '';
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
    menuItems: document.querySelectorAll('.op_mainNav--navItem'),
    mobMenuItems: document.querySelectorAll('.op_mobileNav--link')
  },
  init: function(){
    this.initListeners();
  },
  initListeners: function(){
    [...this.domCache.menuItems].map((item, i) => {
      function callback(e){
        e.preventDefault();
        if(!state.isAnimating) cardManip.jumpToCard(i);
      }
      item.addEventListener('click', callback);
    });
    [...this.domCache.mobMenuItems].map((item, i) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        if(!state.isAnimating){
          cardManip.jumpToCard(i);
          this.hideSidebar();
        }
      });
    });

    this.domCache.sidebarToggle.addEventListener('click', (e) => {e.preventDefault(); this.hideSidebar(e);});
    this.domCache.btnToggle.addEventListener('click', (e) => {e.preventDefault(); this.hideBtn(e);});
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
    backBtns: document.querySelectorAll('.op_btn--back'),
    errorMsg: document.querySelector('.op_error--msg')
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
    if(this.domCache.errorMsg){
      this.setCurrentCard(cards, 3);
      this.setNextCard(cards, 4);
      this.setPrevCard(cards, 2);
    } else if(cookieManip.getCookie('op_updating')){
      this.setCurrentCard(cards, 2);
      this.setNextCard(cards, 3);
      this.setPrevCard(cards, 1);
      cookieManip.createCookie('op_updating', 'false', '-999');
    } else{
      this.setCurrentCard(cards, 0);
      this.setNextCard(cards, 1);
    }
  },
  initListeners: function(){
    [...this.domCache.fwdBtns].map((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
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
    const diff = to - el.scrollTop;
    const perTick = diff / dur * 10;

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
    radioBtns: document.querySelectorAll('.op_qPackage--header input[type=radio]'),
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
