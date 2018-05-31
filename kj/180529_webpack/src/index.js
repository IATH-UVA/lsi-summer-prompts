import p5 from 'p5';

console.log('p5 library here', p5);

function component() {
  var element = document.createElement('div');

  element.innerHTML = ['Hello', 'webpack'],join(' ');

  return element;
}

document.body.appendChild(component());