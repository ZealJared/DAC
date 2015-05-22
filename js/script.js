var DAC = {};
// container
// code
// editor
// carat
DAC.init = function(barID, editorID, tipsID, codeFile){
    DAC.codeCon = $('<pre id="DAC_code_con"></pre>');
    DAC.code = $('<code id="DAC_code" class="language-arduino" data-manual></code>');
    DAC.codeCon.append(DAC.code);
    DAC.bar = $("#" + barID);
    DAC.editorCon = $("#" + editorID);
    DAC.tips = $("#" + tipsID);
    $.get("./sketch/" + codeFile + ".txt", function(data){
        DAC.code.text(data);
        DAC.editorCon.append(DAC.codeCon);
        Prism.highlightElement(DAC.code[0], false, function(){
            DAC.code.append($("<br>"));
            DAC.editorInit();
            // DAC.carat.init();
        });
    });
};

DAC.editorInit = function(){
    DAC.editor = $('<textarea id="DAC_editor" spellcheck="false"></textarea>');
    DAC.editor.text(DAC.code.text());
    DAC.codeCon.append(DAC.editor);
};