const API_BASE = "https://script.google.com/macros/s/AKfycby3MU0vopfrDuwz_AcxKqqXVannNrzeJisnCA74npd1Z6MJ77JVqBwj6RtysuyppgFM/exec";

function jsonpRequest(params) {
  return new Promise((resolve, reject) => {
    const cbName = "cb_" + Math.random().toString(36).slice(2);
    params.callback = cbName;

    const qs = new URLSearchParams(params).toString();
    const url = `${API_BASE}?${qs}`;

    const script = document.createElement("script");
    window[cbName] = (data) => {
      try { resolve(data); }
      finally {
        delete window[cbName];
        script.remove();
      }
    };

    script.src = url;
    script.onerror = () => {
      delete window[cbName];
      script.remove();
      reject(new Error("Falha JSONP"));
    };

    document.body.appendChild(script);
  });
}
