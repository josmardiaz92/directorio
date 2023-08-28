import requests

def obtener_datos_divisas():
    url_api = "http://127.0.0.1:5000/api/v1/currency"  # Cambia la URL según corresponda
    response = requests.get(url_api)

    if response.status_code == 200:
        datos_divisas = response.json()
        return datos_divisas
    else:
        print("Error al obtener los datos de la API")
        return None

# Llamada a la función para obtener los datos de la API
datos_divisas = obtener_datos_divisas()

if datos_divisas is not None:
    for divisa in datos_divisas:
        print(f"Moneda: {divisa['Moneda']}, Valor: {divisa['Valor']}")
