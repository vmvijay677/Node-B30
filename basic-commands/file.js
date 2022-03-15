const fs = require("fs");

const quote = "No beauty shines brighter than that of a good heart 😊 !!!.";
fs.writeFile("./awesome.html", quote, (err) => {
    console.log("Completed writing !!! 👍");
});

// const quote2 = "Live more, worry less 😊😂";
// for(let i = 1; i <= 10; i++){
//     fs.writeFile(`./backup/text-${i}.html`, quote2, (err) => {
//         console.log("Completed writing !!! 👍");
//     });
// }

const quote3 = "Happy Women's Day ✨🎉";
const n = parseInt(process.argv[2]);
for (let i = 1; i <= n; i++) {
    fs.writeFile(`./backup/text-${i}.html`, quote3, (err) => {
        console.log(`Completed writing !!! - text-${i}.html`);
    });
}

fs.readFile("./cool.txt", "utf-8", (err, content) => {
    if (err) {
        console.log("❌", err);
    }
    console.log("📚", content);
})


const niceQuote = "\nMake everyday a little less ordinarily 😉";

// fs.writeFile("./nice.txt", niceQuote, (err) => {
//     console.log("Completed writing !!!");
// });

fs.appendFile("./nice.txt", niceQuote, (err) => {
    console.log("Updated file !!! 👍");
});

// fs.unlink("./delete-file.css", err => {
//     console.log("Deleted file !!!");
// });

fs.readdir("./backup", (err, files) => {
    //console.log(files);
    files.forEach((fileName) => fs.unlink(`./backup/${fileName}`, (err) => {
        console.log("Files deleted");
    }))
});



