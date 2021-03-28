module.exports = function checkagent(ua) {
    let isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian,
        isWechat = /(?:MicroMessenger)/.test(ua);
    let equipment = {
        isTablet,
        isPhone,
        isAndroid,
        isPc,
        isWechat
    };
    if(equipment.isAndroid || equipment.isPhone || equipment.isWechat) {
        return 0;
    } else if(equipment.isTablet) {
        return 1;
    } else if (equipment.isPc) {
        return 2;
    }
}

// 0 is mobile, 1 is tablet, 2 is pc