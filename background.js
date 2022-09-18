const webExtApi = browser.privacy.network.peerConnectionEnabled;

async function updateIcon()
{
    var read_enabled = (await webExtApi.get({})).value;
    setButtonText(read_enabled);
}
function setButtonText(documentFontEnabled) {
    if (!documentFontEnabled) {
        browser.browserAction.setBadgeBackgroundColor({ color: "#00BF00" });
        browser.browserAction.setBadgeText({ text: "" });
    } else {
        browser.browserAction.setBadgeBackgroundColor({ color: "#dd0000" });
        browser.browserAction.setBadgeText({ text: "RTC" });
    }
}


browser.browserAction.setBadgeTextColor({ color: "#FFFFFF" });

//var read_enabled_onload = (await webExtApi.get({})).value;
//setButtonText(read_enabled_onload);


browser.browserAction.onClicked.addListener(async () => {
    var read_enabled_onclick = (await webExtApi.get({})).value;
    var set_enabled = !read_enabled_onclick ; 
    
    await webExtApi.set({ value: set_enabled });
    
    //var read_enabled_afterclick = (await webExtApi.get({})).value;
    //setButtonText(read_enabled_afterclick);
    updateIcon();
});

webExtApi.onChange.addListener(function() { 
    //console.log("browserSettings change event");
    updateIcon();
});

browser.tabs.onUpdated.addListener(function() { 
    //console.log("tabs.onUpdated  event");
    updateIcon();
});

browser.windows.onFocusChanged.addListener(function() { 
    //console.log("window focus change event");
    updateIcon();
});

async function start() 
{
    await webExtApi.set({ value: false });

    updateIcon();
}
start();
