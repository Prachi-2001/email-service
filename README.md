# Resilient Email Sending Service

### This project is a resilient email sending service implemented in JavaScript. It ensures reliable email delivery by leveraging multiple email providers with features such as retry logic with exponential backoff, fallback between providers, idempotency, rate limiting, and status tracking.

## Features

- **Retry Mechanism**: Implements retry logic with exponential backoff to handle transient failures and increase the chances of successful email delivery.
- **Fallback Mechanism**: Automatically switches to an alternative email provider if the primary provider fails after a specified number of attempts.
- **Idempotency**: Ensures that duplicate emails are not sent by tracking email attempts.
- **Rate Limiting**: Limits the number of emails sent within a specific time frame to avoid overwhelming the providers and to comply with rate-limiting rules.
- **Status Tracking**: Logs and tracks the status of each email sending attempt for debugging and monitoring purposes.

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the Repository**
   ```bash
   git clone [https:](https://github.com/Prachi-2001/email-service.git)
2. **Navigate to the Project Directory**
   ```bash
   cd email-service
3. **Install Dependencies**
   ```bash
   npm install
4. **Run**
   ```bash
   node index.js

## Test Cases

### Basic Email Sending

- **Test**: Ensure an email is sent successfully using the first provider.
- **Expected Outcome**: The email is sent and a success message is logged.

### Retry Logic

- **Test**: Validate the retry mechanism with exponential backoff when the first provider fails.
- **Expected Outcome**: The service retries the specified number of times before switching providers.

### Fallback to Another Provider

- **Test**: Verify that the service switches to the second provider after failures with the first.
- **Expected Outcome**: The service switches to `MockProvider2` and attempts to send the email.

### Idempotency Check

- **Test**: Ensure that duplicate emails are not sent.
- **Expected Outcome**: Duplicate email attempts are skipped, with a log message indicating the email was already sent.

### Rate Limiting

- **Test**: Test the rate-limiting feature to ensure no more than the allowed number of emails are sent per minute.
- **Expected Outcome**: Emails beyond the rate limit are delayed appropriately.

### Switching Providers After Failures

- **Test**: Ensure that the service switches back to the primary provider after it becomes available again.
- **Expected Outcome**: The service reverts to using `MockProvider1` after it’s available.

### Logging

- **Test**: Verify that all significant events (e.g., retries, failures, provider switches) are logged.
- **Expected Outcome**: Relevant log messages are printed for each event.
