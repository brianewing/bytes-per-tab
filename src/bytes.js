// (c) 2013 Brian J Ewing
// MIT

chrome.experimental.processes.onUpdated.addListener(function(processes) {
  for(var pid in processes) {
    var process = processes[pid];
    if(process.type != 'renderer') continue;

    var title = process.network > 1024 ? '' + Math.round(process.network / 1024) + 'kB/s' : '' + process.network + 'B/s';
    var script = "var originalTitle = document.title.replace(/^\\[\\d+k?B\\/s\\] /, '');";

    if(process.network > 0)
      script += "document.title = '[" + title + "] ' + originalTitle;";
    else
      script += "document.title = originalTitle;";

    chrome.tabs.executeScript(process.tabs[0], {code: script});
  };
});