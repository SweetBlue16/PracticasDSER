import socket

HOST = "0.0.0.0"
PORT = 5000

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((HOST, PORT))

print("Servidor UDP escuchando en puerto", PORT)

while True:
    data, addr = sock.recvfrom(1024)
    print("Mensaje recibido:", data.decode(), "de", addr)

    sock.sendto(data, addr)