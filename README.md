# Overview

This is a simple HTTP log parser for DigIO's coding challenge. It's written in TypeScript and is operated via the command line. It accepts log files and outputs the number of unique IP addresses, as well as the top 3 most visited URLs and most active IPs (if available, otherwise fewer than 3).

# Getting started

### Running the log parser

Clone the repository to your machine. Note: if you don't have pnpm installed, you can get it via npm as follows:

`npm install -g pnpm`

Then, install the dependencies. In the project root folder:

`pnpm install`

Afterwards, you may run the parser with the provided sample log file using:

`pnpm parse`

The application also accepts other log files. If you have your own, or would to try it with some other logs I have provided in the `/logs` folder, you can do so using:

`pnpm parse -f <path-to-log-file>`

The application will accept either -f or --file.

### Running tests

The application uses Jest for its tests. To run the included test suite, you can execute the following:

`pnpm test`

# Assumptions

- When IP or URL entries are tied by count for spots in the top 3, it doesn't matter which ones out of the competitors are displayed
- Each entry in the log file is on a separate line
- Each individual line is not so obscenely large that it cannot fit in the system's memory
- URLs will appear in a "\<HTTP METHOD\> /intranet-analytics/ HTTP/1.1" sort of block
- The provided IP addresses are valid. In other words, the application doesn't complain about an IP with numbers that go out of range, such as 300.1.1.1
- The number of unique IPs, unique URLs, or the counts of either are not larger than what can fit in the system's memory. I'm deliberately not dumping the entire file into memory all at once, instead reading it line by line, but if there are too many entries in my maps it will still keel over
