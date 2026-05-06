const amqp = require("amqplib");

const startBillingService = async () => {
  const connection = await amqp.connect("amqp://guest:guest@localhost");
  const channel = await connection.createChannel();

  const exchange = "orders";
  const routingKey = "order.created";
  const queueName = "billing_queue";

  await channel.assertExchange(exchange, "topic", { durable: true });
  await channel.assertQueue(queueName, { durable: true });
  await channel.bindQueue(queueName, exchange, routingKey);

  channel.prefetch(1);

  console.log("[Billing-Service] En espera de órdenes...");

  channel.consume(
    queueName,
    (message) => {
      if (!message) return;

      const order = JSON.parse(message.content.toString());

      console.log("[Billing-Service] Generando factura...");
      console.log(`  ID Orden: ${order.id}`);
      console.log(`  Cliente:  ${order.customer}`);
      console.log(`  Total:    $${order.total.toFixed(2)}`);
      console.log(`  Fecha:    ${order.date}`);
      console.log("[Billing-Service] Factura generada exitosamente.\n");

      channel.ack(message);
    },
    { noAck: false },
  );
};

startBillingService().catch(console.error);
