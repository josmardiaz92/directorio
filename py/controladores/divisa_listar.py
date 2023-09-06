#!C:/Python311/python.exe
import cgi
import cgitb
import json
cgitb.enable()
import sys
sys.path.append('c:\\xampp\\htdocs\\Github\\directorio')
from py.clases import divisa as esp
print('Content-type: text\html\n\n') #*aca aclaramos el tipo de contenido que se va a mostrar

#TODO recibimos las variables enviadas desde el formulario


p=esp.divisa()
datos=p.listar()
divisas={}
for dato in datos:
    for str in dato:
        lista=str.strip('()').split(',')
        p.cod_div,p.nom_div,p.val_div,p.fec_div,p.est_div=lista
        divisas[p.nom_div]=p.val_div
print(json.dumps(divisas))