#!C:/Python311/python.exe
import cgi
import cgitb
cgitb.enable()
import sys
sys.path.append('c:\\xampp\\htdocs\\Github\\directorio')
from py.clases import accion as acc

print('Content-type: text/html\n\n')  # Aquí corregí la sintaxis, debe ser text/html, no text\html

p=acc.accion()
acciones=p.listar()
for datos in acciones:
    for str_data in datos:
        lista=str_data.strip('()').split(',')
        p.cod_acc,p.nom_acc,p.est_acc=lista
        if p.est_acc == 'A':
            accion=p.nom_acc
print(accion)

