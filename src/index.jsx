require('./less/style.less');
require('bootstrap-webpack!../bootstrap.config.js');

const sidebarToggle = document.querySelector('.op_sidebar--toggle');

function toggleSidebar(e){
  const sidebar = document.getElementById('op_l-sidebar');
  sidebar.style.left = '-' + sidebar.offsetWidth + 'px';
  // console.log(sidebar.style.left);
}

sidebarToggle.addEventListener('click', toggleSidebar);

// function sidebar(e){
//   console.log(e);
// }

// window.onload = resize;
// window.onresize = resize;
//
// function resize(){
//   document.querySelector('.oPort-Sidebar').style.height = window.innerHeight + 'px';
//   document.querySelector('.oPort-Nav').style.height = window.innerHeight + 'px';
// }
