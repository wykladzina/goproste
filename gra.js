const NIC = 0;
const CZARNY = 1;
const BIALY = 2;

var stan = undefined;
var ostatni = '1410-07-15';
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
    ajax('daj_stan.php?id_gry=' + id_gry + '&ostatni=' + ostatni, resolve, reject);
  });
}

function stworz_plansze(stan) {
  var o = '';
  o += '<table>';
  o += '<tr>';
  for (var x = 0; x < stan.rozmiar + 1; x++) {
    o += '<td>';
    o += ['', 'A', 'Ą', 'B', 'C', 'Ć', 'CZ', 'D', 'DZ', 'DŻ', 'DŹ', 'E', 'Ę', 'F', 'G', 'H', 'CH', 'I', 'J', 'K', 'L', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'SZ', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ż', 'Ź', 'RZ'][x];
    o += '</td>';
  }
  o += '</tr>';
  for (var y = 0; y < stan.rozmiar; y++) {
    o += '<tr>';
    o += '<td>' + y + '</td>';
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
  pobierz_stan(id_gry, ostatni).then(function (stan) {
    if (stan) {
        pokazPobierz();
        setTimeout(ukryjPobierz, 1000);
        window.stan = stan.stan;
        window.ostatni = stan.kiedy_stanu;
        odrysuj_plansze();
    }
    setTimeout(pobierz, 100);
  }).catch(setTimeout.bind(undefined, pobierz, 100));
}

function wyslij() {
  pokazWyslij();
  ajax('masz_stan.php?id_gry=' + id_gry + '&stan=' + JSON.stringify(stan), ukryjWyslij, ukryjWyslij);
}

function ukryjPobierz() {
  document.getElementById('pobierz').style.visibility = 'hidden';
}

function ukryjWyslij() {
  document.getElementById('wyslij').style.visibility = 'hidden';
}

function pokazPobierz() {
  document.getElementById('pobierz').style.visibility = 'visible';
}

function pokazWyslij() {
  document.getElementById('wyslij').style.visibility = 'visible';
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
ukryjPobierz();
ukryjWyslij();
pobierz();

