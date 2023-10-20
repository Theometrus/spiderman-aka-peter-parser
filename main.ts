export function extractIpFromString(str: string) {
  const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  const match = str.match(ipRegex);

  if (match) return match[0];
  return null;
}
