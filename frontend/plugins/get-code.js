const fs = require('fs');


exports.handlers = {
    newDoclet: function(e) {
        const doclet = e.doclet;
        if(e.doclet.meta.code && e.doclet.meta.range) {
            const filePath = e.doclet.meta.path + '/' + e.doclet.meta.filename;
            const sourceCode = fs.readFileSync(filePath, 'utf8');
            const codeSnippet = sourceCode.substring(e.doclet.meta.range[0], e.doclet.meta.range[1]);
      
            doclet.meta.code.snippet = codeSnippet
            doclet.meta.code.link = filePath
        }
    }
}

