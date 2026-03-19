import socket
import urllib.request

HOST = "0.0.0.0"
PORT = 5000

def obtener_temperatura(ciudad):
    url = f"https://wttr.in/{ciudad}?format=3"
    response = urllib.request.urlopen(url)
    
    if response.getcode() == 200:
        return response.read().decode('utf-8').strip()
    else:
        return "Error al obtener la temperatura"

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((HOST, PORT))

print("Servidor UDP escuchando en puerto", PORT)

while True:
    data, addr = sock.recvfrom(1024)
    ciudad = data.decode('utf-8')
    temperatura = obtener_temperatura(ciudad)
    sock.sendto(temperatura.encode('utf-8'), addr)