#!C:/Python311/python.exe
import cgi
import cgitb
cgitb.enable()
import sys
sys.path.append('c:\\xampp\\htdocs\\Github\\directorio')
from py.clases import consultorio as con
print('Content-type: text\html\n\n') #*aca aclaramos el tipo de contenido que se va a mostrar

#TODO recibimos las variables enviadas desde el formulario
formulario=cgi.FieldStorage()


p=con.consultorio()
p.nom_con=formulario['nom_con'].value
total=p.agregar()
print(f'Se agregó {total} consultorio')