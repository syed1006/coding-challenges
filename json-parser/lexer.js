const fs = require("fs");

function lex(content, filePath) {
	let tokens = [];
	const splits = content.split("");
	const length = splits.length;
	console.log(filePath);
	if (splits[0] === "{" && splits[length - 1] === "}") process.exit(0);

	console.log("exit 1");
	process.exit(1);
}

function main() {
	const [_1, _2, filePath] = process.argv;
	let content = null;

	if (filePath) {
		content = fs.readFileSync(filePath, { encoding: "utf-8" });
	}

	if (filePath) {
		lex(content, filePath);
		return;
	}

	const stdin = process.stdin;
	stdin.setEncoding("utf-8");
	stdin.on("data", (data) => {
		content += data;
	});
	stdin.on("end", () => {
		lex(content, "");
	});
}

main();
