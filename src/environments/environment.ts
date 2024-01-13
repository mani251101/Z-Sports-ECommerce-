import { NgxLoggerLevel } from "ngx-logger";

export const environment =
{
  production: false,
  users: 'https://localhost:7190/api/Authenticate',
  address: 'https://localhost:7190/api/UserAddress',
  booking: 'https://localhost:7190/api/Booking',
  feedback: 'https://localhost:7190/api/Feedbacks',
  products: 'https://localhost:7190/api/Products',
  logging: {
    level:NgxLoggerLevel.DEBUG,
    serverLogLevel:NgxLoggerLevel.ERROR,
    serverLoggingUrl: 'https://localhost:7190/api/logs'
  }
};

export const shippingtype =
{
  production: false,
  shippingMethods: [
    'Standard Shipping',
    'Express Shipping',
    'Next-Day Delivery'
  ],
}
