const amqp = require("amqplib");

const startNotificationService = async () => {
  const connection = await amqp.connect("amqp://guest:guest@localhost");
  const channel = await connection.createChannel();

  const exchange = "orders";
  const routingKey = "order.created";
  const queueName = "notification_queue";

  await channel.assertExchange(exchange, "topic", { durable: true });
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, exchange, routingKey);

  channel.prefetch(1);

  console.log("[Notification-Service] En espera de órdenes...");

  channel.consume(
    queueName,
    (message) => {
      if (!message) return;

      const order = JSON.parse(message.content.toString());

      console.log("\n[Notification-Service] Enviando notificación...");
      console.log(`  Para      : ${order.customer}`);
      console.log(
        `  Mensaje   : Tu orden ${order.id} por $${order.total.toFixed(2)} fue recibida.`,
      );
      console.log(`  Fecha     : ${order.date}`);
      console.log(
        "[Notification-Service] Notificación enviada correctamente.\n",
      );

      channel.ack(message);
    },
    { noAck: false },
  );
};

startNotificationService().catch(console.error);
