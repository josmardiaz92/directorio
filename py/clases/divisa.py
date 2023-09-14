import requests
from bs4 import BeautifulSoup
import sys
sys.path.append('c:\\xampp\\htdocs\\Github\\directorio')
from py.clases.base_datos import postgres_conexion as bd
class divisa(bd.base_datos):
    def __init__(self):
        self.cod_div=''
        self.nom_div=''
        self.val_div=''
        self.fec_div=''
        self.est_div=''
        self.ultimaMoneda=''
    def agregar(self):
        #*Llamamos a la funcion para guardar en la base de datos
        sql=f"""select public.divisa_agregar('{self.nom_div}',{self.val_div})"""
        self.conectar()
        self.cursor.execute(sql) #*Le decimos al cursor que deseamos ejecutar la sentencia sql
        self.conexion.commit() #*Confirmamos la ejecución de la sentencia sql
        contador=self.cursor.rowcount #*Contamos el numero de filas afectadas
        self.cerrar()
        return contador #*retornamos el contador
    def listar(self):
        #*Llamamos a la funcion para listar en la base de datos
        sql=f"""select public.divisa_listar()"""
        self.conectar()
        self.cursor.execute(sql) #*Le decimos al cursor que deseamos ejecutar la sentencia sql
        self.conexion.commit() #*Confirmamos la ejecución de la sentencia sql
        lista=self.cursor.fetchall() #*Lista de resultados
        self.cerrar()
        return lista #*retornamos la lista
    def obtenerDivisas(self):
        url = 'https://www.bcv.org.ve/'
        r = requests.get(url)
        html_contents = r.text
        html_soup = BeautifulSoup(html_contents, 'html.parser')

        # Buscar todos los elementos con la clase "recuadrotsmc"
        recuadros = html_soup.find_all('div', class_='recuadrotsmc')

        # Crear una lista para almacenar los diccionarios
        informacion_divisas = []
        registros=self.listar()
        # Iterar a través de los elementos y extraer la información deseada
        for recuadro in recuadros:
            # Obtener el contenido del elemento strong
            strong_element = recuadro.find('strong')
            valor = strong_element.get_text(strip=True)
            # Reemplazar las comas por puntos en el valor
            valor = valor.replace(',', '.')
            
            # Obtener el contenido de la etiqueta span (moneda)
            span_element = recuadro.find('span')
            moneda = span_element.get_text(strip=True)
            moneda_buscada = moneda  # Cambia esto por el nombre de la moneda que deseas buscar

            registro_encontrado = None

            for registro in registros:
                datos = registro[0].split(',')
                moneda = datos[1]
                
                if moneda == moneda_buscada:
                    registro_encontrado = registro
                    break

            if registro_encontrado:
                self.ultimaMoneda=valor
            else:
                self.ultimaMoneda=0
            
            if valor != self.ultimaMoneda:
            # Crear un diccionario con la información y agregarlo a la lista
                informacion_divisa = {
                    "Moneda": moneda,
                    "Valor": valor
                }
                informacion_divisas.append(informacion_divisa)
                self.nom_div = moneda
                self.val_div = valor
                self.agregar()
            else:
                informacion_divisas='Las divisas estan al dia'
        return informacion_divisas
