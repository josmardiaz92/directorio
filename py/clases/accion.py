import sys
sys.path.append('c:\\xampp\\htdocs\\Github\\directorio')
from py.clases.base_datos import postgres_conexion as bd
class accion(bd.base_datos):
    def __init__(self):
        self.cod_acc=''
        self.nom_acc=''
        self.est_acc=''
    def listar(self):
        #*Llamamos a la funcion para listar en la base de datos
        sql=f"""select public.accion_listar()"""
        self.conectar()
        self.cursor.execute(sql) #*Le decimos al cursor que deseamos ejecutar la sentencia sql
        self.conexion.commit() #*Confirmamos la ejecución de la sentencia sql
        lista=self.cursor.fetchall() #*Lista de resultados
        self.cerrar()
        return lista #*retornamos la lista
    def eliminar(self):
        #*Llamamos a la funcion para eliminar en la base de datos
        sql=f"""select public.accion_eliminar('{self.nom_acc}')"""
        self.conectar()
        self.cursor.execute(sql) #*Le decimos al cursor que deseamos ejecutar la sentencia sql
        self.conexion.commit() #*Confirmamos la ejecución de la sentencia sql
        contador=self.cursor.rowcount #*contador de resultados
        self.cerrar()
        return contador #*retornamos la contador
    def reanudar(self):
        #*Llamamos a la funcion para reanudar en la base de datos
        sql=f"""select public.accion_reanudar('{self.nom_acc}')"""
        self.conectar()
        self.cursor.execute(sql) #*Le decimos al cursor que deseamos ejecutar la sentencia sql
        self.conexion.commit() #*Confirmamos la ejecución de la sentencia sql
        contador=self.cursor.rowcount #*contador de resultados
        self.cerrar()
        return contador #*retornamos la contador