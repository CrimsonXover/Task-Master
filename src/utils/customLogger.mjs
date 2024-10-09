const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m'
}

// Generic log function to handle strings and objects
const formatMessage = (message) => {
    if (typeof message === 'object') {
        return `${colors.green}${JSON.stringify(message, null, 2)}${colors.reset}`;
    }
    return `${colors.green}${message}${colors.reset}`;
};

console.log = (message) => {
    process.stdout.write(`${formatMessage(message)}\n`);
};

console.info = (message) => {
    process.stdout.write(`${colors.cyan}${formatMessage(message)}${colors.reset}\n`);
};

console.error = (message) => {
    process.stdout.write(`${colors.red}${formatMessage(message)}${colors.reset}\n`);
};

console.debug = (message) => {
    process.stdout.write(`${colors.yellow}${formatMessage(message)}${colors.reset}\n`);
};