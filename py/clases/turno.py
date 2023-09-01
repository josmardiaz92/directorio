import sys
sys.path.append('c:\\xampp\\htdocs\\Github\\directorio')
from py.clases.base_datos import postgres_conexion as bd
class turno(bd.base_datos):
    def __init__(self):
        self.cod_tur=''
        self.fky_doc=''
        self.nom_doc=''
        self.fky_esp=''
        self.nom_esp=''
        self.fky_con=''
        self.nom_con=''
        self.fky_dia=''
        self.nom_dia=''
        self.ent_tur=''
        self.sal_tur=''
        self.est_tur=''
    def agregar(self):
        #*Llamamos a la funcion para guardar en la base de datos
        sql=f"""select public.turno_agregar({self.fky_doc},{self.fky_con},{self.fky_dia},'{self.ent_tur}','{self.sal_tur}')"""
        self.conectar()
        self.cursor.execute(sql) #*Le decimos al cursor que deseamos ejecutar la sentencia sql
        self.conexion.commit() #*Confirmamos la ejecución de la sentencia sql
        contador=self.cursor.rowcount #*Contamos el numero de filas afectadas
        self.cerrar()
        return contador #*retornamos el contador
    def modificar(self):
        #*Llamamos a la funcion para modificar en la base de datos
        sql=f"""select public.turno_modificar({self.fky_doc},{self.fky_con},{self.fky_dia},'{self.ent_tur}','{self.sal_tur}','{self.est_tur}',{self.cod_tur})"""
        self.conectar()
        self.cursor.execute(sql) #*Le decimos al cursor que deseamos ejecutar la sentencia sql
        self.conexion.commit() #*Confirmamos la ejecución de la sentencia sql
        contador=self.cursor.rowcount #*contador de resultados
        self.cerrar()
        return contador #*retornamos la contador
    def listar(self):
        #*Llamamos a la funcion para listar en la base de datos
        sql=f"""select public.turnos_listar()"""
        self.conectar()
        self.cursor.execute(sql) #*Le decimos al cursor que deseamos ejecutar la sentencia sql
        self.conexion.commit() #*Confirmamos la ejecución de la sentencia sql
        lista=self.cursor.fetchall() #*Lista de resultados
        self.cerrar()
        return lista #*retornamos la lista
    def eliminar(self):
        #*Llamamos a la funcion para eliminar en la base de datos
        sql=f"""select public.turno_eliminar({self.cod_tur})"""
        self.conectar()
        self.cursor.execute(sql) #*Le decimos al cursor que deseamos ejecutar la sentencia sql
        self.conexion.commit() #*Confirmamos la ejecución de la sentencia sql
        contador=self.cursor.rowcount #*contador de resultados
        self.cerrar()
        return contador #*retornamos la contador
    def reanudar(self):
        #*Llamamos a la funcion para reanudar en la base de datos
        sql=f"""select public.turno_reanudar({self.cod_tur})"""
        self.conectar()
        self.cursor.execute(sql) #*Le decimos al cursor que deseamos ejecutar la sentencia sql
        self.conexion.commit() #*Confirmamos la ejecución de la sentencia sql
        contador=self.cursor.rowcount #*contador de resultados
        self.cerrar()
        return contador #*retornamos la contador
