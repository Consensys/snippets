const fs = require('fs');

let snippets = [];

exports.handlers = {
    newDoclet: function(e) {
        const doclet = e.doclet;
        if(e.doclet.meta.code && e.doclet.meta.range) {
            const filePath = e.doclet.meta.path + '/' + e.doclet.meta.filename;
            const sourceCode = fs.readFileSync(filePath, 'utf8');
            const codeSnippet = sourceCode.substring(e.doclet.meta.range[0], e.doclet.meta.range[1]);
            snippets.push({
                functionName:  e.doclet.meta.code.name,
                code: codeSnippet
            });

            doclet.meta.code.snippet = codeSnippet
        }
    }
}

