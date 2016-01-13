<?php
require 'wspolne.php';
$id_gry = (int) $_GET['id_gry'];
$ostatni = $_GET['ostatni'];
$mamy = false;
for ($i=0; $i<600; $i++) {
    $row = pg_fetch_row(pg_query_params("select * from stany where kiedy_stanu > $1 and id_gry = $2", [$ostatni, $id_gry]));
    if (false !== $row) {
        $mamy = true;
        break;
    }
    usleep(100000);
}
if ($mamy) {
    $wiersz = pg_fetch_assoc(pg_query_params("select * from stany where id_gry=$1 order by kiedy_stanu desc limit 1", [$id_gry]));
    $stan = json_decode($wiersz['stan']);
    print json_encode([
        'kiedy_stanu' => $wiersz['kiedy_stanu'],
        'stan' => $stan
    ]);
}
