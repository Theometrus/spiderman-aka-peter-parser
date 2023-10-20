import {createReadStream} from "fs";
import {createInterface} from "readline";

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

export async function readFileLines(path: string) {
  const input = createReadStream(path);

  const rl = createInterface({
    input: input,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    console.log(line);
  }
}
