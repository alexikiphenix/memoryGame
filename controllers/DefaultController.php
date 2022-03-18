<?php

class DefaultController extends AbstractController
{
    public function index()
    {
        $this->renderView("index_view", [
            "game" => Game::list(5)            
        ]);
    }
}