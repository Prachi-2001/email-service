const MockProvider1 = require("./MockProvider1");
const MockProvider2 = require("./MockProvider2");

class EmailService {
  constructor() {
    this.providers = [new MockProvider1(), new MockProvider2()];
    this.currentProviderIndex = 0;
    this.emailHistory = new Set();
    this.retryAttempts = 3;
    this.retryDelay = 1000; // 1 second
    this.rateLimit = 5; // Max 5 emails per minute
    this.emailsSent = 0;
    this.emailQueue = [];
  }

  async sendEmail(to, subject, body) {
    const emailId = `${to}-${subject}-${body}`;
    if (this.emailHistory.has(emailId)) {
      console.log("Email already sent. Skipping.");
      return;
    }
    this.emailHistory.add(emailId);

    const provider = this.providers[this.currentProviderIndex];
    let attempts = 0;

    while (attempts < this.retryAttempts) {
      try {
        await this._rateLimit();
        await provider.sendEmail(to, subject, body);
        console.log("Email sent successfully");
        this.emailsSent++;
        return;
      } catch (error) {
        console.error(`Attempt ${attempts + 1} failed: ${error.message}`);
        attempts++;
        if (attempts >= this.retryAttempts) {
          this._switchProvider();
        }
        await this._waitBeforeRetry(attempts);
      }
    }
  }

  _rateLimit() {
    if (this.emailsSent >= this.rateLimit) {
      return new Promise((resolve) => setTimeout(resolve, 60000)); // Wait 1 minute
    }
    return Promise.resolve();
  }

  _waitBeforeRetry(attempts) {
    return new Promise((resolve) =>
      setTimeout(resolve, this.retryDelay * Math.pow(2, attempts))
    );
  }

  _switchProvider() {
    this.currentProviderIndex =
      (this.currentProviderIndex + 1) % this.providers.length;
    console.log(`Switched to provider ${this.currentProviderIndex + 1}`);
  }
}

module.exports = EmailService;
