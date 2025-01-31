const fs = require("fs");
const readline = require("readline");
const path = require("path");

if (process.argv.length !== 3) {
  console.error("Usage: node extract_logs.js <YYYY-MM-DD>");
  process.exit(1);
}

const targetDate = process.argv[2]; 
const logFilePath = "logs_2024.log"; 
const outputDir = "output";
const outputFilePath = path.join(outputDir, `output_${targetDate}.txt`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const readStream = fs.createReadStream(logFilePath, { encoding: "utf8" });
const rl = readline.createInterface({ input: readStream });

const writeStream = fs.createWriteStream(outputFilePath);

console.log(`Extracting logs for ${targetDate}...`);

rl.on("line", (line) => {
  if (line.startsWith(targetDate)) {
    writeStream.write(line + "\n");
  }
});

rl.on("close", () => {
  console.log(`Log extraction complete! Output saved to ${outputFilePath}`);
  writeStream.end();
});

rl.on("error", (err) => {
  console.error("Error reading the file:", err);
});

writeStream.on("error", (err) => {
  console.error("Error writing to output file:", err);
});
