#!C:/Python311/python.exe
import cgi
import cgitb
cgitb.enable()
import sys
sys.path.append('c:\\xampp\\htdocs\\Github\\directorio')
from py.clases import turno as tur
print('Content-type: text\html\n\n') #*aca aclaramos el tipo de contenido que se va a mostrar

#TODO recibimos las variables enviadas desde el formulario


t=tur.turno()
total=t.listar()
print(total)