<?php

class Game{
    private $id;
    private $time;
 
   /**
     * Get the value of id
     * 
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of time
     */ 
    public function getTime()
    {
        return $this->time;
    }

    /**
     * Set the value of time
     *
     * @return  self
     */ 
    public function setTime($time)
    {
        $this->time = $time;
        return $this;
    }


    public function add() : bool
    {
        $db = new Database();
        $result = $db->insert(
            "INSERT INTO game (`time`) VALUES (?)",
            [$this->time]
        );
        return $result;
    }

    /**
     * Select all games by time ASC
     * @return array
     */
    public static function list($max) : array
    {
        //Game::rank();
        $db= new Database();
        $times = $db->selectMany("Game", "SELECT * FROM game ORDER BY `time` ASC LIMIT $max");        
        return $times;
    }
} // END CLASS GAME








