/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({url: chrome.runtime.getURL("new_raid.html")});
});