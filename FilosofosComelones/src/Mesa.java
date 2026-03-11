/**
 * Clase principal que inicializa la simulación de la mesa y los filósofos.
 */
public class Mesa {
    /**
     * Punto de entrada principal de la aplicación.
     * Configura los recursos compartidos y lanza los hilos.
     */
    public static void main(String[] args) {
        int numFilosofos = 5;
        Tenedor[] tenedores = new Tenedor[numFilosofos];
        Filosofo[] filosofos = new Filosofo[numFilosofos];

        for (int i = 0; i < numFilosofos; i++) {
            tenedores[i] = new Tenedor(i, (i + 1) % numFilosofos);
        }

        for  (int i = 0; i < numFilosofos; i++) {
            Tenedor tenedorIzquierdo =  tenedores[i];
            Tenedor tenedorDerecho =  tenedores[(i + 1) % numFilosofos];
            filosofos[i] = new Filosofo(i, tenedorIzquierdo, tenedorDerecho);
            filosofos[i].start();
        }
    }
}
