function markSelectedText(replacementText, backgroundColor, analysis) {
    var sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            let markNode = document.createElement("mark");
            markNode.setAttribute('title', analysis);
            let textNode = document.createTextNode(replacementText);
            markNode.appendChild(textNode);
            markNode.style.backgroundColor = backgroundColor;
            range.insertNode(markNode);
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
}

chrome.storage.local.get('selectionText', function (selectionText) {
    chrome.storage.local.get('backgroundColor', function (backgroundColor) {
        chrome.storage.local.get('analysis', function (analysis) {
            markSelectedText(selectionText.selectionText, backgroundColor.backgroundColor, analysis.analysis);
        });
    });
});