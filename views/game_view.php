<?php
require_once "header.php";  
?>

<div class="container">
    <header>
        <h1>Jeu de mémoire</h1>  
    </header>                  
    <div id="pointsBarBox">
    </div>
    <div id="boardGameContainer">        
    </div>
    <div id="timeBarBox">            
    </div>
    <div id="buttonsBox">
        <p>
            <button id="startButton">Commencer</button>
        </p>            
    </div>
    <div id="timeElapsedBox"></div>
</div>
<form action="index.php?class=game&action=add" method="post" name="timeForm">
    <input id="timeOver" type="hidden" value="" name="timeOver">    
</form>  
   
<script src="assets/js/app.js" defer></script>
</body>
</html>
