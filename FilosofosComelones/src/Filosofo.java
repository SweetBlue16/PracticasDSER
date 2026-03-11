import java.util.Random;

/**
 * Representa a un Filósofo como un hilo de ejecución independiente.
 * Cada filósofo alterna entre pensar y comer, compitiendo por los tenedores compartidos.
 */
public class Filosofo extends Thread {
    private int id;
    private Tenedor tenedorIzquierdo;
    private Tenedor tenedorDerecho;
    private Random random = new Random();

    /**
     * Constructor del Filósofo.
     * @param id - Identificador único del filósofo.
     * @param izquierdo - Referencia al tenedor izquierdo.
     * @param derecho - Referencia al tenedor derecho.
     */
    public Filosofo(int id, Tenedor izquierdo, Tenedor derecho) {
        this.id = id;
        this.tenedorIzquierdo = izquierdo;
        this.tenedorDerecho = derecho;
    }

    /**
     * Ciclo de vida del filósofo (Vivir).
     * Se ejecuta en un bucle infinito alternando entre pensar y comer.
     */
    @Override
    public void run() {
        try {
            while (true) {
                pensar();
                System.out.println("Filósofo " + id + " se prepara para comer...");

                if (id == 4) {
                    tomarTenedor("derecho", tenedorDerecho);
                    tomarTenedor("izquierdo", tenedorIzquierdo);
                } else {
                    tomarTenedor("izquierdo", tenedorIzquierdo);
                    tomarTenedor("derecho", tenedorDerecho);
                }
                comer();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    /**
     * Simula el tiempo que el filósofo pasa pensando.
     * El hilo se duerme por un tiempo aleatorio.
     * @throws InterruptedException Si el hilo es interrumpido mientras duerme.
     */
    private void pensar() throws InterruptedException {
        System.out.println("Filósofo " + id + " está pensando...");
        Thread.sleep(random.nextInt(1000) + 500);
    }

    /**
     * Intenta adquirir un tenedor específico e imprime un mensaje en consola.
     * @param lado - Identificador de texto del lado del tenedor ("izquierdo" o "derecho").
     * @param tenedor - Referencia al objeto Tenedor a adquirir.
     * @throws InterruptedException Si el hilo es bloqueado e interrumpido.
     */
    private void tomarTenedor(String lado, Tenedor tenedor) throws InterruptedException {
        tenedor.tomar(id);
        System.out.println("Filósofo " + id + " toma su tenedor " + lado + "...");
    }

    /**
     * Simula el proceso de comer y posteriormente libera los recursos.
     * @throws InterruptedException Si el hilo es interrumpido mientras duerme.
     */
    private void comer() throws InterruptedException {
        System.out.println("Filósofo " + id + " está comiendo...");
        Thread.sleep(random.nextInt(1000) + 500);

        System.out.println("Filósofo " + id + " deja de comer...");

        tenedorIzquierdo.soltar(id);
        tenedorDerecho.soltar(id);
    }
}
