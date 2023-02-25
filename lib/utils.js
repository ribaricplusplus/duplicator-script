const os = require("os");
const path = require("path");
const fs = require("fs");
const { readdir } = require("fs/promises");
const { retry } = require("puppeteer-utilz");

const downloadsPath = path.join(os.homedir(), "Downloads");
const localWpRoot = path.join(os.homedir(), "Local Sites");

/**
 * Waits for the archive to download for max 45 minutes.
 */
async function waitForArchiveDownload() {
  await retry(
    async () => {
      const files = await readdir(downloadsPath);
      if (files.some((fileName) => path.basename(fileName).match(/archive/i))) {
        return true;
      }
      throw new Error("Not finished");
    },
    { retries: 900 }
  );
}

async function moveInstallerFiles(siteName) {
  const files = await readdir(downloadsPath);
  const archiveFile = files.find((fileName) =>
    path.basename(fileName).match(/archive/i)
  );
  fs.renameSync(
    path.join(downloadsPath, archiveFile),
    path.join(localWpRoot, siteName, "app/public", archiveFile)
  );
  fs.renameSync(
    path.join(downloadsPath, "installer.php"),
    path.join(localWpRoot, siteName, "app/public", "installer.php")
  );
}

module.exports = {
  waitForArchiveDownload,
  moveInstallerFiles,
};
