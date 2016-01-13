const NIC = 0;
const CZARNY = 1;
const BIALY = 2;

var stan = undefined;
var kolor = CZARNY;

function ajax(url, success, failure) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);
  xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        success(xhr.responseText === '' ? undefined : JSON.parse(xhr.responseText));
      } else {
        failure(xhr.status);
      }
    }
  };
};

function pobierz_stan(id_gry) {
  return new Promise(function (resolve, reject) {
    ajax('daj_stan.php?id_gry=' + id_gry, resolve, reject);
  });
}

function stworz_plansze(stan) {
  var o = '';
  o += '<table>';
  for (var y = 0; y < stan.rozmiar; y++) {
    o += '<tr>';
    for (var x = 0; x < stan.rozmiar; x++) {
      o += '<td onclick="klik(' + x + ', ' + y + ')">';
      var co = stan.wiersze[y][x];
      var src = 'img/' + (['nic', 'heart', 'tree'][co]) + '.svg';
      o += '<img class="element" src="' + src + '">';
      o += '</td>';
    }
    o += '</tr>';
  }
  o += '</table>';
  return o;
}

function klik(x, y) {
  stan.wiersze[y][x] = kolor;
  odrysuj_plansze();
  wyslij();
}

function odrysuj_plansze() {
  var plansza = stworz_plansze(stan);
  document.getElementById('plansza').innerHTML = plansza;
}

function pobierz() {
  pobierz_stan(id_gry).then(function (stan) {
    window.stan = stan;
    odrysuj_plansze();
  });
}

function wyslij() {
  ajax('masz_stan.php?id_gry=' + id_gry + '&stan=' + JSON.stringify(stan), function () {});
}

document.getElementById('nic').onclick = function () {
  kolor = NIC;
}
document.getElementById('czarny').onclick = function () {
  kolor = CZARNY;
}
document.getElementById('bialy').onclick = function () {
  kolor = BIALY;
}
document.getElementById('pobierz').onclick = function () {
  pobierz();
}
// document.getElementById('wyslij').onclick = function () {
//   wyslij();
// }
pobierz();
