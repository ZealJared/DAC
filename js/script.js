var DAC = {};
// container
// code
// editor
// carat
DAC.init = function (barID, editorID, tipsID, codeFile) {
    DAC.codeCon = $('<pre id="DAC_code_con"></pre>');
    DAC.code = $('<code id="DAC_code" class="language-arduino" data-manual></code>');
    DAC.codeCon.append(DAC.code);
    DAC.editorCon = $("#" + editorID);
    DAC.editorCon.append(DAC.codeCon);
    DAC.bar = $("#" + barID);
    DAC.tips = $("#" + tipsID);
    $.get("./sketch/" + codeFile + ".txt", function (data) {
        DAC.updateCode(data);
    });
};

DAC.updateCode = function(code){
    if(!DAC.editor){
        DAC.editorInit();
        DAC.editor.val(code);
    }
    DAC.code.text(code);
    Prism.highlightElement(DAC.code[0], false, function () {
        DAC.code.append($("<br>"));
        DAC.moveCaret(DAC.editor[0].selectionEnd);
    });
};

DAC.editorInit = function () {
    DAC.caret = $('<span id="DAC_caret"></span>');
    DAC.editor = $('<textarea id="DAC_editor" spellcheck="false"></textarea>');
    DAC.editor.text(DAC.code.text());
    DAC.codeCon.append(DAC.editor);
    var keyTime;
    DAC.editor.on("focus mouseup keyup", function (evt) {
        if(evt.ctrlKey && evt.keyCode === 90){
            evt.stopPropagation();
            evt.preventDefault();
            console.log(DAC.editor.val());
            return false;
        }
        window.clearTimeout(keyTime);
        DAC.moveCaret(DAC.editor[0].selectionEnd);
    });
    DAC.editor.on("keydown", function () {
        keyTime = window.setTimeout(function () {
            DAC.moveCaret(DAC.editor[0].selectionEnd);
        }, 50);
    });
    DAC.editor.on("input", function(){
        DAC.updateCode(DAC.editor.val());
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
};

DAC.moveCaret = function (pos) {
    DAC.caret.detach();
    var range = document.createRange();
    range.setStart(DAC.code[0], 0);
    while (range.toString().length < pos) {
        range.includeNextChar();
    }
    range.collapse();
    range.insertNode(DAC.caret[0]);
};

DAC.insert = function(text){
    var val = DAC.editor.val();
    var startPos = DAC.editor[0].selectionStart;
    var endPos = DAC.editor[0].selectionEnd;
    var part1 = val.substr(0, startPos);
    var part2 = val.substr(endPos);
    var result = part1 + text + part2;
    DAC.editor.val(result);
    DAC.updateCode(result);
};
