<?php
$id_gry = (int) $_GET['id_gry'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>otocz choinki sercem</title>
  <style>
table {
  border-collapse: collapse;
}

td {
  border: 1px solid;
  padding: 5px;
}

button {
  width: 64px;
  height: 64px;
  border: 0;
  margin: 5px;
}

.element {
  width: 32px;
  height: 32px;
  border: 0;
}

#wyslij {
  background:url(img/upload.svg);
  background-size: 100%;
  background-repeat: no-repeat;
}

#pobierz {
  background:url(img/download.svg);
  background-size: 100%;
  background-repeat: no-repeat;
}

#nic {
  background:url(img/bolt.svg);
  background-size: 100%;
  background-repeat: no-repeat;
}

#czarny {
  background:url(img/heart.svg);
  background-size: 100%;
  background-repeat: no-repeat;
}

#bialy {
  background:url(img/tree.svg);
  background-size: 100%;
  background-repeat: no-repeat;
}

#plansza table {
  margin: 1em auto;
}

#plansza td {
  text-align: center;
}

  </style>
</head>
<body>

<h1>gra numer <?=$id_gry?></h1>

  <div id="plansza"></div>

<hr>

<button id="nic"></button>
<button id="czarny"></button>
<button id="bialy"></button>
<button id="wyslij"></button>
<button id="pobierz"></button>


  <script>
    var id_gry = <?=$id_gry?>;
  </script>
  <script src='gra.js'></script>
</body>
</html>
