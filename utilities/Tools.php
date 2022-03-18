<?php

class Tools{
 
    /**
     * Fonction permettant de convertir secondes en minutes
     * @param int $seconds
     * @return string
     */
    static public function convertToMin($seconds)
    {
        $minutes = 0;
        if($seconds >= 60){        
            $minutes = floor($seconds / 60);
        }
        $seconds = $seconds%60;
        if($seconds < 10)  
            $seconds = '0'.$seconds;  
        return $minutes.'min : '.$seconds.'s';        
    }


    static public function MyAutoloader($class)
    {
        if(file_exists('utilities/'.$class.'.php'))
        {
            require_once('utilities/'.$class.'.php');            
        }
        else if(file_exists('controllers/'.$class.'.php'))
        {
            require_once('controllers/'.$class.'.php');            
        }
        else if(file_exists('modeles/'.$class.'.php'))
        {
            require_once('modeles/'.$class.'.php');            
        }
        else
            {echo '<h1>Classe '.$class.' non trouvée</h1>';}
    }
        

    /**
     * enlève les caractères spéciaux, plus adaptée dans ce contexte que htmlspecialchars ($_GET or $_POST)
     * @param string $imputTxt
     * @return string
     */
    public static function removeSpecialChars($imputTxt)
    {
        if(!empty($imputTxt) && is_string($imputTxt))
        {
            $imputTxt=preg_replace("/[^a-z0-9_ ]/i", "", $imputTxt);
        }
        else
        $imputTxt = "";

        return $imputTxt;
    }
}   
?>
