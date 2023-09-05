const path = require("node:path");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/*.{css,jpg,json,svg}");
    eleventyConfig.addPassthroughCopy("./src/main.js");
    return {
        dir: {
            input: "src",
        },
    };
}