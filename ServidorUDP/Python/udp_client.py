import socket

SERVER = "127.0.0.1"
PORT = 5000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

mensaje = input("Mensaje: ")

sock.sendto(mensaje.encode(), (SERVER, PORT))

data, _ = sock.recvfrom(1024)

print("Respuesta del servidor:", data.decode())