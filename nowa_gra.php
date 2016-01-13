<?php
require 'wspolne.php';
$rozmiar = (int) $_POST['rozmiar'];
// uwaga: wyścig
$wiersz = pg_fetch_assoc(pg_query("select coalesce(max(id_gry), 0) as najnowsze_ig_gry from stany"));
$id_gry = $wiersz['najnowsze_ig_gry'] + 1;
$stan = [
  'rozmiar' => $rozmiar,
  'wiersze' => []
];
for ($y=0; $y<$rozmiar; $y++) {
  $wiersz = [];
  for ($x=0; $x<$rozmiar; $x++) {
    $wiersz[] = NIC;
  }
  $stan['wiersze'][] = $wiersz;
}
pg_query_params("insert into stany (id_gry, stan) values ($1, $2)", [$id_gry, json_encode($stan)]);
header("Location: gra.php?id_gry=$id_gry");
?>
