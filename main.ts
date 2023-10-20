import {getFilePathFromArgs, getTopNCounts, parseLogFile} from "./utils/helpers";

const filePath = getFilePathFromArgs();

parseLogFile(filePath).then(({ ipAddressCounts, urlCounts }) => {
  console.log("Unique IPs: " + Object.keys(ipAddressCounts).length);
  console.log(getTopNCounts(ipAddressCounts, 3));
  console.log(getTopNCounts(urlCounts, 3));
});
