from flask import Flask, jsonify
import datetime
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/', methods=['GET'])
def get_currency():
    url = 'https://www.bcv.org.ve/'
    r = requests.get(url)
    html_contents = r.text
    html_soup = BeautifulSoup(html_contents, 'html.parser')

    recuadros = html_soup.find_all('div', class_='recuadrotsmc')

    informacion_divisas = []

    for recuadro in recuadros:
        strong_element = recuadro.find('strong')
        valor = strong_element.get_text(strip=True)
        valor = valor.replace(',', '.')

        span_element = recuadro.find('span')
        moneda = span_element.get_text(strip=True)

        informacion_divisa = {
            "Moneda": moneda,
            "Valor": valor,
            "timestamp": datetime.datetime.now().isoformat()
        }
        informacion_divisas.append(informacion_divisa)

    return jsonify(informacion_divisas)

if __name__ == '__main__':
    app.run()
