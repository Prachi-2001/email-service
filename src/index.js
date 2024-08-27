const EmailService = require("./EmailService");

const emailService = new EmailService();

async function main() {
  await emailService.sendEmail(
    "prachipachang164@gmail.com",
    "Test email",
    "Hello Everyone!"
  );
}

main();
