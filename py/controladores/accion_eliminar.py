#!C:/Python311/python.exe
import cgi
import cgitb
cgitb.enable()
import sys
sys.path.append('c:\\xampp\\htdocs\\Github\\directorio')
from py.clases import accion as acc

print('Content-type: text/html\n\n')  # Aquí corregí la sintaxis, debe ser text/html, no text\html

# Recibimos las variables enviadas desde el formulario mediante CGI
form = cgi.FieldStorage()

# Obtenemos el valor del campo 'accion' enviado desde la vista (JavaScript)
accion = 'cardiologia'

# Verificamos si se recibió la acción correctamente
if accion:
    a = acc.accion()
    a.nom_acc = accion
    total = a.eliminar()
    print(total)
else:
    print("No se recibió ninguna acción válida desde la vista.")
