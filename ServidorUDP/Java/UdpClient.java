package com.socket.udp;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Scanner;

public class UdpClient {
    public static void main(String[] args) throws Exception {

        DatagramSocket socket = new DatagramSocket();
        InetAddress server = InetAddress.getByName("localhost");

        Scanner sc = new Scanner(System.in);

        System.out.print("Mensaje: ");
        String mensaje = sc.nextLine();

        byte[] buffer = mensaje.getBytes();

        DatagramPacket packet = new DatagramPacket(buffer, buffer.length, server, 5001);

        socket.send(packet);

        byte[] responseBuffer = new byte[1024];
        DatagramPacket response = new DatagramPacket(responseBuffer, responseBuffer.length);

        socket.receive(response);

        String respuesta = new String(response.getData(), 0, response.getLength());

        System.out.println("Respuesta del servidor: " + respuesta);

        socket.close();
    }
}
