const fs = require("fs");

function getFileBytes(content) {
	const buffer = Buffer.from(content);

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

function getNumberOfLinesFromFile(content) {
	return getNumberOfLines(content);
}

function getNumberOfWords(content) {
	if (!content.trim()) return 0;
	const pattern = /\s+/;

	const match = content.trim().split(pattern);

	return match.length;
}

function getNumberOfChars(content) {
	if (!content.trim()) return 0;

	return content.length;
}

function main() {
	let options = ["-c", "-l", "-w", "-m"];
	let [_1, _2, optionOrFilePath, filePath] = process.argv;
	if (!optionOrFilePath) throw new Error("Option is required!!");

	let content;
	if (!filePath && !options.includes(optionOrFilePath)) {
		filePath = optionOrFilePath;
	} else {
		const stdin = process.stdin;

		stdin.setEncoding("utf-8");
		stdin.on("data", (data) => {
			content = data;
			console.log(data);
		});
	}

	if (!content && filePath) {
		content = fs.readFileSync(filePath, { encoding: "utf-8" });
	} else {
	}

	switch (optionOrFilePath) {
		case "-c":
			console.log(getFileBytes(content), filePath);
			break;
		case "-l":
			console.log(getNumberOfLinesFromFile(content), filePath);
			break;
		case "-w":
			console.log(getNumberOfWords(content), filePath);
			break;
		case "-m":
			console.log(getNumberOfChars(content), filePath);
			break;
		default:
			console.log(
				getNumberOfLinesFromFile(content),
				getNumberOfWords(content),
				getFileBytes(content),
				filePath
			);
	}
}

main();
