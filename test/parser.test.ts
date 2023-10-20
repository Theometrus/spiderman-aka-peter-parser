import {extractIp, extractUrl} from "../main";

describe("IP extraction", () => {
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

describe("URL extraction", () => {
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
