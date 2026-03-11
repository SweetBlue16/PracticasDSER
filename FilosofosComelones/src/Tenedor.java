/**
 * Representa un recurso compartido (Tenedor) en el problema de los filósofos comelones.
 * Implementa una aproximación de alternancia estricta para evitar la inanición.
 */
public class Tenedor {
    private int turno = -1;
    private final int idFilosofo1;
    private final int idFilosofo2;

    /**
     * Constructor del Tenedor,
     * @param f1 - ID del primer filósofo que comparte este tenedor.
     * @param f2 - ID del segundo filósofo que comparte este tenedor.
     */
    public Tenedor(int f1, int f2) {
        this.idFilosofo1 = f1;
        this.idFilosofo2 = f2;
    }

    /**
     * Intenta tomar el tenedor. Si el tenedor está ocupado por otro filósofo,
     * el hilo actual bloquea hasta que sea su turno.
     * @param idFilosofo - ID del filósofo que intenta tomar el tenedor.
     * @throws InterruptedException Si el hilo es interrumpido mientras espera.
     */
    public synchronized void tomar(int idFilosofo) throws InterruptedException {
        if (turno == -1) {
            turno = idFilosofo;
        }

        while (turno != idFilosofo) {
            wait();
        }
    }

    /**
     * Libera el tenedor y cede el turno al filósofo adyacente,
     * despertando a los hilos que puedan estar bloqueados esperando este recurso.
     * @param idFilosofoActual - ID del filósofo que está soltando el tenedor.
     */
    public synchronized void soltar(int idFilosofoActual) {
        turno = (idFilosofoActual == idFilosofo1) ? idFilosofo2 : idFilosofo1;
        notifyAll();
    }
}
