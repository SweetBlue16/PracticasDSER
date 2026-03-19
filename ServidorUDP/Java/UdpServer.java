package com.socket.udp;

import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class UdpServer {
    public static void main(String[] args) throws Exception {

        DatagramSocket socket = new DatagramSocket(5001);
        byte[] buffer = new byte[1024];

        System.out.println("Servidor UDP escuchando en puerto 5001");

        while (true) {

            DatagramPacket packet = new DatagramPacket(buffer, buffer.length);

            socket.receive(packet);

            String mensaje = new String(packet.getData(), 0, packet.getLength());

            System.out.println("Mensaje recibido: " + mensaje);
            System.out.println("Address: "+packet.getAddress());
            System.out.println("Port: "+packet.getPort());
            DatagramPacket response = new DatagramPacket(
                    packet.getData(),
                    packet.getLength(),
                    packet.getAddress(),
                    packet.getPort()
            );

            socket.send(response);
        }
    }
}
