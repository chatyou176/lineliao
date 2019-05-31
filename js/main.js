function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}


/**
 * 发送请求对象
 */
function request(action, method, strparam, iparam, pageindex, pagesize, uid) {
  var _request = {
    "action": action || "",
    "method": method || "",
    "strparam": strparam || "",
    "iparam": iparam || [],
    "pageindex": pageindex || "",
    "pagesize": pagesize || "",
    "uid": uid || ""
  }
  return JSON.stringify(_request);
}


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();

  if ("withCredentials" in xhr) {
    // Most browsers.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // IE8 & IE9
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }

  return xhr;
}


function send(request, callback, callback_onerror) {
  var xhr = createCORSRequest('POST', 'http://122.147.248.126/Handler.ashx');

  if (xhr) {
    // when use POST must set `Content-type="application/x-www-form-urlencoded"`
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function(e) {
      if (this.status == 200 || this.status == 304) {
        //alert(this.responseText);
      }
    };

    xhr.onerror = function(e) {
      //callback_onerror('xhr onerror');
      callback_onerror(null);
    }

    xhr.addEventListener("load", callback);
    xhr.send(encodeURIComponent(request));

  } else {
    callback_onerror('xhr null');
  }
}
