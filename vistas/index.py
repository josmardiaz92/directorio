#!C:/Python311/python.exe
import cgi
import cgitb
cgitb.enable()
import sys
sys.path.append('c:\\xampp\\htdocs\\Github\\directorio')
from py.clases import turno as tur
from py.clases import divisa as div
print('Content-type: text/html\n\n')

t=tur.turno()
d=div.divisa()

turnos=t.listar()
divisas=d.listar()

especialidades = {}

for datos in turnos:
    for str_data in datos:
        listaTurnos = str_data.strip('()').split(',')
        t.cod_tur,t.fky_doc,t.nom_doc,t.fky_esp,t.nom_esp,t.fky_con,t.nom_con,t.fky_dia,t.nom_dia,t.ent_tur,t.sal_tur,t.est_tur = listaTurnos

        if t.est_tur == 'A':
            entrada=t.ent_tur.strip('""')
            salida=t.sal_tur.strip('""')
            horario = f"{t.nom_dia} {entrada} a {salida}"

            if t.nom_esp not in especialidades:
                especialidades[t.nom_esp] = {}

            if t.nom_doc not in especialidades[t.nom_esp]:
                especialidades[t.nom_esp][t.nom_doc] = []

            especialidades[t.nom_esp][t.nom_doc].append({
                'horario': horario,
                't.nom_con': t.nom_con  # Agregamos el nombre del consultorio
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
        <div class="row">
            <div class="col-9">
''')
for especialidad, doctores in especialidades.items():
    especialidad=especialidad.strip('""')
    print(f'''
        <div id="{especialidad}" class="text-capitalize text-warning d-none fade-out">
            <div class="mt-5">
                <h1>{especialidad}</h1>
            </div>
    ''')
    
    for doctor, horarios in doctores.items():
        doctor=doctor.strip('""')
        print(f'''
            <div class="row mt-5 doctor">
                <div class="col-12 col-lg-6 align-self-center ps-lg-4 text-center text-lg-start">
                    <h2>{doctor}</h2>
                </div>
                <div class="col-12 col-lg-3 text-center text-lg-start pt-1 align-self-center">
        ''')
        for horario_info in horarios:
            horario = horario_info['horario']
            print(f'''
                <p>{horario}</p>
        ''')

        consultorio_nombre = horarios[0]['t.nom_con']  # Tomamos el nombre del consultorio del primer horario
        print(f'''
                </div>
                <div class="col-12 col-lg-2 align-self-center">
                    <h3 class="text-center">Consultorio: {consultorio_nombre}</h3>
                </div>
            </div>
            <hr class="mx-5">
        ''')
    
    print('''
        </div>
    ''')
print('''
        </div>
    ''')
for datos in divisas:
    for str_data in datos:
        listaDivisas=str_data.strip('()').split(',')
        d.cod_div,d.nom_div,d.val_div,d.fec_div,d.est_div=listaDivisas
        valor=float(d.val_div)
        valor=round(valor, 2)
print(f""" 
<div class="col-3 d-flex text-capitalize text-warning d-block">
                <div class="row">
                    <div class="col text-center">
                        <div class="row">
                            <div class="col" id="titulo">
                                <h1>
                                    hospital san antonio de táriba
                                </h1>
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col">
                                <h2>
                                    Tasa BCV
                                </h2>
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col" id="tasa">
                                <h2>
                                    {valor if d.nom_div == 'USD' else ''}
                                </h2>
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col img-fluid" id="logoestatico">
                                <img src="../imagenes/logovertical.png" class="img-fluid logoEstatico bordeRedondeado p-3"  >
                            </div>
                        </div>
                    </div>
                </div>
                
            </div> 
            """)

print('''</div>
    </div>
    <script src="../js/main.js"></script>
    <script src="../node_modules/axios/dist/axios.min.js"></script>
</body>
</html>
''')
