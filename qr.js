/* QR share button — encodes the current page URL so it works wherever the site is hosted. */
(function () {
  'use strict';
  var fab = document.getElementById('qrFab');
  var card = document.getElementById('qrCard');
  var img = document.getElementById('qrImg');
  var urlEl = document.getElementById('qrUrl');
  var copyBtn = document.getElementById('qrCopy');
  if (!fab || !card) return;

  fab.addEventListener('click', function () {
    card.classList.toggle('show');
    if (card.classList.contains('show') && !fab.dataset.gen) {
      fab.dataset.gen = '1';
      var url = window.location.href;
      img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=4&data=' + encodeURIComponent(url);
      img.onerror = function () {
        img.alt = 'QR failed - check internet';
        img.src = '';
      };
      urlEl.textContent = url;
      urlEl.href = url;
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      if (!urlEl.textContent) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(urlEl.textContent).then(function () {
          copyBtn.textContent = 'Copied!';
          setTimeout(function () { copyBtn.textContent = '\uD83D\uDCCB Copy link'; }, 1500);
        });
      }
    });
  }
})();
