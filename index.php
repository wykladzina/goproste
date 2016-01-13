<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>zagraj w go</title>
</head>
<body>

<h1>stwórz nową grę</h1>

<form action="nowa_gra.php" method="post">
  rozmiar planszy: <input type="text" name="rozmiar"><br>
  <button type='submit'>stwórz nową grę</button>
</form>

<h1>dołącz do gry</h1>

<form action="gra.php">
  numer gry: <input type="text" name="id_gry"><br>
  <button type='submit'>dołącz do gry</button>
</form>


</body>
</html>
