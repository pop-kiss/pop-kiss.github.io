// POPKISS site: Japanese / English switch
(function () {
  var KEY = 'popkiss-lang';
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'ja' || q === 'en') return q;
    try { var s = localStorage.getItem(KEY); if (s === 'ja' || s === 'en') return s; } catch (e) {}
    return /^ja\b/i.test(navigator.language || '') ? 'ja' : 'en';
  }
  function apply(l) {
    var h = document.documentElement;
    h.classList.toggle('en', l === 'en');
    h.lang = l;
    var t = h.getAttribute('data-title-' + l);
    if (t) document.title = t;
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.l === l);
      b.setAttribute('aria-pressed', b.dataset.l === l ? 'true' : 'false');
    });
  }
  apply(pick());
  document.addEventListener('DOMContentLoaded', function () {
    apply(document.documentElement.lang);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        apply(b.dataset.l);
        try { localStorage.setItem(KEY, b.dataset.l); } catch (e) {}
      });
    });
  });
})();
