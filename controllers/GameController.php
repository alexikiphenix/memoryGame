<?php

class GameController extends AbstractController{
 
    /**
    * Charge la page d'accueil
    * 
    */
    public function index(): void
    {        
        $this->renderView("index_view", [
            "games" => Game::list(5)            
        ]);
    }
    
    /**
     * Ajouter un temps de jeu 
     * @return bool
     */
    public function add(): bool
    {   
        if(!empty($_POST["timeOver"]))
        {      
            $game = new Game();   
            $game->setTime(trim(htmlentities($_POST["timeOver"])));            
            $idGame = $game->add();
            
            $this->renderView('game_view', [ // le render view est en quelque sorte un aiguillage 
                "games" => Game::list(5)             //qui dirige vers la page souhaitée
            ]);          
            return true;
        } 
        else
        {
            $this->renderView('game_view', [
                "games" => Game::list(5)             
            ]);        
            return false;
        }    
    }
}





