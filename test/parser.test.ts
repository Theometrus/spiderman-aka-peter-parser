import {extractIp, extractUrl, getTopNCounts, parseLogFile,} from "../utils/helpers";

describe("extractIp", () => {
  it("should extract IP address from a string", () => {
    const input = "Sample text with IP address 192.168.1.1 inside.";
    expect(extractIp(input)).toEqual("192.168.1.1");
  });

  it("should return null for a string without an IP address", () => {
    const input = "No IP address in this string.";
    expect(extractIp(input)).toBeNull();
  });

  it("should return null for an empty string", () => {
    const input = "";
    expect(extractIp(input)).toBeNull();
  });

  it("should return null for a string with an invalid IP address format", () => {
    const input = "Invalid IP address: 255.1.1";
    expect(extractIp(input)).toBeNull();
  });

  it("should extract the first IP address in a string with multiple IP addresses", () => {
    const input = "Multiple IP addresses: 192.168.1.1 and 10.0.0.1";
    expect(extractIp(input)).toEqual("192.168.1.1");
  });
});

describe("extractUrl", () => {
  it("should extract URL from a log string", () => {
    const input =
      '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "POST /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"';
    const url = "/intranet-analytics/";
    expect(extractUrl(input)).toEqual(url);
  });

  it("should return null when no URL is found", () => {
    const input =
      '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "POST HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"';
    expect(extractUrl(input)).toBeNull();
  });

  it("should return null for empty strings", () => {
    const input = "";
    expect(extractUrl(input)).toBeNull();
  });

  it("should return the entire url", () => {
    const input =
      '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "POST /intranet-analytics/hello/world HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"';
    const url = "/intranet-analytics/hello/world";
    expect(extractUrl(input)).toEqual(url);
  });
});

describe("Log file parsing", () => {
  it("should return the number of occurrences of each ip address", async () => {
    const expectedIpAddressCounts = {
      "177.71.128.21": 3,
      "168.41.191.40": 4,
      "168.41.191.41": 1,
      "168.41.191.9": 2,
      "168.41.191.34": 2,
      "50.112.00.28": 1,
      "50.112.00.11": 3,
      "72.44.32.11": 1,
      "72.44.32.10": 3,
      "168.41.191.43": 2,
      "79.125.00.21": 1,
    };

    const expectedUrlCounts = {
      "/intranet-analytics/": 1,
      "http://example.net/faq/": 1,
      "/this/page/does/not/exist/": 1,
      "http://example.net/blog/category/meta/": 1,
      "/blog/2018/08/survey-your-opinion-matters/": 1,
      "/docs/manage-users/": 1,
      "/blog/category/community/": 1,
      "/faq/": 1,
      "/docs/manage-websites/": 2,
      "/faq/how-to-install/": 1,
      "/asset.js": 1,
      "/to-an-error": 1,
      "/": 1,
      "/docs/": 1,
      "/moved-permanently": 1,
      "/temp-redirect": 1,
      "/faq/how-to/": 1,
      "/translations/": 1,
      "/newsletter/": 1,
      "/hosting/": 1,
      "/download/counter/": 1,
      "/asset.css": 1,
    };

    const { ipAddressCounts, urlCounts } = await parseLogFile(
      "test/data/simple.log",
    );

    expect(ipAddressCounts).toEqual(expectedIpAddressCounts);
    expect(urlCounts).toEqual(expectedUrlCounts);
  });
});

describe("getTopNCounts", () => {
  it("returns all entries when n is greater than the number of entries", () => {
    const countMap = { a: 1, b: 2, c: 3 };
    const n = 5;
    const result = getTopNCounts(countMap, n);
    expect(result).toEqual([
      ["c", 3],
      ["b", 2],
      ["a", 1],
    ]);
  });

  it("returns top n entries when n is less than the number of entries", () => {
    const countMap = { a: 1, b: 2, c: 3 };
    const n = 2;
    const result = getTopNCounts(countMap, n);
    expect(result).toEqual([
      ["c", 3],
      ["b", 2],
    ]);
  });

  it("returns all entries when n is equal to the number of entries", () => {
    const countMap = { a: 1, b: 2, c: 3 };
    const n = 3;
    const result = getTopNCounts(countMap, n);
    expect(result).toEqual([
      ["c", 3],
      ["b", 2],
      ["a", 1],
    ]);
  });

  it("returns an empty array when n is 0", () => {
    const countMap = { a: 1, b: 2, c: 3 };
    const n = 0;
    const result = getTopNCounts(countMap, n);
    expect(result).toEqual([]);
  });

  it("returns an empty array when CountMap is empty", () => {
    const countMap = {};
    const n = 3;
    const result = getTopNCounts(countMap, n);
    expect(result).toEqual([]);
  });
});
