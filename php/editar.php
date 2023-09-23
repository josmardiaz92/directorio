<?php
$host = 'localhost';
$database = 'directorio';
$user = 'postgres';
$password = '240296';

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $nombre=$_POST["nombre"];
        $id=$_POST["id"];
        $estatus=$_POST["estatus"];
        $consulta=$_POST["consulta"];
        $pdo = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
        $nombre_consulta = $_POST["consulta"];
        
        $stmt = $pdo->prepare("select $nombre_consulta(:nombre, :estatus, :id)");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':estatus', $estatus);
        $stmt->bindParam(':id', $id);
        $result = $stmt->execute();

        if ($result) {
            $response = array("success" => true);
        } else {
            $response = array("success" => false);
        }
    } else {
        $response = array("success" => false);
    }

    echo json_encode($response);
} catch (PDOException $e) {
    // Ocurrió un error de base de datos
    $response = array("success" => false, "error" => $e->getMessage());
    echo json_encode($response);
}
?>
