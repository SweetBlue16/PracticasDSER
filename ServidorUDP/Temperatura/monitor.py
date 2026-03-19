import socket
import time

SERVER = "127.0.0.1"
PORT = 5000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

ciudad = input("Ingrese el nombre de la ciudad para obtener la temperatura: ")

while True:
    sock.sendto(ciudad.encode(), (SERVER, PORT))

    data, _ = sock.recvfrom(1024)

    print("Temperatura en", data.decode())

    time.sleep(1)