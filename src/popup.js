Array.from(document.getElementsByTagName("button")).forEach((btn)=>{
  let rate = parseFloat(btn.getAttribute("data-playbackrate"));
  btn.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.webNavigation.getAllFrames({tabId:tab.id},(frames) => {
      frames.forEach((frame) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id, frameIds: [frame.frameId] },
          function: (rate) => {
            Array.from(document.getElementsByTagName("audio")).forEach((e)=>{
              e.playbackRate=rate;
            });
            Array.from(document.getElementsByTagName("video")).forEach((e)=>{
              e.playbackRate=rate;
            });

          },
          args: [rate],
        });
      });
    });
  });
});
