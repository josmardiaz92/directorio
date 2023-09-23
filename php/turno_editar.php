<?php
$host = 'localhost';
$database = 'directorio';
$user = 'postgres';
$password = '240296';

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $doctor=$_POST["doctor"];
        $especialidad=$_POST["especialidad"];
        $dias=$_POST["dias"];
        $horario=$_POST["horario"];
        $consultorio=$_POST["consultorio"];
        $d15=$_POST["d15"];
        $id=$_POST["id"];
        $estatus=$_POST["estatus"];
        $consulta=$_POST["consulta"];
        $pdo = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
        $nombre_consulta = $_POST["consulta"];
        
        $stmt = $pdo->prepare("select $nombre_consulta(:doctor, :especialidad, :dias, :horario, :consultorio, :estatus, :d15, :id)");
        $stmt->bindParam(':doctor', $doctor);
        $stmt->bindParam(':especialidad', $especialidad);
        $stmt->bindParam(':dias', $dias);
        $stmt->bindParam(':horario', $horario);
        $stmt->bindParam(':consultorio', $consultorio);
        $stmt->bindParam(':d15', $d15);
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
