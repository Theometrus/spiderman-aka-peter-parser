import {getFilePathFromArgs, getTopNCounts, parseLogFile,} from "./utils/helpers";

const filePath = getFilePathFromArgs();

parseLogFile(filePath)
  .then(({ ipAddressCounts, urlCounts }) => {
    const top3Urls = getTopNCounts(urlCounts, 3).map(
      ([url, count]) => `${url}, count: ${count}`,
    );
    const returnedNumUrls = top3Urls.length;

    const top3Ips = getTopNCounts(ipAddressCounts, 3).map(
      ([ip, count]) => `${ip}, count: ${count}`,
    );
    const returnedNumIps = top3Ips.length;

    console.log(
      `The number of unique IPs is: ${Object.keys(ipAddressCounts).length}`,
    );
    console.log("\n");

    if (returnedNumUrls < 3) {
      console.log("The log file contains fewer than 3 unique URLs.");
    }
    console.log(
      `The top ${returnedNumUrls} most visited URLs are:\n${top3Urls.join(
        "\n",
      )}`,
    );
    console.log("\n");

    if (returnedNumIps < 3) {
      console.log("The log file contains fewer than 3 unique IPs.");
    }
    console.log(
      `The top ${returnedNumIps} most active IPs are:\n${top3Ips.join("\n")}`,
    );
  })
  .catch((error) => {
    console.log("The following error occurred:");
    console.log(error);
  });
