(function () {
  var btn = document.querySelector('.menu-btn');
  var list = document.getElementById('nav-list');
  if (btn && list) {
    btn.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  var form = document.getElementById('rfq');
  if (!form) return;
  var status = document.getElementById('status');
  var map = {'fire-protection-design':'Overall fire protection system design','fire-sprinkler-design':'Fire sprinkler design','hydraulic-calculations':'Hydraulic calculations','fire-alarm-design':'Fire alarm and detection design','fire-suppression-design':'Fire suppression system design','fire-pump':'Fire pump design and support','boq-material-takeoff':'BOQ and material take-off','shop-drawings':'Shop drawings and as-built drawings','technical-consultation':'Technical consultation','fire-sprinklers':'Fire sprinklers','valves-flow-control':'Valves and flow control','hose-hydrant':'Fire hose and hydrant equipment','fire-pumps':'Fire pumps','alarm-detection':'Fire alarm and detection equipment','fire-suppression':'Fire suppression equipment','fire-extinguishers':'Fire extinguishers'};
  var q = new URLSearchParams(location.search).get('service');
  if (q && map[q] && form.service_or_product) form.service_or_product.value = map[q];

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.access_key.value === 'YOUR_ACCESS_KEY') {
      status.className = 'err';
      status.textContent = 'The form is not connected yet. Please email your request to info@lilinfireprotection.com.';
      return;
    }
    var submit = form.querySelector('button[type=submit]');
    submit.disabled = true;
    status.className = '';
    status.textContent = 'Sending your request...';
    fetch(form.action, { method: 'POST', body: new FormData(form) })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.success) {
          status.className = 'ok';
          status.textContent = 'Request sent. Our team will review it and reply by email.';
          form.reset();
        } else {
          throw new Error(d.message || 'Failed');
        }
      })
      .catch(function () {
        status.className = 'err';
        status.textContent = 'We could not send your request. Please try again, or email info@lilinfireprotection.com.';
      })
      .finally(function () { submit.disabled = false; });
  });
})();
