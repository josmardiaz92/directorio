#!C:/Python311/python.exe
import cgi
import cgitb
cgitb.enable()
import sys
sys.path.append('c:\\xampp\\htdocs\\Github\\directorio')
from py.clases import turno as tur
print('Content-type: text/html\n\n')

t = tur.turno()
turnos = t.listar()

especialidades = {}

for datos in turnos:
    for str_data in datos:
        listaTurnos = str_data.strip('()').split(',')
        cod_tur, fky_doc, nom_doc, fky_esp, nom_esp, fky_con, nom_con, fky_dia, nom_dia, ent_tur, sal_tur, est_tur = listaTurnos

        if est_tur == 'A':
            entrada=ent_tur.strip('""')
            salida=sal_tur.strip('""')
            horario = f"{nom_dia} {entrada} a {salida}"
            

            if nom_esp not in especialidades:
                especialidades[nom_esp] = {}

            if nom_doc not in especialidades[nom_esp]:
                especialidades[nom_esp][nom_doc] = []

            especialidades[nom_esp][nom_doc].append({
                'horario': horario,
                'nom_con': nom_con  # Agregamos el nombre del consultorio
            })

print('''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="latin1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../estilos/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="../estilos/iconos/css/all.min.css">
    <link rel="stylesheet" href="../estilos/personal/vistas_interfaz.css">
    <link rel="stylesheet" href="../estilos/personal/tranciciones.css">
    <link rel="icon" href="../imagenes/logovertical.png" type="image/x-icon">
    <title>Directorio</title>
</head>
<body class="bg-dark">
    <div class="container-fluid h-100" id="contenedor">
''')

for especialidad, doctores in especialidades.items():
    print(f'''
        <div id="{especialidad}" class="col-9 text-capitalize text-warning">
            <div class="mt-5">
                <h1>{especialidad}</h1>
            </div>
    ''')
    
    for doctor, horarios in doctores.items():
        print(f'''
            <div class="row mt-5">
                <div class="col-12 col-lg-6 align-self-center ps-lg-4 text-center text-lg-start doctor">
                    <h2>{doctor}</h2>
                </div>
                <div class="col-12 col-lg-3 text-center text-lg-start pt-1">
        ''')
        for horario_info in horarios:
            horario = horario_info['horario']
            print(f'''
                <p>{horario}</p>
        ''')

        consultorio_nombre = horarios[0]['nom_con']  # Tomamos el nombre del consultorio del primer horario
        print(f'''
                </div>
                <div class="col-12 col-lg-2 align-self-center">
                    <h2 class="text-center">Consultorio: {consultorio_nombre}</h2>
                </div>
            </div>
            <hr class="mx-5">
        ''')
    
    print('''
        </div>
    ''')

print('''
    </div>
</body>
</html>
''')
