const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

module.exports = {
  /**
   * environment
   */
  environment: process.env.NODE_ENV,
  /**
   * port
   */
  port: parseInt(process.env.PORT, 10),
  /**
   * RabitMQ endpoint
   */
  rabitmq_endpoint: process.env.RABITMQ_ENDPOINT,
  /**
   * IoT QUEUE
   */
  iot_queue: process.env.IOT_QUEUE,
  iot_queue2:process.env.IOT_QUEUE2
};
