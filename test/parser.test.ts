import {extractIpFromString} from "../main";

describe("IP extraction", () => {
  it("should extract IP address from a string", () => {
    const inputString = "Sample text with IP address 192.168.1.1 inside.";
    expect(extractIpFromString(inputString)).toBe("192.168.1.1");
  });

  it("should return null for a string without an IP address", () => {
    const inputString = "No IP address in this string.";
    expect(extractIpFromString(inputString)).toBeNull();
  });

  it("should return null for an empty string", () => {
    const inputString = "";
    expect(extractIpFromString(inputString)).toBeNull();
  });

  it("should return null for a string with an invalid IP address format", () => {
    const inputString = "Invalid IP address: 255.1.1";
    expect(extractIpFromString(inputString)).toBeNull();
  });

  it("should extract the first IP address in a string with multiple IP addresses", () => {
    const inputString = "Multiple IP addresses: 192.168.1.1 and 10.0.0.1";
    expect(extractIpFromString(inputString)).toBe("192.168.1.1");
  });
});
