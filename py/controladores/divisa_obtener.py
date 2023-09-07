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
total=p.obtenerDivisas()
resultados_json = json.dumps(total)
print(resultados_json)