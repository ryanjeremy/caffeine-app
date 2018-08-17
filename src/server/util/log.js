import chalk from 'chalk';

export const logNotice = (notice) => {
    console.log(`[${new Date().toISOString()}]`, chalk.blue(notice));
};

export const logError = (error) => {
    console.log(`[${new Date().toISOString()}]`, chalk.red(error));
};
