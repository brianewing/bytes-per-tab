// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Shows an updating list of process statistics.
function init() {
  chrome.experimental.processes.onUpdated.addListener(function(processes) {
    // alert('aye');
    for(var pid in processes) {
      var process = processes[pid];
      if(process.type != 'renderer') continue;

      var title = process.network > 1024 ? '' + Math.round(process.network / 1024) + 'kB/s' : '' + process.network + 'B/s';

      if(process.network > 0)
        var script = "var originalTitle = document.title.replace(/^\\[\\d+k?B\\/s\\] /, ''); document.title = '[" + title + "] ' + originalTitle;";
      else
        var script = "var originalTitle = document.title.replace(/^\\[\\d+k?B\\/s\\] /, ''); document.title = originalTitle || document.title;";

      chrome.tabs.executeScript(process.tabs[0], {code: script});
    };
  });
}

init();