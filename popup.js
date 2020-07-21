'use strict';

let yesColor = document.getElementById('yes');
let noColor = document.getElementById('no');
let maybeColor = document.getElementById('maybe');
let hateMode = document.getElementById('hateMode');

let reset = document.getElementById('reset');
let submit = document.getElementById('submit');

function dataIntoFields() {
  chrome.storage.local.get('yesColorSaved', function(yesColorSaved) {
    yesColor.value = yesColorSaved.yesColorSaved;
  });
  chrome.storage.local.get('noColorSaved', function(noColorSaved) {
    noColor.value = noColorSaved.noColorSaved;
  });
  chrome.storage.local.get('maybeColorSaved', function(maybeColorSaved) {
    maybeColor.value = maybeColorSaved.maybeColorSaved;
  });
  chrome.storage.local.get('hateModeIndex', function(hateModeIndex) {
    hateMode.selectedIndex = hateModeIndex.hateModeIndex;
  });
}

dataIntoFields();

reset.onclick = function(element) {
  resetValues();
};

submit.onclick = function(element) {
  applyValues();
};

function applyValues() {
  chrome.storage.local.set({'yesColorSaved': yesColor.value});
  chrome.storage.local.set({'noColorSaved': noColor.value});
  chrome.storage.local.set({'maybeColorSaved': maybeColor.value});
  chrome.storage.local.set({'hateModeIndex': hateMode.selectedIndex});
}

function resetValues() {
  // todo duplicate logic from background.js

  // 1. set the reset variables properly for the next loading of the popup
  chrome.storage.local.set({'yesColorSaved': '#FF8080'});
  chrome.storage.local.set({'noColorSaved': '#00FF00'});
  chrome.storage.local.set({'maybeColorSaved': '#FFFF00'});
  chrome.storage.local.set({'hateModeIndex': 6});

  // 2. immediately show the reset values
  // yesColor.value = "#FF8080"; // todo does not work
  // noColor.value = "#00FF00"; // todo does not work
  // maybeColor.value = "#FFFF00"; // todo does not work
  // hateMode.selectedIndex = 6; // left out for the sake of consistency
}