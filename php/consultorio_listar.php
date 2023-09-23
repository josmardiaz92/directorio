<?php
$host = 'localhost';
$database = 'directorio';
$user = 'postgres';
$password = '240296';

try {
    $connection = new PDO("pgsql:host=$host;dbname=$database", $user, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "select cod_con as codigo, nom_con as nombre, est_con as estatus from consultorio order by codigo";
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
