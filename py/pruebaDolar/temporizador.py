import schedule
import time
from divisas import scrape_currency

# Programar la ejecución diaria a una hora específica
schedule.every().day.at("12:15").do(scrape_currency)

# Mantener el programa en ejecución
while True:
    schedule.run_pending()
    time.sleep(1)
