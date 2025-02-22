<?php
class DbConnect {
    private $server = 'localhost';
    private $dbname = 'react-crud';
    private $user= 'root';
    private $pass='';
    public function connect(){
        try{
            $conn = new POD('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            return $conn;
        }
        catch(\Exception $e){
            echo "DB Error: " . $e->getMessage();
        }
    }

}