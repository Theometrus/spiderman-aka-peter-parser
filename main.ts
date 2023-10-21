import {getFilePathFromArgs, getTopNCounts, logEntities, parseLogFile,} from "./utils/helpers";
import {desiredNumEntries, SAMPLE_LOG_PATH} from "./constants";

const filePath = getFilePathFromArgs() ?? SAMPLE_LOG_PATH;

parseLogFile(filePath)
  .then(({ ipAddressCounts, urlCounts }) => {
    const topUrls = getTopNCounts(urlCounts, desiredNumEntries).map(
      ([url, count]) => `${url}, count: ${count}`,
    );
    const returnedNumUrls = topUrls.length;

    const topIps = getTopNCounts(ipAddressCounts, desiredNumEntries).map(
      ([ip, count]) => `${ip}, count: ${count}`,
    );
    const returnedNumIps = topIps.length;

    console.log(
      `The number of unique IPs is: ${Object.keys(ipAddressCounts).length}`,
    );
    console.log("\n");

    logEntities(returnedNumUrls, topUrls, "URL");
    console.log("\n");
    logEntities(returnedNumIps, topIps, "IP");
  })
  .catch((error) => {
    console.log("The following error occurred:");
    console.log(error);
  });
