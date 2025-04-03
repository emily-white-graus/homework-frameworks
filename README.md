**Welcome to my extraordinary cat generator app!!!! :)**


**What's my project about**

This project shows the same cat generator app built with both React.js and Svelte. It's a fun and simple app that gives you random cat images with silly titles and interesting cat facts at the click of a button. Hopefully you'll enjoy watching and learning about cats because cat pics are the best pics! ;)

My cat generator app does the following:
* Shows random cat images from the cat API
* Displays random cat facts from cat fact ninja
* Adds funny titles to the cat images
* Works on all screen sizes
* Built twice, once with react and once with svelte (same features but different frameworks)
* Has testing to make sure everything works properly (hopefully)
* Automatically deploys when code is updated (only if all checks are passed)


**How to run the project**

**React app:** From the project root navigate to the react-cat-generator directory and run the dev command. The react app should now be running at the local host.
**Svelte app:** From the project root navigate to the svelte-cat-generator directory and run the dev command. The svelte app should be running at the local host too. :)


**Which scripts are available**

**Main scripts (run these from the project root)**
These scripts work on both the React and Svelte versions:
* lint: check code quality with linting
* lint:format: fix code formatting automatically
* test:e2e: run browser tests on both apps
* test:e2e:headed: run browser tests with the browser visible
* test:e2e:debug: Run browser tests in debug mode

**Framework-specific scripts (run these inside each app folder)**
When you're inside either the react or svelte app folder:
* dev: start the development server
* build: build the app for production
* test:unit: run unit tests
* format:check: check if code is formatted correctly
* format: format the code automatically
* lint: check code quality


**What the pipeline (github actions) is doing**

When new code is pushed to github here's what happens:
1. Code is checked out
2. Node.js is set up
3. Dependencies are installed
4. Code quality is checked
5. Code formatting is verified
6. Unit tests are run
7. Apps are built
8. Browser tests are run
9. If all tests pass the apps are deployed to Netlify

This way the website is always up to date with the latest working code. Pretty neat right? ;)


Thanks for checking out my project! Hope you enjoy it! :)
(Thank you for the class too!)

Emily
