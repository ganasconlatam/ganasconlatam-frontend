(function () {
    "use strict";

    var CONFIG = {
        redirectDelay: 1500,
        targetHost: window.location.host,
        androidPackage: "com.android.chrome",
        useDefaultAndroidBrowser: false
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    function init() {
        if (hasRedirected()) {
            removeRedirectParam();
            return;
        }

        if (!detectInAppBrowser()) return;

        var phoneType = detectPhoneType();
        if (!phoneType) return;

        scheduleRedirect(phoneType);
    }

    function hasRedirected() {
        var p = new URLSearchParams(window.location.search);
        return p.get("redirected") === "true";
    }

    function removeRedirectParam() {
        var u = new URL(window.location.href);
        u.searchParams.delete("redirected");
        window.history.replaceState({}, "", u.toString());
    }

    function detectInAppBrowser() {
        var ua = navigator.userAgent || navigator.vendor || window.opera;

        var patterns = [
            /Instagram/i,
            /LinkedIn/i,
            /FBAN|FBAV/i,
            /Twitter/i,
            /Snapchat/i,
            /TikTok/i,
            /Line/i,
            /KAKAOTALK/i,
            /WhatsApp/i,
            /Telegram/i,
            /Discord/i,
            /Slack/i,
            /WeChat/i,
            /Pinterest/i,
            /Messenger/i,
            /FB_IAB/i,
            /FB4A/i,
            /FBIOS/i,
            /FBSS/i
        ];

        return patterns.some(function (r) {
            return r.test(ua);
        });
    }

    function detectPhoneType() {
        var ua = navigator.userAgent;

        if (/android/i.test(ua)) return "android";
        if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return "ios";
        return null;
    }

    function scheduleRedirect(phoneType) {
        showRedirectMessage(phoneType);

        setTimeout(function () {
            performRedirect(phoneType);
        }, CONFIG.redirectDelay);
    }

    function performRedirect(phoneType) {
        var currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("redirected", "true");

        var redirectUrl = null;

        if (phoneType === "android") {
            if (CONFIG.useDefaultAndroidBrowser) {
                redirectUrl =
                    "intent://" +
                    CONFIG.targetHost +
                    currentUrl.pathname +
                    currentUrl.search +
                    "#Intent;scheme=https;end";
            } else {
                redirectUrl =
                    "intent://" +
                    CONFIG.targetHost +
                    currentUrl.pathname +
                    currentUrl.search +
                    "#Intent;scheme=https;package=" +
                    CONFIG.androidPackage +
                    ";end";
            }
        } else if (phoneType === "ios") {
            var baseUrl =
                "https://" +
                CONFIG.targetHost +
                currentUrl.pathname +
                currentUrl.search;

            // EXACTAMENTE como alerifas
            redirectUrl = "x-safari-" + baseUrl;
        }

        if (redirectUrl) {
            window.location.href = redirectUrl;

            // fallback
            setTimeout(function () {
                if (!document.hidden) {
                    window.location.href =
                        "https://" +
                        CONFIG.targetHost +
                        currentUrl.pathname +
                        currentUrl.search;
                }
            }, CONFIG.redirectDelay + 1000);
        }
    }

    function showRedirectMessage(phoneType) {
        var div = document.createElement("div");
        div.style.cssText =
            "position:fixed;top:20px;left:50%;transform:translateX(-50%);" +
            "background:#333;color:#fff;padding:14px 18px;border-radius:10px;" +
            "z-index:99999;font-family:Arial,sans-serif;font-size:14px;" +
            "box-shadow:0 6px 16px rgba(0,0,0,.35);max-width:320px;text-align:center;";

        div.textContent =
            phoneType === "android"
                ? "Redirecting to Chrome browser..."
                : "Redirecting to Safari browser...";

        document.body.appendChild(div);

        setTimeout(function () {
            if (div && div.parentNode) div.parentNode.removeChild(div);
        }, CONFIG.redirectDelay);
    }
})();
