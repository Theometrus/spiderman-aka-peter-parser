import {getFilePathFromArgs, getTopNCounts, parseLogFile,} from "./utils/helpers";

const filePath = getFilePathFromArgs();

parseLogFile(filePath).then(({ ipAddressCounts, urlCounts }) => {
  const top3Urls = getTopNCounts(urlCounts, 3)
    .map(([url, _count]) => url)
    .join("\n");

  const top3Ips = getTopNCounts(ipAddressCounts, 3)
    .map(([ip, _count]) => ip)
    .join("\n");

  console.log(`Unique IPs: ${Object.keys(ipAddressCounts).length}`);
  console.log("\n");
  console.log(`Top 3 most visited URLS:\n${top3Urls}`);
  console.log("\n");

  console.log(`Top 3 most active IPs:\n${top3Ips}`);
});
