const amqp = require("amqplib");

const publishOrder = async (order) => {
  const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();

  const exchange = "orders";
  const routingKey = "order.created";

  await channel.assertExchange(exchange, "topic", { durable: true });

  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(order)));

  console.log("[x] Orden publicada:");
  console.log(JSON.stringify(order, null, 2));

  setTimeout(() => connection.close(), 500);
};

const order = {
  id: `ORD-${Date.now()}`,
  customer: "Mario López",
  total: 350.0,
  date: new Date().toISOString(),
};

publishOrder(order).catch(console.error);
