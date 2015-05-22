var DAC = {};
// container
// code
// editor
// carat
DAC.init = function (barID, editorID, tipsID, codeFile) {
    DAC.codeCon = $('<pre id="DAC_code_con"></pre>');
    DAC.code = $('<code id="DAC_code" class="language-arduino" data-manual></code>');
    DAC.codeCon.append(DAC.code);
    DAC.bar = $("#" + barID);
    DAC.editorCon = $("#" + editorID);
    DAC.tips = $("#" + tipsID);
    $.get("./sketch/" + codeFile + ".txt", function (data) {
        DAC.code.text(data);
        DAC.editorCon.append(DAC.codeCon);
        Prism.highlightElement(DAC.code[0], false, function () {
            DAC.code.append($("<br>"));
            DAC.editorInit();
            // DAC.carat.init();
        });
    });
};

DAC.editorInit = function () {
    DAC.caret = $('<span id="DAC_caret"></span>');
    DAC.editor = $('<textarea id="DAC_editor" spellcheck="false"></textarea>');
    DAC.editor.text(DAC.code.text());
    DAC.codeCon.append(DAC.editor);
    var keyTime;
    DAC.editor.on("focus mouseup keyup", function () {
        window.clearTimeout(keyTime);
        DAC.moveCaret(DAC.editor[0].selectionEnd);
    });
    DAC.editor.on("keydown", function () {
        keyTime = window.setTimeout(function () {
            DAC.moveCaret(DAC.editor[0].selectionEnd);
        }, 50);
    });
};

Range.prototype.includeNextChar = function () {
    var length = this.endContainer.nodeValue ? this.endContainer.nodeValue.length : 0;
    if (this.endContainer.nodeName === "#text" && this.endOffset < length - 1) {
        this.setEnd(this.endContainer, this.endOffset + 1);
    } else {
        var next = this.endContainer.childNodes[0] || this.endContainer.nextSibling;
        if (next === null) {
            next = this.endContainer;
            while (!next.parentNode.nextSibling) {
                next = next.parentNode;
            }
            next = next.parentNode.nextSibling;
        }
        this.setEnd(next, 0);
    }
    console.log(this.toString().length);
};

DAC.moveCaret = function (pos) {
    var range = document.createRange();
    range.setStart(DAC.code[0], 0);
    while (range.toString().length < pos) {
        range.includeNextChar();
    }
    range.collapse();
    range.insertNode(DAC.caret[0]);
};