<?php
$host = 'localhost';
$database = 'directorio';
$user = 'postgres';
$password = '240296';

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $nombre=$_POST["nombre"];
        $definicion=$_POST["definicion"];
        $id=$_POST["id"];
        $estatus=$_POST["estatus"];
        $consulta=$_POST["consulta"];
        $pdo = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
        $nombre_consulta = $_POST["consulta"];
        
        $stmt = $pdo->prepare("select $nombre_consulta(:nombre, :definicion, :estatus, :id)");
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':definicion', $definicion);
        $stmt->bindParam(':estatus', $estatus);
        $stmt->bindParam(':id', $id);
        $result = $stmt->execute();

        if ($result) {
            // El consultorio se eliminó correctamente
            $response = array("success" => true);
        } else {
            // Ocurrió un error al eliminar el consultorio
            $response = array("success" => false);
        }
    } else {
        // En caso de error, también se envía un objeto JSON
        $response = array("success" => false);
    }

    echo json_encode($response);
} catch (PDOException $e) {
    // Ocurrió un error de base de datos
    $response = array("success" => false, "error" => $e->getMessage());
    echo json_encode($response);
}
?>
