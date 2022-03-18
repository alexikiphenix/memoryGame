
<?php
require_once "utilities/Tools.php";
spl_autoload_register("Tools::MyAutoloader"); // Monautoloader permet de charger automatiquement
                                              // ls classes requises

if(!empty($_GET["class"]) && !empty($_GET["action"]))
{    
    $class = ucfirst(strtolower(Tools::removeSpecialChars($_GET["class"])))."Controller" ; // more strong than htmlentities or htmlspecialchars
    $methode = Tools::removeSpecialChars($_GET["action"]);                                 // keeping only letters, numbers, and _0
    

    if(method_exists($class, $methode))  // method_exists() plus rapide que is_callable()
    {
        $controller = new $class();     
        $controller->$methode();
    } else {
        (new DefaultController())->index();
    }
}
else
{
    (new DefaultController())->index();
}

