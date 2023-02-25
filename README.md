# Duplicator script

Script that runs Duplicator Pro through Puppeteer to clone a website into LocalWP.

## Usage instructions

Requirements

- Node.js and npm installed on your machine
- Upstream website with Duplicator Pro installed and activated. All security needs to be disabled.
- LocalWP running locally (where you want the site to be cloned)

Install the duplicator script

```bash
npm i -g @ribarich/duplicator-script
```

Run the script with all the required parameters. You can also pass a --db-only parameter to only clone the database. (Make sure to wrap the password in quotes as it can contain special charachters that invoke undesired terminal behaviour).

Make sure not to include a trailing `/` at the end of upstream URL and downstream URL.

```bash
npx @ribarich/duplicator-script clone https://example.com --downstream-url http://example.local --local-site-name example --username admin_username --password 'admin_pass'
```

### Options

- `--db-only` Clone only the database.
- `--reuse-package` Reuse last package instead of building a new one.

Then wait for the script to complete. How long it takes depends on the size of the website.

It is recommended that in the Duplicator Pro you add file filters for the files you're working on so that they do not get overriden. For example, if you're working on a theme and you have it stored in a GitHub directory, you wouldn't want the Duplicator process to override your local files. These settings can be configured in Duplicator Pro before running this script.

## Debugging

Pass the --debug flag to the script. This will display the browser so you can see what the script is doing and where it is having an issue.
