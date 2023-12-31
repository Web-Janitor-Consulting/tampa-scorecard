const path = require('path');


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/*.{css,jpg,json,svg}");
    eleventyConfig.addPassthroughCopy("./src/main.js");
    eleventyConfig.addPassthroughCopy("./src/table-saw.js");
    eleventyConfig.addPassthroughCopy("./src/_data");
    eleventyConfig.addShortcode('data-line', function(metric) {
        const tbody = [];
        for (const { city, data }
            of metric) {
            const amounts = data
                .map(({ amount }) => `<td>\$${ amount }</td>`)
                .join("");
            tbody.push(`<tr><td>${ city }</td>${ amounts }</tr>`);
        }

        return `
        <table-saw breakpoint="(max-width: 30em)" ratio="1/1" zero-padding>
        <table>
      <thead>
        <tr>
          <th>City</th>
          <th>2012</th>
          <th>2013</th>
          <th>2014</th>
          <th>2015</th>
          <th>2016</th>
          <th>2017</th>
          <th>2018</th>
          <th>2019</th>
          <th>2020</th>
          <th>2021</th>
        </tr>
      </thead>
      <tbody>
        ${tbody.join("\n")}
      </tbody>
    </table>
    </table-saw>`;

    });

    eleventyConfig.addShortcode('data-bar', function(metric) {
        const tbody = [];
        for (const { city, percentage }
            of metric) {
            tbody.push(`<tr><td>${ city }</td><td>${ percentage }</td></tr>`);
        }

        return `
      <table-saw breakpoint="(max-width: 30em)" ratio="1/1" zero-padding>
      <table>
    <thead>
      <tr>
        <th>City</th>
        <th>Percentage</th>
      </tr>
    </thead>
    <tbody>
      ${tbody.join("\n")}
    </tbody>
  </table>
  </table-saw>`;

    });


    return {
        dir: {
            input: 'src',
            output: '_site'
        }
    };
}