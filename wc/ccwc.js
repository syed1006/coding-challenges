const fs = require("fs");

function getFileBytes(filePath) {
	const buffer = fs.readFileSync(filePath);

	return buffer.length;
}

function getNumberOfLines(content) {
	const newLineRegXPattern = /\n/g;
	const match = content.match(newLineRegXPattern);

	if (match) {
		return match.length;
	}

	return 1;
}

function getNumberOfLinesFromFile(filePath) {
	const content = fs.readFileSync(filePath, { encoding: "utf-8" });
	return getNumberOfLines(content);
}

function getNumberOfWords(filePath) {
	const content = fs.readFileSync(filePath, { encoding: "utf-8" });

	if (!content.trim()) return 0;
	const pattern = /\s+/;

	const match = content.trim().split(pattern);

	return match.length;
}

function main() {
	const [_1, _2, option, filePath] = process.argv;
	if (!option) throw new Error("Option is required!!");
	if (!filePath) throw new Error("Filepath is required!!");

	switch (option) {
		case "-c":
			console.log(getFileBytes(filePath), filePath);
			break;
		case "-l":
			console.log(getNumberOfLinesFromFile(filePath), filePath);
			break;
		case "-w":
			console.log(getNumberOfWords(filePath), filePath);
			break;
		default:
			throw new Error("Invalid option!!");
	}
}

main();
