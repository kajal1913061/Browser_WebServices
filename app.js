
const { platform } = require('os');
const { exec } = require('child_process');
const fs = require('fs');

var url = 'https://www.wikipedia.com';
var browser = 'Google Chrome'; // 'Safari'
var pids = {};

// Open a browser with a URL
function open_browser(browser_input, url) {
    let status = '', browser;
    if (browser_input == 'chrome') browser = 'Google Chrome';
    else if (browser_input == 'Safari') browser = 'Safari';
    else {
        status = 'Browser param invalid. Taking Safari as a default.';
        console.log(status);
        browser = 'Safari';
    }

    if (url === undefined) {
        console.error('Please enter a URL, e.g. "http://www.browserstack.com"');
        status += ' Invalid URL';
        return { code: 0, status }; // failed
    }

    let command;
    if (process.platform === 'win32') {
        status += ' Windows platform detected. This may not work as expected on Windows.';
        console.log(status);
        command = `start ${browser}:${url}`;
    } else if (process.platform === 'darwin') {
        command = `open -a "${browser}" ${url}`;
    } else {
        status += ' No platform detected';
        console.log(status);
        command = `google-chrome --no-sandbox ${url}`;
    }

    console.log(`Exec command: ${command}`);
    pids[browser_input] = exec(command).pid;
    console.log(pids, 'process IDs');
    return { code: 1, status }; // success
}

// Kill the specified browser
function kill_browser(browser_input) {
    let status = 'Browser killed', browser;
    if (browser_input == 'chrome') browser = 'Google Chrome';
    else if (browser_input == 'Safari') browser = 'Safari';
    else {
        status = 'Browser param invalid.';
        console.log(status);
        browser = 'Safari';
        return { status };
    }

    console.log(`Killing ${browser}`);
    exec(`pkill -f "${browser}"`);
    delete pids[browser_input]; // Remove the process ID from the list
    return { status };
}

// Cleanup (delete browser data like cache, history, etc.)
function cleanUp(browser_input) {
    let status = 'Cleanup completed', browser;
    if (browser_input == 'chrome') {
        browser = 'Google Chrome';
        const chromeDataPath = `${process.env.HOME}/Library/Application Support/Google/Chrome/Default`;
        cleanDirectory(chromeDataPath);
    } else if (browser_input == 'Safari') {
        browser = 'Safari';
        const safariDataPath = `${process.env.HOME}/Library/Safari`;
        cleanDirectory(safariDataPath);
    } else {
        status = 'Browser param invalid.';
        console.log(status);
        return { status };
    }

    console.log(`${browser} data cleaned.`);
    return { status };
}

// Function to clean up directories
function cleanDirectory(path) {
    try {
        if (fs.existsSync(path)) {
            fs.rmSync(path, { recursive: true, force: true });
            console.log(`Cleaned directory: ${path}`);
        } else {
            console.log(`Path not found: ${path}`);
        }
    } catch (err) {
        console.error(`Error cleaning directory: ${err.message}`);
    }
}

// Get the active tab's URL from the browser
function getactive(browser_input) {
    let browser;
    if (browser_input == 'chrome') browser = 'Google Chrome';
    else if (browser_input == 'Safari') browser = 'Safari';
    else {
        console.error('Invalid browser parameter.');
        return { activeURL: 'Unknown' };
    }

    try {
        if (browser === 'Google Chrome') {
            const command = `sqlite3 ~/Library/Application\\ Support/Google/Chrome/Default/History "SELECT url FROM urls ORDER BY last_visit_time DESC LIMIT 1;"`;
            const activeURL = execSync(command).toString().trim();
            return { activeURL };
        } else if (browser === 'Safari') {
            const command = `sqlite3 ~/Library/Safari/History.db "SELECT url FROM history_items ORDER BY visit_time DESC LIMIT 1;"`;
            const activeURL = execSync(command).toString().trim();
            return { activeURL };
        }
    } catch (err) {
        console.error(`Error fetching active tab: ${err.message}`);
        return { activeURL: 'Error fetching URL' };
    }
}

module.exports = {
    open_browser,
    kill_browser,
    cleanUp,
    getactive
};


// http://localhost:3000/start?browser=Safari&url=https://www.facebook.com/
// http://localhost:3000/start?browser=chrome&url=https://www.facebook.com/

// http://localhost:3000/stop?browser=chrome
// http://localhost:3000/stop?browser=Safari

// http://localhost:3000/cleanup?browser=Safari
//http://localhost:3000/geturl?browser=chrome

