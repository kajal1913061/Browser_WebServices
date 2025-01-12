# Browser_WebServices
Browserstack machine coding
Implement the following 4 WebServices in the choice of your language.
startBrowser() -> Start the browser(User Input) and opens given URL(User Input)
stopBrowser()-> Kill the specified opened browser.
getLatestURL()-> Fetched last visited URL (Doesn’t matter browser is running or it’s closed)
deleteAllHistory()-> Delete all the data -> Browser History, cookies, cache, saved passwords, bookmarks etc.
For the last 2, you’ll have to find how does any browser stores user-specific data locally. For Mozilla Firefox, it maintains places.SQLite, (And many similar files)So you’ll have to use JDBC Driver to extract/delete data from .sqlite files of Selenium or any 3rd party automation tool is strictly prohibited.

For more clarity see gfg https://www.geeksforgeeks.org/browserstack-interview-experience-for-freshers/
