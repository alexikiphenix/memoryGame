<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/style.css">     
    <title>Jeu de mémoire</title>
</head>
<body>
<header>
    <a class="homeLink" href="index.php?class=game&action=index">Accueil</a>
    <div class="bestTimes">
        <?php if(isset($games)): ?>
            <h3>Meilleurs temps :</h3>
            <?php foreach($games as $game): ?>
                <p><?= Tools::convertToMin($game->getTime()) ?></p>
            <?php endforeach ?>
        <?php else: ?>
            <span>Pas de temps enregistré</span>
        <?php endif ?>
    </div>
</header>
