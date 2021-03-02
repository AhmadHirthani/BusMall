'use strict';

let goodsArray = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can'
];

const allproducts = document.getElementById( 'allproducts' );
const leftImage = document.getElementById( 'left-image' );
const midImage = document.getElementById( 'middle-image' );
const rightImage = document.getElementById( 'right-image' );

let leftGoodsIndex = 0;
let rightGoodsIndex = 0;
let midGoodsIndex = 0;
const clickCounter = 25;

function Goods( name ) {
  this.name = name;
  this.image = `./img/${name}.jpg`;
  this.clicks = 0;
  this.shown = 0;
  Goods.all.push( this );
}

Goods.all = [];
Goods.counter = 0;

for( let i = 0; i < goodsArray.length; i++ ) {
  new Goods( goodsArray[i] );
}

console.log( Goods.all );

function renderNewGoods() {
  let leftIndex = randomNumber( 0, Goods.all.length - 1 );
  leftImage.src = Goods.all[leftIndex].image;
  leftImage.alt = Goods.all[leftIndex].name;
  leftGoodsIndex = leftIndex;


  let rightIndex;
  do {
    rightIndex = randomNumber( 0, Goods.all.length - 1 );
  } while( leftIndex === rightIndex );

  rightImage.src = Goods.all[rightIndex].image;
  rightImage.alt = Goods.all[rightIndex].name;
  rightGoodsIndex = rightIndex;

  let midIndex;
  do {
    midIndex = randomNumber( 0, Goods.all.length - 1 );
  } while( leftIndex === midIndex || midIndex === rightIndex );

  midImage.src = Goods.all[midIndex].image;
  midImage.alt = Goods.all[midIndex].name;
  midGoodsIndex = midIndex;

  Goods.all[leftIndex].shown++;
  Goods.all[rightIndex].shown++;
  Goods.all[midIndex].shown++;
  // rightImage.src = Goat.all[0].image;
}

function handelClick( event ) {

  if( Goods.counter <= clickCounter ) {
    const clickedElement = event.target;
    if( clickedElement.id === 'left-image' || clickedElement.id === 'right-image' || clickedElement.id === 'middle-image' ) {
      if( clickedElement.id === 'left-image' ) {
        Goods.all[leftGoodsIndex].clicks++;
      }

      if( clickedElement.id === 'right-image' ) {
        Goods.all[rightGoodsIndex].clicks++;
      }

      if( clickedElement.id === 'middle-image' ) {
        Goods.all[midGoodsIndex].clicks++;
      }

      Goods.counter++;
      renderNewGoods();

      console.log( Goods.all );
    }
  } else {
    document.getElementById ( 'hide' ) .style.visibility = 'visible';
    localStorage.setItem( 'q', JSON.stringify( Goods.all ) );

  }
}

allproducts.addEventListener( 'click', handelClick );
renderNewGoods();

const clickedBotton = document.getElementById( 'hide' );
clickedBotton.addEventListener ( 'click', function b (){


  const show = document.getElementById( 'summary' );
  const ulElement = document.createElement ( 'ul' );
  show.appendChild ( ulElement );
  for ( let j = 0 ; j < Goods.all.length ; j++ )
  {
    const liElemelt = document.createElement( 'li' );
    ulElement.appendChild( liElemelt );
    liElemelt.textContent = `the ${goodsArray[j]} image was shown ${Goods.all[j].shown} times, and it was clicked ${Goods.all[j].clicks} times`;
  }
  renderChart();
  /*   clickedBotton.textContent = 'reset';
  clickedBotton.onclick = function () {
    location.reload();
  }; */
  clickedBotton.removeEventListener ( 'click', b );
}
);

function getData() {
  const data = localStorage.getItem( 'q' );
  if ( data ) {
    const objData = JSON.parse( data );
    Goods.all = objData;
    renderNewGoods();
  }
}
getData();
function renderChart() {

  let nameArray = [];
  let clicksArray = [];
  let shownArray = [];

  for ( let i = 0; i < Goods.all.length; i++ ) {
    nameArray.push ( Goods.all[i].name );
    clicksArray.push ( Goods.all[i].clicks );
    shownArray.push ( Goods.all[i].shown );
  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  new Chart( ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: '# shown',
          data: shownArray,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 3
        },
        {
          label: '# of clicks',
          data: clicksArray,
          backgroundColor: 'rgba(0, 255, 255, 0.2)',
          borderColor: 'rgba(0, 255, 255, 1)',
          borderWidth: 3
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  } );
}

function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
