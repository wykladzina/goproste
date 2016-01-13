<?php
require 'wspolne.php';
$id_gry = (int) $_GET['id_gry'];
$stan = $_GET['stan'];
pg_query_params("insert into stany (id_gry, stan) values ($1, $2)", [$id_gry, $stan]);
