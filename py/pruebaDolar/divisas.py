import requests
from bs4 import BeautifulSoup

def scrape_currency():
    url = 'https://www.bcv.org.ve/'
    r = requests.get(url)
    html_contents = r.text
    html_soup = BeautifulSoup(html_contents, 'html.parser')

    # Buscar todos los elementos con la clase "recuadrotsmc"
    recuadros = html_soup.find_all('div', class_='recuadrotsmc')

    # Crear una lista para almacenar los diccionarios
    informacion_divisas = []

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
        
        # Crear un diccionario con la información y agregarlo a la lista
        informacion_divisa = {
            "Moneda": moneda,
            "Valor": valor
        }
        informacion_divisas.append(informacion_divisa)

    # Imprimir la lista de diccionarios
    for divisa in informacion_divisas:
        print(divisa)
if __name__ == "__main__":
    scrape_currency()
