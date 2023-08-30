<?php
$host = 'localhost';
$database = 'directorio';
$user = 'postgres';
$password = '240296';

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $doctor=$_POST["doctor"];
        $consultorio=$_POST["consultorio"];
        $dia=$_POST["dia"];
        $desde=$_POST["desde"];
        $hasta=$_POST["hasta"];
        $pdo = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
        $nombre_consulta = $_POST["consulta"];
        
        $stmt = $pdo->prepare("select $nombre_consulta(:doctor, :consultorio, :dia, :desde, :hasta)");
        $stmt->bindParam(':doctor', $doctor);
        $stmt->bindParam(':consultorio', $consultorio);
        $stmt->bindParam(':dia', $dia);
        $stmt->bindParam(':desde', $desde);
        $stmt->bindParam(':hasta', $hasta);
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
