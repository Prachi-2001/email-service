const EmailProvider = require("./EmailProvider");

class MockProvider2 extends EmailProvider {
  async sendEmail(to, subject, body) {
    console.log(`[MockProvider2] Sending email to ${to}`);
    // Simulate a failure with a 50% chance
    if (Math.random() > 0.5) throw new Error("Failed to send email");
  }
}

module.exports = MockProvider2;
