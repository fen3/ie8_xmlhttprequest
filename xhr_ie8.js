function xhrPost(url, json, cb) {
    xhrMETHOD("POST", url, json, cb)
}
function xhrPut(url, json, cb) {
    xhrMETHOD("PUT", url, json, cb)
}
function xhrDelete(url, json, cb) {
    xhrMETHOD("DELETE", url, json, cb)
}

function xhrGet(url, cb) {
    var req = new XMLHttpRequest()
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                cb(req, null)
            } else {
                cb(null, { message: '请求出错' })
            }
        }
    }
    req.open("GET", url)
    req.send()
}
function json2param(json) {
    var ps = []
    for (var k in json) {
        ps.push(k + "=" + json[k])
    }
    var pa = ps.join("&")
    return pa
}
function urlAddParam(url, param) {
    return url + (url.indexOf('?') > -1 ? "&" : "?") + encodeURI(param)

}
function xhrMETHOD(method, url, json, cb) {
    var req = new XMLHttpRequest()
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                //console.log(req.responseText)
                cb(req, null)
            } else {
                //console.log(req.responseText)
                cb(null, { message: '请求出错' })
            }
        }
    }
    req.open(method, url)
    if (method === 'GET') {
        req.send(urlAddParam(url, json2param(json)))
    } else {
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Accept', 'application/json')
        req.send(JSON.stringify(json))
    }
}
