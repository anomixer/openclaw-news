(function() {
    var storedLang = localStorage.getItem('openclaw-news-lang');
    var isTw = window.location.pathname.indexOf('/tw/') !== -1 || window.location.pathname.endsWith('/tw');
    var currentLang = isTw ? 'zh' : 'en';

    if (storedLang === null) {
        var userLang = navigator.language || navigator.userLanguage;
        if (userLang && userLang.toLowerCase().startsWith('zh')) {
            storedLang = 'zh';
        } else {
            storedLang = 'en';
        }
        localStorage.setItem('openclaw-news-lang', storedLang);
    }

    function getLocalizedUrl(targetLang) {
        var path = window.location.pathname;
        var base = path.startsWith('/openclaw-news') ? '/openclaw-news' : '';
        
        if (targetLang === 'zh') {
            // Target is ZH
            if (path.startsWith(base + '/tw/')) {
                return new URL(window.location.href); // Already ZH
            }
            var subPath = path.substring(base.length);
            if (!subPath.startsWith('/')) subPath = '/' + subPath;
            path = base + '/tw' + subPath;
        } else if (targetLang === 'en') {
            // Target is EN
            if (!path.startsWith(base + '/tw/') && path !== base + '/tw') {
                return new URL(window.location.href); // Already EN
            }
            if (path.startsWith(base + '/tw/')) {
                var subPath = path.substring((base + '/tw').length);
                if (!subPath.startsWith('/')) subPath = '/' + subPath;
                path = base + subPath;
            } else if (path === base + '/tw') {
                path = base + '/';
            }
        }
        
        var newUrl = new URL(window.location.href);
        newUrl.pathname = path;
        return newUrl;
    }

    if (storedLang !== currentLang) {
        var localizedUrl = getLocalizedUrl(storedLang);
        if (localizedUrl) {
            localizedUrl.hash = window.location.hash;
            window.location.replace(localizedUrl.href);
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        // Handle incoming scroll requests
        var urlParams = new URLSearchParams(window.location.search);
        var scrollToDate = urlParams.get('scroll_to_date');
        var scrollIdx = urlParams.get('scroll_to_idx');
        var targetHeader = null;

        var allHeaders = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');

        if (scrollToDate) {
            for (var i = 0; i < allHeaders.length; i++) {
                if (allHeaders[i].textContent.includes(scrollToDate)) {
                    targetHeader = allHeaders[i];
                    break;
                }
            }
        } else if (scrollIdx !== null) {
            targetHeader = allHeaders[parseInt(scrollIdx, 10)];
        }

        if (targetHeader) {
            // Clean up URL parameters first
            var cleanUrl = new URL(window.location.href);
            cleanUrl.searchParams.delete('scroll_to_date');
            cleanUrl.searchParams.delete('scroll_to_idx');
            window.history.replaceState(null, null, cleanUrl.href);

            // Let the browser handle the scroll naturally (respects CSS scroll-padding)
            setTimeout(function() {
                window.location.replace('#' + targetHeader.id);
            }, 50);
        }

        // --- Theme Sync Logic ---
        function syncPalette() {
            try {
                var path = window.location.pathname;
                var base = path.startsWith('/openclaw-news') ? '/openclaw-news' : '';
                var currentKey = (base + (isTw ? '/tw/' : '/')) + '.__palette';
                var targetKey = (base + (isTw ? '/' : '/tw/')) + '.__palette';
                
                var val = localStorage.getItem(currentKey);
                if (val) {
                    localStorage.setItem(targetKey, val);
                }
            } catch (e) {}
        }

        var paletteInputs = document.querySelectorAll('[name="__palette"]');
        paletteInputs.forEach(function(input) {
            input.addEventListener('change', function() {
                setTimeout(syncPalette, 50);
            });
        });
        // ------------------------

        // Attach click event to language switcher links to update preference and preserve hash smartly
        var alternateLinks = document.querySelectorAll('a[hreflang]');
        alternateLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var lang = link.getAttribute('hreflang');
                if (lang) {
                    localStorage.setItem('openclaw-news-lang', lang);
                }
                
                syncPalette(); // Sync theme right before navigating just to be safe

                // Preserve the hash and exact page path during manual navigation
                e.preventDefault();
                var newUrl = getLocalizedUrl(lang) || new URL(link.href);
                
                if (window.location.hash) {
                    var currentHashId = window.location.hash.substring(1);
                    try {
                        currentHashId = decodeURIComponent(currentHashId);
                    } catch (err) {}
                    var currentHeader = document.getElementById(currentHashId);
                    
                    if (currentHeader && currentHeader.tagName.match(/^H[1-6]$/)) {
                        var dateMatch = currentHeader.textContent.match(/2026-\d{2}-\d{2}/);
                        if (dateMatch) {
                            newUrl.searchParams.set('scroll_to_date', dateMatch[0]);
                        } else {
                            var currentHeadersList = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
                            var idx = Array.prototype.indexOf.call(currentHeadersList, currentHeader);
                            newUrl.searchParams.set('scroll_to_idx', idx);
                        }
                    } else {
                        newUrl.hash = window.location.hash;
                    }
                }
                window.location.href = newUrl.href;
            });
        });
    });
})();
