from base_datos import postgres_conexion as bd
class divisa(bd.base_datos):
    def __init__(self):
        self.cod_div=''
        self.nom_div=''
        self.val_div=''
        self.fec_div=''
        self.est_div=''
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
        print(lista)
        self.cerrar()
        return lista #*retornamos la lista