var requirejs, require, define;
!
function (global) {
    function isFunction(e) {
        return "[object Function]" === ostring.call(e)
    }

    function isArray(e) {
        return "[object Array]" === ostring.call(e)
    }

    function each(e, t) {
        if (e) {
            var n;
            for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1);
        }
    }

    function eachReverse(e, t) {
        if (e) {
            var n;
            for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1);
        }
    }

    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }

    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }

    function eachProp(e, t) {
        var n;
        for (n in e)
            if (hasProp(e, n) && t(e[n], n)) break
    }

    function mixin(e, t, n, r) {
        return t && eachProp(t,
                function (t, i) {
                    (n || !hasProp(e, i)) && (!r || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[i] = t : (e[i] || (e[i] = {}), mixin(e[i], t, n, r)))
                }),
            e
    }

    function bind(e, t) {
        return function () {
            return t.apply(e, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(e) {
        throw e
    }

    function getGlobal(e) {
        if (!e) return e;
        var t = global;
        return each(e.split("."),
                function (e) {
                    t = t[e]
                }),
            t
    }

    function makeError(e, t, n, r) {
        var i = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return i.requireType = e,
            i.requireModules = r,
            n && (i.originalError = n),
            i
    }

    function newContext(e) {
        function t(e) {
            var t, n;
            for (t = 0; t < e.length; t++)
                if (n = e[t], "." === n) e.splice(t, 1),
                    t -= 1;
                else if (".." === n) {
                if (0 === t || 1 == t && ".." === e[2] || ".." === e[t - 1]) continue;
                t > 0 && (e.splice(t - 1, 2), t -= 2)
            }
        }

        function n(e, n, r) {
            var i, o, s, a, u, l, c, f, p, h, d, g, m = n && n.split("/"),
                v = C.map,
                y = v && v["*"];
            if (e && (e = e.split("/"), c = e.length - 1, C.nodeIdCompat && jsSuffixRegExp.test(e[c]) && (e[c] = e[c].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && m && (g = m.slice(0, m.length - 1), e = g.concat(e)), t(e), e = e.join("/")), r && v && (m || y)) {
                s = e.split("/");
                e: for (a = s.length; a > 0; a -= 1) {
                        if (l = s.slice(0, a).join("/"), m)
                            for (u = m.length; u > 0; u -= 1)
                                if (o = getOwn(v, m.slice(0, u).join("/")), o && (o = getOwn(o, l))) {
                                    f = o,
                                        p = a;
                                    break e
                                }!h && y && getOwn(y, l) && (h = getOwn(y, l), d = a)
                    }!f && h && (f = h, p = d),
                    f && (s.splice(0, p, f), e = s.join("/"))
            }
            return i = getOwn(C.pkgs, e),
                i ? i : e
        }

        function r(e) {
            isBrowser && each(scripts(),
                function (t) {
                    return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === x.contextName ? (t.parentNode.removeChild(t), !0) : void 0
                })
        }

        function i(e) {
            var t = getOwn(C.paths, e);
            return t && isArray(t) && t.length > 1 ? (t.shift(), x.require.undef(e), x.makeRequire(null, {
                skipMap: !0
            })([e]), !0) : void 0
        }

        function o(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function s(e, t, r, i) {
            var s, a, u, l, c = null,
                f = t ? t.name : null,
                p = e,
                h = !0,
                d = "";
            return e || (h = !1, e = "_@r" + (D += 1)),
                l = o(e),
                c = l[0],
                e = l[1],
                c && (c = n(c, f, i), a = getOwn(A, c)),
                e && (c ? d = a && a.normalize ? a.normalize(e,
                    function (e) {
                        return n(e, f, i)
                    }) : -1 === e.indexOf("!") ? n(e, f, i) : e : (d = n(e, f, i), l = o(d), c = l[0], d = l[1], r = !0, s = x.nameToUrl(d))),
                u = !c || a || r ? "" : "_unnormalized" + (q += 1), {
                    prefix: c,
                    name: d,
                    parentMap: t,
                    unnormalized: !!u,
                    url: s,
                    originalName: p,
                    isDefine: h,
                    id: (c ? c + "!" + d : d) + u
                }
        }

        function a(e) {
            var t = e.id,
                n = getOwn(k, t);
            return n || (n = k[t] = new x.Module(e)),
                n
        }

        function u(e, t, n) {
            var r = e.id,
                i = getOwn(k, r);
            !hasProp(A, r) || i && !i.defineEmitComplete ? (i = a(e), i.error && "error" === t ? n(i.error) : i.on(t, n)) : "defined" === t && n(A[r])
        }

        function l(e, t) {
            var n = e.requireModules,
                r = !1;
            t ? t(e) : (each(n,
                function (t) {
                    var n = getOwn(k, t);
                    n && (n.error = e, n.events.error && (r = !0, n.emit("error", e)))
                }), r || req.onError(e))
        }

        function c() {
            globalDefQueue.length && (apsp.apply(j, [j.length, 0].concat(globalDefQueue)), globalDefQueue = [])
        }

        function f(e) {
            delete k[e],
                delete E[e]
        }

        function p(e, t, n) {
            var r = e.map.id;
            e.error ? e.emit("error", e.error) : (t[r] = !0, each(e.depMaps,
                function (r, i) {
                    var o = r.id,
                        s = getOwn(k, o);
                    !s || e.depMatched[i] || n[o] || (getOwn(t, o) ? (e.defineDep(i, A[o]), e.check()) : p(s, t, n))
                }), n[r] = !0)
        }

        function h() {
            var e, t, n = 1e3 * C.waitSeconds,
                o = n && x.startTime + n < (new Date).getTime(),
                s = [],
                a = [],
                u = !1,
                c = !0;
            if (!y) {
                if (y = !0, eachProp(E,
                    function (e) {
                        var n = e.map,
                            l = n.id;
                        if (e.enabled && (n.isDefine || a.push(e), !e.error))
                            if (!e.inited && o) i(l) ? (t = !0, u = !0) : (s.push(l), r(l));
                            else if (!e.inited && e.fetched && n.isDefine && (u = !0, !n.prefix)) return c = !1
                    }), o && s.length) return e = makeError("timeout", "Load timeout for modules: " + s, null, s),
                    e.contextName = x.contextName,
                    l(e);
                c && each(a,
                        function (e) {
                            p(e, {}, {})
                        }),
                    o && !t || !u || !isBrowser && !isWebWorker || T || (T = setTimeout(function () {
                            T = 0,
                                h()
                        },
                        50)),
                    y = !1
            }
        }

        function d(e) {
            hasProp(A, e[0]) || a(s(e[0], null, !0)).init(e[1], e[2])
        }

        function g(e, t, n, r) {
            e.detachEvent && !isOpera ? r && e.detachEvent(r, t) : e.removeEventListener(n, t, !1)
        }

        function m(e) {
            var t = e.currentTarget || e.srcElement;
            return g(t, x.onScriptLoad, "load", "onreadystatechange"),
                g(t, x.onScriptError, "error"), {
                    node: t,
                    id: t && t.getAttribute("data-requiremodule")
                }
        }

        function v() {
            var e;
            for (c(); j.length;) {
                if (e = j.shift(), null === e[0]) return l(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                d(e)
            }
        }
        var y, b, x, w, T, C = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            k = {},
            E = {},
            S = {},
            j = [],
            A = {},
            $ = {},
            N = {},
            D = 1,
            q = 1;
        return w = {
                require: function (e) {
                        return e.require ? e.require : e.require = x.makeRequire(e.map)
                    },
                    exports: function (e) {
                        return e.usingExports = !0,
                            e.map.isDefine ? e.exports ? A[e.map.id] = e.exports : e.exports = A[e.map.id] = {} : void 0
                    },
                    module: function (e) {
                        return e.module ? e.module : e.module = {
                            id: e.map.id,
                            uri: e.map.url,
                            config: function () {
                                    return getOwn(C.config, e.map.id) || {}
                                },
                                exports: e.exports || (e.exports = {})
                        }
                    }
            },
            b = function (e) {
                this.events = getOwn(S, e.id) || {},
                    this.map = e,
                    this.shim = getOwn(C.shim, e.id),
                    this.depExports = [],
                    this.depMaps = [],
                    this.depMatched = [],
                    this.pluginMaps = {},
                    this.depCount = 0
            },
            b.prototype = {
                init: function (e, t, n, r) {
                        r = r || {},
                            this.inited || (this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this,
                                function (e) {
                                    this.emit("error", e)
                                })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = r.ignore, r.enabled || this.enabled ? this.enable() : this.check())
                    },
                    defineDep: function (e, t) {
                        this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
                    },
                    fetch: function () {
                        if (!this.fetched) {
                            this.fetched = !0,
                                x.startTime = (new Date).getTime();
                            var e = this.map;
                            return this.shim ? void x.makeRequire(this.map, {
                                enableBuildCallback: !0
                            })(this.shim.deps || [], bind(this,
                                function () {
                                    return e.prefix ? this.callPlugin() : this.load()
                                })) : e.prefix ? this.callPlugin() : this.load()
                        }
                    },
                    load: function () {
                        var e = this.map.url;
                        $[e] || ($[e] = !0, x.load(this.map.id, e))
                    },
                    check: function () {
                        if (this.enabled && !this.enabling) {
                            var e, t, n = this.map.id,
                                r = this.depExports,
                                i = this.exports,
                                o = this.factory;
                            if (this.inited) {
                                if (this.error) this.emit("error", this.error);
                                else if (!this.defining) {
                                    if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                        if (isFunction(o)) {
                                            if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                                i = x.execCb(n, o, r, i)
                                            } catch (s) {
                                                e = s
                                            } else i = x.execCb(n, o, r, i);
                                            if (this.map.isDefine && void 0 === i && (t = this.module, t ? i = t.exports : this.usingExports && (i = this.exports)), e) return e.requireMap = this.map,
                                                e.requireModules = this.map.isDefine ? [this.map.id] : null,
                                                e.requireType = this.map.isDefine ? "define" : "require",
                                                l(this.error = e)
                                        } else i = o;
                                        this.exports = i,
                                            this.map.isDefine && !this.ignore && (A[n] = i, req.onResourceLoad && req.onResourceLoad(x, this.map, this.depMaps)),
                                            f(n),
                                            this.defined = !0
                                    }
                                    this.defining = !1,
                                        this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                                }
                            } else this.fetch()
                        }
                    },
                    callPlugin: function () {
                        var e = this.map,
                            t = e.id,
                            r = s(e.prefix);
                        this.depMaps.push(r),
                            u(r, "defined", bind(this,
                                function (r) {
                                    var i, o, c, p = getOwn(N, this.map.id),
                                        h = this.map.name,
                                        d = this.map.parentMap ? this.map.parentMap.name : null,
                                        g = x.makeRequire(e.parentMap, {
                                            enableBuildCallback: !0
                                        });
                                    return this.map.unnormalized ? (r.normalize && (h = r.normalize(h,
                                        function (e) {
                                            return n(e, d, !0)
                                        }) || ""), o = s(e.prefix + "!" + h, this.map.parentMap), u(o, "defined", bind(this,
                                        function (e) {
                                            this.init([],
                                                function () {
                                                    return e
                                                },
                                                null, {
                                                    enabled: !0,
                                                    ignore: !0
                                                })
                                        })), c = getOwn(k, o.id), void(c && (this.depMaps.push(o), this.events.error && c.on("error", bind(this,
                                        function (e) {
                                            this.emit("error", e)
                                        })), c.enable()))) : p ? (this.map.url = x.nameToUrl(p), void this.load()) : (i = bind(this,
                                        function (e) {
                                            this.init([],
                                                function () {
                                                    return e
                                                },
                                                null, {
                                                    enabled: !0
                                                })
                                        }), i.error = bind(this,
                                        function (e) {
                                            this.inited = !0,
                                                this.error = e,
                                                e.requireModules = [t],
                                                eachProp(k,
                                                    function (e) {
                                                        0 === e.map.id.indexOf(t + "_unnormalized") && f(e.map.id)
                                                    }),
                                                l(e)
                                        }), i.fromText = bind(this,
                                        function (n, r) {
                                            var o = e.name,
                                                u = s(o),
                                                c = useInteractive;
                                            r && (n = r),
                                                c && (useInteractive = !1),
                                                a(u),
                                                hasProp(C.config, t) && (C.config[o] = C.config[t]);
                                            try {
                                                req.exec(n)
                                            } catch (f) {
                                                return l(makeError("fromtexteval", "fromText eval for " + t + " failed: " + f, f, [t]))
                                            }
                                            c && (useInteractive = !0),
                                                this.depMaps.push(u),
                                                x.completeLoad(o),
                                                g([o], i)
                                        }), void r.load(e.name, g, i, C))
                                })),
                            x.enable(r, this),
                            this.pluginMaps[r.id] = r
                    },
                    enable: function () {
                        E[this.map.id] = this,
                            this.enabled = !0,
                            this.enabling = !0,
                            each(this.depMaps, bind(this,
                                function (e, t) {
                                    var n, r, i;
                                    if ("string" == typeof e) {
                                        if (e = s(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, i = getOwn(w, e.id)) return void(this.depExports[t] = i(this));
                                        this.depCount += 1,
                                            u(e, "defined", bind(this,
                                                function (e) {
                                                    this.defineDep(t, e),
                                                        this.check()
                                                })),
                                            this.errback && u(e, "error", bind(this, this.errback))
                                    }
                                    n = e.id,
                                        r = k[n],
                                        hasProp(w, n) || !r || r.enabled || x.enable(e, this)
                                })),
                            eachProp(this.pluginMaps, bind(this,
                                function (e) {
                                    var t = getOwn(k, e.id);
                                    t && !t.enabled && x.enable(e, this)
                                })),
                            this.enabling = !1,
                            this.check()
                    },
                    on: function (e, t) {
                        var n = this.events[e];
                        n || (n = this.events[e] = []),
                            n.push(t)
                    },
                    emit: function (e, t) {
                        each(this.events[e],
                                function (e) {
                                    e(t)
                                }),
                            "error" === e && delete this.events[e]
                    }
            },
            x = {
                config: C,
                contextName: e,
                registry: k,
                defined: A,
                urlFetched: $,
                defQueue: j,
                Module: b,
                makeModuleMap: s,
                nextTick: req.nextTick,
                onError: l,
                configure: function (e) {
                        e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
                        var t = C.shim,
                            n = {
                                paths: !0,
                                bundles: !0,
                                config: !0,
                                map: !0
                            };
                        eachProp(e,
                                function (e, t) {
                                    n[t] ? (C[t] || (C[t] = {}), mixin(C[t], e, !0, !0)) : C[t] = e
                                }),
                            e.bundles && eachProp(e.bundles,
                                function (e, t) {
                                    each(e,
                                        function (e) {
                                            e !== t && (N[e] = t)
                                        })
                                }),
                            e.shim && (eachProp(e.shim,
                                function (e, n) {
                                    isArray(e) && (e = {
                                            deps: e
                                        }), !e.exports && !e.init || e.exportsFn || (e.exportsFn = x.makeShimExports(e)),
                                        t[n] = e
                                }), C.shim = t),
                            e.packages && each(e.packages,
                                function (e) {
                                    var t, n;
                                    e = "string" == typeof e ? {
                                            name: e
                                        } : e,
                                        n = e.name,
                                        t = e.location,
                                        t && (C.paths[n] = e.location),
                                        C.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                                }),
                            eachProp(k,
                                function (e, t) {
                                    e.inited || e.map.unnormalized || (e.map = s(t))
                                }), (e.deps || e.callback) && x.require(e.deps || [], e.callback)
                    },
                    makeShimExports: function (e) {
                        function t() {
                            var t;
                            return e.init && (t = e.init.apply(global, arguments)),
                                t || e.exports && getGlobal(e.exports)
                        }
                        return t
                    },
                    makeRequire: function (t, i) {
                        function o(n, r, u) {
                            var c, f, p;
                            return i.enableBuildCallback && r && isFunction(r) && (r.__requireJsBuild = !0),
                                "string" == typeof n ? isFunction(r) ? l(makeError("requireargs", "Invalid require call"), u) : t && hasProp(w, n) ? w[n](k[t.id]) : req.get ? req.get(x, n, t, o) : (f = s(n, t, !1, !0), c = f.id, hasProp(A, c) ? A[c] : l(makeError("notloaded", 'Module name "' + c + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), x.nextTick(function () {
                                    v(),
                                        p = a(s(null, t)),
                                        p.skipMap = i.skipMap,
                                        p.init(n, r, u, {
                                            enabled: !0
                                        }),
                                        h()
                                }), o)
                        }
                        return i = i || {},
                            mixin(o, {
                                isBrowser: isBrowser,
                                toUrl: function (e) {
                                        var r, i = e.lastIndexOf("."),
                                            o = e.split("/")[0],
                                            s = "." === o || ".." === o;
                                        return -1 !== i && (!s || i > 1) && (r = e.substring(i, e.length), e = e.substring(0, i)),
                                            x.nameToUrl(n(e, t && t.id, !0), r, !0)
                                    },
                                    defined: function (e) {
                                        return hasProp(A, s(e, t, !1, !0).id)
                                    },
                                    specified: function (e) {
                                        return e = s(e, t, !1, !0).id,
                                            hasProp(A, e) || hasProp(k, e)
                                    }
                            }),
                            t || (o.undef = function (e) {
                                c();
                                var n = s(e, t, !0),
                                    i = getOwn(k, e);
                                r(e),
                                    delete A[e],
                                    delete $[n.url],
                                    delete S[e],
                                    eachReverse(j,
                                        function (t, n) {
                                            t[0] === e && j.splice(n, 1)
                                        }),
                                    i && (i.events.defined && (S[e] = i.events), f(e))
                            }),
                            o
                    },
                    enable: function (e) {
                        var t = getOwn(k, e.id);
                        t && a(e).enable()
                    },
                    completeLoad: function (e) {
                        var t, n, r, o = getOwn(C.shim, e) || {},
                            s = o.exports;
                        for (c(); j.length;) {
                            if (n = j.shift(), null === n[0]) {
                                if (n[0] = e, t) break;
                                t = !0
                            } else n[0] === e && (t = !0);
                            d(n)
                        }
                        if (r = getOwn(k, e), !t && !hasProp(A, e) && r && !r.inited) {
                            if (!(!C.enforceDefine || s && getGlobal(s))) return i(e) ? void 0 : l(makeError("nodefine", "No define call for " + e, null, [e]));
                            d([e, o.deps || [], o.exportsFn])
                        }
                        h()
                    },
                    nameToUrl: function (e, t, n) {
                        var r, i, o, s, a, u, l, c = getOwn(C.pkgs, e);
                        if (c && (e = c), l = getOwn(N, e)) return x.nameToUrl(l, t, n);
                        if (req.jsExtRegExp.test(e)) a = e + (t || "");
                        else {
                            for (r = C.paths, i = e.split("/"), o = i.length; o > 0; o -= 1)
                                if (s = i.slice(0, o).join("/"), u = getOwn(r, s)) {
                                    isArray(u) && (u = u[0]),
                                        i.splice(0, o, u);
                                    break
                                }
                            a = i.join("/"),
                                a += t || (/^data\:|\?/.test(a) || n ? "" : ".js"),
                                a = ("/" === a.charAt(0) || a.match(/^[\w\+\.\-]+:/) ? "" : C.baseUrl) + a
                        }
                        return C.urlArgs ? a + ((-1 === a.indexOf("?") ? "?" : "&") + C.urlArgs) : a
                    },
                    load: function (e, t) {
                        req.load(x, e, t)
                    },
                    execCb: function (e, t, n, r) {
                        return t.apply(r, n)
                    },
                    onScriptLoad: function (e) {
                        if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                            interactiveScript = null;
                            var t = m(e);
                            x.completeLoad(t.id)
                        }
                    },
                    onScriptError: function (e) {
                        var t = m(e);
                        return i(t.id) ? void 0 : l(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
                    }
            },
            x.require = x.makeRequire(),
            x
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(),
            function (e) {
                return "interactive" === e.readyState ? interactiveScript = e : void 0
            }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.15",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs,
                requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0),
            req = requirejs = function (e, t, n, r) {
                var i, o, s = defContextName;
                return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = n, n = r) : e = []),
                    o && o.context && (s = o.context),
                    i = getOwn(contexts, s),
                    i || (i = contexts[s] = req.s.newContext(s)),
                    o && i.configure(o),
                    i.require(e, t, n)
            },
            req.config = function (e) {
                return req(e)
            },
            req.nextTick = "undefined" != typeof setTimeout ?
            function (e) {
                setTimeout(e, 4)
            } : function (e) {
                e()
            },
            require || (require = req),
            req.version = version,
            req.jsExtRegExp = /^\/|:|\?|\.js$/,
            req.isBrowser = isBrowser,
            s = req.s = {
                contexts: contexts,
                newContext: newContext
            },
            req({}),
            each(["toUrl", "undef", "defined", "specified"],
                function (e) {
                    req[e] = function () {
                        var t = contexts[defContextName];
                        return t.require[e].apply(t, arguments)
                    }
                }),
            isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)),
            req.onError = defaultOnError,
            req.createNode = function (e) {
                var t = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
                return t.type = e.scriptType || "text/javascript",
                    t.charset = "utf-8",
                    t.async = !0,
                    t
            },
            req.load = function (e, t, n) {
                console.log("r.src : ", n);
                var r, i = e && e.config || {};
                if (isBrowser) return r = req.createNode(i, t, n),
                    r.setAttribute("data-requirecontext", e.contextName),
                    r.setAttribute("data-requiremodule", t), !r.attachEvent || r.attachEvent.toString && r.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (r.addEventListener("load", e.onScriptLoad, !1), r.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, r.attachEvent("onreadystatechange", e.onScriptLoad)),
                    r.src = n,
                    currentlyAddingScript = r,
                    baseElement ? head.insertBefore(r, baseElement) : head.appendChild(r),
                    currentlyAddingScript = null,
                    r;
                if (isWebWorker) try {
                    importScripts(n),
                        e.completeLoad(t)
                } catch (o) {
                    e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, o, [t]))
                }
            },
            isBrowser && !cfg.skipDataMain && eachReverse(scripts(),
                function (e) {
                    return head || (head = e.parentNode),
                        dataMain = e.getAttribute("data-main"),
                        dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
                }),
            define = function (e, t, n) {
                var r, i;
                "string" != typeof e && (n = t, t = e, e = null),
                    isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp,
                        function (e, n) {
                            t.push(n)
                        }), t = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(t))),
                    useInteractive && (r = currentlyAddingScript || getInteractiveScript(), r && (e || (e = r.getAttribute("data-requiremodule")), i = contexts[r.getAttribute("data-requirecontext")])), (i ? i.defQueue : globalDefQueue).push([e, t, n])
            },
            define.amd = {
                jQuery: !0
            },
            req.exec = function (text) {
                return eval(text)
            },
            req(cfg)
    }
}(this),
define("rjs",
        function () {}),
    function (e, t) {
        function n(e) {
            var t = e.length,
                n = ot.type(e);
            return ot.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
        }

        function r(e) {
            var t = dt[e] = {};
            return ot.each(e.match(at) || [],
                    function (e, n) {
                        t[n] = !0
                    }),
                t
        }

        function i() {
            Object.defineProperty(this.cache = {},
                    0, {
                        get: function () {
                            return {}
                        }
                    }),
                this.expando = ot.expando + Math.random()
        }

        function o(e, n, r) {
            var i;
            if (r === t && 1 === e.nodeType)
                if (i = "data-" + n.replace(yt, "-$1").toLowerCase(), r = e.getAttribute(i), "string" == typeof r) {
                    try {
                        r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : vt.test(r) ? JSON.parse(r) : r
                    } catch (o) {}
                    gt.set(e, n, r)
                } else r = t;
            return r
        }

        function s() {
            return !0
        }

        function a() {
            return !1
        }

        function u() {
            try {
                return z.activeElement
            } catch (e) {}
        }

        function l(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }

        function c(e, t, n) {
            if (ot.isFunction(t)) return ot.grep(e,
                function (e, r) {
                    return !!t.call(e, r, e) !== n
                });
            if (t.nodeType) return ot.grep(e,
                function (e) {
                    return e === t !== n
                });
            if ("string" == typeof t) {
                if (At.test(t)) return ot.filter(t, e, n);
                t = ot.filter(t, e)
            }
            return ot.grep(e,
                function (e) {
                    return tt.call(t, e) >= 0 !== n
                })
        }

        function f(e, t) {
            return ot.nodeName(e, "table") && ot.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function p(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
                e
        }

        function h(e) {
            var t = Rt.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"),
                e
        }

        function d(e, t) {
            for (var n = e.length,
                r = 0; n > r; r++) mt.set(e[r], "globalEval", !t || mt.get(t[r], "globalEval"))
        }

        function g(e, t) {
            var n, r, i, o, s, a, u, l;
            if (1 === t.nodeType) {
                if (mt.hasData(e) && (o = mt.access(e), s = mt.set(t, o), l = o.events)) {
                    delete s.handle,
                        s.events = {};
                    for (i in l)
                        for (n = 0, r = l[i].length; r > n; n++) ot.event.add(t, i, l[i][n])
                }
                gt.hasData(e) && (a = gt.access(e), u = ot.extend({},
                    a), gt.set(t, u))
            }
        }

        function m(e, n) {
            var r = e.getElementsByTagName ? e.getElementsByTagName(n || "*") : e.querySelectorAll ? e.querySelectorAll(n || "*") : [];
            return n === t || n && ot.nodeName(e, n) ? ot.merge([e], r) : r
        }

        function v(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && Mt.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }

        function y(e, t) {
            if (t in e) return t;
            for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Zt.length; i--;)
                if (t = Zt[i] + n, t in e) return t;
            return r
        }

        function b(e, t) {
            return e = t || e,
                "none" === ot.css(e, "display") || !ot.contains(e.ownerDocument, e)
        }

        function x(t) {
            return e.getComputedStyle(t, null)
        }

        function w(e, t) {
            for (var n, r, i, o = [], s = 0, a = e.length; a > s; s++) r = e[s],
                r.style && (o[s] = mt.get(r, "olddisplay"), n = r.style.display, t ? (o[s] || "none" !== n || (r.style.display = ""), "" === r.style.display && b(r) && (o[s] = mt.access(r, "olddisplay", E(r.nodeName)))) : o[s] || (i = b(r), (n && "none" !== n || !i) && mt.set(r, "olddisplay", i ? n : ot.css(r, "display"))));
            for (s = 0; a > s; s++) r = e[s],
                r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[s] || "" : "none"));
            return e
        }

        function T(e, t, n) {
            var r = Qt.exec(t);
            return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
        }

        function C(e, t, n, r, i) {
            for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, s = 0; 4 > o; o += 2) "margin" === n && (s += ot.css(e, n + Kt[o], !0, i)),
                r ? ("content" === n && (s -= ot.css(e, "padding" + Kt[o], !0, i)), "margin" !== n && (s -= ot.css(e, "border" + Kt[o] + "Width", !0, i))) : (s += ot.css(e, "padding" + Kt[o], !0, i), "padding" !== n && (s += ot.css(e, "border" + Kt[o] + "Width", !0, i)));
            return s
        }

        function k(e, t, n) {
            var r = !0,
                i = "width" === t ? e.offsetWidth : e.offsetHeight,
                o = x(e),
                s = ot.support.boxSizing && "border-box" === ot.css(e, "boxSizing", !1, o);
            if (0 >= i || null == i) {
                if (i = Wt(e, t, o), (0 > i || null == i) && (i = e.style[t]), Xt.test(i)) return i;
                r = s && (ot.support.boxSizingReliable || i === e.style[t]),
                    i = parseFloat(i) || 0
            }
            return i + C(e, t, n || (s ? "border" : "content"), r, o) + "px"
        }

        function E(e) {
            var t = z,
                n = Vt[e];
            return n || (n = S(e, t), "none" !== n && n || (It = (It || ot("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (It[0].contentWindow || It[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = S(e, t), It.detach()), Vt[e] = n),
                n
        }

        function S(e, t) {
            var n = ot(t.createElement(e)).appendTo(t.body),
                r = ot.css(n[0], "display");
            return n.remove(),
                r
        }

        function j(e, t, n, r) {
            var i;
            if (ot.isArray(t)) ot.each(t,
                function (t, i) {
                    n || tn.test(e) ? r(e, i) : j(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
                });
            else if (n || "object" !== ot.type(t)) r(e, t);
            else
                for (i in t) j(e + "[" + i + "]", t[i], n, r)
        }

        function A(e) {
            return function (t, n) {
                "string" != typeof t && (n = t, t = "*");
                var r, i = 0,
                    o = t.toLowerCase().match(at) || [];
                if (ot.isFunction(n))
                    for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
            }
        }

        function $(e, t, n, r) {
            function i(a) {
                var u;
                return o[a] = !0,
                    ot.each(e[a] || [],
                        function (e, a) {
                            var l = a(t, n, r);
                            return "string" != typeof l || s || o[l] ? s ? !(u = l) : void 0 : (t.dataTypes.unshift(l), i(l), !1)
                        }),
                    u
            }
            var o = {},
                s = e === bn;
            return i(t.dataTypes[0]) || !o["*"] && i("*")
        }

        function N(e, n) {
            var r, i, o = ot.ajaxSettings.flatOptions || {};
            for (r in n) n[r] !== t && ((o[r] ? e : i || (i = {}))[r] = n[r]);
            return i && ot.extend(!0, e, i),
                e
        }

        function D(e, n, r) {
            for (var i, o, s, a, u = e.contents,
                    l = e.dataTypes;
                "*" === l[0];) l.shift(),
                i === t && (i = e.mimeType || n.getResponseHeader("Content-Type"));
            if (i)
                for (o in u)
                    if (u[o] && u[o].test(i)) {
                        l.unshift(o);
                        break
                    }
            if (l[0] in r) s = l[0];
            else {
                for (o in r) {
                    if (!l[0] || e.converters[o + " " + l[0]]) {
                        s = o;
                        break
                    }
                    a || (a = o)
                }
                s = s || a
            }
            return s ? (s !== l[0] && l.unshift(s), r[s]) : void 0
        }

        function q(e, t, n, r) {
            var i, o, s, a, u, l = {},
                c = e.dataTypes.slice();
            if (c[1])
                for (s in e.converters) l[s.toLowerCase()] = e.converters[s];
            for (o = c.shift(); o;)
                if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                    if ("*" === o) o = u;
                    else if ("*" !== u && u !== o) {
                if (s = l[u + " " + o] || l["* " + o], !s)
                    for (i in l)
                        if (a = i.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                            s === !0 ? s = l[i] : l[i] !== !0 && (o = a[0], c.unshift(a[1]));
                            break
                        }
                if (s !== !0)
                    if (s && e["throws"]) t = s(t);
                    else try {
                        t = s(t)
                    } catch (f) {
                        return {
                            state: "parsererror",
                            error: s ? f : "No conversion from " + u + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function O() {
            return setTimeout(function () {
                    An = t
                }),
                An = ot.now()
        }

        function L(e, t, n) {
            for (var r, i = (Ln[t] || []).concat(Ln["*"]), o = 0, s = i.length; s > o; o++)
                if (r = i[o].call(n, t, e)) return r
        }

        function P(e, t, n) {
            var r, i, o = 0,
                s = On.length,
                a = ot.Deferred().always(function () {
                    delete u.elem
                }),
                u = function () {
                    if (i) return !1;
                    for (var t = An || O(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, s = 0, u = l.tweens.length; u > s; s++) l.tweens[s].run(o);
                    return a.notifyWith(e, [l, o, n]),
                        1 > o && u ? n : (a.resolveWith(e, [l]), !1)
                },
                l = a.promise({
                    elem: e,
                    props: ot.extend({},
                        t),
                    opts: ot.extend(!0, {
                            specialEasing: {}
                        },
                        n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: An || O(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function (t, n) {
                            var r = ot.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                            return l.tweens.push(r),
                                r
                        },
                        stop: function (t) {
                            var n = 0,
                                r = t ? l.tweens.length : 0;
                            if (i) return this;
                            for (i = !0; r > n; n++) l.tweens[n].run(1);
                            return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]),
                                this
                        }
                }),
                c = l.props;
            for (M(c, l.opts.specialEasing); s > o; o++)
                if (r = On[o].call(l, e, c, l.opts)) return r;
            return ot.map(c, L, l),
                ot.isFunction(l.opts.start) && l.opts.start.call(e, l),
                ot.fx.timer(ot.extend(u, {
                    elem: e,
                    anim: l,
                    queue: l.opts.queue
                })),
                l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
        }

        function M(e, t) {
            var n, r, i, o, s;
            for (n in e)
                if (r = ot.camelCase(n), i = t[r], o = e[n], ot.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = ot.cssHooks[r], s && "expand" in s) {
                    o = s.expand(o),
                        delete e[r];
                    for (n in o) n in e || (e[n] = o[n], t[n] = i)
                } else t[r] = i
        }

        function F(e, n, r) {
            var i, o, s, a, u, l, c = this,
                f = {},
                p = e.style,
                h = e.nodeType && b(e),
                d = mt.get(e, "fxshow");
            r.queue || (u = ot._queueHooks(e, "fx"), null == u.unqueued && (u.unqueued = 0, l = u.empty.fire, u.empty.fire = function () {
                    u.unqueued || l()
                }), u.unqueued++, c.always(function () {
                    c.always(function () {
                        u.unqueued--,
                            ot.queue(e, "fx").length || u.empty.fire()
                    })
                })),
                1 === e.nodeType && ("height" in n || "width" in n) && (r.overflow = [p.overflow, p.overflowX, p.overflowY], "inline" === ot.css(e, "display") && "none" === ot.css(e, "float") && (p.display = "inline-block")),
                r.overflow && (p.overflow = "hidden", c.always(function () {
                    p.overflow = r.overflow[0],
                        p.overflowX = r.overflow[1],
                        p.overflowY = r.overflow[2]
                }));
            for (i in n)
                if (o = n[i], Nn.exec(o)) {
                    if (delete n[i], s = s || "toggle" === o, o === (h ? "hide" : "show")) {
                        if ("show" !== o || !d || d[i] === t) continue;
                        h = !0
                    }
                    f[i] = d && d[i] || ot.style(e, i)
                }
            if (!ot.isEmptyObject(f)) {
                d ? "hidden" in d && (h = d.hidden) : d = mt.access(e, "fxshow", {}),
                    s && (d.hidden = !h),
                    h ? ot(e).show() : c.done(function () {
                        ot(e).hide()
                    }),
                    c.done(function () {
                        var t;
                        mt.remove(e, "fxshow");
                        for (t in f) ot.style(e, t, f[t])
                    });
                for (i in f) a = L(h ? d[i] : 0, i, c),
                    i in d || (d[i] = a.start, h && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
            }
        }

        function H(e, t, n, r, i) {
            return new H.prototype.init(e, t, n, r, i)
        }

        function R(e, t) {
            var n, r = {
                    height: e
                },
                i = 0;
            for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Kt[i],
                r["margin" + n] = r["padding" + n] = e;
            return t && (r.opacity = r.width = e),
                r
        }

        function _(e) {
            return ot.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
        }
        var B, W, I = typeof t,
            U = e.location,
            z = e.document,
            Q = z.documentElement,
            X = e.jQuery,
            Y = e.$,
            V = {},
            G = [],
            J = "2.0.3",
            K = G.concat,
            Z = G.push,
            et = G.slice,
            tt = G.indexOf,
            nt = V.toString,
            rt = V.hasOwnProperty,
            it = J.trim,
            ot = function (e, t) {
                return new ot.fn.init(e, t, B)
            },
            st = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            at = /\S+/g,
            ut = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            lt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            ct = /^-ms-/,
            ft = /-([\da-z])/gi,
            pt = function (e, t) {
                return t.toUpperCase()
            },
            ht = function () {
                z.removeEventListener("DOMContentLoaded", ht, !1),
                    e.removeEventListener("load", ht, !1),
                    ot.ready()
            };
        ot.fn = ot.prototype = {
                jquery: J,
                constructor: ot,
                init: function (e, n, r) {
                        var i, o;
                        if (!e) return this;
                        if ("string" == typeof e) {
                            if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ut.exec(e), !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                            if (i[1]) {
                                if (n = n instanceof ot ? n[0] : n, ot.merge(this, ot.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : z, !0)), lt.test(i[1]) && ot.isPlainObject(n))
                                    for (i in n) ot.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                                return this
                            }
                            return o = z.getElementById(i[2]),
                                o && o.parentNode && (this.length = 1, this[0] = o),
                                this.context = z,
                                this.selector = e,
                                this
                        }
                        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ot.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ot.makeArray(e, this))
                    },
                    selector: "",
                length: 0,
                toArray: function () {
                        return et.call(this)
                    },
                    get: function (e) {
                        return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
                    },
                    pushStack: function (e) {
                        var t = ot.merge(this.constructor(), e);
                        return t.prevObject = this,
                            t.context = this.context,
                            t
                    },
                    each: function (e, t) {
                        return ot.each(this, e, t)
                    },
                    ready: function (e) {
                        return ot.ready.promise().done(e),
                            this
                    },
                    slice: function () {
                        return this.pushStack(et.apply(this, arguments))
                    },
                    first: function () {
                        return this.eq(0)
                    },
                    last: function () {
                        return this.eq(-1)
                    },
                    eq: function (e) {
                        var t = this.length,
                            n = +e + (0 > e ? t : 0);
                        return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
                    },
                    map: function (e) {
                        return this.pushStack(ot.map(this,
                            function (t, n) {
                                return e.call(t, n, t)
                            }))
                    },
                    end: function () {
                        return this.prevObject || this.constructor(null)
                    },
                    push: Z,
                sort: [].sort,
                splice: [].splice
            },
            ot.fn.init.prototype = ot.fn,
            ot.extend = ot.fn.extend = function () {
                var e, n, r, i, o, s, a = arguments[0] || {},
                    u = 1,
                    l = arguments.length,
                    c = !1;
                for ("boolean" == typeof a && (c = a, a = arguments[1] || {},
                    u = 2), "object" == typeof a || ot.isFunction(a) || (a = {}), l === u && (a = this, --u); l > u; u++)
                    if (null != (e = arguments[u]))
                        for (n in e) r = a[n],
                            i = e[n],
                            a !== i && (c && i && (ot.isPlainObject(i) || (o = ot.isArray(i))) ? (o ? (o = !1, s = r && ot.isArray(r) ? r : []) : s = r && ot.isPlainObject(r) ? r : {},
                                a[n] = ot.extend(c, s, i)) : i !== t && (a[n] = i));
                return a
            },
            ot.extend({
                expando: "jQuery" + (J + Math.random()).replace(/\D/g, ""),
                noConflict: function (t) {
                        return e.$ === ot && (e.$ = Y),
                            t && e.jQuery === ot && (e.jQuery = X),
                            ot
                    },
                    isReady: !1,
                readyWait: 1,
                holdReady: function (e) {
                        e ? ot.readyWait++ : ot.ready(!0)
                    },
                    ready: function (e) {
                        (e === !0 ? --ot.readyWait : ot.isReady) || (ot.isReady = !0, e !== !0 && --ot.readyWait > 0 || (W.resolveWith(z, [ot]), ot.fn.trigger && ot(z).trigger("ready").off("ready")))
                    },
                    isFunction: function (e) {
                        return "function" === ot.type(e)
                    },
                    isArray: Array.isArray,
                isWindow: function (e) {
                        return null != e && e === e.window
                    },
                    isNumeric: function (e) {
                        return !isNaN(parseFloat(e)) && isFinite(e)
                    },
                    type: function (e) {
                        return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? V[nt.call(e)] || "object" : typeof e
                    },
                    isPlainObject: function (e) {
                        if ("object" !== ot.type(e) || e.nodeType || ot.isWindow(e)) return !1;
                        try {
                            if (e.constructor && !rt.call(e.constructor.prototype, "isPrototypeOf")) return !1
                        } catch (t) {
                            return !1
                        }
                        return !0
                    },
                    isEmptyObject: function (e) {
                        var t;
                        for (t in e) return !1;
                        return !0
                    },
                    error: function (e) {
                        throw new Error(e)
                    },
                    parseHTML: function (e, t, n) {
                        if (!e || "string" != typeof e) return null;
                        "boolean" == typeof t && (n = t, t = !1),
                            t = t || z;
                        var r = lt.exec(e),
                            i = !n && [];
                        return r ? [t.createElement(r[1])] : (r = ot.buildFragment([e], t, i), i && ot(i).remove(), ot.merge([], r.childNodes))
                    },
                    parseJSON: JSON.parse,
                parseXML: function (e) {
                        var n, r;
                        if (!e || "string" != typeof e) return null;
                        try {
                            r = new DOMParser,
                                n = r.parseFromString(e, "text/xml")
                        } catch (i) {
                            n = t
                        }
                        return (!n || n.getElementsByTagName("parsererror").length) && ot.error("Invalid XML: " + e),
                            n
                    },
                    noop: function () {},
                    globalEval: function (e) {
                        var t, n = eval;
                        e = ot.trim(e),
                            e && (1 === e.indexOf("use strict") ? (t = z.createElement("script"), t.text = e, z.head.appendChild(t).parentNode.removeChild(t)) : n(e))
                    },
                    camelCase: function (e) {
                        return e.replace(ct, "ms-").replace(ft, pt)
                    },
                    nodeName: function (e, t) {
                        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
                    },
                    each: function (e, t, r) {
                        var i, o = 0,
                            s = e.length,
                            a = n(e);
                        if (r) {
                            if (a)
                                for (; s > o && (i = t.apply(e[o], r), i !== !1); o++);
                            else
                                for (o in e)
                                    if (i = t.apply(e[o], r), i === !1) break
                        } else if (a)
                            for (; s > o && (i = t.call(e[o], o, e[o]), i !== !1); o++);
                        else
                            for (o in e)
                                if (i = t.call(e[o], o, e[o]), i === !1) break;
                        return e
                    },
                    trim: function (e) {
                        return null == e ? "" : it.call(e)
                    },
                    makeArray: function (e, t) {
                        var r = t || [];
                        return null != e && (n(Object(e)) ? ot.merge(r, "string" == typeof e ? [e] : e) : Z.call(r, e)),
                            r
                    },
                    inArray: function (e, t, n) {
                        return null == t ? -1 : tt.call(t, e, n)
                    },
                    merge: function (e, n) {
                        var r = n.length,
                            i = e.length,
                            o = 0;
                        if ("number" == typeof r)
                            for (; r > o; o++) e[i++] = n[o];
                        else
                            for (; n[o] !== t;) e[i++] = n[o++];
                        return e.length = i,
                            e
                    },
                    grep: function (e, t, n) {
                        var r, i = [],
                            o = 0,
                            s = e.length;
                        for (n = !!n; s > o; o++) r = !!t(e[o], o),
                            n !== r && i.push(e[o]);
                        return i
                    },
                    map: function (e, t, r) {
                        var i, o = 0,
                            s = e.length,
                            a = n(e),
                            u = [];
                        if (a)
                            for (; s > o; o++) i = t(e[o], o, r),
                                null != i && (u[u.length] = i);
                        else
                            for (o in e) i = t(e[o], o, r),
                                null != i && (u[u.length] = i);
                        return K.apply([], u)
                    },
                    guid: 1,
                proxy: function (e, n) {
                        var r, i, o;
                        return "string" == typeof n && (r = e[n], n = e, e = r),
                            ot.isFunction(e) ? (i = et.call(arguments, 2), o = function () {
                                    return e.apply(n || this, i.concat(et.call(arguments)))
                                },
                                o.guid = e.guid = e.guid || ot.guid++, o) : t
                    },
                    access: function (e, n, r, i, o, s, a) {
                        var u = 0,
                            l = e.length,
                            c = null == r;
                        if ("object" === ot.type(r)) {
                            o = !0;
                            for (u in r) ot.access(e, n, u, r[u], !0, s, a)
                        } else if (i !== t && (o = !0, ot.isFunction(i) || (a = !0), c && (a ? (n.call(e, i), n = null) : (c = n, n = function (e, t, n) {
                            return c.call(ot(e), n)
                        })), n))
                            for (; l > u; u++) n(e[u], r, a ? i : i.call(e[u], u, n(e[u], r)));
                        return o ? e : c ? n.call(e) : l ? n(e[0], r) : s
                    },
                    now: Date.now,
                swap: function (e, t, n, r) {
                    var i, o, s = {};
                    for (o in t) s[o] = e.style[o],
                        e.style[o] = t[o];
                    i = n.apply(e, r || []);
                    for (o in t) e.style[o] = s[o];
                    return i
                }
            }),
            ot.ready.promise = function (t) {
                return W || (W = ot.Deferred(), "complete" === z.readyState ? setTimeout(ot.ready) : (z.addEventListener("DOMContentLoaded", ht, !1), e.addEventListener("load", ht, !1))),
                    W.promise(t)
            },
            ot.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),
                function (e, t) {
                    V["[object " + t + "]"] = t.toLowerCase()
                }),
            B = ot(z),
            function (e, t) {
                function n(e, t, n, r) {
                    var i, o, s, a, u, l, c, f, d, g;
                    if ((t ? t.ownerDocument || t : _) !== q && D(t), t = t || q, n = n || [], !e || "string" != typeof e) return n;
                    if (1 !== (a = t.nodeType) && 9 !== a) return [];
                    if (L && !r) {
                        if (i = bt.exec(e))
                            if (s = i[1]) {
                                if (9 === a) {
                                    if (o = t.getElementById(s), !o || !o.parentNode) return n;
                                    if (o.id === s) return n.push(o),
                                        n
                                } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(s)) && H(t, o) && o.id === s) return n.push(o),
                                    n
                            } else {
                                if (i[2]) return et.apply(n, t.getElementsByTagName(e)),
                                    n;
                                if ((s = i[3]) && C.getElementsByClassName && t.getElementsByClassName) return et.apply(n, t.getElementsByClassName(s)),
                                    n
                            }
                        if (C.qsa && (!P || !P.test(e))) {
                            if (f = c = R, d = t, g = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
                                for (l = p(e), (c = t.getAttribute("id")) ? f = c.replace(Tt, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", u = l.length; u--;) l[u] = f + h(l[u]);
                                d = ht.test(e) && t.parentNode || t,
                                    g = l.join(",")
                            }
                            if (g) try {
                                return et.apply(n, d.querySelectorAll(g)),
                                    n
                            } catch (m) {} finally {
                                c || t.removeAttribute("id")
                            }
                        }
                    }
                    return w(e.replace(ct, "$1"), t, n, r)
                }

                function r() {
                    function e(n, r) {
                        return t.push(n += " ") > E.cacheLength && delete e[t.shift()],
                            e[n] = r
                    }
                    var t = [];
                    return e
                }

                function i(e) {
                    return e[R] = !0,
                        e
                }

                function o(e) {
                    var t = q.createElement("div");
                    try {
                        return !!e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t.parentNode && t.parentNode.removeChild(t),
                            t = null
                    }
                }

                function s(e, t) {
                    for (var n = e.split("|"), r = e.length; r--;) E.attrHandle[n[r]] = t
                }

                function a(e, t) {
                    var n = t && e,
                        r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
                    if (r) return r;
                    if (n)
                        for (; n = n.nextSibling;)
                            if (n === t) return -1;
                    return e ? 1 : -1
                }

                function u(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return "input" === n && t.type === e
                    }
                }

                function l(e) {
                    return function (t) {
                        var n = t.nodeName.toLowerCase();
                        return ("input" === n || "button" === n) && t.type === e
                    }
                }

                function c(e) {
                    return i(function (t) {
                        return t = +t,
                            i(function (n, r) {
                                for (var i, o = e([], n.length, t), s = o.length; s--;) n[i = o[s]] && (n[i] = !(r[i] = n[i]))
                            })
                    })
                }

                function f() {}

                function p(e, t) {
                    var r, i, o, s, a, u, l, c = U[e + " "];
                    if (c) return t ? 0 : c.slice(0);
                    for (a = e, u = [], l = E.preFilter; a;) {
                        (!r || (i = ft.exec(a))) && (i && (a = a.slice(i[0].length) || a), u.push(o = [])),
                        r = !1, (i = pt.exec(a)) && (r = i.shift(), o.push({
                            value: r,
                            type: i[0].replace(ct, " ")
                        }), a = a.slice(r.length));
                        for (s in E.filter)!(i = vt[s].exec(a)) || l[s] && !(i = l[s](i)) || (r = i.shift(), o.push({
                            value: r,
                            type: s,
                            matches: i
                        }), a = a.slice(r.length));
                        if (!r) break
                    }
                    return t ? a.length : a ? n.error(e) : U(e, u).slice(0)
                }

                function h(e) {
                    for (var t = 0,
                        n = e.length,
                        r = ""; n > t; t++) r += e[t].value;
                    return r
                }

                function d(e, t, n) {
                    var r = t.dir,
                        i = n && "parentNode" === r,
                        o = W++;
                    return t.first ?
                        function (t, n, o) {
                            for (; t = t[r];)
                                if (1 === t.nodeType || i) return e(t, n, o)
                        } : function (t, n, s) {
                            var a, u, l, c = B + " " + o;
                            if (s) {
                                for (; t = t[r];)
                                    if ((1 === t.nodeType || i) && e(t, n, s)) return !0
                            } else
                                for (; t = t[r];)
                                    if (1 === t.nodeType || i)
                                        if (l = t[R] || (t[R] = {}), (u = l[r]) && u[0] === c) {
                                            if ((a = u[1]) === !0 || a === k) return a === !0
                                        } else if (u = l[r] = [c], u[1] = e(t, n, s) || k, u[1] === !0) return !0
                        }
                }

                function g(e) {
                    return e.length > 1 ?
                        function (t, n, r) {
                            for (var i = e.length; i--;)
                                if (!e[i](t, n, r)) return !1;
                            return !0
                        } : e[0]
                }

                function m(e, t, n, r, i) {
                    for (var o, s = [], a = 0, u = e.length, l = null != t; u > a; a++)(o = e[a]) && (!n || n(o, r, i)) && (s.push(o), l && t.push(a));
                    return s
                }

                function v(e, t, n, r, o, s) {
                    return r && !r[R] && (r = v(r)),
                        o && !o[R] && (o = v(o, s)),
                        i(function (i, s, a, u) {
                            var l, c, f, p = [],
                                h = [],
                                d = s.length,
                                g = i || x(t || "*", a.nodeType ? [a] : a, []),
                                v = !e || !i && t ? g : m(g, p, e, a, u),
                                y = n ? o || (i ? e : d || r) ? [] : s : v;
                            if (n && n(v, y, a, u), r)
                                for (l = m(y, h), r(l, [], a, u), c = l.length; c--;)(f = l[c]) && (y[h[c]] = !(v[h[c]] = f));
                            if (i) {
                                if (o || e) {
                                    if (o) {
                                        for (l = [], c = y.length; c--;)(f = y[c]) && l.push(v[c] = f);
                                        o(null, y = [], l, u)
                                    }
                                    for (c = y.length; c--;)(f = y[c]) && (l = o ? nt.call(i, f) : p[c]) > -1 && (i[l] = !(s[l] = f))
                                }
                            } else y = m(y === s ? y.splice(d, y.length) : y),
                                o ? o(null, s, y, u) : et.apply(s, y)
                        })
                }

                function y(e) {
                    for (var t, n, r, i = e.length,
                        o = E.relative[e[0].type], s = o || E.relative[" "], a = o ? 1 : 0, u = d(function (e) {
                                return e === t
                            },
                            s, !0), l = d(function (e) {
                                return nt.call(t, e) > -1
                            },
                            s, !0), c = [
                            function (e, n, r) {
                                return !o && (r || n !== $) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r))
                            }
                        ]; i > a; a++)
                        if (n = E.relative[e[a].type]) c = [d(g(c), n)];
                        else {
                            if (n = E.filter[e[a].type].apply(null, e[a].matches), n[R]) {
                                for (r = ++a; i > r && !E.relative[e[r].type]; r++);
                                return v(a > 1 && g(c), a > 1 && h(e.slice(0, a - 1).concat({
                                    value: " " === e[a - 2].type ? "*" : ""
                                })).replace(ct, "$1"), n, r > a && y(e.slice(a, r)), i > r && y(e = e.slice(r)), i > r && h(e))
                            }
                            c.push(n)
                        }
                    return g(c)
                }

                function b(e, t) {
                    var r = 0,
                        o = t.length > 0,
                        s = e.length > 0,
                        a = function (i, a, u, l, c) {
                            var f, p, h, d = [],
                                g = 0,
                                v = "0",
                                y = i && [],
                                b = null != c,
                                x = $,
                                w = i || s && E.find.TAG("*", c && a.parentNode || a),
                                T = B += null == x ? 1 : Math.random() || .1;
                            for (b && ($ = a !== q && a, k = r); null != (f = w[v]); v++) {
                                if (s && f) {
                                    for (p = 0; h = e[p++];)
                                        if (h(f, a, u)) {
                                            l.push(f);
                                            break
                                        }
                                    b && (B = T, k = ++r)
                                }
                                o && ((f = !h && f) && g--, i && y.push(f))
                            }
                            if (g += v, o && v !== g) {
                                for (p = 0; h = t[p++];) h(y, d, a, u);
                                if (i) {
                                    if (g > 0)
                                        for (; v--;) y[v] || d[v] || (d[v] = K.call(l));
                                    d = m(d)
                                }
                                et.apply(l, d),
                                    b && !i && d.length > 0 && g + t.length > 1 && n.uniqueSort(l)
                            }
                            return b && (B = T, $ = x),
                                y
                        };
                    return o ? i(a) : a
                }

                function x(e, t, r) {
                    for (var i = 0,
                        o = t.length; o > i; i++) n(e, t[i], r);
                    return r
                }

                function w(e, t, n, r) {
                    var i, o, s, a, u, l = p(e);
                    if (!r && 1 === l.length) {
                        if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && C.getById && 9 === t.nodeType && L && E.relative[o[1].type]) {
                            if (t = (E.find.ID(s.matches[0].replace(Ct, kt), t) || [])[0], !t) return n;
                            e = e.slice(o.shift().value.length)
                        }
                        for (i = vt.needsContext.test(e) ? 0 : o.length; i-- && (s = o[i], !E.relative[a = s.type]);)
                            if ((u = E.find[a]) && (r = u(s.matches[0].replace(Ct, kt), ht.test(o[0].type) && t.parentNode || t))) {
                                if (o.splice(i, 1), e = r.length && h(o), !e) return et.apply(n, r),
                                    n;
                                break
                            }
                    }
                    return A(e, l)(r, t, !L, n, ht.test(e)),
                        n
                }
                var T, C, k, E, S, j, A, $, N, D, q, O, L, P, M, F, H, R = "sizzle" + -new Date,
                    _ = e.document,
                    B = 0,
                    W = 0,
                    I = r(),
                    U = r(),
                    z = r(),
                    Q = !1,
                    X = function (e, t) {
                        return e === t ? (Q = !0, 0) : 0
                    },
                    Y = typeof t,
                    V = 1 << 31,
                    G = {}.hasOwnProperty,
                    J = [],
                    K = J.pop,
                    Z = J.push,
                    et = J.push,
                    tt = J.slice,
                    nt = J.indexOf ||
                    function (e) {
                        for (var t = 0,
                            n = this.length; n > t; t++)
                            if (this[t] === e) return t;
                        return -1
                    },
                    rt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    it = "[\\x20\\t\\r\\n\\f]",
                    st = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    at = st.replace("w", "w#"),
                    ut = "\\[" + it + "*(" + st + ")" + it + "*(?:([*^$|!~]?=)" + it + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + at + ")|)|)" + it + "*\\]",
                    lt = ":(" + st + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ut.replace(3, 8) + ")*)|.*)\\)|)",
                    ct = new RegExp("^" + it + "+|((?:^|[^\\\\])(?:\\\\.)*)" + it + "+$", "g"),
                    ft = new RegExp("^" + it + "*," + it + "*"),
                    pt = new RegExp("^" + it + "*([>+~]|" + it + ")" + it + "*"),
                    ht = new RegExp(it + "*[+~]"),
                    dt = new RegExp("=" + it + "*([^\\]'\"]*)" + it + "*\\]", "g"),
                    gt = new RegExp(lt),
                    mt = new RegExp("^" + at + "$"),
                    vt = {
                        ID: new RegExp("^#(" + st + ")"),
                        CLASS: new RegExp("^\\.(" + st + ")"),
                        TAG: new RegExp("^(" + st.replace("w", "w*") + ")"),
                        ATTR: new RegExp("^" + ut),
                        PSEUDO: new RegExp("^" + lt),
                        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + it + "*(even|odd|(([+-]|)(\\d*)n|)" + it + "*(?:([+-]|)" + it + "*(\\d+)|))" + it + "*\\)|)", "i"),
                        bool: new RegExp("^(?:" + rt + ")$", "i"),
                        needsContext: new RegExp("^" + it + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + it + "*((?:-\\d)?\\d*)" + it + "*\\)|)(?=[^-]|$)", "i")
                    },
                    yt = /^[^{]+\{\s*\[native \w/,
                    bt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    xt = /^(?:input|select|textarea|button)$/i,
                    wt = /^h\d$/i,
                    Tt = /'|\\/g,
                    Ct = new RegExp("\\\\([\\da-f]{1,6}" + it + "?|(" + it + ")|.)", "ig"),
                    kt = function (e, t, n) {
                        var r = "0x" + t - 65536;
                        return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
                    };
                try {
                    et.apply(J = tt.call(_.childNodes), _.childNodes),
                        J[_.childNodes.length].nodeType
                } catch (Et) {
                    et = {
                        apply: J.length ?
                            function (e, t) {
                                Z.apply(e, tt.call(t))
                            } : function (e, t) {
                                for (var n = e.length,
                                    r = 0; e[n++] = t[r++];);
                                e.length = n - 1
                            }
                    }
                }
                j = n.isXML = function (e) {
                        var t = e && (e.ownerDocument || e).documentElement;
                        return t ? "HTML" !== t.nodeName : !1
                    },
                    C = n.support = {},
                    D = n.setDocument = function (e) {
                        var t = e ? e.ownerDocument || e : _,
                            n = t.defaultView;
                        return t !== q && 9 === t.nodeType && t.documentElement ? (q = t, O = t.documentElement, L = !j(t), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload",
                                function () {
                                    D()
                                }), C.attributes = o(function (e) {
                                return e.className = "i", !e.getAttribute("className")
                            }), C.getElementsByTagName = o(function (e) {
                                return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
                            }), C.getElementsByClassName = o(function (e) {
                                return e.innerHTML = "<div class='a'></div><div class='a i'></div>",
                                    e.firstChild.className = "i",
                                    2 === e.getElementsByClassName("i").length
                            }), C.getById = o(function (e) {
                                return O.appendChild(e).id = R, !t.getElementsByName || !t.getElementsByName(R).length
                            }), C.getById ? (E.find.ID = function (e, t) {
                                    if (typeof t.getElementById !== Y && L) {
                                        var n = t.getElementById(e);
                                        return n && n.parentNode ? [n] : []
                                    }
                                },
                                E.filter.ID = function (e) {
                                    var t = e.replace(Ct, kt);
                                    return function (e) {
                                        return e.getAttribute("id") === t
                                    }
                                }) : (delete E.find.ID, E.filter.ID = function (e) {
                                var t = e.replace(Ct, kt);
                                return function (e) {
                                    var n = typeof e.getAttributeNode !== Y && e.getAttributeNode("id");
                                    return n && n.value === t
                                }
                            }), E.find.TAG = C.getElementsByTagName ?
                            function (e, t) {
                                return typeof t.getElementsByTagName !== Y ? t.getElementsByTagName(e) : void 0
                            } : function (e, t) {
                                var n, r = [],
                                    i = 0,
                                    o = t.getElementsByTagName(e);
                                if ("*" === e) {
                                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                                    return r
                                }
                                return o
                            },
                            E.find.CLASS = C.getElementsByClassName &&
                            function (e, t) {
                                return typeof t.getElementsByClassName !== Y && L ? t.getElementsByClassName(e) : void 0
                            },
                            M = [], P = [], (C.qsa = yt.test(t.querySelectorAll)) && (o(function (e) {
                                e.innerHTML = "<select><option selected=''></option></select>",
                                    e.querySelectorAll("[selected]").length || P.push("\\[" + it + "*(?:value|" + rt + ")"),
                                    e.querySelectorAll(":checked").length || P.push(":checked")
                            }), o(function (e) {
                                var n = t.createElement("input");
                                n.setAttribute("type", "hidden"),
                                    e.appendChild(n).setAttribute("t", ""),
                                    e.querySelectorAll("[t^='']").length && P.push("[*^$]=" + it + "*(?:''|\"\")"),
                                    e.querySelectorAll(":enabled").length || P.push(":enabled", ":disabled"),
                                    e.querySelectorAll("*,:x"),
                                    P.push(",.*:")
                            })), (C.matchesSelector = yt.test(F = O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) && o(function (e) {
                                C.disconnectedMatch = F.call(e, "div"),
                                    F.call(e, "[s!='']:x"),
                                    M.push("!=", lt)
                            }), P = P.length && new RegExp(P.join("|")), M = M.length && new RegExp(M.join("|")), H = yt.test(O.contains) || O.compareDocumentPosition ?
                            function (e, t) {
                                var n = 9 === e.nodeType ? e.documentElement : e,
                                    r = t && t.parentNode;
                                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                            } : function (e, t) {
                                if (t)
                                    for (; t = t.parentNode;)
                                        if (t === e) return !0;
                                return !1
                            },
                            X = O.compareDocumentPosition ?
                            function (e, n) {
                                if (e === n) return Q = !0,
                                    0;
                                var r = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
                                return r ? 1 & r || !C.sortDetached && n.compareDocumentPosition(e) === r ? e === t || H(_, e) ? -1 : n === t || H(_, n) ? 1 : N ? nt.call(N, e) - nt.call(N, n) : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
                            } : function (e, n) {
                                var r, i = 0,
                                    o = e.parentNode,
                                    s = n.parentNode,
                                    u = [e],
                                    l = [n];
                                if (e === n) return Q = !0,
                                    0;
                                if (!o || !s) return e === t ? -1 : n === t ? 1 : o ? -1 : s ? 1 : N ? nt.call(N, e) - nt.call(N, n) : 0;
                                if (o === s) return a(e, n);
                                for (r = e; r = r.parentNode;) u.unshift(r);
                                for (r = n; r = r.parentNode;) l.unshift(r);
                                for (; u[i] === l[i];) i++;
                                return i ? a(u[i], l[i]) : u[i] === _ ? -1 : l[i] === _ ? 1 : 0
                            },
                            t) : q
                    },
                    n.matches = function (e, t) {
                        return n(e, null, null, t)
                    },
                    n.matchesSelector = function (e, t) {
                        if ((e.ownerDocument || e) !== q && D(e), t = t.replace(dt, "='$1']"), !(!C.matchesSelector || !L || M && M.test(t) || P && P.test(t))) try {
                            var r = F.call(e, t);
                            if (r || C.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
                        } catch (i) {}
                        return n(t, q, null, [e]).length > 0
                    },
                    n.contains = function (e, t) {
                        return (e.ownerDocument || e) !== q && D(e),
                            H(e, t)
                    },
                    n.attr = function (e, n) {
                        (e.ownerDocument || e) !== q && D(e);
                        var r = E.attrHandle[n.toLowerCase()],
                            i = r && G.call(E.attrHandle, n.toLowerCase()) ? r(e, n, !L) : t;
                        return i === t ? C.attributes || !L ? e.getAttribute(n) : (i = e.getAttributeNode(n)) && i.specified ? i.value : null : i
                    },
                    n.error = function (e) {
                        throw new Error("Syntax error, unrecognized expression: " + e)
                    },
                    n.uniqueSort = function (e) {
                        var t, n = [],
                            r = 0,
                            i = 0;
                        if (Q = !C.detectDuplicates, N = !C.sortStable && e.slice(0), e.sort(X), Q) {
                            for (; t = e[i++];) t === e[i] && (r = n.push(i));
                            for (; r--;) e.splice(n[r], 1)
                        }
                        return e
                    },
                    S = n.getText = function (e) {
                        var t, n = "",
                            r = 0,
                            i = e.nodeType;
                        if (i) {
                            if (1 === i || 9 === i || 11 === i) {
                                if ("string" == typeof e.textContent) return e.textContent;
                                for (e = e.firstChild; e; e = e.nextSibling) n += S(e)
                            } else if (3 === i || 4 === i) return e.nodeValue
                        } else
                            for (; t = e[r]; r++) n += S(t);
                        return n
                    },
                    E = n.selectors = {
                        cacheLength: 50,
                        createPseudo: i,
                        match: vt,
                        attrHandle: {},
                        find: {},
                        relative: {
                            ">": {
                                dir: "parentNode",
                                first: !0
                            },
                            " ": {
                                dir: "parentNode"
                            },
                            "+": {
                                dir: "previousSibling",
                                first: !0
                            },
                            "~": {
                                dir: "previousSibling"
                            }
                        },
                        preFilter: {
                            ATTR: function (e) {
                                    return e[1] = e[1].replace(Ct, kt),
                                        e[3] = (e[4] || e[5] || "").replace(Ct, kt),
                                        "~=" === e[2] && (e[3] = " " + e[3] + " "),
                                        e.slice(0, 4)
                                },
                                CHILD: function (e) {
                                    return e[1] = e[1].toLowerCase(),
                                        "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]),
                                        e
                                },
                                PSEUDO: function (e) {
                                    var n, r = !e[5] && e[2];
                                    return vt.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && gt.test(r) && (n = p(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3))
                                }
                        },
                        filter: {
                            TAG: function (e) {
                                    var t = e.replace(Ct, kt).toLowerCase();
                                    return "*" === e ?
                                        function () {
                                            return !0
                                        } : function (e) {
                                            return e.nodeName && e.nodeName.toLowerCase() === t
                                        }
                                },
                                CLASS: function (e) {
                                    var t = I[e + " "];
                                    return t || (t = new RegExp("(^|" + it + ")" + e + "(" + it + "|$)")) && I(e,
                                        function (e) {
                                            return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== Y && e.getAttribute("class") || "")
                                        })
                                },
                                ATTR: function (e, t, r) {
                                    return function (i) {
                                        var o = n.attr(i, e);
                                        return null == o ? "!=" === t : t ? (o += "", "=" === t ? o === r : "!=" === t ? o !== r : "^=" === t ? r && 0 === o.indexOf(r) : "*=" === t ? r && o.indexOf(r) > -1 : "$=" === t ? r && o.slice(-r.length) === r : "~=" === t ? (" " + o + " ").indexOf(r) > -1 : "|=" === t ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
                                    }
                                },
                                CHILD: function (e, t, n, r, i) {
                                    var o = "nth" !== e.slice(0, 3),
                                        s = "last" !== e.slice(-4),
                                        a = "of-type" === t;
                                    return 1 === r && 0 === i ?
                                        function (e) {
                                            return !!e.parentNode
                                        } : function (t, n, u) {
                                            var l, c, f, p, h, d, g = o !== s ? "nextSibling" : "previousSibling",
                                                m = t.parentNode,
                                                v = a && t.nodeName.toLowerCase(),
                                                y = !u && !a;
                                            if (m) {
                                                if (o) {
                                                    for (; g;) {
                                                        for (f = t; f = f[g];)
                                                            if (a ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                                        d = g = "only" === e && !d && "nextSibling"
                                                    }
                                                    return !0
                                                }
                                                if (d = [s ? m.firstChild : m.lastChild], s && y) {
                                                    for (c = m[R] || (m[R] = {}), l = c[e] || [], h = l[0] === B && l[1], p = l[0] === B && l[2], f = h && m.childNodes[h]; f = ++h && f && f[g] || (p = h = 0) || d.pop();)
                                                        if (1 === f.nodeType && ++p && f === t) {
                                                            c[e] = [B, h, p];
                                                            break
                                                        }
                                                } else if (y && (l = (t[R] || (t[R] = {}))[e]) && l[0] === B) p = l[1];
                                                else
                                                    for (;
                                                        (f = ++h && f && f[g] || (p = h = 0) || d.pop()) && ((a ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++p || (y && ((f[R] || (f[R] = {}))[e] = [B, p]), f !== t)););
                                                return p -= i,
                                                    p === r || p % r === 0 && p / r >= 0
                                            }
                                        }
                                },
                                PSEUDO: function (e, t) {
                                    var r, o = E.pseudos[e] || E.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
                                    return o[R] ? o(t) : o.length > 1 ? (r = [e, e, "", t], E.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, n) {
                                        for (var r, i = o(e, t), s = i.length; s--;) r = nt.call(e, i[s]),
                                            e[r] = !(n[r] = i[s])
                                    }) : function (e) {
                                        return o(e, 0, r)
                                    }) : o
                                }
                        },
                        pseudos: {
                            not: i(function (e) {
                                var t = [],
                                    n = [],
                                    r = A(e.replace(ct, "$1"));
                                return r[R] ? i(function (e, t, n, i) {
                                    for (var o, s = r(e, null, i, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
                                }) : function (e, i, o) {
                                    return t[0] = e,
                                        r(t, null, o, n), !n.pop()
                                }
                            }),
                            has: i(function (e) {
                                return function (t) {
                                    return n(e, t).length > 0
                                }
                            }),
                            contains: i(function (e) {
                                return function (t) {
                                    return (t.textContent || t.innerText || S(t)).indexOf(e) > -1
                                }
                            }),
                            lang: i(function (e) {
                                return mt.test(e || "") || n.error("unsupported lang: " + e),
                                    e = e.replace(Ct, kt).toLowerCase(),
                                    function (t) {
                                        var n;
                                        do
                                            if (n = L ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(),
                                                n === e || 0 === n.indexOf(e + "-");
                                        while ((t = t.parentNode) && 1 === t.nodeType);
                                        return !1
                                    }
                            }),
                            target: function (t) {
                                    var n = e.location && e.location.hash;
                                    return n && n.slice(1) === t.id
                                },
                                root: function (e) {
                                    return e === O
                                },
                                focus: function (e) {
                                    return e === q.activeElement && (!q.hasFocus || q.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                                },
                                enabled: function (e) {
                                    return e.disabled === !1
                                },
                                disabled: function (e) {
                                    return e.disabled === !0
                                },
                                checked: function (e) {
                                    var t = e.nodeName.toLowerCase();
                                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                                },
                                selected: function (e) {
                                    return e.parentNode && e.parentNode.selectedIndex,
                                        e.selected === !0
                                },
                                empty: function (e) {
                                    for (e = e.firstChild; e; e = e.nextSibling)
                                        if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                                    return !0
                                },
                                parent: function (e) {
                                    return !E.pseudos.empty(e)
                                },
                                header: function (e) {
                                    return wt.test(e.nodeName)
                                },
                                input: function (e) {
                                    return xt.test(e.nodeName)
                                },
                                button: function (e) {
                                    var t = e.nodeName.toLowerCase();
                                    return "input" === t && "button" === e.type || "button" === t
                                },
                                text: function (e) {
                                    var t;
                                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                                },
                                first: c(function () {
                                    return [0]
                                }),
                            last: c(function (e, t) {
                                return [t - 1]
                            }),
                            eq: c(function (e, t, n) {
                                return [0 > n ? n + t : n]
                            }),
                            even: c(function (e, t) {
                                for (var n = 0; t > n; n += 2) e.push(n);
                                return e
                            }),
                            odd: c(function (e, t) {
                                for (var n = 1; t > n; n += 2) e.push(n);
                                return e
                            }),
                            lt: c(function (e, t, n) {
                                for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                                return e
                            }),
                            gt: c(function (e, t, n) {
                                for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                                return e
                            })
                        }
                    },
                    E.pseudos.nth = E.pseudos.eq;
                for (T in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) E.pseudos[T] = u(T);
                for (T in {
                    submit: !0,
                    reset: !0
                }) E.pseudos[T] = l(T);
                f.prototype = E.filters = E.pseudos,
                    E.setFilters = new f,
                    A = n.compile = function (e, t) {
                        var n, r = [],
                            i = [],
                            o = z[e + " "];
                        if (!o) {
                            for (t || (t = p(e)), n = t.length; n--;) o = y(t[n]),
                                o[R] ? r.push(o) : i.push(o);
                            o = z(e, b(i, r))
                        }
                        return o
                    },
                    C.sortStable = R.split("").sort(X).join("") === R,
                    C.detectDuplicates = Q,
                    D(),
                    C.sortDetached = o(function (e) {
                        return 1 & e.compareDocumentPosition(q.createElement("div"))
                    }),
                    o(function (e) {
                        return e.innerHTML = "<a href='#'></a>",
                            "#" === e.firstChild.getAttribute("href")
                    }) || s("type|href|height|width",
                        function (e, t, n) {
                            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
                        }),
                    C.attributes && o(function (e) {
                        return e.innerHTML = "<input/>",
                            e.firstChild.setAttribute("value", ""),
                            "" === e.firstChild.getAttribute("value")
                    }) || s("value",
                        function (e, t, n) {
                            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
                        }),
                    o(function (e) {
                        return null == e.getAttribute("disabled")
                    }) || s(rt,
                        function (e, t, n) {
                            var r;
                            return n ? void 0 : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null
                        }),
                    ot.find = n,
                    ot.expr = n.selectors,
                    ot.expr[":"] = ot.expr.pseudos,
                    ot.unique = n.uniqueSort,
                    ot.text = n.getText,
                    ot.isXMLDoc = n.isXML,
                    ot.contains = n.contains
            }(e);
        var dt = {};
        ot.Callbacks = function (e) {
                e = "string" == typeof e ? dt[e] || r(e) : ot.extend({},
                    e);
                var n, i, o, s, a, u, l = [],
                    c = !e.once && [],
                    f = function (t) {
                        for (n = e.memory && t, i = !0, u = s || 0, s = 0, a = l.length, o = !0; l && a > u; u++)
                            if (l[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                                n = !1;
                                break
                            }
                        o = !1,
                            l && (c ? c.length && f(c.shift()) : n ? l = [] : p.disable())
                    },
                    p = {
                        add: function () {
                                if (l) {
                                    var t = l.length;
                                    !
                                    function r(t) {
                                            ot.each(t,
                                                function (t, n) {
                                                    var i = ot.type(n);
                                                    "function" === i ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== i && r(n)
                                                })
                                        }(arguments),
                                        o ? a = l.length : n && (s = t, f(n))
                                }
                                return this
                            },
                            remove: function () {
                                return l && ot.each(arguments,
                                        function (e, t) {
                                            for (var n;
                                                (n = ot.inArray(t, l, n)) > -1;) l.splice(n, 1),
                                                o && (a >= n && a--, u >= n && u--)
                                        }),
                                    this
                            },
                            has: function (e) {
                                return e ? ot.inArray(e, l) > -1 : !(!l || !l.length)
                            },
                            empty: function () {
                                return l = [],
                                    a = 0,
                                    this
                            },
                            disable: function () {
                                return l = c = n = t,
                                    this
                            },
                            disabled: function () {
                                return !l
                            },
                            lock: function () {
                                return c = t,
                                    n || p.disable(),
                                    this
                            },
                            locked: function () {
                                return !c
                            },
                            fireWith: function (e, t) {
                                return !l || i && !c || (t = t || [], t = [e, t.slice ? t.slice() : t], o ? c.push(t) : f(t)),
                                    this
                            },
                            fire: function () {
                                return p.fireWith(this, arguments),
                                    this
                            },
                            fired: function () {
                                return !!i
                            }
                    };
                return p
            },
            ot.extend({
                Deferred: function (e) {
                        var t = [
                                ["resolve", "done", ot.Callbacks("once memory"), "resolved"],
                                ["reject", "fail", ot.Callbacks("once memory"), "rejected"],
                                ["notify", "progress", ot.Callbacks("memory")]
                            ],
                            n = "pending",
                            r = {
                                state: function () {
                                        return n
                                    },
                                    always: function () {
                                        return i.done(arguments).fail(arguments),
                                            this
                                    },
                                    then: function () {
                                        var e = arguments;
                                        return ot.Deferred(function (n) {
                                            ot.each(t,
                                                    function (t, o) {
                                                        var s = o[0],
                                                            a = ot.isFunction(e[t]) && e[t];
                                                        i[o[1]](function () {
                                                            var e = a && a.apply(this, arguments);
                                                            e && ot.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                                        })
                                                    }),
                                                e = null
                                        }).promise()
                                    },
                                    promise: function (e) {
                                        return null != e ? ot.extend(e, r) : r
                                    }
                            },
                            i = {};
                        return r.pipe = r.then,
                            ot.each(t,
                                function (e, o) {
                                    var s = o[2],
                                        a = o[3];
                                    r[o[1]] = s.add,
                                        a && s.add(function () {
                                                n = a
                                            },
                                            t[1 ^ e][2].disable, t[2][2].lock),
                                        i[o[0]] = function () {
                                            return i[o[0] + "With"](this === i ? r : this, arguments),
                                                this
                                        },
                                        i[o[0] + "With"] = s.fireWith
                                }),
                            r.promise(i),
                            e && e.call(i, i),
                            i
                    },
                    when: function (e) {
                        var t, n, r, i = 0,
                            o = et.call(arguments),
                            s = o.length,
                            a = 1 !== s || e && ot.isFunction(e.promise) ? s : 0,
                            u = 1 === a ? e : ot.Deferred(),
                            l = function (e, n, r) {
                                return function (i) {
                                    n[e] = this,
                                        r[e] = arguments.length > 1 ? et.call(arguments) : i,
                                        r === t ? u.notifyWith(n, r) : --a || u.resolveWith(n, r)
                                }
                            };
                        if (s > 1)
                            for (t = new Array(s), n = new Array(s), r = new Array(s); s > i; i++) o[i] && ot.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --a;
                        return a || u.resolveWith(r, o),
                            u.promise()
                    }
            }),
            ot.support = function (t) {
                var n = z.createElement("input"),
                    r = z.createDocumentFragment(),
                    i = z.createElement("div"),
                    o = z.createElement("select"),
                    s = o.appendChild(z.createElement("option"));
                return n.type ? (n.type = "checkbox", t.checkOn = "" !== n.value, t.optSelected = s.selected, t.reliableMarginRight = !0, t.boxSizingReliable = !0, t.pixelPosition = !1, n.checked = !0, t.noCloneChecked = n.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !s.disabled, n = z.createElement("input"), n.value = "t", n.type = "radio", t.radioValue = "t" === n.value, n.setAttribute("checked", "t"), n.setAttribute("name", "t"), r.appendChild(n), t.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked, t.focusinBubbles = "onfocusin" in e, i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === i.style.backgroundClip, ot(function () {
                    var n, r, o = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                        s = z.getElementsByTagName("body")[0];
                    s && (n = z.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(n).appendChild(i), i.innerHTML = "", i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%", ot.swap(s, null != s.style.zoom ? {
                            zoom: 1
                        } : {},
                        function () {
                            t.boxSizing = 4 === i.offsetWidth
                        }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
                        width: "4px"
                    }).width, r = i.appendChild(z.createElement("div")), r.style.cssText = i.style.cssText = o, r.style.marginRight = r.style.width = "0", i.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), s.removeChild(n))
                }), t) : t
            }({});
        var gt, mt, vt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            yt = /([A-Z])/g;
        i.uid = 1,
            i.accepts = function (e) {
                return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0
            },
            i.prototype = {
                key: function (e) {
                        if (!i.accepts(e)) return 0;
                        var t = {},
                            n = e[this.expando];
                        if (!n) {
                            n = i.uid++;
                            try {
                                t[this.expando] = {
                                        value: n
                                    },
                                    Object.defineProperties(e, t)
                            } catch (r) {
                                t[this.expando] = n,
                                    ot.extend(e, t)
                            }
                        }
                        return this.cache[n] || (this.cache[n] = {}),
                            n
                    },
                    set: function (e, t, n) {
                        var r, i = this.key(e),
                            o = this.cache[i];
                        if ("string" == typeof t) o[t] = n;
                        else if (ot.isEmptyObject(o)) ot.extend(this.cache[i], t);
                        else
                            for (r in t) o[r] = t[r];
                        return o
                    },
                    get: function (e, n) {
                        var r = this.cache[this.key(e)];
                        return n === t ? r : r[n]
                    },
                    access: function (e, n, r) {
                        var i;
                        return n === t || n && "string" == typeof n && r === t ? (i = this.get(e, n), i !== t ? i : this.get(e, ot.camelCase(n))) : (this.set(e, n, r), r !== t ? r : n)
                    },
                    remove: function (e, n) {
                        var r, i, o, s = this.key(e),
                            a = this.cache[s];
                        if (n === t) this.cache[s] = {};
                        else {
                            ot.isArray(n) ? i = n.concat(n.map(ot.camelCase)) : (o = ot.camelCase(n), n in a ? i = [n, o] : (i = o, i = i in a ? [i] : i.match(at) || [])),
                                r = i.length;
                            for (; r--;) delete a[i[r]]
                        }
                    },
                    hasData: function (e) {
                        return !ot.isEmptyObject(this.cache[e[this.expando]] || {})
                    },
                    discard: function (e) {
                        e[this.expando] && delete this.cache[e[this.expando]]
                    }
            },
            gt = new i,
            mt = new i,
            ot.extend({
                acceptData: i.accepts,
                hasData: function (e) {
                        return gt.hasData(e) || mt.hasData(e)
                    },
                    data: function (e, t, n) {
                        return gt.access(e, t, n)
                    },
                    removeData: function (e, t) {
                        gt.remove(e, t)
                    },
                    _data: function (e, t, n) {
                        return mt.access(e, t, n)
                    },
                    _removeData: function (e, t) {
                        mt.remove(e, t)
                    }
            }),
            ot.fn.extend({
                data: function (e, n) {
                        var r, i, s = this[0],
                            a = 0,
                            u = null;
                        if (e === t) {
                            if (this.length && (u = gt.get(s), 1 === s.nodeType && !mt.get(s, "hasDataAttrs"))) {
                                for (r = s.attributes; a < r.length; a++) i = r[a].name,
                                    0 === i.indexOf("data-") && (i = ot.camelCase(i.slice(5)), o(s, i, u[i]));
                                mt.set(s, "hasDataAttrs", !0)
                            }
                            return u
                        }
                        return "object" == typeof e ? this.each(function () {
                            gt.set(this, e)
                        }) : ot.access(this,
                            function (n) {
                                var r, i = ot.camelCase(e);
                                if (s && n === t) {
                                    if (r = gt.get(s, e), r !== t) return r;
                                    if (r = gt.get(s, i), r !== t) return r;
                                    if (r = o(s, i, t), r !== t) return r
                                } else this.each(function () {
                                    var r = gt.get(this, i);
                                    gt.set(this, i, n), -1 !== e.indexOf("-") && r !== t && gt.set(this, e, n)
                                })
                            },
                            null, n, arguments.length > 1, null, !0)
                    },
                    removeData: function (e) {
                        return this.each(function () {
                            gt.remove(this, e)
                        })
                    }
            }),
            ot.extend({
                queue: function (e, t, n) {
                        var r;
                        return e ? (t = (t || "fx") + "queue", r = mt.get(e, t), n && (!r || ot.isArray(n) ? r = mt.access(e, t, ot.makeArray(n)) : r.push(n)), r || []) : void 0
                    },
                    dequeue: function (e, t) {
                        t = t || "fx";
                        var n = ot.queue(e, t),
                            r = n.length,
                            i = n.shift(),
                            o = ot._queueHooks(e, t),
                            s = function () {
                                ot.dequeue(e, t)
                            };
                        "inprogress" === i && (i = n.shift(), r--),
                            i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)), !r && o && o.empty.fire()
                    },
                    _queueHooks: function (e, t) {
                        var n = t + "queueHooks";
                        return mt.get(e, n) || mt.access(e, n, {
                            empty: ot.Callbacks("once memory").add(function () {
                                mt.remove(e, [t + "queue", n])
                            })
                        })
                    }
            }),
            ot.fn.extend({
                queue: function (e, n) {
                        var r = 2;
                        return "string" != typeof e && (n = e, e = "fx", r--),
                            arguments.length < r ? ot.queue(this[0], e) : n === t ? this : this.each(function () {
                                var t = ot.queue(this, e, n);
                                ot._queueHooks(this, e),
                                    "fx" === e && "inprogress" !== t[0] && ot.dequeue(this, e)
                            })
                    },
                    dequeue: function (e) {
                        return this.each(function () {
                            ot.dequeue(this, e)
                        })
                    },
                    delay: function (e, t) {
                        return e = ot.fx ? ot.fx.speeds[e] || e : e,
                            t = t || "fx",
                            this.queue(t,
                                function (t, n) {
                                    var r = setTimeout(t, e);
                                    n.stop = function () {
                                        clearTimeout(r)
                                    }
                                })
                    },
                    clearQueue: function (e) {
                        return this.queue(e || "fx", [])
                    },
                    promise: function (e, n) {
                        var r, i = 1,
                            o = ot.Deferred(),
                            s = this,
                            a = this.length,
                            u = function () {
                                --i || o.resolveWith(s, [s])
                            };
                        for ("string" != typeof e && (n = e, e = t), e = e || "fx"; a--;) r = mt.get(s[a], e + "queueHooks"),
                            r && r.empty && (i++, r.empty.add(u));
                        return u(),
                            o.promise(n)
                    }
            });
        var bt, xt, wt = /[\t\r\n\f]/g,
            Tt = /\r/g,
            Ct = /^(?:input|select|textarea|button)$/i;
        ot.fn.extend({
                attr: function (e, t) {
                        return ot.access(this, ot.attr, e, t, arguments.length > 1)
                    },
                    removeAttr: function (e) {
                        return this.each(function () {
                            ot.removeAttr(this, e)
                        })
                    },
                    prop: function (e, t) {
                        return ot.access(this, ot.prop, e, t, arguments.length > 1)
                    },
                    removeProp: function (e) {
                        return this.each(function () {
                            delete this[ot.propFix[e] || e]
                        })
                    },
                    addClass: function (e) {
                        var t, n, r, i, o, s = 0,
                            a = this.length,
                            u = "string" == typeof e && e;
                        if (ot.isFunction(e)) return this.each(function (t) {
                            ot(this).addClass(e.call(this, t, this.className))
                        });
                        if (u)
                            for (t = (e || "").match(at) || []; a > s; s++)
                                if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(wt, " ") : " ")) {
                                    for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                                    n.className = ot.trim(r)
                                }
                        return this
                    },
                    removeClass: function (e) {
                        var t, n, r, i, o, s = 0,
                            a = this.length,
                            u = 0 === arguments.length || "string" == typeof e && e;
                        if (ot.isFunction(e)) return this.each(function (t) {
                            ot(this).removeClass(e.call(this, t, this.className))
                        });
                        if (u)
                            for (t = (e || "").match(at) || []; a > s; s++)
                                if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(wt, " ") : "")) {
                                    for (o = 0; i = t[o++];)
                                        for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                                    n.className = e ? ot.trim(r) : ""
                                }
                        return this
                    },
                    toggleClass: function (e, t) {
                        var n = typeof e;
                        return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(ot.isFunction(e) ?
                            function (n) {
                                ot(this).toggleClass(e.call(this, n, this.className, t), t)
                            } : function () {
                                if ("string" === n)
                                    for (var t, r = 0,
                                        i = ot(this), o = e.match(at) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                                else(n === I || "boolean" === n) && (this.className && mt.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : mt.get(this, "__className__") || "")
                            })
                    },
                    hasClass: function (e) {
                        for (var t = " " + e + " ",
                            n = 0,
                            r = this.length; r > n; n++)
                            if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(wt, " ").indexOf(t) >= 0) return !0;
                        return !1
                    },
                    val: function (e) {
                        var n, r, i, o = this[0]; {
                            if (arguments.length) return i = ot.isFunction(e),
                                this.each(function (r) {
                                    var o;
                                    1 === this.nodeType && (o = i ? e.call(this, r, ot(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : ot.isArray(o) && (o = ot.map(o,
                                        function (e) {
                                            return null == e ? "" : e + ""
                                        })), n = ot.valHooks[this.type] || ot.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, o, "value") !== t || (this.value = o))
                                });
                            if (o) return n = ot.valHooks[o.type] || ot.valHooks[o.nodeName.toLowerCase()],
                                n && "get" in n && (r = n.get(o, "value")) !== t ? r : (r = o.value, "string" == typeof r ? r.replace(Tt, "") : null == r ? "" : r)
                        }
                    }
            }),
            ot.extend({
                valHooks: {
                    option: {
                        get: function (e) {
                            var t = e.attributes.value;
                            return !t || t.specified ? e.value : e.text
                        }
                    },
                    select: {
                        get: function (e) {
                                for (var t, n, r = e.options,
                                    i = e.selectedIndex,
                                    o = "select-one" === e.type || 0 > i,
                                    s = o ? null : [], a = o ? i + 1 : r.length, u = 0 > i ? a : o ? i : 0; a > u; u++)
                                    if (n = r[u], !(!n.selected && u !== i || (ot.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ot.nodeName(n.parentNode, "optgroup"))) {
                                        if (t = ot(n).val(), o) return t;
                                        s.push(t)
                                    }
                                return s
                            },
                            set: function (e, t) {
                                for (var n, r, i = e.options,
                                    o = ot.makeArray(t), s = i.length; s--;) r = i[s], (r.selected = ot.inArray(ot(r).val(), o) >= 0) && (n = !0);
                                return n || (e.selectedIndex = -1),
                                    o
                            }
                    }
                },
                attr: function (e, n, r) {
                        var i, o, s = e.nodeType;
                        if (e && 3 !== s && 8 !== s && 2 !== s) return typeof e.getAttribute === I ? ot.prop(e, n, r) : (1 === s && ot.isXMLDoc(e) || (n = n.toLowerCase(), i = ot.attrHooks[n] || (ot.expr.match.bool.test(n) ? xt : bt)), r === t ? i && "get" in i && null !== (o = i.get(e, n)) ? o : (o = ot.find.attr(e, n), null == o ? t : o) : null !== r ? i && "set" in i && (o = i.set(e, r, n)) !== t ? o : (e.setAttribute(n, r + ""), r) : void ot.removeAttr(e, n))
                    },
                    removeAttr: function (e, t) {
                        var n, r, i = 0,
                            o = t && t.match(at);
                        if (o && 1 === e.nodeType)
                            for (; n = o[i++];) r = ot.propFix[n] || n,
                                ot.expr.match.bool.test(n) && (e[r] = !1),
                                e.removeAttribute(n)
                    },
                    attrHooks: {
                        type: {
                            set: function (e, t) {
                                if (!ot.support.radioValue && "radio" === t && ot.nodeName(e, "input")) {
                                    var n = e.value;
                                    return e.setAttribute("type", t),
                                        n && (e.value = n),
                                        t
                                }
                            }
                        }
                    },
                    propFix: {
                        "for": "htmlFor",
                        "class": "className"
                    },
                    prop: function (e, n, r) {
                        var i, o, s, a = e.nodeType;
                        if (e && 3 !== a && 8 !== a && 2 !== a) return s = 1 !== a || !ot.isXMLDoc(e),
                            s && (n = ot.propFix[n] || n, o = ot.propHooks[n]),
                            r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n]
                    },
                    propHooks: {
                        tabIndex: {
                            get: function (e) {
                                return e.hasAttribute("tabindex") || Ct.test(e.nodeName) || e.href ? e.tabIndex : -1
                            }
                        }
                    }
            }),
            xt = {
                set: function (e, t, n) {
                    return t === !1 ? ot.removeAttr(e, n) : e.setAttribute(n, n),
                        n
                }
            },
            ot.each(ot.expr.match.bool.source.match(/\w+/g),
                function (e, n) {
                    var r = ot.expr.attrHandle[n] || ot.find.attr;
                    ot.expr.attrHandle[n] = function (e, n, i) {
                        var o = ot.expr.attrHandle[n],
                            s = i ? t : (ot.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null;
                        return ot.expr.attrHandle[n] = o,
                            s
                    }
                }),
            ot.support.optSelected || (ot.propHooks.selected = {
                get: function (e) {
                    var t = e.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex,
                        null
                }
            }),
            ot.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"],
                function () {
                    ot.propFix[this.toLowerCase()] = this
                }),
            ot.each(["radio", "checkbox"],
                function () {
                    ot.valHooks[this] = {
                            set: function (e, t) {
                                return ot.isArray(t) ? e.checked = ot.inArray(ot(e).val(), t) >= 0 : void 0
                            }
                        },
                        ot.support.checkOn || (ot.valHooks[this].get = function (e) {
                            return null === e.getAttribute("value") ? "on" : e.value
                        })
                });
        var kt = /^key/,
            Et = /^(?:mouse|contextmenu)|click/,
            St = /^(?:focusinfocus|focusoutblur)$/,
            jt = /^([^.]*)(?:\.(.+)|)$/;
        ot.event = {
                global: {},
                add: function (e, n, r, i, o) {
                        var s, a, u, l, c, f, p, h, d, g, m, v = mt.get(e);
                        if (v) {
                            for (r.handler && (s = r, r = s.handler, o = s.selector), r.guid || (r.guid = ot.guid++), (l = v.events) || (l = v.events = {}), (a = v.handle) || (a = v.handle = function (e) {
                                    return typeof ot === I || e && ot.event.triggered === e.type ? t : ot.event.dispatch.apply(a.elem, arguments)
                                },
                                a.elem = e), n = (n || "").match(at) || [""], c = n.length; c--;) u = jt.exec(n[c]) || [],
                                d = m = u[1],
                                g = (u[2] || "").split(".").sort(),
                                d && (p = ot.event.special[d] || {},
                                    d = (o ? p.delegateType : p.bindType) || d, p = ot.event.special[d] || {},
                                    f = ot.extend({
                                            type: d,
                                            origType: m,
                                            data: i,
                                            handler: r,
                                            guid: r.guid,
                                            selector: o,
                                            needsContext: o && ot.expr.match.needsContext.test(o),
                                            namespace: g.join(".")
                                        },
                                        s), (h = l[d]) || (h = l[d] = [], h.delegateCount = 0, p.setup && p.setup.call(e, i, g, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), p.add && (p.add.call(e, f), f.handler.guid || (f.handler.guid = r.guid)), o ? h.splice(h.delegateCount++, 0, f) : h.push(f), ot.event.global[d] = !0);
                            e = null
                        }
                    },
                    remove: function (e, t, n, r, i) {
                        var o, s, a, u, l, c, f, p, h, d, g, m = mt.hasData(e) && mt.get(e);
                        if (m && (u = m.events)) {
                            for (t = (t || "").match(at) || [""], l = t.length; l--;)
                                if (a = jt.exec(t[l]) || [], h = g = a[1], d = (a[2] || "").split(".").sort(), h) {
                                    for (f = ot.event.special[h] || {},
                                        h = (r ? f.delegateType : f.bindType) || h, p = u[h] || [], a = a[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = p.length; o--;) c = p[o], !i && g !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                                    s && !p.length && (f.teardown && f.teardown.call(e, d, m.handle) !== !1 || ot.removeEvent(e, h, m.handle), delete u[h])
                                } else
                                    for (h in u) ot.event.remove(e, h + t[l], n, r, !0);
                            ot.isEmptyObject(u) && (delete m.handle, mt.remove(e, "events"))
                        }
                    },
                    trigger: function (n, r, i, o) {
                        var s, a, u, l, c, f, p, h = [i || z],
                            d = rt.call(n, "type") ? n.type : n,
                            g = rt.call(n, "namespace") ? n.namespace.split(".") : [];
                        if (a = u = i = i || z, 3 !== i.nodeType && 8 !== i.nodeType && !St.test(d + ot.event.triggered) && (d.indexOf(".") >= 0 && (g = d.split("."), d = g.shift(), g.sort()), c = d.indexOf(":") < 0 && "on" + d, n = n[ot.expando] ? n : new ot.Event(d, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = g.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : ot.makeArray(r, [n]), p = ot.event.special[d] || {},
                            o || !p.trigger || p.trigger.apply(i, r) !== !1)) {
                            if (!o && !p.noBubble && !ot.isWindow(i)) {
                                for (l = p.delegateType || d, St.test(l + d) || (a = a.parentNode); a; a = a.parentNode) h.push(a),
                                    u = a;
                                u === (i.ownerDocument || z) && h.push(u.defaultView || u.parentWindow || e)
                            }
                            for (s = 0;
                                (a = h[s++]) && !n.isPropagationStopped();) n.type = s > 1 ? l : p.bindType || d,
                                f = (mt.get(a, "events") || {})[n.type] && mt.get(a, "handle"),
                                f && f.apply(a, r),
                                f = c && a[c],
                                f && ot.acceptData(a) && f.apply && f.apply(a, r) === !1 && n.preventDefault();
                            return n.type = d,
                                o || n.isDefaultPrevented() || p._default && p._default.apply(h.pop(), r) !== !1 || !ot.acceptData(i) || c && ot.isFunction(i[d]) && !ot.isWindow(i) && (u = i[c], u && (i[c] = null), ot.event.triggered = d, i[d](), ot.event.triggered = t, u && (i[c] = u)),
                                n.result
                        }
                    },
                    dispatch: function (e) {
                        e = ot.event.fix(e);
                        var n, r, i, o, s, a = [],
                            u = et.call(arguments),
                            l = (mt.get(this, "events") || {})[e.type] || [],
                            c = ot.event.special[e.type] || {};
                        if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                            for (a = ot.event.handlers.call(this, e, l), n = 0;
                                (o = a[n++]) && !e.isPropagationStopped();)
                                for (e.currentTarget = o.elem, r = 0;
                                    (s = o.handlers[r++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(s.namespace)) && (e.handleObj = s, e.data = s.data, i = ((ot.event.special[s.origType] || {}).handle || s.handler).apply(o.elem, u), i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                            return c.postDispatch && c.postDispatch.call(this, e),
                                e.result
                        }
                    },
                    handlers: function (e, n) {
                        var r, i, o, s, a = [],
                            u = n.delegateCount,
                            l = e.target;
                        if (u && l.nodeType && (!e.button || "click" !== e.type))
                            for (; l !== this; l = l.parentNode || this)
                                if (l.disabled !== !0 || "click" !== e.type) {
                                    for (i = [], r = 0; u > r; r++) s = n[r],
                                        o = s.selector + " ",
                                        i[o] === t && (i[o] = s.needsContext ? ot(o, this).index(l) >= 0 : ot.find(o, this, null, [l]).length),
                                        i[o] && i.push(s);
                                    i.length && a.push({
                                        elem: l,
                                        handlers: i
                                    })
                                }
                        return u < n.length && a.push({
                                elem: this,
                                handlers: n.slice(u)
                            }),
                            a
                    },
                    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function (e, t) {
                        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                            e
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function (e, n) {
                        var r, i, o, s = n.button;
                        return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || z, i = r.documentElement, o = r.body, e.pageX = n.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)),
                            e.which || s === t || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0),
                            e
                    }
                },
                fix: function (e) {
                        if (e[ot.expando]) return e;
                        var t, n, r, i = e.type,
                            o = e,
                            s = this.fixHooks[i];
                        for (s || (this.fixHooks[i] = s = Et.test(i) ? this.mouseHooks : kt.test(i) ? this.keyHooks : {}), r = s.props ? this.props.concat(s.props) : this.props, e = new ot.Event(o), t = r.length; t--;) n = r[t],
                            e[n] = o[n];
                        return e.target || (e.target = z),
                            3 === e.target.nodeType && (e.target = e.target.parentNode),
                            s.filter ? s.filter(e, o) : e
                    },
                    special: {
                        load: {
                            noBubble: !0
                        },
                        focus: {
                            trigger: function () {
                                    return this !== u() && this.focus ? (this.focus(), !1) : void 0
                                },
                                delegateType: "focusin"
                        },
                        blur: {
                            trigger: function () {
                                    return this === u() && this.blur ? (this.blur(), !1) : void 0
                                },
                                delegateType: "focusout"
                        },
                        click: {
                            trigger: function () {
                                    return "checkbox" === this.type && this.click && ot.nodeName(this, "input") ? (this.click(), !1) : void 0
                                },
                                _default: function (e) {
                                    return ot.nodeName(e.target, "a")
                                }
                        },
                        beforeunload: {
                            postDispatch: function (e) {
                                e.result !== t && (e.originalEvent.returnValue = e.result)
                            }
                        }
                    },
                    simulate: function (e, t, n, r) {
                        var i = ot.extend(new ot.Event, n, {
                            type: e,
                            isSimulated: !0,
                            originalEvent: {}
                        });
                        r ? ot.event.trigger(i, null, t) : ot.event.dispatch.call(t, i),
                            i.isDefaultPrevented() && n.preventDefault()
                    }
            },
            ot.removeEvent = function (e, t, n) {
                e.removeEventListener && e.removeEventListener(t, n, !1)
            },
            ot.Event = function (e, t) {
                return this instanceof ot.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? s : a) : this.type = e, t && ot.extend(this, t), this.timeStamp = e && e.timeStamp || ot.now(), void(this[ot.expando] = !0)) : new ot.Event(e, t)
            },
            ot.Event.prototype = {
                isDefaultPrevented: a,
                isPropagationStopped: a,
                isImmediatePropagationStopped: a,
                preventDefault: function () {
                        var e = this.originalEvent;
                        this.isDefaultPrevented = s,
                            e && e.preventDefault && e.preventDefault()
                    },
                    stopPropagation: function () {
                        var e = this.originalEvent;
                        this.isPropagationStopped = s,
                            e && e.stopPropagation && e.stopPropagation()
                    },
                    stopImmediatePropagation: function () {
                        this.isImmediatePropagationStopped = s,
                            this.stopPropagation()
                    }
            },
            ot.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                },
                function (e, t) {
                    ot.event.special[e] = {
                        delegateType: t,
                        bindType: t,
                        handle: function (e) {
                            var n, r = this,
                                i = e.relatedTarget,
                                o = e.handleObj;
                            return (!i || i !== r && !ot.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t),
                                n
                        }
                    }
                }),
            ot.support.focusinBubbles || ot.each({
                    focus: "focusin",
                    blur: "focusout"
                },
                function (e, t) {
                    var n = 0,
                        r = function (e) {
                            ot.event.simulate(t, e.target, ot.event.fix(e), !0)
                        };
                    ot.event.special[t] = {
                        setup: function () {
                                0 === n++ && z.addEventListener(e, r, !0)
                            },
                            teardown: function () {
                                0 === --n && z.removeEventListener(e, r, !0)
                            }
                    }
                }),
            ot.fn.extend({
                on: function (e, n, r, i, o) {
                        var s, u;
                        if ("object" == typeof e) {
                            "string" != typeof n && (r = r || n, n = t);
                            for (u in e) this.on(u, n, r, e[u], o);
                            return this
                        }
                        if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = a;
                        else if (!i) return this;
                        return 1 === o && (s = i, i = function (e) {
                                    return ot().off(e),
                                        s.apply(this, arguments)
                                },
                                i.guid = s.guid || (s.guid = ot.guid++)),
                            this.each(function () {
                                ot.event.add(this, e, i, r, n)
                            })
                    },
                    one: function (e, t, n, r) {
                        return this.on(e, t, n, r, 1)
                    },
                    off: function (e, n, r) {
                        var i, o;
                        if (e && e.preventDefault && e.handleObj) return i = e.handleObj,
                            ot(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler),
                            this;
                        if ("object" == typeof e) {
                            for (o in e) this.off(o, n, e[o]);
                            return this
                        }
                        return (n === !1 || "function" == typeof n) && (r = n, n = t),
                            r === !1 && (r = a),
                            this.each(function () {
                                ot.event.remove(this, e, r, n)
                            })
                    },
                    trigger: function (e, t) {
                        return this.each(function () {
                            ot.event.trigger(e, t, this)
                        })
                    },
                    triggerHandler: function (e, t) {
                        var n = this[0];
                        return n ? ot.event.trigger(e, t, n, !0) : void 0
                    }
            });
        var At = /^.[^:#\[\.,]*$/,
            $t = /^(?:parents|prev(?:Until|All))/,
            Nt = ot.expr.match.needsContext,
            Dt = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        ot.fn.extend({
                find: function (e) {
                        var t, n = [],
                            r = this,
                            i = r.length;
                        if ("string" != typeof e) return this.pushStack(ot(e).filter(function () {
                            for (t = 0; i > t; t++)
                                if (ot.contains(r[t], this)) return !0
                        }));
                        for (t = 0; i > t; t++) ot.find(e, r[t], n);
                        return n = this.pushStack(i > 1 ? ot.unique(n) : n),
                            n.selector = this.selector ? this.selector + " " + e : e,
                            n
                    },
                    has: function (e) {
                        var t = ot(e, this),
                            n = t.length;
                        return this.filter(function () {
                            for (var e = 0; n > e; e++)
                                if (ot.contains(this, t[e])) return !0
                        })
                    },
                    not: function (e) {
                        return this.pushStack(c(this, e || [], !0))
                    },
                    filter: function (e) {
                        return this.pushStack(c(this, e || [], !1))
                    },
                    is: function (e) {
                        return !!c(this, "string" == typeof e && Nt.test(e) ? ot(e) : e || [], !1).length
                    },
                    closest: function (e, t) {
                        for (var n, r = 0,
                            i = this.length,
                            o = [], s = Nt.test(e) || "string" != typeof e ? ot(e, t || this.context) : 0; i > r; r++)
                            for (n = this[r]; n && n !== t; n = n.parentNode)
                                if (n.nodeType < 11 && (s ? s.index(n) > -1 : 1 === n.nodeType && ot.find.matchesSelector(n, e))) {
                                    n = o.push(n);
                                    break
                                }
                        return this.pushStack(o.length > 1 ? ot.unique(o) : o)
                    },
                    index: function (e) {
                        return e ? "string" == typeof e ? tt.call(ot(e), this[0]) : tt.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
                    },
                    add: function (e, t) {
                        var n = "string" == typeof e ? ot(e, t) : ot.makeArray(e && e.nodeType ? [e] : e),
                            r = ot.merge(this.get(), n);
                        return this.pushStack(ot.unique(r))
                    },
                    addBack: function (e) {
                        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                    }
            }),
            ot.each({
                    parent: function (e) {
                            var t = e.parentNode;
                            return t && 11 !== t.nodeType ? t : null
                        },
                        parents: function (e) {
                            return ot.dir(e, "parentNode")
                        },
                        parentsUntil: function (e, t, n) {
                            return ot.dir(e, "parentNode", n)
                        },
                        next: function (e) {
                            return l(e, "nextSibling")
                        },
                        prev: function (e) {
                            return l(e, "previousSibling")
                        },
                        nextAll: function (e) {
                            return ot.dir(e, "nextSibling")
                        },
                        prevAll: function (e) {
                            return ot.dir(e, "previousSibling")
                        },
                        nextUntil: function (e, t, n) {
                            return ot.dir(e, "nextSibling", n)
                        },
                        prevUntil: function (e, t, n) {
                            return ot.dir(e, "previousSibling", n)
                        },
                        siblings: function (e) {
                            return ot.sibling((e.parentNode || {}).firstChild, e)
                        },
                        children: function (e) {
                            return ot.sibling(e.firstChild)
                        },
                        contents: function (e) {
                            return e.contentDocument || ot.merge([], e.childNodes)
                        }
                },
                function (e, t) {
                    ot.fn[e] = function (n, r) {
                        var i = ot.map(this, t, n);
                        return "Until" !== e.slice(-5) && (r = n),
                            r && "string" == typeof r && (i = ot.filter(r, i)),
                            this.length > 1 && (Dt[e] || ot.unique(i), $t.test(e) && i.reverse()),
                            this.pushStack(i)
                    }
                }),
            ot.extend({
                filter: function (e, t, n) {
                        var r = t[0];
                        return n && (e = ":not(" + e + ")"),
                            1 === t.length && 1 === r.nodeType ? ot.find.matchesSelector(r, e) ? [r] : [] : ot.find.matches(e, ot.grep(t,
                                function (e) {
                                    return 1 === e.nodeType
                                }))
                    },
                    dir: function (e, n, r) {
                        for (var i = [], o = r !== t;
                            (e = e[n]) && 9 !== e.nodeType;)
                            if (1 === e.nodeType) {
                                if (o && ot(e).is(r)) break;
                                i.push(e)
                            }
                        return i
                    },
                    sibling: function (e, t) {
                        for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                        return n
                    }
            });
        var qt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Ot = /<([\w:]+)/,
            Lt = /<|&#?\w+;/,
            Pt = /<(?:script|style|link)/i,
            Mt = /^(?:checkbox|radio)$/i,
            Ft = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Ht = /^$|\/(?:java|ecma)script/i,
            Rt = /^true\/(.*)/,
            _t = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            Bt = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Bt.optgroup = Bt.option,
            Bt.tbody = Bt.tfoot = Bt.colgroup = Bt.caption = Bt.thead,
            Bt.th = Bt.td,
            ot.fn.extend({
                text: function (e) {
                        return ot.access(this,
                            function (e) {
                                return e === t ? ot.text(this) : this.empty().append((this[0] && this[0].ownerDocument || z).createTextNode(e))
                            },
                            null, e, arguments.length)
                    },
                    append: function () {
                        return this.domManip(arguments,
                            function (e) {
                                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                    var t = f(this, e);
                                    t.appendChild(e)
                                }
                            })
                    },
                    prepend: function () {
                        return this.domManip(arguments,
                            function (e) {
                                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                                    var t = f(this, e);
                                    t.insertBefore(e, t.firstChild)
                                }
                            })
                    },
                    before: function () {
                        return this.domManip(arguments,
                            function (e) {
                                this.parentNode && this.parentNode.insertBefore(e, this)
                            })
                    },
                    after: function () {
                        return this.domManip(arguments,
                            function (e) {
                                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                            })
                    },
                    remove: function (e, t) {
                        for (var n, r = e ? ot.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || ot.cleanData(m(n)),
                            n.parentNode && (t && ot.contains(n.ownerDocument, n) && d(m(n, "script")), n.parentNode.removeChild(n));
                        return this
                    },
                    empty: function () {
                        for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (ot.cleanData(m(e, !1)), e.textContent = "");
                        return this
                    },
                    clone: function (e, t) {
                        return e = null == e ? !1 : e,
                            t = null == t ? e : t,
                            this.map(function () {
                                return ot.clone(this, e, t)
                            })
                    },
                    html: function (e) {
                        return ot.access(this,
                            function (e) {
                                var n = this[0] || {},
                                    r = 0,
                                    i = this.length;
                                if (e === t && 1 === n.nodeType) return n.innerHTML;
                                if ("string" == typeof e && !Pt.test(e) && !Bt[(Ot.exec(e) || ["", ""])[1].toLowerCase()]) {
                                    e = e.replace(qt, "<$1></$2>");
                                    try {
                                        for (; i > r; r++) n = this[r] || {},
                                            1 === n.nodeType && (ot.cleanData(m(n, !1)), n.innerHTML = e);
                                        n = 0
                                    } catch (o) {}
                                }
                                n && this.empty().append(e)
                            },
                            null, e, arguments.length)
                    },
                    replaceWith: function () {
                        var e = ot.map(this,
                                function (e) {
                                    return [e.nextSibling, e.parentNode]
                                }),
                            t = 0;
                        return this.domManip(arguments,
                                function (n) {
                                    var r = e[t++],
                                        i = e[t++];
                                    i && (r && r.parentNode !== i && (r = this.nextSibling), ot(this).remove(), i.insertBefore(n, r))
                                }, !0),
                            t ? this : this.remove()
                    },
                    detach: function (e) {
                        return this.remove(e, !0)
                    },
                    domManip: function (e, t, n) {
                        e = K.apply([], e);
                        var r, i, o, s, a, u, l = 0,
                            c = this.length,
                            f = this,
                            d = c - 1,
                            g = e[0],
                            v = ot.isFunction(g);
                        if (v || !(1 >= c || "string" != typeof g || ot.support.checkClone) && Ft.test(g)) return this.each(function (r) {
                            var i = f.eq(r);
                            v && (e[0] = g.call(this, r, i.html())),
                                i.domManip(e, t, n)
                        });
                        if (c && (r = ot.buildFragment(e, this[0].ownerDocument, !1, !n && this), i = r.firstChild, 1 === r.childNodes.length && (r = i), i)) {
                            for (o = ot.map(m(r, "script"), p), s = o.length; c > l; l++) a = r,
                                l !== d && (a = ot.clone(a, !0, !0), s && ot.merge(o, m(a, "script"))),
                                t.call(this[l], a, l);
                            if (s)
                                for (u = o[o.length - 1].ownerDocument, ot.map(o, h), l = 0; s > l; l++) a = o[l],
                                    Ht.test(a.type || "") && !mt.access(a, "globalEval") && ot.contains(u, a) && (a.src ? ot._evalUrl(a.src) : ot.globalEval(a.textContent.replace(_t, "")))
                        }
                        return this
                    }
            }),
            ot.each({
                    appendTo: "append",
                    prependTo: "prepend",
                    insertBefore: "before",
                    insertAfter: "after",
                    replaceAll: "replaceWith"
                },
                function (e, t) {
                    ot.fn[e] = function (e) {
                        for (var n, r = [], i = ot(e), o = i.length - 1, s = 0; o >= s; s++) n = s === o ? this : this.clone(!0),
                            ot(i[s])[t](n),
                            Z.apply(r, n.get());
                        return this.pushStack(r)
                    }
                }),
            ot.extend({
                clone: function (e, t, n) {
                        var r, i, o, s, a = e.cloneNode(!0),
                            u = ot.contains(e.ownerDocument, e);
                        if (!(ot.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ot.isXMLDoc(e)))
                            for (s = m(a), o = m(e), r = 0, i = o.length; i > r; r++) v(o[r], s[r]);
                        if (t)
                            if (n)
                                for (o = o || m(e), s = s || m(a), r = 0, i = o.length; i > r; r++) g(o[r], s[r]);
                            else g(e, a);
                        return s = m(a, "script"),
                            s.length > 0 && d(s, !u && m(e, "script")),
                            a
                    },
                    buildFragment: function (e, t, n, r) {
                        for (var i, o, s, a, u, l, c = 0,
                            f = e.length,
                            p = t.createDocumentFragment(), h = []; f > c; c++)
                            if (i = e[c], i || 0 === i)
                                if ("object" === ot.type(i)) ot.merge(h, i.nodeType ? [i] : i);
                                else if (Lt.test(i)) {
                            for (o = o || p.appendChild(t.createElement("div")), s = (Ot.exec(i) || ["", ""])[1].toLowerCase(), a = Bt[s] || Bt._default, o.innerHTML = a[1] + i.replace(qt, "<$1></$2>") + a[2], l = a[0]; l--;) o = o.lastChild;
                            ot.merge(h, o.childNodes),
                                o = p.firstChild,
                                o.textContent = ""
                        } else h.push(t.createTextNode(i));
                        for (p.textContent = "", c = 0; i = h[c++];)
                            if ((!r || -1 === ot.inArray(i, r)) && (u = ot.contains(i.ownerDocument, i), o = m(p.appendChild(i), "script"), u && d(o), n))
                                for (l = 0; i = o[l++];) Ht.test(i.type || "") && n.push(i);
                        return p
                    },
                    cleanData: function (e) {
                        for (var n, r, o, s, a, u, l = ot.event.special,
                                c = 0;
                            (r = e[c]) !== t; c++) {
                            if (i.accepts(r) && (a = r[mt.expando], a && (n = mt.cache[a]))) {
                                if (o = Object.keys(n.events || {}), o.length)
                                    for (u = 0;
                                        (s = o[u]) !== t; u++) l[s] ? ot.event.remove(r, s) : ot.removeEvent(r, s, n.handle);
                                mt.cache[a] && delete mt.cache[a]
                            }
                            delete gt.cache[r[gt.expando]]
                        }
                    },
                    _evalUrl: function (e) {
                        return ot.ajax({
                            url: e,
                            type: "GET",
                            dataType: "script",
                            async: !1,
                            global: !1,
                            "throws": !0
                        })
                    }
            }),
            ot.fn.extend({
                wrapAll: function (e) {
                        var t;
                        return ot.isFunction(e) ? this.each(function (t) {
                            ot(this).wrapAll(e.call(this, t))
                        }) : (this[0] && (t = ot(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                            for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                            return e
                        }).append(this)), this)
                    },
                    wrapInner: function (e) {
                        return this.each(ot.isFunction(e) ?
                            function (t) {
                                ot(this).wrapInner(e.call(this, t))
                            } : function () {
                                var t = ot(this),
                                    n = t.contents();
                                n.length ? n.wrapAll(e) : t.append(e)
                            })
                    },
                    wrap: function (e) {
                        var t = ot.isFunction(e);
                        return this.each(function (n) {
                            ot(this).wrapAll(t ? e.call(this, n) : e)
                        })
                    },
                    unwrap: function () {
                        return this.parent().each(function () {
                            ot.nodeName(this, "body") || ot(this).replaceWith(this.childNodes)
                        }).end()
                    }
            });
        var Wt, It, Ut = /^(none|table(?!-c[ea]).+)/,
            zt = /^margin/,
            Qt = new RegExp("^(" + st + ")(.*)$", "i"),
            Xt = new RegExp("^(" + st + ")(?!px)[a-z%]+$", "i"),
            Yt = new RegExp("^([+-])=(" + st + ")", "i"),
            Vt = {
                BODY: "block"
            },
            Gt = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Jt = {
                letterSpacing: 0,
                fontWeight: 400
            },
            Kt = ["Top", "Right", "Bottom", "Left"],
            Zt = ["Webkit", "O", "Moz", "ms"];
        ot.fn.extend({
                css: function (e, n) {
                        return ot.access(this,
                            function (e, n, r) {
                                var i, o, s = {},
                                    a = 0;
                                if (ot.isArray(n)) {
                                    for (i = x(e), o = n.length; o > a; a++) s[n[a]] = ot.css(e, n[a], !1, i);
                                    return s
                                }
                                return r !== t ? ot.style(e, n, r) : ot.css(e, n)
                            },
                            e, n, arguments.length > 1)
                    },
                    show: function () {
                        return w(this, !0)
                    },
                    hide: function () {
                        return w(this)
                    },
                    toggle: function (e) {
                        return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                            b(this) ? ot(this).show() : ot(this).hide()
                        })
                    }
            }),
            ot.extend({
                cssHooks: {
                    opacity: {
                        get: function (e, t) {
                            if (t) {
                                var n = Wt(e, "opacity");
                                return "" === n ? "1" : n
                            }
                        }
                    }
                },
                cssNumber: {
                    columnCount: !0,
                    fillOpacity: !0,
                    fontWeight: !0,
                    lineHeight: !0,
                    opacity: !0,
                    order: !0,
                    orphans: !0,
                    widows: !0,
                    zIndex: !0,
                    zoom: !0
                },
                cssProps: {
                    "float": "cssFloat"
                },
                style: function (e, n, r, i) {
                        if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                            var o, s, a, u = ot.camelCase(n),
                                l = e.style;
                            return n = ot.cssProps[u] || (ot.cssProps[u] = y(l, u)),
                                a = ot.cssHooks[n] || ot.cssHooks[u],
                                r === t ? a && "get" in a && (o = a.get(e, !1, i)) !== t ? o : l[n] : (s = typeof r, "string" === s && (o = Yt.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(ot.css(e, n)), s = "number"), null == r || "number" === s && isNaN(r) || ("number" !== s || ot.cssNumber[u] || (r += "px"), ot.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), a && "set" in a && (r = a.set(e, r, i)) === t || (l[n] = r)), void 0)
                        }
                    },
                    css: function (e, n, r, i) {
                        var o, s, a, u = ot.camelCase(n);
                        return n = ot.cssProps[u] || (ot.cssProps[u] = y(e.style, u)),
                            a = ot.cssHooks[n] || ot.cssHooks[u],
                            a && "get" in a && (o = a.get(e, !0, r)),
                            o === t && (o = Wt(e, n, i)),
                            "normal" === o && n in Jt && (o = Jt[n]),
                            "" === r || r ? (s = parseFloat(o), r === !0 || ot.isNumeric(s) ? s || 0 : o) : o
                    }
            }),
            Wt = function (e, n, r) {
                var i, o, s, a = r || x(e),
                    u = a ? a.getPropertyValue(n) || a[n] : t,
                    l = e.style;
                return a && ("" !== u || ot.contains(e.ownerDocument, e) || (u = ot.style(e, n)), Xt.test(u) && zt.test(n) && (i = l.width, o = l.minWidth, s = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = a.width, l.width = i, l.minWidth = o, l.maxWidth = s)),
                    u
            },
            ot.each(["height", "width"],
                function (e, t) {
                    ot.cssHooks[t] = {
                        get: function (e, n, r) {
                                return n ? 0 === e.offsetWidth && Ut.test(ot.css(e, "display")) ? ot.swap(e, Gt,
                                    function () {
                                        return k(e, t, r)
                                    }) : k(e, t, r) : void 0
                            },
                            set: function (e, n, r) {
                                var i = r && x(e);
                                return T(e, n, r ? C(e, t, r, ot.support.boxSizing && "border-box" === ot.css(e, "boxSizing", !1, i), i) : 0)
                            }
                    }
                }),
            ot(function () {
                ot.support.reliableMarginRight || (ot.cssHooks.marginRight = {
                    get: function (e, t) {
                        return t ? ot.swap(e, {
                                display: "inline-block"
                            },
                            Wt, [e, "marginRight"]) : void 0
                    }
                }), !ot.support.pixelPosition && ot.fn.position && ot.each(["top", "left"],
                    function (e, t) {
                        ot.cssHooks[t] = {
                            get: function (e, n) {
                                return n ? (n = Wt(e, t), Xt.test(n) ? ot(e).position()[t] + "px" : n) : void 0
                            }
                        }
                    })
            }),
            ot.expr && ot.expr.filters && (ot.expr.filters.hidden = function (e) {
                    return e.offsetWidth <= 0 && e.offsetHeight <= 0
                },
                ot.expr.filters.visible = function (e) {
                    return !ot.expr.filters.hidden(e)
                }),
            ot.each({
                    margin: "",
                    padding: "",
                    border: "Width"
                },
                function (e, t) {
                    ot.cssHooks[e + t] = {
                            expand: function (n) {
                                for (var r = 0,
                                    i = {},
                                    o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + Kt[r] + t] = o[r] || o[r - 2] || o[0];
                                return i
                            }
                        },
                        zt.test(e) || (ot.cssHooks[e + t].set = T)
                });
        var en = /%20/g,
            tn = /\[\]$/,
            nn = /\r?\n/g,
            rn = /^(?:submit|button|image|reset|file)$/i,
            on = /^(?:input|select|textarea|keygen)/i;
        ot.fn.extend({
                serialize: function () {
                        return ot.param(this.serializeArray())
                    },
                    serializeArray: function () {
                        return this.map(function () {
                            var e = ot.prop(this, "elements");
                            return e ? ot.makeArray(e) : this
                        }).filter(function () {
                            var e = this.type;
                            return this.name && !ot(this).is(":disabled") && on.test(this.nodeName) && !rn.test(e) && (this.checked || !Mt.test(e))
                        }).map(function (e, t) {
                            var n = ot(this).val();
                            return null == n ? null : ot.isArray(n) ? ot.map(n,
                                function (e) {
                                    return {
                                        name: t.name,
                                        value: e.replace(nn, "\r\n")
                                    }
                                }) : {
                                name: t.name,
                                value: n.replace(nn, "\r\n")
                            }
                        }).get()
                    }
            }),
            ot.param = function (e, n) {
                var r, i = [],
                    o = function (e, t) {
                        t = ot.isFunction(t) ? t() : null == t ? "" : t,
                            i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                    };
                if (n === t && (n = ot.ajaxSettings && ot.ajaxSettings.traditional), ot.isArray(e) || e.jquery && !ot.isPlainObject(e)) ot.each(e,
                    function () {
                        o(this.name, this.value)
                    });
                else
                    for (r in e) j(r, e[r], n, o);
                return i.join("&").replace(en, "+")
            },
            ot.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),
                function (e, t) {
                    ot.fn[t] = function (e, n) {
                        return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
                    }
                }),
            ot.fn.extend({
                hover: function (e, t) {
                        return this.mouseenter(e).mouseleave(t || e)
                    },
                    bind: function (e, t, n) {
                        return this.on(e, null, t, n)
                    },
                    unbind: function (e, t) {
                        return this.off(e, null, t)
                    },
                    delegate: function (e, t, n, r) {
                        return this.on(t, e, n, r)
                    },
                    undelegate: function (e, t, n) {
                        return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
                    }
            });
        var sn, an, un = ot.now(),
            ln = /\?/,
            cn = /#.*$/,
            fn = /([?&])_=[^&]*/,
            pn = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            hn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            dn = /^(?:GET|HEAD)$/,
            gn = /^\/\//,
            mn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            vn = ot.fn.load,
            yn = {},
            bn = {},
            xn = "*/".concat("*");
        try {
            an = U.href
        } catch (wn) {
            an = z.createElement("a"),
                an.href = "",
                an = an.href
        }
        sn = mn.exec(an.toLowerCase()) || [],
            ot.fn.load = function (e, n, r) {
                if ("string" != typeof e && vn) return vn.apply(this, arguments);
                var i, o, s, a = this,
                    u = e.indexOf(" ");
                return u >= 0 && (i = e.slice(u), e = e.slice(0, u)),
                    ot.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (o = "POST"),
                    a.length > 0 && ot.ajax({
                        url: e,
                        type: o,
                        dataType: "html",
                        data: n
                    }).done(function (e) {
                        s = arguments,
                            a.html(i ? ot("<div>").append(ot.parseHTML(e)).find(i) : e)
                    }).complete(r &&
                        function (e, t) {
                            a.each(r, s || [e.responseText, t, e])
                        }),
                    this
            },
            ot.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
                function (e, t) {
                    ot.fn[t] = function (e) {
                        return this.on(t, e)
                    }
                }),
            ot.extend({
                active: 0,
                lastModified: {},
                etag: {},
                ajaxSettings: {
                    url: an,
                    type: "GET",
                    isLocal: hn.test(sn[1]),
                    global: !0,
                    processData: !0,
                    async: !0,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    accepts: {
                        "*": xn,
                        text: "text/plain",
                        html: "text/html",
                        xml: "application/xml, text/xml",
                        json: "application/json, text/javascript"
                    },
                    contents: {
                        xml: /xml/,
                        html: /html/,
                        json: /json/
                    },
                    responseFields: {
                        xml: "responseXML",
                        text: "responseText",
                        json: "responseJSON"
                    },
                    converters: {
                        "* text": String,
                        "text html": !0,
                        "text json": ot.parseJSON,
                        "text xml": ot.parseXML
                    },
                    flatOptions: {
                        url: !0,
                        context: !0
                    }
                },
                ajaxSetup: function (e, t) {
                        return t ? N(N(e, ot.ajaxSettings), t) : N(ot.ajaxSettings, e)
                    },
                    ajaxPrefilter: A(yn),
                ajaxTransport: A(bn),
                ajax: function (e, n) {
                        function r(e, n, r, a) {
                            var l, f, y, b, w, C = n;
                            2 !== x && (x = 2, u && clearTimeout(u), i = t, s = a || "", T.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, r && (b = D(p, T, r)), b = q(p, b, T, l), l ? (p.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (ot.lastModified[o] = w), w = T.getResponseHeader("etag"), w && (ot.etag[o] = w)), 204 === e || "HEAD" === p.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = b.state, f = b.data, y = b.error, l = !y)) : (y = C, (e || !C) && (C = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (n || C) + "", l ? g.resolveWith(h, [f, C, T]) : g.rejectWith(h, [T, C, y]), T.statusCode(v), v = t, c && d.trigger(l ? "ajaxSuccess" : "ajaxError", [T, p, l ? f : y]), m.fireWith(h, [T, C]), c && (d.trigger("ajaxComplete", [T, p]), --ot.active || ot.event.trigger("ajaxStop")))
                        }
                        "object" == typeof e && (n = e, e = t),
                            n = n || {};
                        var i, o, s, a, u, l, c, f, p = ot.ajaxSetup({},
                                n),
                            h = p.context || p,
                            d = p.context && (h.nodeType || h.jquery) ? ot(h) : ot.event,
                            g = ot.Deferred(),
                            m = ot.Callbacks("once memory"),
                            v = p.statusCode || {},
                            y = {},
                            b = {},
                            x = 0,
                            w = "canceled",
                            T = {
                                readyState: 0,
                                getResponseHeader: function (e) {
                                        var t;
                                        if (2 === x) {
                                            if (!a)
                                                for (a = {}; t = pn.exec(s);) a[t[1].toLowerCase()] = t[2];
                                            t = a[e.toLowerCase()]
                                        }
                                        return null == t ? null : t
                                    },
                                    getAllResponseHeaders: function () {
                                        return 2 === x ? s : null
                                    },
                                    setRequestHeader: function (e, t) {
                                        var n = e.toLowerCase();
                                        return x || (e = b[n] = b[n] || e, y[e] = t),
                                            this
                                    },
                                    overrideMimeType: function (e) {
                                        return x || (p.mimeType = e),
                                            this
                                    },
                                    statusCode: function (e) {
                                        var t;
                                        if (e)
                                            if (2 > x)
                                                for (t in e) v[t] = [v[t], e[t]];
                                            else T.always(e[T.status]);
                                        return this
                                    },
                                    abort: function (e) {
                                        var t = e || w;
                                        return i && i.abort(t),
                                            r(0, t),
                                            this
                                    }
                            };
                        if (g.promise(T).complete = m.add, T.success = T.done, T.error = T.fail, p.url = ((e || p.url || an) + "").replace(cn, "").replace(gn, sn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ot.trim(p.dataType || "*").toLowerCase().match(at) || [""], null == p.crossDomain && (l = mn.exec(p.url.toLowerCase()), p.crossDomain = !(!l || l[1] === sn[1] && l[2] === sn[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (sn[3] || ("http:" === sn[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = ot.param(p.data, p.traditional)), $(yn, p, n, T), 2 === x) return T;
                        c = p.global,
                            c && 0 === ot.active++ && ot.event.trigger("ajaxStart"),
                            p.type = p.type.toUpperCase(),
                            p.hasContent = !dn.test(p.type),
                            o = p.url,
                            p.hasContent || (p.data && (o = p.url += (ln.test(o) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = fn.test(o) ? o.replace(fn, "$1_=" + un++) : o + (ln.test(o) ? "&" : "?") + "_=" + un++)),
                            p.ifModified && (ot.lastModified[o] && T.setRequestHeader("If-Modified-Since", ot.lastModified[o]), ot.etag[o] && T.setRequestHeader("If-None-Match", ot.etag[o])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", p.contentType),
                            T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + xn + "; q=0.01" : "") : p.accepts["*"]);
                        for (f in p.headers) T.setRequestHeader(f, p.headers[f]);
                        if (p.beforeSend && (p.beforeSend.call(h, T, p) === !1 || 2 === x)) return T.abort();
                        w = "abort";
                        for (f in {
                            success: 1,
                            error: 1,
                            complete: 1
                        }) T[f](p[f]);
                        if (i = $(bn, p, n, T)) {
                            T.readyState = 1,
                                c && d.trigger("ajaxSend", [T, p]),
                                p.async && p.timeout > 0 && (u = setTimeout(function () {
                                        T.abort("timeout")
                                    },
                                    p.timeout));
                            try {
                                x = 1,
                                    i.send(y, r)
                            } catch (C) {
                                if (!(2 > x)) throw C;
                                r(-1, C)
                            }
                        } else r(-1, "No Transport");
                        return T
                    },
                    getJSON: function (e, t, n) {
                        return ot.get(e, t, n, "json")
                    },
                    getScript: function (e, n) {
                        return ot.get(e, t, n, "script")
                    }
            }),
            ot.each(["get", "post"],
                function (e, n) {
                    ot[n] = function (e, r, i, o) {
                        return ot.isFunction(r) && (o = o || i, i = r, r = t),
                            ot.ajax({
                                url: e,
                                type: n,
                                dataType: o,
                                data: r,
                                success: i
                            })
                    }
                }),
            ot.ajaxSetup({
                accepts: {
                    script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
                },
                contents: {
                    script: /(?:java|ecma)script/
                },
                converters: {
                    "text script": function (e) {
                        return ot.globalEval(e),
                            e
                    }
                }
            }),
            ot.ajaxPrefilter("script",
                function (e) {
                    e.cache === t && (e.cache = !1),
                        e.crossDomain && (e.type = "GET")
                }),
            ot.ajaxTransport("script",
                function (e) {
                    if (e.crossDomain) {
                        var t, n;
                        return {
                            send: function (r, i) {
                                    t = ot("<script>").prop({
                                            async: !0,
                                            charset: e.scriptCharset,
                                            src: e.url
                                        }).on("load error", n = function (e) {
                                            t.remove(),
                                                n = null,
                                                e && i("error" === e.type ? 404 : 200, e.type)
                                        }),
                                        z.head.appendChild(t[0])
                                },
                                abort: function () {
                                    n && n()
                                }
                        }
                    }
                });
        var Tn = [],
            Cn = /(=)\?(?=&|$)|\?\?/;
        ot.ajaxSetup({
                jsonp: "callback",
                jsonpCallback: function () {
                    var e = Tn.pop() || ot.expando + "_" + un++;
                    return this[e] = !0,
                        e
                }
            }),
            ot.ajaxPrefilter("json jsonp",
                function (n, r, i) {
                    var o, s, a, u = n.jsonp !== !1 && (Cn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Cn.test(n.data) && "data");
                    return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = ot.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Cn, "$1" + o) : n.jsonp !== !1 && (n.url += (ln.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function () {
                            return a || ot.error(o + " was not called"),
                                a[0]
                        },
                        n.dataTypes[0] = "json", s = e[o], e[o] = function () {
                            a = arguments
                        },
                        i.always(function () {
                            e[o] = s,
                                n[o] && (n.jsonpCallback = r.jsonpCallback, Tn.push(o)),
                                a && ot.isFunction(s) && s(a[0]),
                                a = s = t
                        }), "script") : void 0
                }),
            ot.ajaxSettings.xhr = function () {
                try {
                    return new XMLHttpRequest
                } catch (e) {}
            };
        var kn = ot.ajaxSettings.xhr(),
            En = {
                0: 200,
                1223: 204
            },
            Sn = 0,
            jn = {};
        e.ActiveXObject && ot(e).on("unload",
                function () {
                    for (var e in jn) jn[e]();
                    jn = t
                }),
            ot.support.cors = !!kn && "withCredentials" in kn,
            ot.support.ajax = kn = !!kn,
            ot.ajaxTransport(function (e) {
                var n;
                return ot.support.cors || kn && !e.crossDomain ? {
                    send: function (r, i) {
                            var o, s, a = e.xhr();
                            if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                                for (o in e.xhrFields) a[o] = e.xhrFields[o];
                            e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType),
                                e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                            for (o in r) a.setRequestHeader(o, r[o]);
                            n = function (e) {
                                    return function () {
                                        n && (delete jn[s], n = a.onload = a.onerror = null, "abort" === e ? a.abort() : "error" === e ? i(a.status || 404, a.statusText) : i(En[a.status] || a.status, a.statusText, "string" == typeof a.responseText ? {
                                            text: a.responseText
                                        } : t, a.getAllResponseHeaders()))
                                    }
                                },
                                a.onload = n(),
                                a.onerror = n("error"),
                                n = jn[s = Sn++] = n("abort"),
                                a.send(e.hasContent && e.data || null)
                        },
                        abort: function () {
                            n && n()
                        }
                } : void 0
            });
        var An, $n, Nn = /^(?:toggle|show|hide)$/,
            Dn = new RegExp("^(?:([+-])=|)(" + st + ")([a-z%]*)$", "i"),
            qn = /queueHooks$/,
            On = [F],
            Ln = {
                "*": [
                    function (e, t) {
                        var n = this.createTween(e, t),
                            r = n.cur(),
                            i = Dn.exec(t),
                            o = i && i[3] || (ot.cssNumber[e] ? "" : "px"),
                            s = (ot.cssNumber[e] || "px" !== o && +r) && Dn.exec(ot.css(n.elem, e)),
                            a = 1,
                            u = 20;
                        if (s && s[3] !== o) {
                            o = o || s[3],
                                i = i || [],
                                s = +r || 1;
                            do a = a || ".5",
                                s /= a,
                                ot.style(n.elem, e, s + o);
                            while (a !== (a = n.cur() / r) && 1 !== a && --u)
                        }
                        return i && (s = n.start = +s || +r || 0, n.unit = o, n.end = i[1] ? s + (i[1] + 1) * i[2] : +i[2]),
                            n
                    }
                ]
            };
        ot.Animation = ot.extend(P, {
                tweener: function (e, t) {
                        ot.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                        for (var n, r = 0,
                            i = e.length; i > r; r++) n = e[r],
                            Ln[n] = Ln[n] || [],
                            Ln[n].unshift(t)
                    },
                    prefilter: function (e, t) {
                        t ? On.unshift(e) : On.push(e)
                    }
            }),
            ot.Tween = H,
            H.prototype = {
                constructor: H,
                init: function (e, t, n, r, i, o) {
                        this.elem = e,
                            this.prop = n,
                            this.easing = i || "swing",
                            this.options = t,
                            this.start = this.now = this.cur(),
                            this.end = r,
                            this.unit = o || (ot.cssNumber[n] ? "" : "px")
                    },
                    cur: function () {
                        var e = H.propHooks[this.prop];
                        return e && e.get ? e.get(this) : H.propHooks._default.get(this)
                    },
                    run: function (e) {
                        var t, n = H.propHooks[this.prop];
                        return this.pos = t = this.options.duration ? ot.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e,
                            this.now = (this.end - this.start) * t + this.start,
                            this.options.step && this.options.step.call(this.elem, this.now, this),
                            n && n.set ? n.set(this) : H.propHooks._default.set(this),
                            this
                    }
            },
            H.prototype.init.prototype = H.prototype,
            H.propHooks = {
                _default: {
                    get: function (e) {
                            var t;
                            return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ot.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                        },
                        set: function (e) {
                            ot.fx.step[e.prop] ? ot.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ot.cssProps[e.prop]] || ot.cssHooks[e.prop]) ? ot.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                        }
                }
            },
            H.propHooks.scrollTop = H.propHooks.scrollLeft = {
                set: function (e) {
                    e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
                }
            },
            ot.each(["toggle", "show", "hide"],
                function (e, t) {
                    var n = ot.fn[t];
                    ot.fn[t] = function (e, r, i) {
                        return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(R(t, !0), e, r, i)
                    }
                }),
            ot.fn.extend({
                fadeTo: function (e, t, n, r) {
                        return this.filter(b).css("opacity", 0).show().end().animate({
                                opacity: t
                            },
                            e, n, r)
                    },
                    animate: function (e, t, n, r) {
                        var i = ot.isEmptyObject(e),
                            o = ot.speed(t, n, r),
                            s = function () {
                                var t = P(this, ot.extend({},
                                    e), o);
                                (i || mt.get(this, "finish")) && t.stop(!0)
                            };
                        return s.finish = s,
                            i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
                    },
                    stop: function (e, n, r) {
                        var i = function (e) {
                            var t = e.stop;
                            delete e.stop,
                                t(r)
                        };
                        return "string" != typeof e && (r = n, n = e, e = t),
                            n && e !== !1 && this.queue(e || "fx", []),
                            this.each(function () {
                                var t = !0,
                                    n = null != e && e + "queueHooks",
                                    o = ot.timers,
                                    s = mt.get(this);
                                if (n) s[n] && s[n].stop && i(s[n]);
                                else
                                    for (n in s) s[n] && s[n].stop && qn.test(n) && i(s[n]);
                                for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
                                (t || !r) && ot.dequeue(this, e)
                            })
                    },
                    finish: function (e) {
                        return e !== !1 && (e = e || "fx"),
                            this.each(function () {
                                var t, n = mt.get(this),
                                    r = n[e + "queue"],
                                    i = n[e + "queueHooks"],
                                    o = ot.timers,
                                    s = r ? r.length : 0;
                                for (n.finish = !0, ot.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                                for (t = 0; s > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                                delete n.finish
                            })
                    }
            }),
            ot.each({
                    slideDown: R("show"),
                    slideUp: R("hide"),
                    slideToggle: R("toggle"),
                    fadeIn: {
                        opacity: "show"
                    },
                    fadeOut: {
                        opacity: "hide"
                    },
                    fadeToggle: {
                        opacity: "toggle"
                    }
                },
                function (e, t) {
                    ot.fn[e] = function (e, n, r) {
                        return this.animate(t, e, n, r)
                    }
                }),
            ot.speed = function (e, t, n) {
                var r = e && "object" == typeof e ? ot.extend({},
                    e) : {
                    complete: n || !n && t || ot.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !ot.isFunction(t) && t
                };
                return r.duration = ot.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ot.fx.speeds ? ot.fx.speeds[r.duration] : ot.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"),
                    r.old = r.complete,
                    r.complete = function () {
                        ot.isFunction(r.old) && r.old.call(this),
                            r.queue && ot.dequeue(this, r.queue)
                    },
                    r
            },
            ot.easing = {
                linear: function (e) {
                        return e
                    },
                    swing: function (e) {
                        return .5 - Math.cos(e * Math.PI) / 2
                    }
            },
            ot.timers = [],
            ot.fx = H.prototype.init,
            ot.fx.tick = function () {
                var e, n = ot.timers,
                    r = 0;
                for (An = ot.now(); r < n.length; r++) e = n[r],
                    e() || n[r] !== e || n.splice(r--, 1);
                n.length || ot.fx.stop(),
                    An = t
            },
            ot.fx.timer = function (e) {
                e() && ot.timers.push(e) && ot.fx.start()
            },
            ot.fx.interval = 13,
            ot.fx.start = function () {
                $n || ($n = setInterval(ot.fx.tick, ot.fx.interval))
            },
            ot.fx.stop = function () {
                clearInterval($n),
                    $n = null
            },
            ot.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            },
            ot.fx.step = {},
            ot.expr && ot.expr.filters && (ot.expr.filters.animated = function (e) {
                return ot.grep(ot.timers,
                    function (t) {
                        return e === t.elem
                    }).length
            }),
            ot.fn.offset = function (e) {
                if (arguments.length) return e === t ? this : this.each(function (t) {
                    ot.offset.setOffset(this, e, t)
                });
                var n, r, i = this[0],
                    o = {
                        top: 0,
                        left: 0
                    },
                    s = i && i.ownerDocument;
                if (s) return n = s.documentElement,
                    ot.contains(n, i) ? (typeof i.getBoundingClientRect !== I && (o = i.getBoundingClientRect()), r = _(s), {
                        top: o.top + r.pageYOffset - n.clientTop,
                        left: o.left + r.pageXOffset - n.clientLeft
                    }) : o
            },
            ot.offset = {
                setOffset: function (e, t, n) {
                    var r, i, o, s, a, u, l, c = ot.css(e, "position"),
                        f = ot(e),
                        p = {};
                    "static" === c && (e.style.position = "relative"),
                        a = f.offset(),
                        o = ot.css(e, "top"),
                        u = ot.css(e, "left"),
                        l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1,
                        l ? (r = f.position(), s = r.top, i = r.left) : (s = parseFloat(o) || 0, i = parseFloat(u) || 0),
                        ot.isFunction(t) && (t = t.call(e, n, a)),
                        null != t.top && (p.top = t.top - a.top + s),
                        null != t.left && (p.left = t.left - a.left + i),
                        "using" in t ? t.using.call(e, p) : f.css(p)
                }
            },
            ot.fn.extend({
                position: function () {
                        if (this[0]) {
                            var e, t, n = this[0],
                                r = {
                                    top: 0,
                                    left: 0
                                };
                            return "fixed" === ot.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ot.nodeName(e[0], "html") || (r = e.offset()), r.top += ot.css(e[0], "borderTopWidth", !0), r.left += ot.css(e[0], "borderLeftWidth", !0)), {
                                top: t.top - r.top - ot.css(n, "marginTop", !0),
                                left: t.left - r.left - ot.css(n, "marginLeft", !0)
                            }
                        }
                    },
                    offsetParent: function () {
                        return this.map(function () {
                            for (var e = this.offsetParent || Q; e && !ot.nodeName(e, "html") && "static" === ot.css(e, "position");) e = e.offsetParent;
                            return e || Q
                        })
                    }
            }),
            ot.each({
                    scrollLeft: "pageXOffset",
                    scrollTop: "pageYOffset"
                },
                function (n, r) {
                    var i = "pageYOffset" === r;
                    ot.fn[n] = function (o) {
                        return ot.access(this,
                            function (n, o, s) {
                                var a = _(n);
                                return s === t ? a ? a[r] : n[o] : void(a ? a.scrollTo(i ? e.pageXOffset : s, i ? s : e.pageYOffset) : n[o] = s)
                            },
                            n, o, arguments.length, null)
                    }
                }),
            ot.each({
                    Height: "height",
                    Width: "width"
                },
                function (e, n) {
                    ot.each({
                            padding: "inner" + e,
                            content: n,
                            "": "outer" + e
                        },
                        function (r, i) {
                            ot.fn[i] = function (i, o) {
                                var s = arguments.length && (r || "boolean" != typeof i),
                                    a = r || (i === !0 || o === !0 ? "margin" : "border");
                                return ot.access(this,
                                    function (n, r, i) {
                                        var o;
                                        return ot.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? ot.css(n, r, a) : ot.style(n, r, i, a)
                                    },
                                    n, s ? i : t, s, null)
                            }
                        })
                }),
            ot.fn.size = function () {
                return this.length
            },
            ot.fn.andSelf = ot.fn.addBack,
            "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ot : "function" == typeof define && define.amd && define("jquery", [],
                function () {
                    return ot
                }),
            "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = ot)
    }(window),
    function () {
        var e = this,
            t = e._,
            n = Array.prototype,
            r = Object.prototype,
            i = Function.prototype,
            o = n.push,
            s = n.slice,
            a = n.concat,
            u = r.toString,
            l = r.hasOwnProperty,
            c = Array.isArray,
            f = Object.keys,
            p = i.bind,
            h = function (e) {
                return e instanceof h ? e : this instanceof h ? void(this._wrapped = e) : new h(e)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = h), exports._ = h) : e._ = h,
            h.VERSION = "1.7.0";
        var d = function (e, t, n) {
            if (void 0 === t) return e;
            switch (null == n ? 3 : n) {
            case 1:
                return function (n) {
                    return e.call(t, n)
                };
            case 2:
                return function (n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function (n, r, i) {
                    return e.call(t, n, r, i)
                };
            case 4:
                return function (n, r, i, o) {
                    return e.call(t, n, r, i, o)
                }
            }
            return function () {
                return e.apply(t, arguments)
            }
        };
        h.iteratee = function (e, t, n) {
                return null == e ? h.identity : h.isFunction(e) ? d(e, t, n) : h.isObject(e) ? h.matches(e) : h.property(e)
            },
            h.each = h.forEach = function (e, t, n) {
                if (null == e) return e;
                t = d(t, n);
                var r, i = e.length;
                if (i === +i)
                    for (r = 0; i > r; r++) t(e[r], r, e);
                else {
                    var o = h.keys(e);
                    for (r = 0, i = o.length; i > r; r++) t(e[o[r]], o[r], e)
                }
                return e
            },
            h.map = h.collect = function (e, t, n) {
                if (null == e) return [];
                t = h.iteratee(t, n);
                for (var r, i = e.length !== +e.length && h.keys(e), o = (i || e).length, s = Array(o), a = 0; o > a; a++) r = i ? i[a] : a,
                    s[a] = t(e[r], r, e);
                return s
            };
        var g = "Reduce of empty array with no initial value";
        h.reduce = h.foldl = h.inject = function (e, t, n, r) {
                null == e && (e = []),
                    t = d(t, r, 4);
                var i, o = e.length !== +e.length && h.keys(e),
                    s = (o || e).length,
                    a = 0;
                if (arguments.length < 3) {
                    if (!s) throw new TypeError(g);
                    n = e[o ? o[a++] : a++]
                }
                for (; s > a; a++) i = o ? o[a] : a,
                    n = t(n, e[i], i, e);
                return n
            },
            h.reduceRight = h.foldr = function (e, t, n, r) {
                null == e && (e = []),
                    t = d(t, r, 4);
                var i, o = e.length !== +e.length && h.keys(e),
                    s = (o || e).length;
                if (arguments.length < 3) {
                    if (!s) throw new TypeError(g);
                    n = e[o ? o[--s] : --s]
                }
                for (; s--;) i = o ? o[s] : s,
                    n = t(n, e[i], i, e);
                return n
            },
            h.find = h.detect = function (e, t, n) {
                var r;
                return t = h.iteratee(t, n),
                    h.some(e,
                        function (e, n, i) {
                            return t(e, n, i) ? (r = e, !0) : void 0
                        }),
                    r
            },
            h.filter = h.select = function (e, t, n) {
                var r = [];
                return null == e ? r : (t = h.iteratee(t, n), h.each(e,
                    function (e, n, i) {
                        t(e, n, i) && r.push(e)
                    }), r)
            },
            h.reject = function (e, t, n) {
                return h.filter(e, h.negate(h.iteratee(t)), n)
            },
            h.every = h.all = function (e, t, n) {
                if (null == e) return !0;
                t = h.iteratee(t, n);
                var r, i, o = e.length !== +e.length && h.keys(e),
                    s = (o || e).length;
                for (r = 0; s > r; r++)
                    if (i = o ? o[r] : r, !t(e[i], i, e)) return !1;
                return !0
            },
            h.some = h.any = function (e, t, n) {
                if (null == e) return !1;
                t = h.iteratee(t, n);
                var r, i, o = e.length !== +e.length && h.keys(e),
                    s = (o || e).length;
                for (r = 0; s > r; r++)
                    if (i = o ? o[r] : r, t(e[i], i, e)) return !0;
                return !1
            },
            h.contains = h.include = function (e, t) {
                return null == e ? !1 : (e.length !== +e.length && (e = h.values(e)), h.indexOf(e, t) >= 0)
            },
            h.invoke = function (e, t) {
                var n = s.call(arguments, 2),
                    r = h.isFunction(t);
                return h.map(e,
                    function (e) {
                        return (r ? t : e[t]).apply(e, n)
                    })
            },
            h.pluck = function (e, t) {
                return h.map(e, h.property(t))
            },
            h.where = function (e, t) {
                return h.filter(e, h.matches(t))
            },
            h.findWhere = function (e, t) {
                return h.find(e, h.matches(t))
            },
            h.max = function (e, t, n) {
                var r, i, o = -1 / 0,
                    s = -1 / 0;
                if (null == t && null != e) {
                    e = e.length === +e.length ? e : h.values(e);
                    for (var a = 0,
                        u = e.length; u > a; a++) r = e[a],
                        r > o && (o = r)
                } else t = h.iteratee(t, n),
                    h.each(e,
                        function (e, n, r) {
                            i = t(e, n, r), (i > s || i === -1 / 0 && o === -1 / 0) && (o = e, s = i)
                        });
                return o
            },
            h.min = function (e, t, n) {
                var r, i, o = 1 / 0,
                    s = 1 / 0;
                if (null == t && null != e) {
                    e = e.length === +e.length ? e : h.values(e);
                    for (var a = 0,
                        u = e.length; u > a; a++) r = e[a],
                        o > r && (o = r)
                } else t = h.iteratee(t, n),
                    h.each(e,
                        function (e, n, r) {
                            i = t(e, n, r), (s > i || 1 / 0 === i && 1 / 0 === o) && (o = e, s = i)
                        });
                return o
            },
            h.shuffle = function (e) {
                for (var t, n = e && e.length === +e.length ? e : h.values(e), r = n.length, i = Array(r), o = 0; r > o; o++) t = h.random(0, o),
                    t !== o && (i[o] = i[t]),
                    i[t] = n[o];
                return i
            },
            h.sample = function (e, t, n) {
                return null == t || n ? (e.length !== +e.length && (e = h.values(e)), e[h.random(e.length - 1)]) : h.shuffle(e).slice(0, Math.max(0, t))
            },
            h.sortBy = function (e, t, n) {
                return t = h.iteratee(t, n),
                    h.pluck(h.map(e,
                        function (e, n, r) {
                            return {
                                value: e,
                                index: n,
                                criteria: t(e, n, r)
                            }
                        }).sort(function (e, t) {
                        var n = e.criteria,
                            r = t.criteria;
                        if (n !== r) {
                            if (n > r || void 0 === n) return 1;
                            if (r > n || void 0 === r) return -1
                        }
                        return e.index - t.index
                    }), "value")
            };
        var m = function (e) {
            return function (t, n, r) {
                var i = {};
                return n = h.iteratee(n, r),
                    h.each(t,
                        function (r, o) {
                            var s = n(r, o, t);
                            e(i, r, s)
                        }),
                    i
            }
        };
        h.groupBy = m(function (e, t, n) {
                h.has(e, n) ? e[n].push(t) : e[n] = [t]
            }),
            h.indexBy = m(function (e, t, n) {
                e[n] = t
            }),
            h.countBy = m(function (e, t, n) {
                h.has(e, n) ? e[n]++ : e[n] = 1
            }),
            h.sortedIndex = function (e, t, n, r) {
                n = h.iteratee(n, r, 1);
                for (var i = n(t), o = 0, s = e.length; s > o;) {
                    var a = o + s >>> 1;
                    n(e[a]) < i ? o = a + 1 : s = a
                }
                return o
            },
            h.toArray = function (e) {
                return e ? h.isArray(e) ? s.call(e) : e.length === +e.length ? h.map(e, h.identity) : h.values(e) : []
            },
            h.size = function (e) {
                return null == e ? 0 : e.length === +e.length ? e.length : h.keys(e).length
            },
            h.partition = function (e, t, n) {
                t = h.iteratee(t, n);
                var r = [],
                    i = [];
                return h.each(e,
                    function (e, n, o) {
                        (t(e, n, o) ? r : i).push(e)
                    }), [r, i]
            },
            h.first = h.head = h.take = function (e, t, n) {
                return null == e ? void 0 : null == t || n ? e[0] : 0 > t ? [] : s.call(e, 0, t)
            },
            h.initial = function (e, t, n) {
                return s.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
            },
            h.last = function (e, t, n) {
                return null == e ? void 0 : null == t || n ? e[e.length - 1] : s.call(e, Math.max(e.length - t, 0))
            },
            h.rest = h.tail = h.drop = function (e, t, n) {
                return s.call(e, null == t || n ? 1 : t)
            },
            h.compact = function (e) {
                return h.filter(e, h.identity)
            };
        var v = function (e, t, n, r) {
            if (t && h.every(e, h.isArray)) return a.apply(r, e);
            for (var i = 0,
                s = e.length; s > i; i++) {
                var u = e[i];
                h.isArray(u) || h.isArguments(u) ? t ? o.apply(r, u) : v(u, t, n, r) : n || r.push(u)
            }
            return r
        };
        h.flatten = function (e, t) {
                return v(e, t, !1, [])
            },
            h.without = function (e) {
                return h.difference(e, s.call(arguments, 1))
            },
            h.uniq = h.unique = function (e, t, n, r) {
                if (null == e) return [];
                h.isBoolean(t) || (r = n, n = t, t = !1),
                    null != n && (n = h.iteratee(n, r));
                for (var i = [], o = [], s = 0, a = e.length; a > s; s++) {
                    var u = e[s];
                    if (t) s && o === u || i.push(u),
                        o = u;
                    else if (n) {
                        var l = n(u, s, e);
                        h.indexOf(o, l) < 0 && (o.push(l), i.push(u))
                    } else h.indexOf(i, u) < 0 && i.push(u)
                }
                return i
            },
            h.union = function () {
                return h.uniq(v(arguments, !0, !0, []))
            },
            h.intersection = function (e) {
                if (null == e) return [];
                for (var t = [], n = arguments.length, r = 0, i = e.length; i > r; r++) {
                    var o = e[r];
                    if (!h.contains(t, o)) {
                        for (var s = 1; n > s && h.contains(arguments[s], o); s++);
                        s === n && t.push(o)
                    }
                }
                return t
            },
            h.difference = function (e) {
                var t = v(s.call(arguments, 1), !0, !0, []);
                return h.filter(e,
                    function (e) {
                        return !h.contains(t, e)
                    })
            },
            h.zip = function (e) {
                if (null == e) return [];
                for (var t = h.max(arguments, "length").length, n = Array(t), r = 0; t > r; r++) n[r] = h.pluck(arguments, r);
                return n
            },
            h.object = function (e, t) {
                if (null == e) return {};
                for (var n = {},
                    r = 0,
                    i = e.length; i > r; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
                return n
            },
            h.indexOf = function (e, t, n) {
                if (null == e) return -1;
                var r = 0,
                    i = e.length;
                if (n) {
                    if ("number" != typeof n) return r = h.sortedIndex(e, t),
                        e[r] === t ? r : -1;
                    r = 0 > n ? Math.max(0, i + n) : n
                }
                for (; i > r; r++)
                    if (e[r] === t) return r;
                return -1
            },
            h.lastIndexOf = function (e, t, n) {
                if (null == e) return -1;
                var r = e.length;
                for ("number" == typeof n && (r = 0 > n ? r + n + 1 : Math.min(r, n + 1)); --r >= 0;)
                    if (e[r] === t) return r;
                return -1
            },
            h.range = function (e, t, n) {
                arguments.length <= 1 && (t = e || 0, e = 0),
                    n = n || 1;
                for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), o = 0; r > o; o++, e += n) i[o] = e;
                return i
            };
        var y = function () {};
        h.bind = function (e, t) {
                var n, r;
                if (p && e.bind === p) return p.apply(e, s.call(arguments, 1));
                if (!h.isFunction(e)) throw new TypeError("Bind must be called on a function");
                return n = s.call(arguments, 2),
                    r = function () {
                        if (!(this instanceof r)) return e.apply(t, n.concat(s.call(arguments)));
                        y.prototype = e.prototype;
                        var i = new y;
                        y.prototype = null;
                        var o = e.apply(i, n.concat(s.call(arguments)));
                        return h.isObject(o) ? o : i
                    }
            },
            h.partial = function (e) {
                var t = s.call(arguments, 1);
                return function () {
                    for (var n = 0,
                        r = t.slice(), i = 0, o = r.length; o > i; i++) r[i] === h && (r[i] = arguments[n++]);
                    for (; n < arguments.length;) r.push(arguments[n++]);
                    return e.apply(this, r)
                }
            },
            h.bindAll = function (e) {
                var t, n, r = arguments.length;
                if (1 >= r) throw new Error("bindAll must be passed function names");
                for (t = 1; r > t; t++) n = arguments[t],
                    e[n] = h.bind(e[n], e);
                return e
            },
            h.memoize = function (e, t) {
                var n = function (r) {
                    var i = n.cache,
                        o = t ? t.apply(this, arguments) : r;
                    return h.has(i, o) || (i[o] = e.apply(this, arguments)),
                        i[o]
                };
                return n.cache = {},
                    n
            },
            h.delay = function (e, t) {
                var n = s.call(arguments, 2);
                return setTimeout(function () {
                        return e.apply(null, n)
                    },
                    t)
            },
            h.defer = function (e) {
                return h.delay.apply(h, [e, 1].concat(s.call(arguments, 1)))
            },
            h.throttle = function (e, t, n) {
                var r, i, o, s = null,
                    a = 0;
                n || (n = {});
                var u = function () {
                    a = n.leading === !1 ? 0 : h.now(),
                        s = null,
                        o = e.apply(r, i),
                        s || (r = i = null)
                };
                return function () {
                    var l = h.now();
                    a || n.leading !== !1 || (a = l);
                    var c = t - (l - a);
                    return r = this,
                        i = arguments,
                        0 >= c || c > t ? (clearTimeout(s), s = null, a = l, o = e.apply(r, i), s || (r = i = null)) : s || n.trailing === !1 || (s = setTimeout(u, c)),
                        o
                }
            },
            h.debounce = function (e, t, n) {
                var r, i, o, s, a, u = function () {
                    var l = h.now() - s;
                    t > l && l > 0 ? r = setTimeout(u, t - l) : (r = null, n || (a = e.apply(o, i), r || (o = i = null)))
                };
                return function () {
                    o = this,
                        i = arguments,
                        s = h.now();
                    var l = n && !r;
                    return r || (r = setTimeout(u, t)),
                        l && (a = e.apply(o, i), o = i = null),
                        a
                }
            },
            h.wrap = function (e, t) {
                return h.partial(t, e)
            },
            h.negate = function (e) {
                return function () {
                    return !e.apply(this, arguments)
                }
            },
            h.compose = function () {
                var e = arguments,
                    t = e.length - 1;
                return function () {
                    for (var n = t,
                        r = e[t].apply(this, arguments); n--;) r = e[n].call(this, r);
                    return r
                }
            },
            h.after = function (e, t) {
                return function () {
                    return --e < 1 ? t.apply(this, arguments) : void 0
                }
            },
            h.before = function (e, t) {
                var n;
                return function () {
                    return --e > 0 ? n = t.apply(this, arguments) : t = null,
                        n
                }
            },
            h.once = h.partial(h.before, 2),
            h.keys = function (e) {
                if (!h.isObject(e)) return [];
                if (f) return f(e);
                var t = [];
                for (var n in e) h.has(e, n) && t.push(n);
                return t
            },
            h.values = function (e) {
                for (var t = h.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++) r[i] = e[t[i]];
                return r
            },
            h.pairs = function (e) {
                for (var t = h.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++) r[i] = [t[i], e[t[i]]];
                return r
            },
            h.invert = function (e) {
                for (var t = {},
                    n = h.keys(e), r = 0, i = n.length; i > r; r++) t[e[n[r]]] = n[r];
                return t
            },
            h.functions = h.methods = function (e) {
                var t = [];
                for (var n in e) h.isFunction(e[n]) && t.push(n);
                return t.sort()
            },
            h.extend = function (e) {
                if (!h.isObject(e)) return e;
                for (var t, n, r = 1,
                    i = arguments.length; i > r; r++) {
                    t = arguments[r];
                    for (n in t) l.call(t, n) && (e[n] = t[n])
                }
                return e
            },
            h.pick = function (e, t, n) {
                var r, i = {};
                if (null == e) return i;
                if (h.isFunction(t)) {
                    t = d(t, n);
                    for (r in e) {
                        var o = e[r];
                        t(o, r, e) && (i[r] = o)
                    }
                } else {
                    var u = a.apply([], s.call(arguments, 1));
                    e = new Object(e);
                    for (var l = 0,
                        c = u.length; c > l; l++) r = u[l],
                        r in e && (i[r] = e[r])
                }
                return i
            },
            h.omit = function (e, t, n) {
                if (h.isFunction(t)) t = h.negate(t);
                else {
                    var r = h.map(a.apply([], s.call(arguments, 1)), String);
                    t = function (e, t) {
                        return !h.contains(r, t)
                    }
                }
                return h.pick(e, t, n)
            },
            h.defaults = function (e) {
                if (!h.isObject(e)) return e;
                for (var t = 1,
                    n = arguments.length; n > t; t++) {
                    var r = arguments[t];
                    for (var i in r) void 0 === e[i] && (e[i] = r[i])
                }
                return e
            },
            h.clone = function (e) {
                return h.isObject(e) ? h.isArray(e) ? e.slice() : h.extend({},
                    e) : e
            },
            h.tap = function (e, t) {
                return t(e),
                    e
            };
        var b = function (e, t, n, r) {
            if (e === t) return 0 !== e || 1 / e === 1 / t;
            if (null == e || null == t) return e === t;
            e instanceof h && (e = e._wrapped),
                t instanceof h && (t = t._wrapped);
            var i = u.call(e);
            if (i !== u.call(t)) return !1;
            switch (i) {
            case "[object RegExp]":
            case "[object String]":
                return "" + e == "" + t;
            case "[object Number]":
                return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
            case "[object Date]":
            case "[object Boolean]":
                return +e === +t
            }
            if ("object" != typeof e || "object" != typeof t) return !1;
            for (var o = n.length; o--;)
                if (n[o] === e) return r[o] === t;
            var s = e.constructor,
                a = t.constructor;
            if (s !== a && "constructor" in e && "constructor" in t && !(h.isFunction(s) && s instanceof s && h.isFunction(a) && a instanceof a)) return !1;
            n.push(e),
                r.push(t);
            var l, c;
            if ("[object Array]" === i) {
                if (l = e.length, c = l === t.length)
                    for (; l-- && (c = b(e[l], t[l], n, r)););
            } else {
                var f, p = h.keys(e);
                if (l = p.length, c = h.keys(t).length === l)
                    for (; l-- && (f = p[l], c = h.has(t, f) && b(e[f], t[f], n, r)););
            }
            return n.pop(),
                r.pop(),
                c
        };
        h.isEqual = function (e, t) {
                return b(e, t, [], [])
            },
            h.isEmpty = function (e) {
                if (null == e) return !0;
                if (h.isArray(e) || h.isString(e) || h.isArguments(e)) return 0 === e.length;
                for (var t in e)
                    if (h.has(e, t)) return !1;
                return !0
            },
            h.isElement = function (e) {
                return !(!e || 1 !== e.nodeType)
            },
            h.isArray = c ||
            function (e) {
                return "[object Array]" === u.call(e)
            },
            h.isObject = function (e) {
                var t = typeof e;
                return "function" === t || "object" === t && !!e
            },
            h.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"],
                function (e) {
                    h["is" + e] = function (t) {
                        return u.call(t) === "[object " + e + "]"
                    }
                }),
            h.isArguments(arguments) || (h.isArguments = function (e) {
                return h.has(e, "callee")
            }),
            "function" != typeof / . / && (h.isFunction = function (e) {
                return "function" == typeof e || !1
            }),
            h.isFinite = function (e) {
                return isFinite(e) && !isNaN(parseFloat(e))
            },
            h.isNaN = function (e) {
                return h.isNumber(e) && e !== +e
            },
            h.isBoolean = function (e) {
                return e === !0 || e === !1 || "[object Boolean]" === u.call(e)
            },
            h.isNull = function (e) {
                return null === e
            },
            h.isUndefined = function (e) {
                return void 0 === e
            },
            h.has = function (e, t) {
                return null != e && l.call(e, t)
            },
            h.noConflict = function () {
                return e._ = t,
                    this
            },
            h.identity = function (e) {
                return e
            },
            h.constant = function (e) {
                return function () {
                    return e
                }
            },
            h.noop = function () {},
            h.property = function (e) {
                return function (t) {
                    return t[e]
                }
            },
            h.matches = function (e) {
                var t = h.pairs(e),
                    n = t.length;
                return function (e) {
                    if (null == e) return !n;
                    e = new Object(e);
                    for (var r = 0; n > r; r++) {
                        var i = t[r],
                            o = i[0];
                        if (i[1] !== e[o] || !(o in e)) return !1
                    }
                    return !0
                }
            },
            h.times = function (e, t, n) {
                var r = Array(Math.max(0, e));
                t = d(t, n, 1);
                for (var i = 0; e > i; i++) r[i] = t(i);
                return r
            },
            h.random = function (e, t) {
                return null == t && (t = e, e = 0),
                    e + Math.floor(Math.random() * (t - e + 1))
            },
            h.now = Date.now ||
            function () {
                return (new Date).getTime()
            };
        var x = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            w = h.invert(x),
            T = function (e) {
                var t = function (t) {
                        return e[t]
                    },
                    n = "(?:" + h.keys(e).join("|") + ")",
                    r = RegExp(n),
                    i = RegExp(n, "g");
                return function (e) {
                    return e = null == e ? "" : "" + e,
                        r.test(e) ? e.replace(i, t) : e
                }
            };
        h.escape = T(x),
            h.unescape = T(w),
            h.result = function (e, t) {
                if (null == e) return void 0;
                var n = e[t];
                return h.isFunction(n) ? e[t]() : n
            };
        var C = 0;
        h.uniqueId = function (e) {
                var t = ++C + "";
                return e ? e + t : t
            },
            h.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
        var k = /(.)^/,
            E = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            S = /\\|'|\r|\n|\u2028|\u2029/g,
            j = function (e) {
                return "\\" + E[e]
            };
        h.template = function (e, t, n) {
                !t && n && (t = n),
                    t = h.defaults({},
                        t, h.templateSettings);
                var r = RegExp([(t.escape || k).source, (t.interpolate || k).source, (t.evaluate || k).source].join("|") + "|$", "g"),
                    i = 0,
                    o = "__p+='";
                e.replace(r,
                        function (t, n, r, s, a) {
                            return o += e.slice(i, a).replace(S, j),
                                i = a + t.length,
                                n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" : r ? o += "'+\n((__t=(" + r + "))==null?'':__t)+\n'" : s && (o += "';\n" + s + "\n__p+='"),
                                t
                        }),
                    o += "';\n",
                    t.variable || (o = "with(obj||{}){\n" + o + "}\n"),
                    o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
                try {
                    var s = new Function(t.variable || "obj", "_", o)
                } catch (a) {
                    throw a.source = o,
                        a
                }
                var u = function (e) {
                        return s.call(this, e, h)
                    },
                    l = t.variable || "obj";
                return u.source = "function(" + l + "){\n" + o + "}",
                    u
            },
            h.chain = function (e) {
                var t = h(e);
                return t._chain = !0,
                    t
            };
        var A = function (e) {
            return this._chain ? h(e).chain() : e
        };
        h.mixin = function (e) {
                h.each(h.functions(e),
                    function (t) {
                        var n = h[t] = e[t];
                        h.prototype[t] = function () {
                            var e = [this._wrapped];
                            return o.apply(e, arguments),
                                A.call(this, n.apply(h, e))
                        }
                    })
            },
            h.mixin(h),
            h.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
                function (e) {
                    var t = n[e];
                    h.prototype[e] = function () {
                        var n = this._wrapped;
                        return t.apply(n, arguments),
                            "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0],
                            A.call(this, n)
                    }
                }),
            h.each(["concat", "join", "slice"],
                function (e) {
                    var t = n[e];
                    h.prototype[e] = function () {
                        return A.call(this, t.apply(this._wrapped, arguments))
                    }
                }),
            h.prototype.value = function () {
                return this._wrapped
            },
            "function" == typeof define && define.amd && define("underscore", [],
                function () {
                    return h
                })
    }.call(this);
