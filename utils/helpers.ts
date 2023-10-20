import {createReadStream} from "fs";
import {createInterface} from "readline";
import {Command} from "commander";

interface CountMap {
  [key: string]: number;
}

export function extractIp(str: string) {
  const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  const match = str.match(ipRegex);

  return match ? match[0] : null;
}

export function extractUrl(str: string) {
  const urlRegex =
    /"(GET|POST|PUT|DELETE|HEAD|OPTIONS|PATCH|CONNECT) (.*?) HTTP\/1.1"/;
  const match = str.match(urlRegex);

  return match ? match[2] : null;
}

export async function parseLogFile(path: string) {
  const input = createReadStream(path);
  const ipAddressCounts: CountMap = {};
  const urlCounts: CountMap = {};

  const readlineInterface = createInterface(input);

  for await (const line of readlineInterface) {
    const ip = extractIp(line);
    const url = extractUrl(line);

    if (ip) {
      ipAddressCounts[ip] = (ipAddressCounts[ip] || 0) + 1;
    }

    if (url) {
      urlCounts[url] = (urlCounts[url] || 0) + 1;
    }
  }

  return { ipAddressCounts, urlCounts };
}

export function getTopNCounts(countMap: CountMap, n: number) {
  const sorted = Object.entries(countMap).sort(
    ([_keyA, countA], [_keyB, countB]) => countB - countA,
  );

  return sorted.slice(0, n);
}

export function getFilePathFromArgs() {
  const SAMPLE_LOG_PATH = "logs/programming-task-example-data.log";

  const program = new Command();
  program.option("-f, --file");
  program.parse();
  const options = program.opts();
  const limit = options.first ? 1 : undefined;
  const arg = program.args[0];
  return arg ? arg.split(options.separator, limit)[0] : SAMPLE_LOG_PATH;
}