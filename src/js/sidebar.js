let sidebarManip = {
  setActiveItem: function(menuItems, cardIndex){
    console.log(menuItems);
    [...menuItems].map((item) => { item.className = item.className.replace(/ ?is-active/g, ''); });
    if([...menuItems].length > cardIndex ){
      menuItems[cardIndex].className = menuItems[cardIndex].className + ' is-active';
    } else{
      menuItems[menuItems.length - 1].className = menuItems[menuItems.length - 1].className + ' is-active';
    }
  }
};

export default sidebarManip;