var Hogan = {};
if (function (e, t) {
        function n(e) {
            return String(null === e || void 0 === e ? "" : e)
        }

        function r(e) {
            return e = n(e),
                l.test(e) ? e.replace(i, "&amp;").replace(o, "&lt;").replace(s, "&gt;").replace(a, "&#39;").replace(u, "&quot;") : e
        }
        e.Template = function (e, n, r, i) {
                this.r = e || this.r,
                    this.c = r,
                    this.options = i,
                    this.text = n || "",
                    this.buf = t ? [] : ""
            },
            e.Template.prototype = {
                r: function () {
                        return ""
                    },
                    v: r,
                t: n,
                render: function (e, t, n) {
                        return this.ri([e], t || {},
                            n)
                    },
                    ri: function (e, t, n) {
                        return this.r(e, t, n)
                    },
                    rp: function (e, t, n, r) {
                        var i = n[e];
                        return i ? (this.c && "string" == typeof i && (i = this.c.compile(i, this.options)), i.ri(t, n, r)) : ""
                    },
                    rs: function (e, t, n) {
                        var r = e[e.length - 1];
                        if (!c(r)) return void n(e, t, this);
                        for (var i = 0; i < r.length; i++) e.push(r[i]),
                            n(e, t, this),
                            e.pop()
                    },
                    s: function (e, t, n, r, i, o, s) {
                        var a;
                        return c(e) && 0 === e.length ? !1 : ("function" == typeof e && (e = this.ls(e, t, n, r, i, o, s)), a = "" === e || !!e, !r && a && t && t.push("object" == typeof e ? e : t[t.length - 1]), a)
                    },
                    d: function (e, t, n, r) {
                        var i = e.split("."),
                            o = this.f(i[0], t, n, r),
                            s = null;
                        if ("." === e && c(t[t.length - 2])) return t[t.length - 1];
                        for (var a = 1; a < i.length; a++) o && "object" == typeof o && i[a] in o ? (s = o, o = o[i[a]]) : o = "";
                        return r && !o ? !1 : (r || "function" != typeof o || (t.push(s), o = this.lv(o, t, n), t.pop()), o)
                    },
                    f: function (e, t, n, r) {
                        for (var i = !1,
                            o = null,
                            s = !1,
                            a = t.length - 1; a >= 0; a--)
                            if (o = t[a], o && "object" == typeof o && e in o) {
                                i = o[e],
                                    s = !0;
                                break
                            }
                        return s ? (r || "function" != typeof i || (i = this.lv(i, t, n)), i) : r ? !1 : ""
                    },
                    ho: function (e, t, n, r, i) {
                        var o = this.c,
                            s = this.options;
                        s.delimiters = i;
                        var r = e.call(t, r);
                        return r = null == r ? String(r) : r.toString(),
                            this.b(o.compile(r, s).render(t, n)), !1
                    },
                    b: t ?
                    function (e) {
                        this.buf.push(e)
                    } : function (e) {
                        this.buf += e
                    },
                    fl: t ?
                    function () {
                        var e = this.buf.join("");
                        return this.buf = [],
                            e
                    } : function () {
                        var e = this.buf;
                        return this.buf = "",
                            e
                    },
                    ls: function (e, t, n, r, i, o, s) {
                        var a = t[t.length - 1],
                            u = null;
                        if (!r && this.c && e.length > 0) return this.ho(e, a, n, this.text.substring(i, o), s);
                        if (u = e.call(a), "function" == typeof u) {
                            if (r) return !0;
                            if (this.c) return this.ho(u, a, n, this.text.substring(i, o), s)
                        }
                        return u
                    },
                    lv: function (e, t, r) {
                        var i = t[t.length - 1],
                            o = e.call(i);
                        return "function" == typeof o && (o = n(o.call(i)), this.c && ~o.indexOf("{{")) ? this.c.compile(o, this.options).render(i, r) : n(o)
                    }
            };
        var i = /&/g,
            o = /</g,
            s = />/g,
            a = /\'/g,
            u = /\"/g,
            l = /[&<>\"\']/,
            c = Array.isArray ||
            function (e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
    }(window.Hogan),
    function (e) {
        function t(e) {
            "}" === e.n.substr(e.n.length - 1) && (e.n = e.n.substring(0, e.n.length - 1))
        }

        function n(e) {
            return e.trim ? e.trim() : e.replace(/^\s*|\s*$/g, "")
        }

        function r(e, t, n) {
            if (t.charAt(n) != e.charAt(0)) return !1;
            for (var r = 1,
                i = e.length; i > r; r++)
                if (t.charAt(n + r) != e.charAt(r)) return !1;
            return !0
        }

        function i(e, t, n, r) {
            for (var a = [], u = null, l = null; e.length > 0;)
                if (l = e.shift(), "#" == l.tag || "^" == l.tag || o(l, r)) n.push(l),
                    l.nodes = i(e, l.tag, n, r),
                    a.push(l);
                else {
                    if ("/" == l.tag) {
                        if (0 === n.length) throw new Error("Closing tag without opener: /" + l.n);
                        if (u = n.pop(), l.n != u.n && !s(l.n, u.n, r)) throw new Error("Nesting error: " + u.n + " vs. " + l.n);
                        return u.end = l.i,
                            a
                    }
                    a.push(l)
                }
            if (n.length > 0) throw new Error("missing closing tag: " + n.pop().n);
            return a
        }

        function o(e, t) {
            for (var n = 0,
                r = t.length; r > n; n++)
                if (t[n].o == e.n) return e.tag = "#", !0
        }

        function s(e, t, n) {
            for (var r = 0,
                i = n.length; i > r; r++)
                if (n[r].c == e && n[r].o == t) return !0
        }

        function a(e) {
            return e.replace(x, "\\\\").replace(v, '\\"').replace(y, "\\n").replace(b, "\\r")
        }

        function u(e) {
            return~ e.indexOf(".") ? "d" : "f"
        }

        function l(e) {
            for (var t = "",
                n = 0,
                r = e.length; r > n; n++) {
                var i = e[n].tag;
                "#" == i ? t += c(e[n].nodes, e[n].n, u(e[n].n), e[n].i, e[n].end, e[n].otag + " " + e[n].ctag) : "^" == i ? t += f(e[n].nodes, e[n].n, u(e[n].n)) : "<" == i || ">" == i ? t += p(e[n]) : "{" == i || "&" == i ? t += h(e[n].n, u(e[n].n)) : "\n" == i ? t += g('"\\n"' + (e.length - 1 == n ? "" : " + i")) : "_v" == i ? t += d(e[n].n, u(e[n].n)) : void 0 === i && (t += g('"' + a(e[n]) + '"'))
            }
            return t
        }

        function c(e, t, n, r, i, o) {
            return "if(_.s(_." + n + '("' + a(t) + '",c,p,1),c,p,0,' + r + "," + i + ',"' + o + '")){_.rs(c,p,function(c,p,_){' + l(e) + "});c.pop();}"
        }

        function f(e, t, n) {
            return "if(!_.s(_." + n + '("' + a(t) + '",c,p,1),c,p,1,0,0,"")){' + l(e) + "};"
        }

        function p(e) {
            return '_.b(_.rp("' + a(e.n) + '",c,p,"' + (e.indent || "") + '"));'
        }

        function h(e, t) {
            return "_.b(_.t(_." + t + '("' + a(e) + '",c,p,0)));'
        }

        function d(e, t) {
            return "_.b(_.v(_." + t + '("' + a(e) + '",c,p,0)));'
        }

        function g(e) {
            return "_.b(" + e + ");"
        }
        var m = /\S/,
            v = /\"/g,
            y = /\n/g,
            b = /\r/g,
            x = /\\/g,
            w = {
                "#": 1,
                "^": 2,
                "/": 3,
                "!": 4,
                ">": 5,
                "<": 6,
                "=": 7,
                _v: 8,
                "{": 9,
                "&": 10
            };
        e.scan = function (e, i) {
                function o() {
                    v.length > 0 && (y.push(new String(v)), v = "")
                }

                function s() {
                    for (var e = !0,
                        t = T; t < y.length; t++)
                        if (e = y[t].tag && w[y[t].tag] < w._v || !y[t].tag && null === y[t].match(m), !e) return !1;
                    return e
                }

                function a(e, t) {
                    if (o(), e && s())
                        for (var n, r = T; r < y.length; r++) y[r].tag || ((n = y[r + 1]) && ">" == n.tag && (n.indent = y[r].toString()), y.splice(r, 1));
                    else t || y.push({
                        tag: "\n"
                    });
                    b = !1,
                        T = y.length
                }

                function u(e, t) {
                    var r = "=" + k,
                        i = e.indexOf(r, t),
                        o = n(e.substring(e.indexOf("=", t) + 1, i)).split(" ");
                    return C = o[0],
                        k = o[1],
                        i + r.length - 1
                }
                var l = e.length,
                    c = 0,
                    f = 1,
                    p = 2,
                    h = c,
                    d = null,
                    g = null,
                    v = "",
                    y = [],
                    b = !1,
                    x = 0,
                    T = 0,
                    C = "{{",
                    k = "}}";
                for (i && (i = i.split(" "), C = i[0], k = i[1]), x = 0; l > x; x++) h == c ? r(C, e, x) ? (--x, o(), h = f) : "\n" == e.charAt(x) ? a(b) : v += e.charAt(x) : h == f ? (x += C.length - 1, g = w[e.charAt(x + 1)], d = g ? e.charAt(x + 1) : "_v", "=" == d ? (x = u(e, x), h = c) : (g && x++, h = p), b = x) : r(k, e, x) ? (y.push({
                    tag: d,
                    n: n(v),
                    otag: C,
                    ctag: k,
                    i: "/" == d ? b - k.length : x + C.length
                }), v = "", x += k.length - 1, h = c, "{" == d && ("}}" == k ? x++ : t(y[y.length - 1]))) : v += e.charAt(x);
                return a(b, !0),
                    y
            },
            e.generate = function (t, n, r) {
                var i = 'var _=this;_.b(i=i||"");' + l(t) + "return _.fl();";
                return r.asString ? "function(c,p,i){" + i + ";}" : new e.Template(new Function("c", "p", "i", i), n, e, r)
            },
            e.parse = function (e, t, n) {
                return n = n || {},
                    i(e, "", [], n.sectionTags || [])
            },
            e.cache = {},
            e.compile = function (e, t) {
                t = t || {};
                var n = e + "||" + !!t.asString,
                    r = this.cache[n];
                return r ? r : (r = this.generate(this.parse(this.scan(e, t.delimiters), e, t), e, t), this.cache[n] = r)
            }
    }(window.Hogan), define("hogan",
        function (e) {
            return function () {
                var t;
                return t || e.Hogan
            }
        }(this)), "undefined" == typeof jQuery) throw new Error("Bootstrap requires jQuery"); +
function (e) {
    function t() {
        var e = document.createElement("bootstrap"),
            t = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var n in t)
            if (void 0 !== e.style[n]) return {
                end: t[n]
            }
    }
    e.fn.emulateTransitionEnd = function (t) {
            var n = !1,
                r = this;
            e(this).one(e.support.transition.end,
                function () {
                    n = !0
                });
            var i = function () {
                n || e(r).trigger(e.support.transition.end)
            };
            return setTimeout(i, t),
                this
        },
        e(function () {
            e.support.transition = t()
        })
}(jQuery), +
function (e) {
    var t = '[data-dismiss="alert"]',
        n = function (n) {
            e(n).on("click", t, this.close)
        };
    n.prototype.close = function (t) {
        function n() {
            o.trigger("closed.bs.alert").remove()
        }
        var r = e(this),
            i = r.attr("data-target");
        i || (i = r.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = e(i);
        t && t.preventDefault(),
            o.length || (o = r.hasClass("alert") ? r : r.parent()),
            o.trigger(t = e.Event("close.bs.alert")),
            t.isDefaultPrevented() || (o.removeClass("in"), e.support.transition && o.hasClass("fade") ? o.one(e.support.transition.end, n).emulateTransitionEnd(150) : n())
    };
    var r = e.fn.alert;
    e.fn.alert = function (t) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.alert");
                i || r.data("bs.alert", i = new n(this)),
                    "string" == typeof t && i[t].call(r)
            })
        },
        e.fn.alert.Constructor = n,
        e.fn.alert.noConflict = function () {
            return e.fn.alert = r,
                this
        },
        e(document).on("click.bs.alert.data-api", t, n.prototype.close)
}(jQuery), +
function (e) {
    var t = function (n, r) {
        this.$element = e(n),
            this.options = e.extend({},
                t.DEFAULTS, r)
    };
    t.DEFAULTS = {
            loadingText: "loading..."
        },
        t.prototype.setState = function (e) {
            var t = "disabled",
                n = this.$element,
                r = n.is("input") ? "val" : "html",
                i = n.data();
            e += "Text",
                i.resetText || n.data("resetText", n[r]()),
                n[r](i[e] || this.options[e]),
                setTimeout(function () {
                        "loadingText" == e ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
                    },
                    0)
        },
        t.prototype.toggle = function () {
            var e = this.$element.closest('[data-toggle="buttons"]'),
                t = !0;
            if (e.length) {
                var n = this.$element.find("input");
                "radio" === n.prop("type") && (n.prop("checked") && this.$element.hasClass("active") ? t = !1 : e.find(".active").removeClass("active")),
                    t && n.prop("checked", !this.$element.hasClass("active")).trigger("change")
            }
            t && this.$element.toggleClass("active")
        };
    var n = e.fn.button;
    e.fn.button = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.button"),
                    o = "object" == typeof n && n;
                i || r.data("bs.button", i = new t(this, o)),
                    "toggle" == n ? i.toggle() : n && i.setState(n)
            })
        },
        e.fn.button.Constructor = t,
        e.fn.button.noConflict = function () {
            return e.fn.button = n,
                this
        },
        e(document).on("click.bs.button.data-api", "[data-toggle^=button]",
            function (t) {
                var n = e(t.target);
                n.hasClass("btn") || (n = n.closest(".btn")),
                    n.button("toggle"),
                    t.preventDefault()
            })
}(jQuery), +
function (e) {
    var t = function (t, n) {
        this.$element = e(t),
            this.$indicators = this.$element.find(".carousel-indicators"),
            this.options = n,
            this.paused = this.sliding = this.interval = this.$active = this.$items = null,
            "hover" == this.options.pause && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.DEFAULTS = {
            interval: 5e3,
            pause: "hover",
            wrap: !0
        },
        t.prototype.cycle = function (t) {
            return t || (this.paused = !1),
                this.interval && clearInterval(this.interval),
                this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)),
                this
        },
        t.prototype.getActiveIndex = function () {
            return this.$active = this.$element.find(".item.active"),
                this.$items = this.$active.parent().children(),
                this.$items.index(this.$active)
        },
        t.prototype.to = function (t) {
            var n = this,
                r = this.getActiveIndex();
            return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel",
                function () {
                    n.to(t)
                }) : r == t ? this.pause().cycle() : this.slide(t > r ? "next" : "prev", e(this.$items[t]))
        },
        t.prototype.pause = function (t) {
            return t || (this.paused = !0),
                this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle(!0)),
                this.interval = clearInterval(this.interval),
                this
        },
        t.prototype.next = function () {
            return this.sliding ? void 0 : this.slide("next")
        },
        t.prototype.prev = function () {
            return this.sliding ? void 0 : this.slide("prev")
        },
        t.prototype.slide = function (t, n) {
            var r = this.$element.find(".item.active"),
                i = n || r[t](),
                o = this.interval,
                s = "next" == t ? "left" : "right",
                a = "next" == t ? "first" : "last",
                u = this;
            if (!i.length) {
                if (!this.options.wrap) return;
                i = this.$element.find(".item")[a]()
            }
            this.sliding = !0,
                o && this.pause();
            var l = e.Event("slide.bs.carousel", {
                relatedTarget: i[0],
                direction: s
            });
            if (!i.hasClass("active")) {
                if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel",
                    function () {
                        var t = e(u.$indicators.children()[u.getActiveIndex()]);
                        t && t.addClass("active")
                    })), e.support.transition && this.$element.hasClass("slide")) {
                    if (this.$element.trigger(l), l.isDefaultPrevented()) return;
                    i.addClass(t),
                        i[0].offsetWidth,
                        r.addClass(s),
                        i.addClass(s),
                        r.one(e.support.transition.end,
                            function () {
                                i.removeClass([t, s].join(" ")).addClass("active"),
                                    r.removeClass(["active", s].join(" ")),
                                    u.sliding = !1,
                                    setTimeout(function () {
                                            u.$element.trigger("slid.bs.carousel")
                                        },
                                        0)
                            }).emulateTransitionEnd(600)
                } else {
                    if (this.$element.trigger(l), l.isDefaultPrevented()) return;
                    r.removeClass("active"),
                        i.addClass("active"),
                        this.sliding = !1,
                        this.$element.trigger("slid.bs.carousel")
                }
                return o && this.cycle(),
                    this
            }
        };
    var n = e.fn.carousel;
    e.fn.carousel = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.carousel"),
                    o = e.extend({},
                        t.DEFAULTS, r.data(), "object" == typeof n && n),
                    s = "string" == typeof n ? n : o.slide;
                i || r.data("bs.carousel", i = new t(this, o)),
                    "number" == typeof n ? i.to(n) : s ? i[s]() : o.interval && i.pause().cycle()
            })
        },
        e.fn.carousel.Constructor = t,
        e.fn.carousel.noConflict = function () {
            return e.fn.carousel = n,
                this
        },
        e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]",
            function (t) {
                var n, r = e(this),
                    i = e(r.attr("data-target") || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")),
                    o = e.extend({},
                        i.data(), r.data()),
                    s = r.attr("data-slide-to");
                s && (o.interval = !1),
                    i.carousel(o), (s = r.attr("data-slide-to")) && i.data("bs.carousel").to(s),
                    t.preventDefault()
            }),
        e(window).on("load",
            function () {
                e('[data-ride="carousel"]').each(function () {
                    var t = e(this);
                    t.carousel(t.data())
                })
            })
}(jQuery), +
function (e) {
    var t = function (n, r) {
        this.$element = e(n),
            this.options = e.extend({},
                t.DEFAULTS, r),
            this.transitioning = null,
            this.options.parent && (this.$parent = e(this.options.parent)),
            this.options.toggle && this.toggle()
    };
    t.DEFAULTS = {
            toggle: !0
        },
        t.prototype.dimension = function () {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        },
        t.prototype.show = function () {
            if (!this.transitioning && !this.$element.hasClass("in")) {
                var t = e.Event("show.bs.collapse");
                if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                    var n = this.$parent && this.$parent.find("> .panel > .in");
                    if (n && n.length) {
                        var r = n.data("bs.collapse");
                        if (r && r.transitioning) return;
                        n.collapse("hide"),
                            r || n.data("bs.collapse", null)
                    }
                    var i = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[i](0),
                        this.transitioning = 1;
                    var o = function () {
                        this.$element.removeClass("collapsing").addClass("in")[i]("auto"),
                            this.transitioning = 0,
                            this.$element.trigger("shown.bs.collapse")
                    };
                    if (!e.support.transition) return o.call(this);
                    var s = e.camelCase(["scroll", i].join("-"));
                    this.$element.one(e.support.transition.end, e.proxy(o, this)).emulateTransitionEnd(350)[i](this.$element[0][s])
                }
            }
        },
        t.prototype.hide = function () {
            if (!this.transitioning && this.$element.hasClass("in")) {
                var t = e.Event("hide.bs.collapse");
                if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                    var n = this.dimension();
                    this.$element[n](this.$element[n]())[0].offsetHeight,
                        this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),
                        this.transitioning = 1;
                    var r = function () {
                        this.transitioning = 0,
                            this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                    };
                    return e.support.transition ? void this.$element[n](0).one(e.support.transition.end, e.proxy(r, this)).emulateTransitionEnd(350) : r.call(this)
                }
            }
        },
        t.prototype.toggle = function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        };
    var n = e.fn.collapse;
    e.fn.collapse = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.collapse"),
                    o = e.extend({},
                        t.DEFAULTS, r.data(), "object" == typeof n && n);
                i || r.data("bs.collapse", i = new t(this, o)),
                    "string" == typeof n && i[n]()
            })
        },
        e.fn.collapse.Constructor = t,
        e.fn.collapse.noConflict = function () {
            return e.fn.collapse = n,
                this
        },
        e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]",
            function (t) {
                var n, r = e(this),
                    i = r.attr("data-target") || t.preventDefault() || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""),
                    o = e(i),
                    s = o.data("bs.collapse"),
                    a = s ? "toggle" : r.data(),
                    u = r.attr("data-parent"),
                    l = u && e(u);
                s && s.transitioning || (l && l.find('[data-toggle=collapse][data-parent="' + u + '"]').not(r).addClass("collapsed"), r[o.hasClass("in") ? "addClass" : "removeClass"]("collapsed")),
                    o.collapse(a)
            })
}(jQuery), +
function (e) {
    function t() {
        e(r).remove(),
            e(i).each(function (t) {
                var r = n(e(this));
                r.hasClass("open") && (r.trigger(t = e.Event("hide.bs.dropdown")), t.isDefaultPrevented() || r.removeClass("open").trigger("hidden.bs.dropdown"))
            })
    }

    function n(t) {
        var n = t.attr("data-target");
        n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, ""));
        var r = n && e(n);
        return r && r.length ? r : t.parent()
    }
    var r = ".dropdown-backdrop",
        i = "[data-toggle=dropdown]",
        o = function (t) {
            e(t).on("click.bs.dropdown", this.toggle)
        };
    o.prototype.toggle = function (r) {
            var i = e(this);
            if (!i.is(".disabled, :disabled")) {
                var o = n(i),
                    s = o.hasClass("open");
                if (t(), !s) {
                    if ("ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && e('<div class="dropdown-backdrop"/>').insertAfter(e(this)).on("click", t), o.trigger(r = e.Event("show.bs.dropdown")), r.isDefaultPrevented()) return;
                    o.toggleClass("open").trigger("shown.bs.dropdown"),
                        i.focus()
                }
                return !1
            }
        },
        o.prototype.keydown = function (t) {
            if (/(38|40|27)/.test(t.keyCode)) {
                var r = e(this);
                if (t.preventDefault(), t.stopPropagation(), !r.is(".disabled, :disabled")) {
                    var o = n(r),
                        s = o.hasClass("open");
                    if (!s || s && 27 == t.keyCode) return 27 == t.which && o.find(i).focus(),
                        r.click();
                    var a = e("[role=menu] li:not(.divider):visible a", o);
                    if (a.length) {
                        var u = a.index(a.filter(":focus"));
                        38 == t.keyCode && u > 0 && u--,
                            40 == t.keyCode && u < a.length - 1 && u++, ~u || (u = 0),
                            a.eq(u).focus()
                    }
                }
            }
        };
    var s = e.fn.dropdown;
    e.fn.dropdown = function (t) {
            return this.each(function () {
                var n = e(this),
                    r = n.data("bs.dropdown");
                r || n.data("bs.dropdown", r = new o(this)),
                    "string" == typeof t && r[t].call(n)
            })
        },
        e.fn.dropdown.Constructor = o,
        e.fn.dropdown.noConflict = function () {
            return e.fn.dropdown = s,
                this
        },
        e(document).on("click.bs.dropdown.data-api", t).on("click.bs.dropdown.data-api", ".dropdown form",
            function (e) {
                e.stopPropagation()
            }).on("click.bs.dropdown.data-api", i, o.prototype.toggle).on("keydown.bs.dropdown.data-api", i + ", [role=menu]", o.prototype.keydown)
}(jQuery), +
function (e) {
    var t = function (t, n) {
        this.options = n,
            this.$element = e(t),
            this.$backdrop = this.isShown = null,
            this.options.remote && this.$element.load(this.options.remote)
    };
    t.DEFAULTS = {
            backdrop: !0,
            keyboard: !0,
            show: !0
        },
        t.prototype.toggle = function (e) {
            return this[this.isShown ? "hide" : "show"](e)
        },
        t.prototype.show = function (t) {
            var n = this,
                r = e.Event("show.bs.modal", {
                    relatedTarget: t
                });
            this.$element.trigger(r),
                this.isShown || r.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', e.proxy(this.hide, this)), this.backdrop(function () {
                    var r = e.support.transition && n.$element.hasClass("fade");
                    n.$element.parent().length || n.$element.appendTo(document.body),
                        n.$element.show(),
                        r && n.$element[0].offsetWidth,
                        n.$element.addClass("in").attr("aria-hidden", !1),
                        n.enforceFocus();
                    var i = e.Event("shown.bs.modal", {
                        relatedTarget: t
                    });
                    r ? n.$element.find(".modal-dialog").one(e.support.transition.end,
                        function () {
                            n.$element.focus().trigger(i)
                        }).emulateTransitionEnd(300) : n.$element.focus().trigger(i)
                }))
        },
        t.prototype.hide = function (t) {
            t && t.preventDefault(),
                t = e.Event("hide.bs.modal"),
                this.$element.trigger(t),
                this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), e(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), e.support.transition && this.$element.hasClass("fade") ? this.$element.one(e.support.transition.end, e.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
        },
        t.prototype.enforceFocus = function () {
            e(document).off("focusin.bs.modal").on("focusin.bs.modal", e.proxy(function (e) {
                    this.$element[0] === e.target || this.$element.has(e.target).length || this.$element.focus()
                },
                this))
        },
        t.prototype.escape = function () {
            this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", e.proxy(function (e) {
                    27 == e.which && this.hide()
                },
                this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
        },
        t.prototype.hideModal = function () {
            var e = this;
            this.$element.hide(),
                this.backdrop(function () {
                    e.removeBackdrop(),
                        e.$element.trigger("hidden.bs.modal")
                })
        },
        t.prototype.removeBackdrop = function () {
            this.$backdrop && this.$backdrop.remove(),
                this.$backdrop = null
        },
        t.prototype.backdrop = function (t) {
            var n = this.$element.hasClass("fade") ? "fade" : "";
            if (this.isShown && this.options.backdrop) {
                var r = e.support.transition && n;
                if (this.$backdrop = e('<div class="modal-backdrop ' + n + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", e.proxy(function (e) {
                        e.target === e.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                    },
                    this)), r && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
                r ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()
            } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t).emulateTransitionEnd(150) : t()) : t && t()
        };
    var n = e.fn.modal;
    e.fn.modal = function (n, r) {
            return this.each(function () {
                var i = e(this),
                    o = i.data("bs.modal"),
                    s = e.extend({},
                        t.DEFAULTS, i.data(), "object" == typeof n && n);
                o || i.data("bs.modal", o = new t(this, s)),
                    "string" == typeof n ? o[n](r) : s.show && o.show(r)
            })
        },
        e.fn.modal.Constructor = t,
        e.fn.modal.noConflict = function () {
            return e.fn.modal = n,
                this
        },
        e(document).on("click.bs.modal.data-api", '[data-toggle="modal"]',
            function (t) {
                var n = e(this),
                    r = n.attr("href"),
                    i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
                    o = i.data("modal") ? "toggle" : e.extend({
                            remote: !/#/.test(r) && r
                        },
                        i.data(), n.data());
                t.preventDefault(),
                    i.modal(o, this).one("hide",
                        function () {
                            n.is(":visible") && n.focus()
                        })
            }),
        e(document).on("show.bs.modal", ".modal",
            function () {
                e(document.body).addClass("modal-open")
            }).on("hidden.bs.modal", ".modal",
            function () {
                e(document.body).removeClass("modal-open")
            })
}(jQuery), +
function (e) {
    var t = function (e, t) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null,
            this.init("tooltip", e, t)
    };
    t.DEFAULTS = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: "body"
        },
        t.prototype.init = function (t, n, r) {
            this.enabled = !0,
                this.type = t,
                this.$element = e(n),
                this.options = this.getOptions(r);
            for (var i = this.options.trigger.split(" "), o = i.length; o--;) {
                var s = i[o];
                if ("click" == s) this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this));
                else if ("manual" != s) {
                    var a = "hover" == s ? "mouseenter" : "focus",
                        u = "hover" == s ? "mouseleave" : "blur";
                    this.$element.on(a + "." + this.type, this.options.selector, e.proxy(this.enter, this)),
                        this.$element.on(u + "." + this.type, this.options.selector, e.proxy(this.leave, this))
                }
            }
            this.options.selector ? this._options = e.extend({},
                this.options, {
                    trigger: "manual",
                    selector: ""
                }) : this.fixTitle()
        },
        t.prototype.getDefaults = function () {
            return t.DEFAULTS
        },
        t.prototype.getOptions = function (t) {
            return t = e.extend({},
                    this.getDefaults(), this.$element.data(), t),
                t.delay && "number" == typeof t.delay && (t.delay = {
                    show: t.delay,
                    hide: t.delay
                }),
                t
        },
        t.prototype.getDelegateOptions = function () {
            var t = {},
                n = this.getDefaults();
            return this._options && e.each(this._options,
                    function (e, r) {
                        n[e] != r && (t[e] = r)
                    }),
                t
        },
        t.prototype.enter = function (t) {
            var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
            return clearTimeout(n.timeout),
                n.hoverState = "in",
                n.options.delay && n.options.delay.show ? void(n.timeout = setTimeout(function () {
                        "in" == n.hoverState && n.show()
                    },
                    n.options.delay.show)) : n.show()
        },
        t.prototype.leave = function (t) {
            var n = t instanceof this.constructor ? t : e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
            return clearTimeout(n.timeout),
                n.hoverState = "out",
                n.options.delay && n.options.delay.hide ? void(n.timeout = setTimeout(function () {
                        "out" == n.hoverState && n.hide()
                    },
                    n.options.delay.hide)) : n.hide()
        },
        t.prototype.show = function () {
            var t = e.Event("show.bs." + this.type);
            if (this.hasContent() && this.enabled) {
                if (this.$element.trigger(t), t.isDefaultPrevented()) return;
                var n = this.tip();
                this.setContent(),
                    this.options.animation && n.addClass("fade");
                var r = "function" == typeof this.options.placement ? this.options.placement.call(this, n[0], this.$element[0]) : this.options.placement,
                    i = /\s?auto?\s?/i,
                    o = i.test(r);
                o && (r = r.replace(i, "") || "top"),
                    n.detach().css({
                        top: 0,
                        left: 0,
                        display: "block"
                    }).addClass(r),
                    this.options.container ? n.appendTo(this.options.container) : n.insertAfter(this.$element);
                var s = this.getPosition(),
                    a = n[0].offsetWidth,
                    u = n[0].offsetHeight;
                if (o) {
                    var l = this.$element.parent(),
                        c = r,
                        f = document.documentElement.scrollTop || document.body.scrollTop,
                        p = "body" == this.options.container ? window.innerWidth : l.outerWidth(),
                        h = "body" == this.options.container ? window.innerHeight : l.outerHeight(),
                        d = "body" == this.options.container ? 0 : l.offset().left;
                    r = "bottom" == r && s.top + s.height + u - f > h ? "top" : "top" == r && s.top - f - u < 0 ? "bottom" : "right" == r && s.right + a > p ? "left" : "left" == r && s.left - a < d ? "right" : r,
                        n.removeClass(c).addClass(r)
                }
                var g = this.getCalculatedOffset(r, s, a, u);
                this.applyPlacement(g, r),
                    this.$element.trigger("shown.bs." + this.type)
            }
        },
        t.prototype.applyPlacement = function (e, t) {
            var n, r = this.tip(),
                i = r[0].offsetWidth,
                o = r[0].offsetHeight,
                s = parseInt(r.css("margin-top"), 10),
                a = parseInt(r.css("margin-left"), 10);
            isNaN(s) && (s = 0),
                isNaN(a) && (a = 0),
                e.top = e.top + s,
                e.left = e.left + a,
                r.offset(e).addClass("in");
            var u = r[0].offsetWidth,
                l = r[0].offsetHeight;
            if ("top" == t && l != o && (n = !0, e.top = e.top + o - l), /bottom|top/.test(t)) {
                var c = 0;
                e.left < 0 && (c = -2 * e.left, e.left = 0, r.offset(e), u = r[0].offsetWidth, l = r[0].offsetHeight),
                    this.replaceArrow(c - i + u, u, "left")
            } else this.replaceArrow(l - o, l, "top");
            n && r.offset(e)
        },
        t.prototype.replaceArrow = function (e, t, n) {
            this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
        },
        t.prototype.setContent = function () {
            var e = this.tip(),
                t = this.getTitle();
            e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t),
                e.removeClass("fade in top bottom left right")
        },
        t.prototype.hide = function () {
            function t() {
                "in" != n.hoverState && r.detach()
            }
            var n = this,
                r = this.tip(),
                i = e.Event("hide.bs." + this.type);
            return this.$element.trigger(i),
                i.isDefaultPrevented() ? void 0 : (r.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? r.one(e.support.transition.end, t).emulateTransitionEnd(150) : t(), this.$element.trigger("hidden.bs." + this.type), this)
        },
        t.prototype.fixTitle = function () {
            var e = this.$element;
            (e.attr("title") || "string" != typeof e.attr("data-original-title")) && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
        },
        t.prototype.hasContent = function () {
            return this.getTitle()
        },
        t.prototype.getPosition = function () {
            var t = this.$element[0];
            return e.extend({},
                "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect() : {
                    width: t.offsetWidth,
                    height: t.offsetHeight
                },
                this.$element.offset())
        },
        t.prototype.getCalculatedOffset = function (e, t, n, r) {
            return "bottom" == e ? {
                top: t.top + t.height,
                left: t.left + t.width / 2 - n / 2
            } : "top" == e ? {
                top: t.top - r,
                left: t.left + t.width / 2 - n / 2
            } : "left" == e ? {
                top: t.top + t.height / 2 - r / 2,
                left: t.left - n
            } : {
                top: t.top + t.height / 2 - r / 2,
                left: t.left + t.width
            }
        },
        t.prototype.getTitle = function () {
            var e, t = this.$element,
                n = this.options;
            return e = t.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(t[0]) : n.title)
        },
        t.prototype.tip = function () {
            return this.$tip = this.$tip || e(this.options.template)
        },
        t.prototype.arrow = function () {
            return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
        },
        t.prototype.validate = function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        t.prototype.enable = function () {
            this.enabled = !0
        },
        t.prototype.disable = function () {
            this.enabled = !1
        },
        t.prototype.toggleEnabled = function () {
            this.enabled = !this.enabled
        },
        t.prototype.toggle = function (t) {
            var n = t ? e(t.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
            n.tip().hasClass("in") ? n.leave(n) : n.enter(n)
        },
        t.prototype.destroy = function () {
            this.hide().$element.off("." + this.type).removeData("bs." + this.type)
        };
    var n = e.fn.tooltip;
    e.fn.tooltip = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.tooltip"),
                    o = "object" == typeof n && n;
                i || r.data("bs.tooltip", i = new t(this, o)),
                    "string" == typeof n && i[n]()
            })
        },
        e.fn.tooltip.Constructor = t,
        e.fn.tooltip.noConflict = function () {
            return e.fn.tooltip = n,
                this
        }
}(jQuery), +
function (e) {
    var t = function (e, t) {
        this.init("popover", e, t)
    };
    if (!e.fn.tooltip) throw new Error("Popover requires tooltip.js");
    t.DEFAULTS = e.extend({},
            e.fn.tooltip.Constructor.DEFAULTS, {
                placement: "right",
                trigger: "click",
                content: "",
                template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            }),
        t.prototype = e.extend({},
            e.fn.tooltip.Constructor.prototype),
        t.prototype.constructor = t,
        t.prototype.getDefaults = function () {
            return t.DEFAULTS
        },
        t.prototype.setContent = function () {
            var e = this.tip(),
                t = this.getTitle(),
                n = this.getContent();
            e.find(".popover-title")[this.options.html ? "html" : "text"](t),
                e.find(".popover-content")[this.options.html ? "html" : "text"](n),
                e.removeClass("fade top bottom left right in"),
                e.find(".popover-title").html() || e.find(".popover-title").hide()
        },
        t.prototype.hasContent = function () {
            return this.getTitle() || this.getContent()
        },
        t.prototype.getContent = function () {
            var e = this.$element,
                t = this.options;
            return e.attr("data-content") || ("function" == typeof t.content ? t.content.call(e[0]) : t.content)
        },
        t.prototype.arrow = function () {
            return this.$arrow = this.$arrow || this.tip().find(".arrow")
        },
        t.prototype.tip = function () {
            return this.$tip || (this.$tip = e(this.options.template)),
                this.$tip
        };
    var n = e.fn.popover;
    e.fn.popover = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.popover"),
                    o = "object" == typeof n && n;
                i || r.data("bs.popover", i = new t(this, o)),
                    "string" == typeof n && i[n]()
            })
        },
        e.fn.popover.Constructor = t,
        e.fn.popover.noConflict = function () {
            return e.fn.popover = n,
                this
        }
}(jQuery), +
function (e) {
    function t(n, r) {
        var i, o = e.proxy(this.process, this);
        this.$element = e(e(n).is("body") ? window : n),
            this.$body = e("body"),
            this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", o),
            this.options = e.extend({},
                t.DEFAULTS, r),
            this.selector = (this.options.target || (i = e(n).attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a",
            this.offsets = e([]),
            this.targets = e([]),
            this.activeTarget = null,
            this.refresh(),
            this.process()
    }
    t.DEFAULTS = {
            offset: 10
        },
        t.prototype.refresh = function () {
            var t = this.$element[0] == window ? "offset" : "position";
            this.offsets = e([]),
                this.targets = e([]); {
                var n = this;
                this.$body.find(this.selector).map(function () {
                    var r = e(this),
                        i = r.data("target") || r.attr("href"),
                        o = /^#\w/.test(i) && e(i);
                    return o && o.length && [
                        [o[t]().top + (!e.isWindow(n.$scrollElement.get(0)) && n.$scrollElement.scrollTop()), i]
                    ] || null
                }).sort(function (e, t) {
                    return e[0] - t[0]
                }).each(function () {
                    n.offsets.push(this[0]),
                        n.targets.push(this[1])
                })
            }
        },
        t.prototype.process = function () {
            var e, t = this.$scrollElement.scrollTop() + this.options.offset,
                n = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                r = n - this.$scrollElement.height(),
                i = this.offsets,
                o = this.targets,
                s = this.activeTarget;
            if (t >= r) return s != (e = o.last()[0]) && this.activate(e);
            for (e = i.length; e--;) s != o[e] && t >= i[e] && (!i[e + 1] || t <= i[e + 1]) && this.activate(o[e])
        },
        t.prototype.activate = function (t) {
            this.activeTarget = t,
                e(this.selector).parents(".active").removeClass("active");
            var n = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
                r = e(n).parents("li").addClass("active");
            r.parent(".dropdown-menu").length && (r = r.closest("li.dropdown").addClass("active")),
                r.trigger("activate.bs.scrollspy")
        };
    var n = e.fn.scrollspy;
    e.fn.scrollspy = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.scrollspy"),
                    o = "object" == typeof n && n;
                i || r.data("bs.scrollspy", i = new t(this, o)),
                    "string" == typeof n && i[n]()
            })
        },
        e.fn.scrollspy.Constructor = t,
        e.fn.scrollspy.noConflict = function () {
            return e.fn.scrollspy = n,
                this
        },
        e(window).on("load",
            function () {
                e('[data-spy="scroll"]').each(function () {
                    var t = e(this);
                    t.scrollspy(t.data())
                })
            })
}(jQuery), +
function (e) {
    var t = function (t) {
        this.element = e(t)
    };
    t.prototype.show = function () {
            var t = this.element,
                n = t.closest("ul:not(.dropdown-menu)"),
                r = t.data("target");
            if (r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
                var i = n.find(".active:last a")[0],
                    o = e.Event("show.bs.tab", {
                        relatedTarget: i
                    });
                if (t.trigger(o), !o.isDefaultPrevented()) {
                    var s = e(r);
                    this.activate(t.parent("li"), n),
                        this.activate(s, s.parent(),
                            function () {
                                t.trigger({
                                    type: "shown.bs.tab",
                                    relatedTarget: i
                                })
                            })
                }
            }
        },
        t.prototype.activate = function (t, n, r) {
            function i() {
                o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),
                    t.addClass("active"),
                    s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"),
                    t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"),
                    r && r()
            }
            var o = n.find("> .active"),
                s = r && e.support.transition && o.hasClass("fade");
            s ? o.one(e.support.transition.end, i).emulateTransitionEnd(150) : i(),
                o.removeClass("in")
        };
    var n = e.fn.tab;
    e.fn.tab = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.tab");
                i || r.data("bs.tab", i = new t(this)),
                    "string" == typeof n && i[n]()
            })
        },
        e.fn.tab.Constructor = t,
        e.fn.tab.noConflict = function () {
            return e.fn.tab = n,
                this
        },
        e(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]',
            function (t) {
                t.preventDefault(),
                    e(this).tab("show")
            })
}(jQuery), +
function (e) {
    var t = function (n, r) {
        this.options = e.extend({},
                t.DEFAULTS, r),
            this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)),
            this.$element = e(n),
            this.affixed = this.unpin = null,
            this.checkPosition()
    };
    t.RESET = "affix affix-top affix-bottom",
        t.DEFAULTS = {
            offset: 0
        },
        t.prototype.checkPositionWithEventLoop = function () {
            setTimeout(e.proxy(this.checkPosition, this), 1)
        },
        t.prototype.checkPosition = function () {
            if (this.$element.is(":visible")) {
                var n = e(document).height(),
                    r = this.$window.scrollTop(),
                    i = this.$element.offset(),
                    o = this.options.offset,
                    s = o.top,
                    a = o.bottom;
                "object" != typeof o && (a = s = o),
                    "function" == typeof s && (s = o.top()),
                    "function" == typeof a && (a = o.bottom());
                var u = null != this.unpin && r + this.unpin <= i.top ? !1 : null != a && i.top + this.$element.height() >= n - a ? "bottom" : null != s && s >= r ? "top" : !1;
                this.affixed !== u && (this.unpin && this.$element.css("top", ""), this.affixed = u, this.unpin = "bottom" == u ? i.top - r : null, this.$element.removeClass(t.RESET).addClass("affix" + (u ? "-" + u : "")), "bottom" == u && this.$element.offset({
                    top: document.body.offsetHeight - a - this.$element.height()
                }))
            }
        };
    var n = e.fn.affix;
    e.fn.affix = function (n) {
            return this.each(function () {
                var r = e(this),
                    i = r.data("bs.affix"),
                    o = "object" == typeof n && n;
                i || r.data("bs.affix", i = new t(this, o)),
                    "string" == typeof n && i[n]()
            })
        },
        e.fn.affix.Constructor = t,
        e.fn.affix.noConflict = function () {
            return e.fn.affix = n,
                this
        },
        e(window).on("load",
            function () {
                e('[data-spy="affix"]').each(function () {
                    var t = e(this),
                        n = t.data();
                    n.offset = n.offset || {},
                        n.offsetBottom && (n.offset.bottom = n.offsetBottom),
                        n.offsetTop && (n.offset.top = n.offsetTop),
                        t.affix(n)
                })
            })
}(jQuery),
define("bootstrap",
        function () {}),
    requirejs.config({
        paths: {
            jquery: "bower-libs/jquery/jquery",
            underscore: "bower-libs/underscore/underscore",
            rjs: "../res-min/require",
            hogan: "libs/hogan",
            bootstrap: "bower-libs/bootstrap/dist/js/bootstrap"
        },
        shim: {
            underscore: {
                exports: "_"
            },
            hogan: {
                exports: "Hogan"
            }
        }
    }),
    require(["jquery", "underscore", "rjs", "hogan", "bootstrap"],
        function () {}),
    define("lib",
        function () {});