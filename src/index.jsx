require('./less/style.less');
require('bootstrap-webpack!../bootstrap.config.js');

window.onload = resize;
window.onresize = resize;

function resize(){
  document.querySelector('.oPort-Sidebar').style.height = window.innerHeight + 'px';
  document.querySelector('.oPort-Nav').style.height = window.innerHeight + 'px';
}
