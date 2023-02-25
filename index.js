#!/usr/bin/env node
const { program } = require("commander");
const duplicatorRecording = require("./lib/duplicator-recording");

async function main() {
  program.version("0.1.0");

  program
    .command("clone")
    .argument("<upstreamUrl>", "Upstream URL")
    .requiredOption("--downstream-url <http://example.local>", "Downstream URL")
    .requiredOption(
      "--local-site-name <example>",
      "Name of the local site. Directory within Local Sites."
    )
    .requiredOption("--username <username>")
    .requiredOption("--password <password>")
    .option("--db-only", "Clone database only")
    .option("--debug", "Display browser")
    .action(async (upstreamUrl, options) => {
      try {
        await duplicatorRecording({ ...options, upstreamUrl });
      } catch (err) {
        console.error(err);
        process.exit(1);
      }
    });

  await program.parseAsync();
}

main();
