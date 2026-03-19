package com.demo;

import java.io.IOException;
import java.net.*;
import java.util.Scanner;

public class Multicast {

    public static void main(String args[]) {
        try {
            InetAddress grupo = InetAddress.getByName("224.0.0.0");
            MulticastSocket socket = new MulticastSocket(6789);

            NetworkInterface netIf = NetworkInterface.getByInetAddress(InetAddress.getLocalHost());

            socket.joinGroup(new InetSocketAddress(grupo, 6789), netIf);

            Scanner scan = new Scanner(System.in);
            System.out.println("Envíe un mensaje al grupo: ");
            String msj = scan.nextLine();

            byte[] m = msj.getBytes();
            DatagramPacket mensajeSalida = new DatagramPacket(m, m.length, grupo, 6789);
            socket.send(mensajeSalida);

            byte[] bufer = new byte[1024];
            String linea;

            while (true) {
                DatagramPacket mensajeEntrada = new DatagramPacket(bufer, bufer.length);
                socket.receive(mensajeEntrada);
                linea = new String(mensajeEntrada.getData(), 0, mensajeEntrada.getLength());
                System.out.println("Recibido: " + linea);
                if (linea.equalsIgnoreCase("Adios")) {
                    break;
                }
            }

            socket.leaveGroup(new InetSocketAddress(grupo, 6789), netIf);

            socket.close();
        } catch (SocketException e) {
            System.out.println("Socket: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("IO: " + e.getMessage());
        }
    }
}
