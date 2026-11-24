    (function () {
        var COPIED = { en: 'Copied ✓', zh: '已複製 ✓' };
        var FAILED = { en: 'Copy failed', zh: '複製失敗' };
        var COPY_LABEL = { en: 'Copy', zh: '複製' };

        function langKey() {
            var path = window.location.pathname;
            if (path.indexOf('/tw/') !== -1 || /\/tw\/?$/.test(path)) return 'zh';
            var l = (document.documentElement.lang || '').toLowerCase();
            return l.indexOf('zh') === 0 ? 'zh' : 'en';
        }

        function fallbackCopy(text) {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); } catch (e) {}
            document.body.removeChild(ta);
        }

        function copyUrl(button) {
            var text = button.getAttribute('data-copy');
            if (!text) return;
            button.disabled = true;
            var k = langKey();
            var done = function (ok) {
                button.textContent = ok ? COPIED[k] : FAILED[k];
                setTimeout(function () { button.textContent = COPY_LABEL[k]; button.disabled = false; }, 1800);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(function () { done(true); }, function () { fallbackCopy(text); done(true); });
            } else {
                fallbackCopy(text);
                done(true);
            }
        }

        function render() {
            var box = document.getElementById('rss-feed-list');
            if (!box) return;

            var base = window.location.origin + window.location.pathname.replace(/feed\/?$/, '');
            var url = new URL('feed.xml', base);
            var lang = document.documentElement.lang || 'en';

            fetch(url.href, { cache: 'no-cache' })
                .then(function (res) {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.text();
                })
                .then(function (text) {
                    var doc = new DOMParser().parseFromString(text, 'application/xml');
                    if (doc.querySelector('parsererror')) throw new Error('XML parse error');

                    var items = Array.prototype.slice.call(doc.querySelectorAll('item'));
                    if (!items.length) throw new Error('No items');

                    box.innerHTML = '';
                    items.forEach(function (item) {
                        var pick = function (tag) {
                            var node = item.querySelector(tag);
                            return node ? node.textContent : '';
                        };
                        var title = pick('title');
                        var link = pick('link');
                        var date = pick('pubDate');
                        var desc = pick('description');

                        var article = document.createElement('article');
                        article.className = 'rss-item';

                        var h2 = document.createElement('h2');
                        var a = document.createElement('a');
                        a.href = link || '#';
                        a.textContent = title;
                        h2.appendChild(a);

                        var meta = document.createElement('p');
                        meta.className = 'rss-date';
                        var d = date ? new Date(date) : null;
                        meta.textContent = d && !isNaN(d)
                            ? d.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })
                            : date;

                        var body = document.createElement('div');
                        body.className = 'rss-body';
                        body.innerHTML = desc;

                        article.appendChild(h2);
                        article.appendChild(meta);
                        article.appendChild(body);
                        box.appendChild(article);
                    });
                })
                .catch(function (err) {
                    box.innerHTML = '';
                    var p = document.createElement('p');
                    p.className = 'rss-status';
                    p.textContent = 'Feed unavailable (' + err.message + '). ';
                    var a = document.createElement('a');
                    a.href = url.href;
                    a.textContent = 'Open the raw XML feed';
                    p.appendChild(a);
                    box.appendChild(p);
                });
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', render);
        } else {
            render();
        }

        document.addEventListener('click', function (e) {
            var btn = e.target && e.target.closest ? e.target.closest('[data-copy]') : null;
            if (btn && !btn.disabled) copyUrl(btn);
        });
    })();
