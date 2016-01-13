<?php
require 'wspolne.php';
$id_gry = (int) $_GET['id_gry'];
$wiersz = pg_fetch_assoc(pg_query_params("select stan from stany where id_gry=$1 order by kiedy_stanu desc limit 1", [$id_gry]));
$stan = $wiersz['stan'];
print $stan;
