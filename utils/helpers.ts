import {createReadStream} from "fs";
import {createInterface} from "readline";
import {Command} from "commander";
import {desiredNumEntries} from "../constants";

export type CountMap = Record<string, number>;

export function extractIp(str: string): string | null {
  const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  const match = str.match(ipRegex);

  return match ? match[0] : null;
}

export function extractUrl(str: string): string | null {
  const urlRegex =
    /"(GET|POST|PUT|DELETE|HEAD|OPTIONS|PATCH|CONNECT) (.*?) HTTP\/1.1"/;
  const match = str.match(urlRegex);

  return match ? match[2] : null;
}

export async function parseLogFile(
  path: string,
): Promise<{ ipAddressCounts: CountMap; urlCounts: CountMap }> {
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

export function getTopNCounts(
  countMap: CountMap,
  n: number,
): Array<[string, number]> {
  const sorted = Object.entries(countMap).sort(
    ([_keyA, countA], [_keyB, countB]) => countB - countA,
  );

  return sorted.slice(0, n);
}

export function getFilePathFromArgs(): string | null {
  const program = new Command();

  program.option("-f, --file");
  program.parse();

  const options = program.opts();
  const limit = options.first ? 1 : undefined;
  const arg = program.args[0];
  return arg?.split(options.separator, limit)[0] || null;
}

export function logEntities(
  numEntities: number,
  entities: string[],
  entityType: string,
): void {
  if (numEntities === 0) {
    console.log(`The log file doesn't have any valid ${entityType}s.`);
    return;
  }

  if (numEntities < desiredNumEntries) {
    console.log(
      `The log file contains fewer than ${desiredNumEntries} unique ${entityType}s.`,
    );
  }

  console.log(
    `The top ${numEntities} most visited ${entityType}s are:\n${entities.join(
      "\n",
    )}`,
  );
}
