<?php

class Database
{    
    private $cnx;
    protected $db2;
  
    /**
     * function constructeur connexion à la base
     */
    public function __construct()
    {
        require_once "config.php";
        try {
            $this->cnx = new PDO("mysql:host=".DATABASE['host'].";dbname=".DATABASE['dbname'].";charset=utf8", DATABASE['username'], DATABASE['password']);
            
         } catch (PDOException $error) {
             echo $error->getMessage();
             exit;
         }
    }
    
    /**
     * Modèle permettant l'utilisation automatisée de requête de sélection d'un élément
     * @param string $class, string $requete, array $param
     */
    public function selectOne(string $class ,string $requete, array $params = [])
    {
        $stmt= $this->cnx->prepare($requete);
        $stmt->execute($params);
        $stmt->setFetchMode(PDO::FETCH_CLASS, $class);
        $result = $stmt->fetch();
        return $result;
    }

    /**
     * Modèle permettant l'utilisation automatisée de requête de sélection de plusieurs éléments
     * @param string $class, string $requete, array $param
     */
    public function selectMany(string $class, string $requete, array $params = [])
    {
        $stmt= $this->cnx->prepare($requete);
        $stmt->execute($params);
        
        $stmt->setFetchMode(PDO::FETCH_CLASS, $class);
        $result = $stmt->fetchAll();
        
        return $result;
    }

    public function search(string $class ,string $requete, array $params = [])
    {
        $stmt= $this->cnx->prepare($requete);
        $stmt->execute($params);
        
        $stmt->setFetchMode(PDO::FETCH_CLASS, $class);
        $result = $stmt->fetchAll();
        
        return $result;
    }

    /**
     * Modèle permettant l'automatisation de requêtes d'insertion
     */
    public function insert(string $requete, array $params)
    {
        $stmt = $this->cnx->prepare($requete);
        $result= $stmt->execute($params);        
        return $result;
    }
    
    public function getLastId()
    {
        return $this->cnx->lastInsertId();
    }
   
    public function delete(string $requete, array $params)
    {
        $stmt= $this->cnx->prepare($requete);
        $result= $stmt->execute($params);
        return $result;
    }

    public function edit(string $requete, array $params)
    {
        $stmt= $this->cnx->prepare($requete);
        $result= $stmt->execute($params);
        return $result;
    }
 
    public function countEntities(string $class ,string $requete, array $params = [])
    {
        $stmt= $this->cnx->prepare($requete);
        $stmt->execute($params);
        $stmt->setFetchMode(PDO::FETCH_CLASS, $class);
        $result = $stmt->fetch();
        return $result;
    }

    /**
     * fonction destructeur
     */
    public function __destruct()
    {
        $this->cnx = null;    
    }
}


