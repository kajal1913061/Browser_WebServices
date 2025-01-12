# Browser_WebServices

This project implements a set of web services to control and manage browser sessions, as part of Browserstack machine coding.

## Web Services

1. **startBrowser()**
   - Starts the specified browser (user input) and opens the given URL (user input).

2. **stopBrowser()**
   - Kills the specified opened browser.

3. **getLatestURL()**
   - Retrieves the last visited URL, regardless of whether the browser is running or closed.

4. **deleteAllHistory()**
   - Deletes all user-specific data including browser history, cookies, cache, saved passwords, bookmarks, etc.

## Implementation Details

For the `getLatestURL` and `deleteAllHistory` services, you will need to understand how browsers store user-specific data locally. For example, Mozilla Firefox uses files like `places.sqlite`. You will need to use appropriate methods or libraries such as JDBC for database interactions.

For more details, refer to this [GeeksforGeeks article](https://www.geeksforgeeks.org/browserstack-interview-experience-for-freshers/).

## Setup and Usage

1. **Clone the repository**
   ```sh
   git clone https://github.com/kajal1913061/Browser_WebServices.git
   cd Browser_WebServices

  
