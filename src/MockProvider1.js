const EmailProvider = require("./EmailProvider");

class MockProvider1 extends EmailProvider {
  async sendEmail(to, subject, body) {
    console.log(`[MockProvider1] Sending email to ${to}`);
    // Simulate a failure with a 50% chance
    if (Math.random() > 0.5) throw new Error("Failed to send email");
  }
}

module.exports = MockProvider1;
