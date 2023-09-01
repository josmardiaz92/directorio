#!C:/Python311/python.exe
import cgi
import cgitb
cgitb.enable()
import sys
sys.path.append('c:\\xampp\\htdocs\\Github\\directorio')
from py.clases import divisa as div
print('Content-type: text/html\n\n')

d=div.divisa()

divisas=d.listar()



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
            <div id="cabeza" class="col-9 ">
            
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
    <script src="../js/antigua.js"></script>
    <script src="../node_modules/axios/dist/axios.min.js"></script>
</body>
</html>
''')
