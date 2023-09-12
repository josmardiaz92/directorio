<?php
$host = 'localhost';
$database = 'directorio';
$user = 'postgres';
$password = '240296';

try {
    $connection = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "select turno as codigo,fky_doc as codigodoctor, nom_doc as nombre, fky_esp as codigoespecialidad, nom_esp as especialidad, dia_tur as dia, fky_hor as codigohorario, nom_hor as nombrehorario, def_hor as horario,  fky_con as codigoconsultorio, nom_con as consultorio, est_tur as estatus, d15_tur from turnos";
    $statement = $connection->query($query);
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Cerrar la conexión
    $connection = null;

    // Convertir los datos a JSON
    $jsonResult = json_encode($result);

    // Enviar los datos JSON como respuesta
    header('Content-Type: application/json');
    echo $jsonResult;
} catch (PDOException $e) {
    echo json_encode(['error' => 'Error de conexión: ' . $e->getMessage()]);
}
?>
