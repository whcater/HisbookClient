/*
 *  /MathJax/jax/output/SVG/jax.js
 *
 *  Copyright (c) 2009-2014 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
(function (h, c, e, a) {
    var g;
    var b = "http://www.w3.org/2000/svg";
    var j = "http://www.w3.org/1999/xlink";
    a.Augment({
        config: {
            styles: {
                ".MathJax_SVG": {
                    display: "inline",
                    "font-style": "normal",
                    "font-weight": "normal",
                    "line-height": "normal",
                    "font-size": "100%",
                    "font-size-adjust": "none",
                    "text-indent": 0,
                    "text-align": "left",
                    "text-transform": "none",
                    "letter-spacing": "normal",
                    "word-spacing": "normal",
                    "word-wrap": "normal",
                    "white-space": "nowrap",
                    "float": "none",
                    direction: "ltr",
                    "max-width": "none",
                    "max-height": "none",
                    "min-width": 0,
                    "min-height": 0,
                    border: 0,
                    padding: 0,
                    margin: 0
                },
                ".MathJax_SVG_Display": {
                    position: "relative",
                    display: "block!important",
                    "text-indent": 0,
                    "max-width": "none",
                    "max-height": "none",
                    "min-width": 0,
                    "min-height": 0,
                    width: "100%"
                },
                ".MathJax_SVG *": {
                    transition: "none",
                    "-webkit-transition": "none",
                    "-moz-transition": "none",
                    "-ms-transition": "none",
                    "-o-transition": "none"
                },
                ".mjx-svg-href": {
                    fill: "blue",
                    stroke: "blue"
                },
                ".MathJax_SVG_Processing": {
                    visibility: "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    overflow: "hidden",
                    display: "block!important"
                },
                ".MathJax_SVG_Processed": {
                    display: "none!important"
                },
                ".MathJax_SVG_ExBox": {
                    display: "block!important",
                    overflow: "hidden",
                    width: "1px",
                    height: "60ex",
                    "min-height": 0,
                    "max-height": "none",
                    padding: 0,
                    border: 0,
                    margin: 0
                },
                "#MathJax_SVG_Tooltip": {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "auto",
                    height: "auto",
                    display: "none"
                }
            }
        },
        hideProcessedMath: true,
        fontNames: ["TeX", "STIX", "STIX-Web", "Asana-Math", "Gyre-Termes", "Gyre-Pagella", "Latin-Modern", "Neo-Euler"],
        Config: function () {
            this.SUPER(arguments).Config.apply(this, arguments);
            var m = c.config.menuSettings,
                l = this.config,
                k = m.font;
            if (m.scale) {
                l.scale = m.scale
            }
            if (k && k !== "Auto") {
                k = k.replace(/(Local|Web|Image)$/i, "");
                k = k.replace(/([a-z])([A-Z])/, "$1-$2");
                this.fontInUse = k
            } else {
                this.fontInUse = l.font || "TeX"
            } if (this.fontNames.indexOf(this.fontInUse) < 0) {
                this.fontInUse = "TeX"
            }
            this.fontDir += "/" + this.fontInUse;
            if (!this.require) {
                this.require = []
            }
            this.require.push(this.fontDir + "/fontdata.js");
            this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js")
        }, Startup: function () {
            EVENT = MathJax.Extension.MathEvents.Event;
            TOUCH = MathJax.Extension.MathEvents.Touch;
            HOVER = MathJax.Extension.MathEvents.Hover;
            this.ContextMenu = EVENT.ContextMenu;
            this.Mousedown = EVENT.AltContextMenu;
            this.Mouseover = HOVER.Mouseover;
            this.Mouseout = HOVER.Mouseout;
            this.Mousemove = HOVER.Mousemove;
            this.hiddenDiv = e.Element("div", {
                style: {
                    visibility: "hidden",
                    overflow: "hidden",
                    position: "absolute",
                    top: 0,
                    height: "1px",
                    width: "auto",
                    padding: 0,
                    border: 0,
                    margin: 0,
                    textAlign: "left",
                    textIndent: 0,
                    textTransform: "none",
                    lineHeight: "normal",
                    letterSpacing: "normal",
                    wordSpacing: "normal"
                }
            });
            if (!document.body.firstChild) {
                document.body.appendChild(this.hiddenDiv)
            } else {
                document.body.insertBefore(this.hiddenDiv, document.body.firstChild)
            }
            this.hiddenDiv = e.addElement(this.hiddenDiv, "div", {
                id: "MathJax_SVG_Hidden"
            });
            var k = e.addElement(this.hiddenDiv, "div", {
                style: {
                    width: "5in"
                }
            });
            this.pxPerInch = k.offsetWidth / 5;
            this.hiddenDiv.removeChild(k);
            this.textSVG = this.Element("svg");
            d = this.addElement(this.addElement(this.hiddenDiv.parentNode, "svg"), "defs", {
                id: "MathJax_SVG_glyphs"
            });
            f = {};
            this.ExSpan = e.Element("span", {
                style: {
                    position: "absolute",
                    "font-size-adjust": "none"
                }
            }, [
                ["span", {
                    className: "MathJax_SVG_ExBox"
                }]
            ]);
            this.linebreakSpan = e.Element("span", null, [
                ["hr", {
                    style: {
                        width: "auto",
                        size: 1,
                        padding: 0,
                        border: 0,
                        margin: 0
                    }
                }]
            ]);
            return h.Styles(this.config.styles, ["InitializeSVG", this])
        }, InitializeSVG: function () {
            document.body.appendChild(this.ExSpan);
            document.body.appendChild(this.linebreakSpan);
            this.defaultEx = this.ExSpan.firstChild.offsetHeight / 60;
            this.defaultWidth = this.linebreakSpan.firstChild.offsetWidth;
            document.body.removeChild(this.linebreakSpan);
            document.body.removeChild(this.ExSpan)
        }, preTranslate: function (o) {
            var t = o.jax[this.id],
                u, r = t.length,
                z, s, A, n, y, l, x, q, k, w = false,
                v, B = this.config.linebreaks.automatic,
                p = this.config.linebreaks.width;
            if (B) {
                w = (p.match(/^\s*(\d+(\.\d*)?%\s*)?container\s*$/) != null);
                if (w) {
                    p = p.replace(/\s*container\s*/, "")
                } else {
                    k = this.defaultWidth
                } if (p === "") {
                    p = "100%"
                }
            } else {
                k = 100000
            }
            for (u = 0; u < r; u++) {
                z = t[u];
                if (!z.parentNode) {
                    continue
                }
                s = z.previousSibling;
                if (s && String(s.className).match(/^MathJax(_SVG)?(_Display)?( MathJax(_SVG)?_Processing)?$/)) {
                    s.parentNode.removeChild(s)
                }
                l = z.MathJax.elementJax;
                if (!l) {
                    continue
                }
                l.SVG = {
                    display: (l.root.Get("display") === "block")
                };
                A = n = e.Element("span", {
                    style: {
                        "font-size": this.config.scale + "%",
                        display: "inline-block"
                    },
                    className: "MathJax_SVG",
                    id: l.inputID + "-Frame",
                    isMathJax: true,
                    jaxID: this.id,
                    oncontextmenu: EVENT.Menu,
                    onmousedown: EVENT.Mousedown,
                    onmouseover: EVENT.Mouseover,
                    onmouseout: EVENT.Mouseout,
                    onmousemove: EVENT.Mousemove,
                    onclick: EVENT.Click,
                    ondblclick: EVENT.DblClick
                });
                if (c.Browser.noContextMenu) {
                    A.ontouchstart = TOUCH.start;
                    A.ontouchend = TOUCH.end
                }
                if (l.SVG.display) {
                    n = e.Element("div", {
                        className: "MathJax_SVG_Display"
                    });
                    n.appendChild(A)
                }
                n.setAttribute("role", "textbox");
                n.setAttribute("aria-readonly", "true");
                n.className += " MathJax_SVG_Processing";
                z.parentNode.insertBefore(n, z);
                z.parentNode.insertBefore(this.ExSpan.cloneNode(true), z);
                n.parentNode.insertBefore(this.linebreakSpan.cloneNode(true), n)
            }
            for (u = 0; u < r; u++) {
                z = t[u];
                if (!z.parentNode) {
                    continue
                }
                y = z.previousSibling;
                n = y.previousSibling;
                l = z.MathJax.elementJax;
                if (!l) {
                    continue
                }
                x = y.firstChild.offsetHeight / 60;
                v = n.previousSibling.firstChild.offsetWidth;
                if (w) {
                    k = v
                }
                if (x === 0 || x === "NaN") {
                    this.hiddenDiv.appendChild(n);
                    l.SVG.isHidden = true;
                    x = this.defaultEx;
                    v = this.defaultWidth;
                    if (w) {
                        k = this.defaultWidth
                    }
                }
                l.SVG.ex = x;
                l.SVG.cwidth = v;
                l.SVG.em = q = x / a.TeX.x_height * 1000;
                l.SVG.lineWidth = (B ? this.length2em(p, 1, k / q) : 1000000)
            }
            for (u = 0; u < r; u++) {
                z = t[u];
                if (!z.parentNode) {
                    continue
                }
                y = t[u].previousSibling;
                A = y.previousSibling;
                l = t[u].MathJax.elementJax;
                if (!l) {
                    continue
                }
                if (!l.SVG.isHidden) {
                    A = A.previousSibling
                }
                A.parentNode.removeChild(A);
                y.parentNode.removeChild(y)
            }
            o.SVGeqn = o.SVGlast = 0;
            o.SVGi = -1;
            o.SVGchunk = this.config.EqnChunk;
            o.SVGdelay = false
        }, Translate: function (l, p) {
            if (!l.parentNode) {
                return
            }
            if (p.SVGdelay) {
                p.SVGdelay = false;
                c.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay))
            }
            var k = l.MathJax.elementJax,
                o = k.root,
                m = document.getElementById(k.inputID + "-Frame"),
                q = (k.SVG.display ? (m || {}).parentNode : m);
            if (!q) {
                return
            }
            this.em = g.mbase.prototype.em = k.SVG.em;
            this.ex = k.SVG.ex;
            this.linebreakWidth = k.SVG.lineWidth * 1000;
            this.cwidth = k.SVG.cwidth;
            this.mathDiv = q;
            m.appendChild(this.textSVG);
            this.initSVG(o, m);
            o.setTeXclass();
            try {
                o.toSVG(m, q)
            } catch (n) {
                if (n.restart) {
                    while (m.firstChild) {
                        m.removeChild(m.firstChild)
                    }
                }
                throw n
            }
            m.removeChild(this.textSVG);
            if (k.SVG.isHidden) {
                l.parentNode.insertBefore(q, l)
            }
            q.className = q.className.split(/ /)[0];
            if (this.hideProcessedMath) {
                q.className += " MathJax_SVG_Processed";
                if (l.MathJax.preview) {
                    k.SVG.preview = l.MathJax.preview;
                    delete l.MathJax.preview
                }
                p.SVGeqn += (p.i - p.SVGi);
                p.SVGi = p.i;
                if (p.SVGeqn >= p.SVGlast + p.SVGchunk) {
                    this.postTranslate(p, true);
                    p.SVGchunk = Math.floor(p.SVGchunk * this.config.EqnChunkFactor);
                    p.SVGdelay = true
                }
            }
        }, postTranslate: function (r, o) {
            var l = r.jax[this.id];
            if (!this.hideProcessedMath) {
                return
            }
            for (var p = r.SVGlast, k = r.SVGeqn; p < k; p++) {
                var n = l[p];
                if (n && n.MathJax.elementJax) {
                    n.previousSibling.className = n.previousSibling.className.split(/ /)[0];
                    var q = n.MathJax.elementJax.SVG;
                    if (q.preview) {
                        q.preview.innerHTML = "";
                        n.MathJax.preview = q.preview;
                        delete q.preview
                    }
                }
            }
            r.SVGlast = r.SVGeqn
        }, hashCheck: function (k) {
            if (k && k.nodeName === "g") {
                do {
                    k = k.parentNode
                } while (k && k.firstChild.nodeName !== "svg")
            }
            return k
        }, getJaxFromMath: function (k) {
            if (k.parentNode.className === "MathJax_SVG_Display") {
                k = k.parentNode
            }
            do {
                k = k.nextSibling
            } while (k && k.nodeName.toLowerCase() !== "script");
            return c.getJaxFor(k)
        }, getHoverSpan: function (k, l) {
            l.style.position = "relative";
            return l.firstChild
        }, getHoverBBox: function (k, l, m) {
            var n = EVENT.getBBox(l.parentNode);
            n.h += 2;
            n.d -= 2;
            return n
        }, Zoom: function (l, s, q, k, p) {
            s.className = "MathJax_SVG";
            var u = s.appendChild(this.ExSpan.cloneNode(true));
            var o = u.firstChild.offsetHeight / 60;
            this.em = g.mbase.prototype.em = o / a.TeX.x_height * 1000;
            this.cwidth = 0.85 * a.defaultWidth;
            u.parentNode.removeChild(u);
            s.appendChild(this.textSVG);
            this.mathDIV = s;
            this.zoomScale = parseInt(c.config.menuSettings.zscale) / 100;
            this.idPostfix = "-zoom";
            l.root.toSVG(s, s);
            this.idPostfix = "";
            this.zoomScale = 1;
            s.removeChild(this.textSVG);
            if (this.operaZoomRefresh) {
                setTimeout(function () {
                    s.firstChild.style.border = "1px solid transparent"
                }, 1)
            }
            if (s.offsetWidth < s.firstChild.offsetWidth) {
                s.style.minWidth = s.firstChild.offsetWidth + "px";
                q.style.minWidth = q.firstChild.offsetWidth + "px"
            }
            s.style.position = q.style.position = "absolute";
            var r = s.offsetWidth,
                n = s.offsetHeight,
                t = q.offsetHeight,
                m = q.offsetWidth;
            s.style.position = q.style.position = "";
            return {
                Y: -EVENT.getBBox(s).h,
                mW: m,
                mH: t,
                zW: r,
                zH: n
            }
        }, initSVG: function (l, k) {}, Remove: function (k) {
            var l = document.getElementById(k.inputID + "-Frame");
            if (l) {
                if (k.SVG.display) {
                    l = l.parentNode
                }
                l.parentNode.removeChild(l)
            }
            delete k.SVG
        }, Em: function (k) {
            if (Math.abs(k) < 0.0006) {
                return "0em"
            }
            return k.toFixed(3).replace(/\.?0+$/, "") + "em"
        }, Ex: function (k) {
            k = Math.round(k / this.TeX.x_height * this.ex) / this.ex;
            if (Math.abs(k) < 0.0006) {
                return "0ex"
            }
            return k.toFixed(3).replace(/\.?0+$/, "") + "ex"
        }, Percent: function (k) {
            return (100 * k).toFixed(1).replace(/\.?0+$/, "") + "%"
        }, length2em: function (q, l, o) {
            if (typeof (q) !== "string") {
                q = q.toString()
            }
            if (q === "") {
                return ""
            }
            if (q === g.SIZE.NORMAL) {
                return 1000
            }
            if (q === g.SIZE.BIG) {
                return 2000
            }
            if (q === g.SIZE.SMALL) {
                return 710
            }
            if (q === "infinity") {
                return a.BIGDIMEN
            }
            if (q.match(/mathspace$/)) {
                return 1000 * a.MATHSPACE[q]
            }
            var r = (this.zoomScale || 1) / a.em;
            var n = q.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
            var k = parseFloat(n[1] || "1") * 1000,
                p = n[2];
            if (o == null) {
                o = 1000
            }
            if (l == null) {
                l = 1
            }
            if (p === "em") {
                return k
            }
            if (p === "ex") {
                return k * a.TeX.x_height / 1000
            }
            if (p === "%") {
                return k / 100 * o / 1000
            }
            if (p === "px") {
                return k * r
            }
            if (p === "pt") {
                return k / 10
            }
            if (p === "pc") {
                return k * 1.2
            }
            if (p === "in") {
                return k * this.pxPerInch * r
            }
            if (p === "cm") {
                return k * this.pxPerInch * r / 2.54
            }
            if (p === "mm") {
                return k * this.pxPerInch * r / 25.4
            }
            if (p === "mu") {
                return k / 18 * l
            }
            return k * o / 1000
        }, thickness2em: function (l, k) {
            var m = a.TeX.rule_thickness;
            if (l === g.LINETHICKNESS.MEDIUM) {
                return m
            }
            if (l === g.LINETHICKNESS.THIN) {
                return 0.67 * m
            }
            if (l === g.LINETHICKNESS.THICK) {
                return 1.67 * m
            }
            return this.length2em(l, k, m)
        }, getPadding: function (l) {
            var n = {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                k = false;
            for (var o in n) {
                if (n.hasOwnProperty(o)) {
                    var m = l["padding" + o.charAt(0).toUpperCase() + o.substr(1)];
                    if (m) {
                        n[o] = this.length2em(m);
                        k = true
                    }
                }
            }
            return (k ? n : false)
        }, getBorders: function (o) {
            var m = {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                l = false;
            for (var p in m) {
                if (m.hasOwnProperty(p)) {
                    var k = "border" + p.charAt(0).toUpperCase() + p.substr(1);
                    var n = o[k + "Style"];
                    if (n && n !== "none") {
                        l = true;
                        m[p] = this.length2em(o[k + "Width"]);
                        m[p + "Style"] = o[k + "Style"];
                        m[p + "Color"] = o[k + "Color"];
                        if (m[p + "Color"] === "initial") {
                            m[p + "Color"] = ""
                        }
                    } else {
                        delete m[p]
                    }
                }
            }
            return (l ? m : false)
        }, Element: function (k, l) {
            var m = (typeof (k) === "string" ? document.createElementNS(b, k) : k);
            m.isMathJax = true;
            if (l) {
                for (var n in l) {
                    if (l.hasOwnProperty(n)) {
                        m.setAttribute(n, l[n].toString())
                    }
                }
            }
            return m
        }, addElement: function (l, k, m) {
            return l.appendChild(this.Element(k, m))
        }, TextNode: e.TextNode,
        addText: e.addText,
        ucMatch: e.ucMatch,
        HandleVariant: function (s, r, B) {
            var v = i.G();
            var o, x, z, p, A, t, q, l, y, k;
            if (!s) {
                s = this.FONTDATA.VARIANT[g.VARIANT.NORMAL]
            }
            if (s.forceFamily) {
                B = i.TEXT(r, B, s.font);
                if (s.h != null) {
                    B.h = s.h
                }
                if (s.d != null) {
                    B.d = s.d
                }
                v.Add(B);
                B = ""
            }
            A = s;
            for (t = 0, q = B.length; t < q; t++) {
                s = A;
                o = B.charCodeAt(t);
                z = B.charAt(t);
                if (o >= 55296 && o < 56319) {
                    t++;
                    o = (((o - 55296) << 10) + (B.charCodeAt(t) - 56320)) + 65536;
                    if (this.FONTDATA.RemapPlane1) {
                        var w = this.FONTDATA.RemapPlane1(o, s);
                        o = w.n;
                        s = w.variant
                    }
                } else {
                    k = this.FONTDATA.RANGES;
                    for (l = 0, y = k.length; l < y; l++) {
                        if (k[l].name === "alpha" && s.noLowerCase) {
                            continue
                        }
                        x = s["offset" + k[l].offset];
                        if (x && o >= k[l].low && o <= k[l].high) {
                            if (k[l].remap && k[l].remap[o]) {
                                o = x + k[l].remap[o]
                            } else {
                                o = o - k[l].low + x;
                                if (k[l].add) {
                                    o += k[l].add
                                }
                            } if (s["variant" + k[l].offset]) {
                                s = this.FONTDATA.VARIANT[s["variant" + k[l].offset]]
                            }
                            break
                        }
                    }
                } if (s.remap && s.remap[o]) {
                    o = s.remap[o];
                    if (s.remap.variant) {
                        s = this.FONTDATA.VARIANT[s.remap.variant]
                    }
                } else {
                    if (this.FONTDATA.REMAP[o] && !s.noRemap) {
                        o = this.FONTDATA.REMAP[o]
                    }
                } if (o instanceof Array) {
                    s = this.FONTDATA.VARIANT[o[1]];
                    o = o[0]
                }
                if (typeof (o) === "string") {
                    B = o + B.substr(t + 1);
                    q = B.length;
                    t = -1;
                    continue
                }
                p = this.lookupChar(s, o);
                z = p[o];
                if (z) {
                    if (z[5] && z[5].space) {
                        v.w += z[2]
                    } else {
                        z = [r, p.id + "-" + o.toString(16).toUpperCase()].concat(z);
                        v.Add(i.GLYPH.apply(i, z), v.w, 0)
                    }
                } else {
                    if (this.FONTDATA.DELIMITERS[o]) {
                        z = this.createDelimiter(o, 0, 1, p);
                        v.Add(z, v.w, (this.FONTDATA.DELIMITERS[o].dir === "V" ? z.d : 0))
                    } else {
                        if (o <= 65535) {
                            z = String.fromCharCode(o)
                        } else {
                            x = o - 65536;
                            z = String.fromCharCode((x >> 10) + 55296) + String.fromCharCode((x & 1023) + 56320)
                        }
                        var u = i.TEXT(r, z, {
                            "font-family": s.defaultFamily || a.config.undefinedFamily,
                            "font-style": (s.italic ? "italic" : ""),
                            "font-weight": (s.bold ? "bold" : "")
                        });
                        if (s.h != null) {
                            u.h = s.h
                        }
                        if (s.d != null) {
                            u.d = s.d
                        }
                        z = i.G();
                        z.Add(u);
                        v.Add(z, v.w, 0);
                        c.signal.Post(["SVG Jax - unknown char", o, s])
                    }
                }
            }
            if (B.length == 1 && p.skew && p.skew[o]) {
                v.skew = p.skew[o] * 1000
            }
            if (v.element.childNodes.length === 1) {
                v.element = v.element.firstChild;
                v.removeable = false;
                v.scale = r
            }
            return v
        }, lookupChar: function (p, s) {
            var o, k;
            if (!p.FONTS) {
                var r = this.FONTDATA.FONTS;
                var q = (p.fonts || this.FONTDATA.VARIANT.normal.fonts);
                if (!(q instanceof Array)) {
                    q = [q]
                }
                if (p.fonts != q) {
                    p.fonts = q
                }
                p.FONTS = [];
                for (o = 0, k = q.length; o < k; o++) {
                    if (r[q[o]]) {
                        p.FONTS.push(r[q[o]])
                    }
                }
            }
            for (o = 0, k = p.FONTS.length; o < k; o++) {
                var l = p.FONTS[o];
                if (typeof (l) === "string") {
                    delete p.FONTS;
                    this.loadFont(l)
                }
                if (l[s]) {
                    return l
                } else {
                    this.findBlock(l, s)
                }
            }
            return {
                id: "unknown"
            }
        }, findBlock: function (l, q) {
            if (l.Ranges) {
                for (var p = 0, k = l.Ranges.length; p < k; p++) {
                    if (q < l.Ranges[p][0]) {
                        return
                    }
                    if (q <= l.Ranges[p][1]) {
                        var o = l.Ranges[p][2];
                        for (var n = l.Ranges.length - 1; n >= 0; n--) {
                            if (l.Ranges[n][2] == o) {
                                l.Ranges.splice(n, 1)
                            }
                        }
                        this.loadFont(l.directory + "/" + o + ".js")
                    }
                }
            }
        }, loadFont: function (k) {
            c.RestartAfter(h.Require(this.fontDir + "/" + k))
        }, createDelimiter: function (k, n, q, o) {
            if (!q) {
                q = 1
            }
            var s = i.G();
            if (!k) {
                s.Clean();
                delete s.element;
                s.w = s.r = this.TeX.nulldelimiterspace * q;
                return s
            }
            if (!(n instanceof Array)) {
                n = [n, n]
            }
            var t = n[1];
            n = n[0];
            var l = {
                alias: k
            };
            while (l.alias) {
                k = l.alias;
                l = this.FONTDATA.DELIMITERS[k];
                if (!l) {
                    l = {
                        HW: [0, this.FONTDATA.VARIANT[g.VARIANT.NORMAL]]
                    }
                }
            }
            if (l.load) {
                c.RestartAfter(h.Require(this.fontDir + "/fontdata-" + l.load + ".js"))
            }
            for (var r = 0, p = l.HW.length; r < p; r++) {
                if (l.HW[r][0] * q >= n - 10 - a.config.blacker || (r == p - 1 && !l.stretch)) {
                    if (l.HW[r][2]) {
                        q *= l.HW[r][2]
                    }
                    if (l.HW[r][3]) {
                        k = l.HW[r][3]
                    }
                    return this.createChar(q, [k, l.HW[r][1]], o).With({
                        stretched: true
                    })
                }
            }
            if (l.stretch) {
                this["extendDelimiter" + l.dir](s, t, l.stretch, q, o)
            }
            return s
        }, createChar: function (s, q, n) {
            var r = "",
                p = {
                    fonts: [q[1]],
                    noRemap: true
                };
            if (n && n === g.VARIANT.BOLD) {
                p.fonts = [q[1] + "-bold", q[1]]
            }
            if (typeof (q[1]) !== "string") {
                p = q[1]
            }
            if (q[0] instanceof Array) {
                for (var o = 0, k = q[0].length; o < k; o++) {
                    r += String.fromCharCode(q[0][o])
                }
            } else {
                r = String.fromCharCode(q[0])
            } if (q[4]) {
                s = s * q[4]
            }
            var l = this.HandleVariant(p, s, r);
            if (q[2]) {
                l.x = q[2] * 1000
            }
            if (q[3]) {
                l.y = q[3] * 1000
            }
            if (q[5]) {
                l.h += q[5] * 1000
            }
            if (q[6]) {
                l.d += q[6] * 1000
            }
            return l
        }, extendDelimiterV: function (r, A, m, o, n) {
            var x = this.createChar(o, (m.top || m.ext), n);
            var u = this.createChar(o, (m.bot || m.ext), n);
            var q = x.h + x.d + u.h + u.d;
            var w = -x.h;
            r.Add(x, 0, w);
            w -= x.d;
            if (m.mid) {
                var z = this.createChar(o, m.mid, n);
                q += z.h + z.d
            }
            if (m.min && A < q * m.min) {
                A = q * m.min
            }
            if (A > q) {
                var l = this.createChar(o, m.ext, n);
                var p = (m.mid ? 2 : 1),
                    v = (A - q) / p,
                    B = (v + 100) / (l.h + l.d);
                while (p-- > 0) {
                    var t = a.Element("g", {
                        transform: "translate(" + l.y + "," + (w - B * l.h + 50 + l.y) + ") scale(1," + B + ")"
                    });
                    t.appendChild(l.element.cloneNode(false));
                    r.element.appendChild(t);
                    w -= v;
                    if (m.mid && p) {
                        r.Add(z, 0, w - z.h);
                        w -= (z.h + z.d)
                    }
                }
            } else {
                if (m.mid) {
                    w += (q - A) / 2;
                    r.Add(z, 0, w - z.h);
                    w += -(z.h + z.d) + (q - A) / 2
                } else {
                    w += (q - A)
                }
            }
            r.Add(u, 0, w - u.h);
            r.Clean();
            r.scale = o;
            r.isMultiChar = true
        }, extendDelimiterH: function (t, o, m, q, n) {
            var p = this.createChar(q, (m.left || m.rep), n);
            var C = this.createChar(q, (m.right || m.rep), n);
            t.Add(p, -p.l, 0);
            var B = (p.r - p.l) + (C.r - C.l),
                z = p.r - p.l;
            if (m.mid) {
                var A = this.createChar(q, m.mid, n);
                B += A.w
            }
            if (m.min && o < B * m.min) {
                o = B * m.min
            }
            if (o > B) {
                var y = this.createChar(q, m.rep, n),
                    l = m.fuzz || 0;
                var r = (m.mid ? 2 : 1),
                    v = (o - B) / r,
                    D = (v + l) / (y.r - y.l);
                while (r-- > 0) {
                    var u = a.Element("g", {
                        transform: "translate(" + (z - l / 2 - D * y.l + y.x) + "," + y.y + ") scale(" + D + ",1)"
                    });
                    u.appendChild(y.element.cloneNode(false));
                    t.element.appendChild(u);
                    z += v;
                    if (m.mid && r) {
                        t.Add(A, z, 0);
                        z += A.w
                    }
                }
            } else {
                if (m.mid) {
                    z -= (B - o) / 2;
                    t.Add(A, z, 0);
                    z += A.w - (B - o) / 2
                } else {
                    z -= (B - o)
                }
            }
            t.Add(C, z - C.l, 0);
            t.Clean();
            t.scale = q;
            t.isMultiChar = true
        }, MATHSPACE: {
            veryverythinmathspace: 1 / 18,
            verythinmathspace: 2 / 18,
            thinmathspace: 3 / 18,
            mediummathspace: 4 / 18,
            thickmathspace: 5 / 18,
            verythickmathspace: 6 / 18,
            veryverythickmathspace: 7 / 18,
            negativeveryverythinmathspace: -1 / 18,
            negativeverythinmathspace: -2 / 18,
            negativethinmathspace: -3 / 18,
            negativemediummathspace: -4 / 18,
            negativethickmathspace: -5 / 18,
            negativeverythickmathspace: -6 / 18,
            negativeveryverythickmathspace: -7 / 18
        }, TeX: {
            x_height: 430.554,
            quad: 1000,
            num1: 676.508,
            num2: 393.732,
            num3: 443.73,
            denom1: 685.951,
            denom2: 344.841,
            sup1: 412.892,
            sup2: 362.892,
            sup3: 288.888,
            sub1: 150,
            sub2: 247.217,
            sup_drop: 386.108,
            sub_drop: 50,
            delim1: 2390,
            delim2: 1000,
            axis_height: 250,
            rule_thickness: 60,
            big_op_spacing1: 111.111,
            big_op_spacing2: 166.666,
            big_op_spacing3: 200,
            big_op_spacing4: 600,
            big_op_spacing5: 100,
            scriptspace: 100,
            nulldelimiterspace: 120,
            delimiterfactor: 901,
            delimitershortfall: 100,
            min_rule_thickness: 1.25,
            min_root_space: 1.5
        }, BIGDIMEN: 10000000,
        NBSP: "\u00A0"
    });
    var i = a.BBOX = MathJax.Object.Subclass({
        type: "g",
        removeable: true,
        Init: function (k) {
            this.h = this.d = -a.BIGDIMEN;
            this.H = this.D = 0;
            this.w = this.r = 0;
            this.l = a.BIGDIMEN;
            this.x = this.y = 0;
            this.scale = 1;
            this.n = 0;
            if (this.type) {
                this.element = a.Element(this.type, k)
            }
        }, With: function (k) {
            return c.Insert(this, k)
        }, Add: function (n, m, l, p, o) {
            if (m) {
                n.x += m
            }
            if (l) {
                n.y += l
            }
            if (n.element) {
                if (n.removeable && n.element.childNodes.length === 1 && n.n === 1) {
                    var r = n.element.firstChild;
                    if (r.nodeName === "use" || r.nodeName === "rect") {
                        n.element = r;
                        n.scale = n.childScale;
                        var k = n.childX,
                            q = n.childY;
                        n.x += k;
                        n.y += q;
                        n.h -= q;
                        n.d += q;
                        n.H -= q;
                        n.D += q;
                        n.w -= k;
                        n.r -= k;
                        n.l += k;
                        n.removeable = false
                    }
                }
                if (Math.abs(n.x) < 1 && Math.abs(n.y) < 1) {
                    n.remove = n.removeable
                } else {
                    if (n.element.nodeName === "g") {
                        if (!n.element.firstChild) {
                            n.remove = n.removeable
                        } else {
                            n.element.setAttribute("transform", "translate(" + Math.floor(n.x) + "," + Math.floor(n.y) + ")")
                        }
                    } else {
                        if (n.element.nodeName === "line" || n.element.nodeName === "polygon" || n.element.nodeName === "path" || n.element.nodeName === "a") {
                            n.element.setAttribute("transform", "translate(" + Math.floor(n.x) + "," + Math.floor(n.y) + ")")
                        } else {
                            n.element.setAttribute("x", Math.floor(n.x / n.scale));
                            n.element.setAttribute("y", Math.floor(n.y / n.scale))
                        }
                    }
                } if (n.remove) {
                    this.n += n.n;
                    while (n.element.firstChild) {
                        if (o && this.element.firstChild) {
                            this.element.insertBefore(n.element.firstChild, this.element.firstChild)
                        } else {
                            this.element.appendChild(n.element.firstChild)
                        }
                    }
                } else {
                    if (o) {
                        this.element.insertBefore(n.element, this.element.firstChild)
                    } else {
                        this.element.appendChild(n.element)
                    }
                }
                delete n.element
            }
            if (n.hasIndent) {
                this.hasIndent = n.hasIndent
            }
            if (n.d - n.y > this.d) {
                this.d = n.d - n.y;
                if (this.d > this.D) {
                    this.D = this.d
                }
            }
            if (n.y + n.h > this.h) {
                this.h = n.y + n.h;
                if (this.h > this.H) {
                    this.H = this.h
                }
            }
            if (n.D - n.y > this.D) {
                this.D = n.D - n.y
            }
            if (n.y + n.H > this.H) {
                this.H = n.y + n.H
            }
            if (n.x + n.l < this.l) {
                this.l = n.x + n.l
            }
            if (n.x + n.r > this.r) {
                this.r = n.x + n.r
            }
            if (p || n.x + n.w + (n.X || 0) > this.w) {
                this.w = n.x + n.w + (n.X || 0)
            }
            this.childScale = n.scale;
            this.childX = n.x;
            this.childY = n.y;
            this.n++;
            return n
        }, Align: function (m, o, l, k) {
            l = ({
                left: l,
                center: (this.w - m.w) / 2,
                right: this.w - m.w - l
            })[o] || 0;
            if (l < 0) {
                if (this.element.childNodes.length) {
                    this.element.setAttribute("transform", "translate(" + Math.floor(-l) + ",0)");
                    var n = a.Element("g");
                    n.appendChild(this.element);
                    this.element = n
                }
                this.l -= l;
                this.w -= l;
                this.r -= l;
                l = 0
            }
            this.Add(m, l, k)
        }, Clean: function () {
            if (this.h === -a.BIGDIMEN) {
                this.h = this.d = this.l = 0
            }
            return this
        }
    });
    i.ROW = i.Subclass({
        Init: function () {
            this.SUPER(arguments).Init.call(this);
            this.svg = [];
            this.sh = this.sd = 0
        }, Check: function (l) {
            var k = l.toSVG();
            this.svg.push(k);
            if (l.SVGcanStretch("Vertical")) {
                k.mml = l
            }
            if (k.h > this.sh) {
                this.sh = k.h
            }
            if (k.d > this.sd) {
                this.sd = k.d
            }
        }, Stretch: function () {
            for (var o = 0, k = this.svg.length; o < k; o++) {
                var l = this.svg[o],
                    n = l.mml;
                if (n) {
                    if (n.forceStretch || n.SVGdata.h !== this.sh || n.SVGdata.d !== this.sd) {
                        l = n.SVGstretchV(this.sh, this.sd)
                    }
                    n.SVGdata.HW = this.sh;
                    n.SVGdata.D = this.sd
                }
                if (l.ic) {
                    this.ic = l.ic
                } else {
                    delete this.ic
                }
                this.Add(l, this.w, 0, true)
            }
            delete this.svg
        }
    });
    i.RECT = i.Subclass({
        type: "rect",
        removeable: false,
        Init: function (l, n, k, m) {
            if (m == null) {
                m = {
                    stroke: "none"
                }
            }
            m.width = Math.floor(k);
            m.height = Math.floor(l + n);
            this.SUPER(arguments).Init.call(this, m);
            this.w = this.r = k;
            this.h = this.H = l + n;
            this.d = this.D = this.l = 0;
            this.y = -n
        }
    });
    i.FRAME = i.Subclass({
        type: "rect",
        removeable: false,
        Init: function (n, q, k, m, p, l, o) {
            if (o == null) {
                o = {}
            }
            o.fill = "none";
            o["stroke-width"] = m.toFixed(2).replace(/\.?0+$/, "");
            o.width = Math.floor(k - m);
            o.height = Math.floor(n + q - m);
            o.transform = "translate(" + Math.floor(m / 2) + "," + Math.floor(-q + m / 2) + ")";
            if (p === "dashed") {
                o["stroke-dasharray"] = [Math.floor(6 * a.em), Math.floor(6 * a.em)].join(" ")
            }
            this.SUPER(arguments).Init.call(this, o);
            this.w = this.r = k;
            this.h = this.H = n;
            this.d = this.D = q;
            this.l = 0
        }
    });
    i.HLINE = i.Subclass({
        type: "line",
        removeable: false,
        Init: function (l, p, r, o, q) {
            if (q == null) {
                q = {
                    "stroke-linecap": "square"
                }
            }
            if (o && o !== "") {
                q.stroke = o
            }
            q["stroke-width"] = p.toFixed(2).replace(/\.?0+$/, "");
            q.x1 = q.y1 = q.y2 = Math.floor(p / 2);
            q.x2 = Math.floor(l - p / 2);
            if (r === "dashed") {
                var s = Math.floor(Math.max(0, l - p) / (6 * p)),
                    k = Math.floor(Math.max(0, l - p) / (2 * s + 1));
                q["stroke-dasharray"] = k + " " + k
            }
            if (r === "dotted") {
                q["stroke-dasharray"] = [1, Math.max(150, Math.floor(2 * p))].join(" ");
                q["stroke-linecap"] = "round"
            }
            this.SUPER(arguments).Init.call(this, q);
            this.w = this.r = l;
            this.l = 0;
            this.h = this.H = p;
            this.d = this.D = 0
        }
    });
    i.VLINE = i.Subclass({
        type: "line",
        removeable: false,
        Init: function (p, o, r, l, q) {
            if (q == null) {
                q = {
                    "stroke-linecap": "square"
                }
            }
            if (l && l !== "") {
                q.stroke = l
            }
            q["stroke-width"] = o.toFixed(2).replace(/\.?0+$/, "");
            q.x1 = q.x2 = q.y1 = Math.floor(o / 2);
            q.y2 = Math.floor(p - o / 2);
            if (r === "dashed") {
                var s = Math.floor(Math.max(0, p - o) / (6 * o)),
                    k = Math.floor(Math.max(0, p - o) / (2 * s + 1));
                q["stroke-dasharray"] = k + " " + k
            }
            if (r === "dotted") {
                q["stroke-dasharray"] = [1, Math.max(150, Math.floor(2 * o))].join(" ");
                q["stroke-linecap"] = "round"
            }
            this.SUPER(arguments).Init.call(this, q);
            this.w = this.r = o;
            this.l = 0;
            this.h = this.H = p;
            this.d = this.D = 0
        }
    });
    i.TEXT = i.Subclass({
        type: "text",
        removeable: false,
        Init: function (n, m, k) {
            if (!k) {
                k = {}
            }
            k.stroke = "none";
            this.SUPER(arguments).Init.call(this, k);
            a.addText(this.element, m);
            a.textSVG.appendChild(this.element);
            var l = this.element.getBBox();
            a.textSVG.removeChild(this.element);
            n *= 1000 / a.em;
            this.element.setAttribute("transform", "scale(" + n + ") matrix(1 0 0 -1 0 0)");
            this.w = this.r = l.width * n;
            this.l = 0;
            this.h = this.H = -l.y * n;
            this.d = this.D = (l.height + l.y) * n
        }
    });
    i.G = i;
    i.NULL = i.Subclass({
        Init: function () {
            this.SUPER(arguments).Init.apply(this, arguments);
            this.Clean()
        }
    });
    var f, d;
    i.GLYPH = i.Subclass({
        type: "path",
        removeable: false,
        Init: function (q, m, u, v, x, s, k, n) {
            var o, y = a.config.blacker;
            if (!f[m]) {
                o = {
                    id: m,
                    "stroke-width": y
                };
                if (n !== "") {
                    o.d = "M" + n + "Z"
                }
                this.SUPER(arguments).Init.call(this, o);
                d.appendChild(this.element);
                f[m] = true
            }
            o = {};
            if (q !== 1) {
                o.transform = "scale(" + q + ")"
            }
            this.element = a.Element("use", o);
            this.element.setAttributeNS(j, "href", "#" + m);
            this.h = (u + y) * q;
            this.d = (v + y) * q;
            this.w = (x + y / 2) * q;
            this.l = (s + y / 2) * q;
            this.r = (k + y / 2) * q;
            this.H = Math.max(0, this.h);
            this.D = Math.max(0, this.d);
            this.x = this.y = 0;
            this.scale = q
        }
    });
    c.Register.StartupHook("mml Jax Ready", function () {
        g = MathJax.ElementJax.mml;
        g.mbase.Augment({
            SVG: i,
            toSVG: function () {
                this.SVGgetStyles();
                var o = this.SVGgetVariant();
                var l = this.SVG();
                this.SVGgetScale(l);
                this.SVGhandleSpace(l);
                for (var n = 0, k = this.data.length; n < k; n++) {
                    if (this.data[n]) {
                        var q = l.Add(this.data[n].toSVG(o, l.scale), l.w, 0, true);
                        if (q.skew) {
                            l.skew = q.skew
                        }
                    }
                }
                l.Clean();
                var p = this.data.join("");
                if (l.skew && p.length !== 1) {
                    delete l.skew
                }
                if (l.r > l.w && p.length === 1 && !o.noIC) {
                    l.ic = l.r - l.w;
                    l.w = l.r
                }
                this.SVGhandleColor(l);
                this.SVGsaveData(l);
                return l
            }, SVGchildSVG: function (k) {
                return (this.data[k] ? this.data[k].toSVG() : i())
            }, SVGdataStretched: function (l, k, m) {
                this.SVGdata = {
                    HW: k,
                    D: m
                };
                if (!this.data[l]) {
                    return i()
                }
                if (m != null) {
                    return this.data[l].SVGstretchV(k, m)
                }
                if (k != null) {
                    return this.data[l].SVGstretchH(k)
                }
                return this.data[l].toSVG()
            }, SVGsaveData: function (l) {
                if (!this.SVGdata) {
                    this.SVGdata = {}
                }
                this.SVGdata.w = l.w, this.SVGdata.x = l.x;
                this.SVGdata.h = l.h, this.SVGdata.d = l.d;
                if (l.y) {
                    this.SVGdata.h += l.y;
                    this.SVGdata.d -= l.y
                }
                if (l.X != null) {
                    this.SVGdata.X = l.X
                }
                if (this["class"]) {
                    l.removeable = false;
                    a.Element(l.element, {
                        "class": this["class"]
                    })
                }
                if (this.id) {
                    l.removeable = false;
                    a.Element(l.element, {
                        id: this.id
                    })
                }
                if (this.href) {
                    var k = a.Element("a", {
                        "class": "mjx-svg-href"
                    });
                    k.setAttributeNS(j, "href", this.href);
                    k.onclick = this.SVGlink;
                    a.addElement(k, "rect", {
                        width: l.w,
                        height: l.h + l.d,
                        y: -l.d,
                        fill: "none",
                        stroke: "none",
                        "pointer-events": "all"
                    });
                    if (l.type === "svg") {
                        var n = l.element.firstChild;
                        while (n.firstChild) {
                            k.appendChild(n.firstChild)
                        }
                        n.appendChild(k)
                    } else {
                        k.appendChild(l.element);
                        l.element = k
                    }
                    l.removeable = false
                }
                if (a.config.addMMLclasses) {
                    this.SVGaddClass(l.element, "mjx-svg-" + this.type);
                    l.removeable = false
                }
                var m = this.style;
                if (m && l.element) {
                    l.element.style.cssText = m;
                    if (l.element.style.fontSize) {
                        l.element.style.fontSize = ""
                    }
                    l.element.style.border = l.element.style.padding = "";
                    if (l.removeable) {
                        l.removeable = l.element.style.cssText === ""
                    }
                }
            }, SVGaddClass: function (m, k) {
                var l = m.getAttribute("class");
                m.setAttribute("class", (l ? l + " " : "") + k)
            }, SVGlink: function () {
                var k = this.href.animVal;
                if (k.charAt(0) === "#") {
                    var l = a.hashCheck(document.getElementById(k.substr(1)));
                    if (l && l.scrollIntoView) {
                        setTimeout(function () {
                            l.parentNode.scrollIntoView(true)
                        }, 1)
                    }
                }
                document.location = k
            }, SVGgetStyles: function () {
                if (this.style) {
                    var k = e.Element("span");
                    k.style.cssText = this.style;
                    this.styles = this.SVGprocessStyles(k.style)
                }
            }, SVGprocessStyles: function (k) {
                var l = {
                    border: a.getBorders(k),
                    padding: a.getPadding(k)
                };
                if (!l.border) {
                    delete l.border
                }
                if (!l.padding) {
                    delete l.padding
                }
                if (k.fontSize) {
                    l.fontSize = k.fontSize
                }
                if (k.color) {
                    l.color = k.color
                }
                if (k.backgroundColor) {
                    l.background = k.backgroundColor
                }
                if (k.fontStyle) {
                    l.fontStyle = k.fontStyle
                }
                if (k.fontWeight) {
                    l.fontWeight = k.fontWeight
                }
                if (k.fontFamily) {
                    l.fontFamily = k.fontFamily
                }
                if (l.fontWeight && l.fontWeight.match(/^\d+$/)) {
                    l.fontWeight = (parseInt(l.fontWeight) > 600 ? "bold" : "normal")
                }
                return l
            }, SVGhandleSpace: function (n) {
                if (this.useMMLspacing) {
                    if (this.type !== "mo") {
                        return
                    }
                    var m = this.getValues("scriptlevel", "lspace", "rspace");
                    if (m.scriptlevel <= 0 || this.hasValue("lspace") || this.hasValue("rspace")) {
                        var l = this.SVGgetMu(n);
                        m.lspace = Math.max(0, a.length2em(m.lspace, l));
                        m.rspace = Math.max(0, a.length2em(m.rspace, l));
                        var k = this,
                            o = this.Parent();
                        while (o && o.isEmbellished() && o.Core() === k) {
                            k = o;
                            o = o.Parent()
                        }
                        if (m.lspace) {
                            n.x += m.lspace
                        }
                        if (m.rspace) {
                            n.X = m.rspace
                        }
                    }
                } else {
                    var p = this.texSpacing();
                    this.SVGgetScale();
                    if (p !== "") {
                        n.x += a.length2em(p, this.scale) * this.mscale
                    }
                }
            }, SVGhandleColor: function (o) {
                var w = this.getValues("mathcolor", "color");
                if (this.styles && this.styles.color && !w.color) {
                    w.color = this.styles.color
                }
                if (w.color && !this.mathcolor) {
                    w.mathcolor = w.color
                }
                if (w.mathcolor) {
                    a.Element(o.element, {
                        fill: w.mathcolor,
                        stroke: w.mathcolor
                    });
                    o.removeable = false
                }
                var s = (this.styles || {}).border,
                    u = (this.styles || {}).padding,
                    t = ((s || {}).left || 0),
                    q = ((u || {}).left || 0),
                    k;
                w.background = (this.mathbackground || this.background || (this.styles || {}).background || g.COLOR.TRANSPARENT);
                if (t + q) {
                    var l = i();
                    for (k in o) {
                        if (o.hasOwnProperty(k)) {
                            l[k] = o[k]
                        }
                    }
                    l.x = 0;
                    l.y = 0;
                    o.element = a.Element("g");
                    o.removeable = true;
                    o.Add(l, t + q, 0)
                }
                if (u) {
                    o.w += u.right || 0;
                    o.h += u.top || 0;
                    o.d += u.bottom || 0
                }
                if (s) {
                    o.w += s.right || 0;
                    o.h += s.top || 0;
                    o.d += s.bottom || 0
                }
                if (w.background !== g.COLOR.TRANSPARENT) {
                    if (o.element.nodeName !== "g" && o.element.nodeName !== "svg") {
                        var p = a.Element("g");
                        p.appendChild(o.element);
                        o.element = p;
                        o.removeable = true
                    }
                    o.Add(i.RECT(o.h, o.d, o.w, {
                        fill: w.background,
                        stroke: "none"
                    }), 0, 0, false, true)
                }
                if (s) {
                    var v = 5;
                    var m = {
                        left: ["V", o.h + o.d, -v, -o.d],
                        right: ["V", o.h + o.d, o.w - s.right + v, -o.d],
                        top: ["H", o.w, 0, o.h - s.top + v],
                        bottom: ["H", o.w, 0, -o.d - v]
                    };
                    for (k in m) {
                        if (m.hasOwnProperty(k)) {
                            if (s[k]) {
                                var r = m[k],
                                    n = i[r[0] + "LINE"];
                                o.Add(n(r[1], s[k], s[k + "Style"], s[k + "Color"]), r[2], r[3])
                            }
                        }
                    }
                }
            }, SVGhandleVariant: function (k, m, l) {
                return a.HandleVariant(k, m, l)
            }, SVGgetVariant: function () {
                var k = this.getValues("mathvariant", "fontfamily", "fontweight", "fontstyle");
                var l = k.mathvariant;
                if (this.variantForm) {
                    l = "-TeX-variant"
                }
                k.hasVariant = this.Get("mathvariant", true);
                if (!k.hasVariant) {
                    k.family = k.fontfamily;
                    k.weight = k.fontweight;
                    k.style = k.fontstyle
                }
                if (this.styles) {
                    if (!k.style && this.styles.fontStyle) {
                        k.style = this.styles.fontStyle
                    }
                    if (!k.weight && this.styles.fontWeight) {
                        k.weight = this.styles.fontWeight
                    }
                    if (!k.family && this.styles.fontFamily) {
                        k.family = this.styles.fontFamily
                    }
                }
                if (k.family && !k.hasVariant) {
                    if (!k.weight && k.mathvariant.match(/bold/)) {
                        k.weight = "bold"
                    }
                    if (!k.style && k.mathvariant.match(/italic/)) {
                        k.style = "italic"
                    }
                    l = {
                        forceFamily: true,
                        font: {
                            "font-family": k.family
                        }
                    };
                    if (k.style) {
                        l.font["font-style"] = k.style
                    }
                    if (k.weight) {
                        l.font["font-weight"] = k.weight
                    }
                    return l
                }
                if (k.weight === "bold") {
                    l = {
                        normal: g.VARIANT.BOLD,
                        italic: g.VARIANT.BOLDITALIC,
                        fraktur: g.VARIANT.BOLDFRAKTUR,
                        script: g.VARIANT.BOLDSCRIPT,
                        "sans-serif": g.VARIANT.BOLDSANSSERIF,
                        "sans-serif-italic": g.VARIANT.SANSSERIFBOLDITALIC
                    }[l] || l
                } else {
                    if (k.weight === "normal") {
                        l = {
                            bold: g.VARIANT.normal,
                            "bold-italic": g.VARIANT.ITALIC,
                            "bold-fraktur": g.VARIANT.FRAKTUR,
                            "bold-script": g.VARIANT.SCRIPT,
                            "bold-sans-serif": g.VARIANT.SANSSERIF,
                            "sans-serif-bold-italic": g.VARIANT.SANSSERIFITALIC
                        }[l] || l
                    }
                } if (k.style === "italic") {
                    l = {
                        normal: g.VARIANT.ITALIC,
                        bold: g.VARIANT.BOLDITALIC,
                        "sans-serif": g.VARIANT.SANSSERIFITALIC,
                        "bold-sans-serif": g.VARIANT.SANSSERIFBOLDITALIC
                    }[l] || l
                } else {
                    if (k.style === "normal") {
                        l = {
                            italic: g.VARIANT.NORMAL,
                            "bold-italic": g.VARIANT.BOLD,
                            "sans-serif-italic": g.VARIANT.SANSSERIF,
                            "sans-serif-bold-italic": g.VARIANT.BOLDSANSSERIF
                        }[l] || l
                    }
                } if (!(l in a.FONTDATA.VARIANT)) {
                    l = "normal"
                }
                return a.FONTDATA.VARIANT[l]
            }, SVGgetScale: function (l) {
                var m = 1;
                if (this.mscale) {
                    m = this.scale
                } else {
                    var k = this.getValues("scriptlevel", "fontsize");
                    k.mathsize = (this.isToken ? this : this.Parent()).Get("mathsize");
                    if ((this.styles || {}).fontSize && !k.fontsize) {
                        k.fontsize = this.styles.fontSize
                    }
                    if (k.fontsize && !this.mathsize) {
                        k.mathsize = k.fontsize
                    }
                    if (k.scriptlevel !== 0) {
                        if (k.scriptlevel > 2) {
                            k.scriptlevel = 2
                        }
                        m = Math.pow(this.Get("scriptsizemultiplier"), k.scriptlevel);
                        k.scriptminsize = a.length2em(this.Get("scriptminsize")) / 1000;
                        if (m < k.scriptminsize) {
                            m = k.scriptminsize
                        }
                    }
                    this.scale = m;
                    this.mscale = a.length2em(k.mathsize) / 1000
                } if (l) {
                    l.scale = m;
                    if (this.isToken) {
                        l.scale *= this.mscale
                    }
                }
                return m * this.mscale
            }, SVGgetMu: function (m) {
                var k = 1,
                    l = this.getValues("scriptlevel", "scriptsizemultiplier");
                if (m.scale && m.scale !== 1) {
                    k = 1 / m.scale
                }
                if (l.scriptlevel !== 0) {
                    if (l.scriptlevel > 2) {
                        l.scriptlevel = 2
                    }
                    k = Math.sqrt(Math.pow(l.scriptsizemultiplier, l.scriptlevel))
                }
                return k
            }, SVGnotEmpty: function (k) {
                while (k) {
                    if ((k.type !== "mrow" && k.type !== "texatom") || k.data.length > 1) {
                        return true
                    }
                    k = k.data[0]
                }
                return false
            }, SVGcanStretch: function (m) {
                var l = false;
                if (this.isEmbellished()) {
                    var k = this.Core();
                    if (k && k !== this) {
                        l = k.SVGcanStretch(m);
                        if (l && k.forceStretch) {
                            this.forceStretch = true
                        }
                    }
                }
                return l
            }, SVGstretchV: function (k, l) {
                return this.toSVG(k, l)
            }, SVGstretchH: function (k) {
                return this.toSVG(k)
            }, SVGlineBreaks: function () {
                return false
            }
        }, {
            SVGautoload: function () {
                var k = a.autoloadDir + "/" + this.type + ".js";
                c.RestartAfter(h.Require(k))
            }, SVGautoloadFile: function (k) {
                var l = a.autoloadDir + "/" + k + ".js";
                c.RestartAfter(h.Require(l))
            }
        });
        g.chars.Augment({
            toSVG: function (l, o, k, m) {
                var n = this.data.join("").replace(/[\u2061-\u2064]/g, "");
                if (k) {
                    n = k(n, m)
                }
                return this.SVGhandleVariant(l, o, n)
            }
        });
        g.entity.Augment({
            toSVG: function (l, o, k, m) {
                var n = this.toString().replace(/[\u2061-\u2064]/g, "");
                if (k) {
                    n = k(n, m)
                }
                return this.SVGhandleVariant(l, o, n)
            }
        });
        g.mo.Augment({
            toSVG: function (l, k) {
                this.SVGgetStyles();
                var t = this.svg = this.SVG();
                var p = this.SVGgetScale(t);
                this.SVGhandleSpace(t);
                if (this.data.length == 0) {
                    t.Clean();
                    this.SVGsaveData(t);
                    return t
                }
                if (k != null) {
                    return this.SVGstretchV(l, k)
                } else {
                    if (l != null) {
                        return this.SVG.strechH(l)
                    }
                }
                var r = this.SVGgetVariant();
                var z = this.getValues("largeop", "displaystyle");
                if (z.largeop) {
                    r = a.FONTDATA.VARIANT[z.displaystyle ? "-largeOp" : "-smallOp"]
                }
                var y = this.CoreParent(),
                    q = (y && y.isa(g.msubsup) && this !== y.data[0]),
                    n = (q ? this.SVGremapChars : null);
                if (this.data.join("").length === 1 && y && y.isa(g.munderover) && this.CoreText(y.data[y.base]).length === 1) {
                    var u = y.data[y.over],
                        w = y.data[y.under];
                    if (u && this === u.CoreMO() && y.Get("accent")) {
                        n = a.FONTDATA.REMAPACCENT
                    } else {
                        if (w && this === w.CoreMO() && y.Get("accentunder")) {
                            n = a.FONTDATA.REMAPACCENTUNDER
                        }
                    }
                }
                if (q && this.data.join("").match(/['`"\u00B4\u2032-\u2037\u2057]/)) {
                    r = a.FONTDATA.VARIANT["-TeX-variant"]
                }
                for (var s = 0, o = this.data.length; s < o; s++) {
                    if (this.data[s]) {
                        var A = this.data[s].toSVG(r, p, this.SVGremap, n),
                            v = t.w;
                        if (v === 0 && -A.l > 10 * A.w) {
                            v += -A.l
                        }
                        t.Add(A, v, 0, true);
                        if (A.skew) {
                            t.skew = A.skew
                        }
                    }
                }
                t.Clean();
                if (this.data.join("").length !== 1) {
                    delete t.skew
                }
                if (z.largeop) {
                    t.y = a.TeX.axis_height - (t.h - t.d) / 2 / p;
                    if (t.r > t.w) {
                        t.ic = t.r - t.w;
                        t.w = t.r
                    }
                }
                this.SVGhandleColor(t);
                this.SVGsaveData(t);
                return t
            }, CoreParent: function () {
                var k = this;
                while (k && k.isEmbellished() && k.CoreMO() === this && !k.isa(g.math)) {
                    k = k.Parent()
                }
                return k
            }, CoreText: function (k) {
                if (!k) {
                    return ""
                }
                if (k.isEmbellished()) {
                    return k.CoreMO().data.join("")
                }
                while ((k.isa(g.mrow) || k.isa(g.TeXAtom) || k.isa(g.mstyle) || k.isa(g.mphantom)) && k.data.length === 1 && k.data[0]) {
                    k = k.data[0]
                }
                if (!k.isToken) {
                    return ""
                } else {
                    return k.data.join("")
                }
            }, SVGremapChars: {
                "*": "\u2217",
                '"': "\u2033",
                "\u00B0": "\u2218",
                "\u00B2": "2",
                "\u00B3": "3",
                "\u00B4": "\u2032",
                "\u00B9": "1"
            }, SVGremap: function (l, k) {
                l = l.replace(/-/g, "\u2212");
                if (k) {
                    l = l.replace(/'/g, "\u2032").replace(/`/g, "\u2035");
                    if (l.length === 1) {
                        l = k[l] || l
                    }
                }
                return l
            }, SVGcanStretch: function (o) {
                if (!this.Get("stretchy")) {
                    return false
                }
                var p = this.data.join("");
                if (p.length > 1) {
                    return false
                }
                var l = this.CoreParent();
                if (l && l.isa(g.munderover) && this.CoreText(l.data[l.base]).length === 1) {
                    var n = l.data[l.over],
                        k = l.data[l.under];
                    if (n && this === n.CoreMO() && l.Get("accent")) {
                        p = a.FONTDATA.REMAPACCENT[p] || p
                    } else {
                        if (k && this === k.CoreMO() && l.Get("accentunder")) {
                            p = a.FONTDATA.REMAPACCENTUNDER[p] || p
                        }
                    }
                }
                p = a.FONTDATA.DELIMITERS[p.charCodeAt(0)];
                var m = (p && p.dir == o.substr(0, 1));
                if (!m) {
                    delete this.svg
                }
                this.forceStretch = m && (this.Get("minsize", true) || this.Get("maxsize", true));
                return m
            }, SVGstretchV: function (p, q) {
                var m = this.svg || this.toSVG();
                var l = this.getValues("symmetric", "maxsize", "minsize");
                var o = a.TeX.axis_height * m.scale,
                    k = this.SVGgetMu(m),
                    n;
                if (l.symmetric) {
                    n = 2 * Math.max(p - o, q + o)
                } else {
                    n = p + q
                }
                l.maxsize = a.length2em(l.maxsize, k, m.h + m.d);
                l.minsize = a.length2em(l.minsize, k, m.h + m.d);
                n = Math.max(l.minsize, Math.min(l.maxsize, n));
                m = a.createDelimiter(this.data.join("").charCodeAt(0), n, m.scale);
                if (l.symmetric) {
                    n = (m.h + m.d) / 2 + o
                } else {
                    n = (m.h + m.d) * p / (p + q)
                }
                m.y = n - m.h;
                this.SVGhandleSpace(m);
                this.SVGhandleColor(m);
                delete this.svg.element;
                this.SVGsaveData(m);
                m.stretched = true;
                return m
            }, SVGstretchH: function (l) {
                var n = this.svg || this.toSVG(),
                    k = this.SVGgetMu(n);
                var m = this.getValues("maxsize", "minsize", "mathvariant", "fontweight");
                if ((m.fontweight === "bold" || parseInt(m.fontweight) >= 600) && !this.Get("mathvariant", true)) {
                    m.mathvariant = g.VARIANT.BOLD
                }
                m.maxsize = a.length2em(m.maxsize, k, n.w);
                m.minsize = a.length2em(m.minsize, k, n.w);
                l = Math.max(m.minsize, Math.min(m.maxsize, l));
                n = a.createDelimiter(this.data.join("").charCodeAt(0), l, n.scale, m.mathvariant);
                this.SVGhandleSpace(n);
                this.SVGhandleColor(n);
                delete this.svg.element;
                this.SVGsaveData(n);
                n.stretched = true;
                return n
            }
        });
        g.mtext.Augment({
            toSVG: function () {
                if (a.config.mtextFontInherit || this.Parent().type === "merror") {
                    this.SVGgetStyles();
                    var k = this.SVG(),
                        n = this.SVGgetScale(k);
                    this.SVGhandleSpace(k);
                    var l = this.SVGgetVariant(),
                        m = {
                            direction: this.Get("dir")
                        };
                    if (l.bold) {
                        m["font-weight"] = "bold"
                    }
                    if (l.italic) {
                        m["font-style"] = "italic"
                    }
                    l = this.Get("mathvariant");
                    if (l === "monospace") {
                        m["class"] = "MJX-monospace"
                    } else {
                        if (l.match(/sans-serif/)) {
                            m["class"] = "MJX-sans-serif"
                        }
                    }
                    k.Add(i.TEXT(n, this.data.join(""), m));
                    k.Clean();
                    this.SVGhandleColor(k);
                    this.SVGsaveData(k);
                    return k
                } else {
                    return this.SUPER(arguments).toSVG.call(this)
                }
            }
        });
        g.merror.Augment({
            toSVG: function (n, k) {
                this.SVGgetStyles();
                var r = this.SVG(),
                    p = a.length2em(this.styles.fontSize || 1) / 1000;
                this.SVGhandleSpace(r);
                var l = (p !== 1 ? {
                    transform: "scale(" + p + ")"
                } : {});
                var t = i(l);
                t.Add(this.SVGchildSVG(0));
                t.Clean();
                if (p !== 1) {
                    t.removeable = false;
                    var s = ["w", "h", "d", "l", "r", "D", "H"];
                    for (var q = 0, o = s.length; q < o; q++) {
                        t[s[q]] *= p
                    }
                }
                r.Add(t);
                r.Clean();
                this.SVGhandleColor(r);
                this.SVGsaveData(r);
                return r
            }, SVGgetStyles: function () {
                var k = e.Element("span", {
                    style: a.config.merrorStyle
                });
                this.styles = this.SVGprocessStyles(k.style);
                if (this.style) {
                    k.style.cssText = this.style;
                    c.Insert(this.styles, this.SVGprocessStyles(k.style))
                }
            }
        });
        g.ms.Augment({
            toSVG: g.mbase.SVGautoload
        });
        g.mglyph.Augment({
            toSVG: g.mbase.SVGautoload
        });
        g.mspace.Augment({
            toSVG: function () {
                this.SVGgetStyles();
                var m = this.getValues("height", "depth", "width");
                m.mathbackground = this.mathbackground;
                if (this.background && !this.mathbackground) {
                    m.mathbackground = this.background
                }
                var l = this.SVG();
                this.SVGgetScale(l);
                var n = this.mscale,
                    k = this.SVGgetMu(l);
                l.h = a.length2em(m.height, k) * n;
                l.d = a.length2em(m.depth, k) * n;
                l.w = l.r = a.length2em(m.width, k) * n;
                if (l.w < 0) {
                    l.x = l.w;
                    l.w = l.r = 0
                }
                if (l.h < -l.d) {
                    l.d = -l.h
                }
                l.l = 0;
                l.Clean();
                this.SVGhandleColor(l);
                this.SVGsaveData(l);
                return l
            }
        });
        g.mphantom.Augment({
            toSVG: function (k, m) {
                this.SVGgetStyles();
                var l = this.SVG();
                this.SVGgetScale(l);
                if (this.data[0] != null) {
                    this.SVGhandleSpace(l);
                    l.Add(this.SVGdataStretched(0, k, m));
                    l.Clean();
                    while (l.element.firstChild) {
                        l.element.removeChild(l.element.firstChild)
                    }
                }
                this.SVGhandleColor(l);
                this.SVGsaveData(l);
                if (l.removeable && !l.element.firstChild) {
                    delete l.element
                }
                return l
            }
        });
        g.mpadded.Augment({
            toSVG: function (l, k) {
                this.SVGgetStyles();
                var o = this.SVG();
                if (this.data[0] != null) {
                    this.SVGgetScale(o);
                    this.SVGhandleSpace(o);
                    var m = this.SVGdataStretched(0, l, k),
                        u = this.SVGgetMu(o);
                    var t = this.getValues("height", "depth", "width", "lspace", "voffset"),
                        r = 0,
                        q = 0;
                    if (t.lspace) {
                        r = this.SVGlength2em(m, t.lspace, u)
                    }
                    if (t.voffset) {
                        q = this.SVGlength2em(m, t.voffset, u)
                    }
                    var n = m.h,
                        p = m.d,
                        s = m.w;
                    o.Add(m, r, q);
                    o.Clean();
                    o.h = n;
                    o.d = p;
                    o.w = s;
                    o.removeable = false;
                    if (t.height !== "") {
                        o.h = this.SVGlength2em(o, t.height, u, "h", 0)
                    }
                    if (t.depth !== "") {
                        o.d = this.SVGlength2em(o, t.depth, u, "d", 0)
                    }
                    if (t.width !== "") {
                        o.w = this.SVGlength2em(o, t.width, u, "w", 0)
                    }
                    if (o.h > o.H) {
                        o.H = o.h
                    }
                    if (o.d > o.D) {
                        o.D = o.d
                    }
                }
                this.SVGhandleColor(o);
                this.SVGsaveData(o);
                return o
            }, SVGlength2em: function (o, r, l, s, k) {
                if (k == null) {
                    k = -a.BIGDIMEN
                }
                var p = String(r).match(/width|height|depth/);
                var q = (p ? o[p[0].charAt(0)] : (s ? o[s] : 0));
                var n = a.length2em(r, l, q / this.mscale) * this.mscale;
                if (s && String(r).match(/^\s*[-+]/)) {
                    return Math.max(k, o[s] + n)
                } else {
                    return n
                }
            }
        });
        g.mrow.Augment({
            SVG: i.ROW,
            toSVG: function () {
                this.SVGgetStyles();
                var l = this.SVG();
                this.SVGhandleSpace(l);
                for (var n = 0, k = this.data.length; n < k; n++) {
                    if (this.data[n]) {
                        l.Check(this.data[n])
                    }
                }
                l.Stretch();
                l.Clean();
                if (this.SVGlineBreaks(l)) {
                    l = this.SVGmultiline(l)
                }
                this.SVGhandleColor(l);
                this.SVGsaveData(l);
                return l
            }, SVGlineBreaks: function (k) {
                if (!this.parent.linebreakContainer) {
                    return false
                }
                return (a.config.linebreaks.automatic && k.w > a.linebreakWidth) || this.hasNewline()
            }, SVGmultiline: function (k) {
                g.mbase.SVGautoloadFile("multiline")
            }, SVGstretchH: function (k) {
                var l = this.data[this.core].SVGstretchH(k);
                this.SVGhandleColor(l);
                this.SVGsaveData(l);
                return l
            }, SVGstretchV: function (l, m) {
                var k = this.data[this.core].SVGstretchV(l, m);
                this.SVGhandleColor(k);
                this.SVGsaveData(k);
                return k
            }
        });
        g.mstyle.Augment({
            toSVG: function () {
                this.SVGgetStyles();
                var k = this.SVG();
                if (this.data[0] != null) {
                    this.SVGhandleSpace(k);
                    var l = k.Add(this.data[0].toSVG());
                    k.Clean();
                    if (l.ic) {
                        k.ic = l.ic
                    }
                    this.SVGhandleColor(k)
                }
                this.SVGsaveData(k);
                return k
            }, SVGstretchH: function (k) {
                return (this.data[0] != null ? this.data[0].SVGstretchH(k) : i.NULL())
            }, SVGstretchV: function (k, l) {
                return (this.data[0] != null ? this.data[0].SVGstretchV(k, l) : i.NULL())
            }
        });
        g.mfrac.Augment({
            toSVG: function () {
                this.SVGgetStyles();
                var y = this.SVG(),
                    G = this.SVGgetScale(y);
                var m = i();
                m.scale = y.scale;
                this.SVGhandleSpace(m);
                var o = this.SVGchildSVG(0),
                    n = this.SVGchildSVG(1);
                var k = this.getValues("displaystyle", "linethickness", "numalign", "denomalign", "bevelled");
                var C = k.displaystyle;
                var F = a.TeX.axis_height * G;
                if (k.bevelled) {
                    var E = (C ? 400 : 150);
                    var r = Math.max(o.h + o.d, n.h + n.d) + 2 * E;
                    var D = a.createDelimiter(47, r);
                    m.Add(o, 0, (o.d - o.h) / 2 + F + E);
                    m.Add(D, o.w - E / 2, (D.d - D.h) / 2 + F);
                    m.Add(n, o.w + D.w - E, (n.d - n.h) / 2 + F - E)
                } else {
                    var l = Math.max(o.w, n.w);
                    var x = a.thickness2em(k.linethickness, this.scale) * this.mscale,
                        A, z, w, s;
                    var B = a.TeX.min_rule_thickness / a.em * 1000;
                    if (C) {
                        w = a.TeX.num1;
                        s = a.TeX.denom1
                    } else {
                        w = (x === 0 ? a.TeX.num3 : a.TeX.num2);
                        s = a.TeX.denom2
                    }
                    w *= G;
                    s *= G;
                    if (x === 0) {
                        A = Math.max((C ? 7 : 3) * a.TeX.rule_thickness, 2 * B);
                        z = (w - o.d) - (n.h - s);
                        if (z < A) {
                            w += (A - z) / 2;
                            s += (A - z) / 2
                        }
                        m.w = l;
                        x = 0
                    } else {
                        A = Math.max((C ? 2 : 0) * B + x, x / 2 + 1.5 * B);
                        z = (w - o.d) - (F + x / 2);
                        if (z < A) {
                            w += A - z
                        }
                        z = (F - x / 2) - (n.h - s);
                        if (z < A) {
                            s += A - z
                        }
                        m.Add(i.RECT(x / 2, x / 2, l + 2 * x), 0, F)
                    }
                    m.Align(o, k.numalign, x, w);
                    m.Align(n, k.denomalign, x, -s)
                }
                m.Clean();
                y.Add(m, 0, 0);
                y.Clean();
                this.SVGhandleColor(y);
                this.SVGsaveData(y);
                return y
            }, SVGcanStretch: function (k) {
                return false
            }, SVGhandleSpace: function (k) {
                if (!this.texWithDelims && !this.useMMLspacing) {
                    k.x = k.X = a.TeX.nulldelimiterspace * this.mscale
                }
                this.SUPER(arguments).SVGhandleSpace.call(this, k)
            }
        });
        g.msqrt.Augment({
            toSVG: function () {
                this.SVGgetStyles();
                var r = this.SVG(),
                    n = this.SVGgetScale(r);
                this.SVGhandleSpace(r);
                var m = this.SVGchildSVG(0),
                    s, o;
                var w = a.TeX.rule_thickness * n,
                    l, k, v, u = 0;
                if (this.Get("displaystyle")) {
                    l = a.TeX.x_height * n
                } else {
                    l = w
                }
                k = Math.max(w + l / 4, 1000 * a.TeX.min_root_space / a.em);
                v = m.h + m.d + k + w;
                o = a.createDelimiter(8730, v, n);
                if (o.h + o.d > v) {
                    k = ((o.h + o.d) - (v - w)) / 2
                }
                s = i.RECT(w, 0, m.w);
                v = m.h + k + w;
                u = this.SVGaddRoot(r, o, u, o.h + o.d - v, n);
                r.Add(o, u, v - o.h);
                r.Add(s, u + o.w, v - s.h);
                r.Add(m, u + o.w, 0);
                r.Clean();
                r.h += w;
                r.H += w;
                this.SVGhandleColor(r);
                this.SVGsaveData(r);
                return r
            }, SVGaddRoot: function (l, m, k, o, n) {
                return k
            }
        });
        g.mroot.Augment({
            toSVG: g.msqrt.prototype.toSVG,
            SVGaddRoot: function (n, l, q, o, k) {
                var s = (l.isMultiChar ? 0.55 : 0.65) * l.w;
                if (this.data[1]) {
                    var p = this.data[1].toSVG();
                    p.x = 0;
                    var m = this.SVGrootHeight(l.h + l.d, k, p) - o;
                    var r = Math.min(p.w, p.r);
                    q = Math.max(r, s);
                    n.Add(p, q - r, m)
                } else {
                    s = q
                }
                return q - s
            }, SVGrootHeight: function (m, l, k) {
                return 0.45 * (m - 900 * l) + 600 * l + Math.max(0, k.d - 75)
            }
        });
        g.mfenced.Augment({
            SVG: i.ROW,
            toSVG: function () {
                this.SVGgetStyles();
                var l = this.SVG();
                this.SVGhandleSpace(l);
                if (this.data.open) {
                    l.Check(this.data.open)
                }
                if (this.data[0] != null) {
                    l.Check(this.data[0])
                }
                for (var n = 1, k = this.data.length; n < k; n++) {
                    if (this.data[n]) {
                        if (this.data["sep" + n]) {
                            l.Check(this.data["sep" + n])
                        }
                        l.Check(this.data[n])
                    }
                }
                if (this.data.close) {
                    l.Check(this.data.close)
                }
                l.Stretch();
                l.Clean();
                this.SVGhandleColor(l);
                this.SVGsaveData(l);
                return l
            }
        });
        g.menclose.Augment({
            toSVG: g.mbase.SVGautoload
        });
        g.maction.Augment({
            toSVG: g.mbase.SVGautoload
        });
        g.semantics.Augment({
            toSVG: function () {
                this.SVGgetStyles();
                var k = this.SVG();
                if (this.data[0] != null) {
                    this.SVGhandleSpace(k);
                    k.Add(this.data[0].toSVG());
                    k.Clean()
                } else {
                    k.Clean()
                }
                this.SVGsaveData(k);
                return k
            }, SVGstretchH: function (k) {
                return (this.data[0] != null ? this.data[0].SVGstretchH(k) : i.NULL())
            }, SVGstretchV: function (k, l) {
                return (this.data[0] != null ? this.data[0].SVGstretchV(k, l) : i.NULL())
            }
        });
        g.munderover.Augment({
            toSVG: function (F, C) {
                this.SVGgetStyles();
                var l = this.getValues("displaystyle", "accent", "accentunder", "align");
                if (!l.displaystyle && this.data[this.base] != null && this.data[this.base].CoreMO().Get("movablelimits")) {
                    return g.msubsup.prototype.toSVG.call(this)
                }
                var E = this.SVG(),
                    M = this.SVGgetScale(E);
                this.SVGhandleSpace(E);
                var p = [],
                    K = [],
                    u, J, G, n = -a.BIGDIMEN,
                    I = n;
                for (J = 0, G = this.data.length; J < G; J++) {
                    if (this.data[J] != null) {
                        if (J == this.base) {
                            p[J] = this.SVGdataStretched(J, F, C);
                            K[J] = (C != null || F == null) && this.data[J].SVGcanStretch("Horizontal")
                        } else {
                            p[J] = this.data[J].toSVG();
                            p[J].x = 0;
                            delete p[J].X;
                            K[J] = this.data[J].SVGcanStretch("Horizontal")
                        } if (p[J].w > I) {
                            I = p[J].w
                        }
                        if (!K[J] && I > n) {
                            n = I
                        }
                    }
                }
                if (C == null && F != null) {
                    n = F
                } else {
                    if (n == -a.BIGDIMEN) {
                        n = I
                    }
                }
                for (J = I = 0, G = this.data.length; J < G; J++) {
                    if (this.data[J]) {
                        if (K[J]) {
                            p[J] = this.data[J].SVGstretchH(n);
                            if (J !== this.base) {
                                p[J].x = 0;
                                delete p[J].X
                            }
                        }
                        if (p[J].w > I) {
                            I = p[J].w
                        }
                    }
                }
                var B = a.TeX.rule_thickness * this.mscale;
                var o = p[this.base] || {
                    w: 0,
                    h: 0,
                    d: 0,
                    H: 0,
                    D: 0,
                    l: 0,
                    r: 0,
                    y: 0,
                    scale: M
                };
                var s, q, w, v, r, A, H, L = 0;
                if (o.ic) {
                    L = 1.3 * o.ic + 0.05
                }
                for (J = 0, G = this.data.length; J < G; J++) {
                    if (this.data[J] != null) {
                        u = p[J];
                        r = a.TeX.big_op_spacing5 * M;
                        var z = (J != this.base && l[this.ACCENTS[J]]);
                        if (z && u.w <= 1) {
                            u.x = -u.l;
                            p[J] = i.G().With({
                                removeable: false
                            });
                            p[J].Add(u);
                            p[J].Clean();
                            p[J].w = -u.l;
                            u = p[J]
                        }
                        A = {
                            left: 0,
                            center: (I - u.w) / 2,
                            right: I - u.w
                        }[l.align];
                        s = A;
                        q = 0;
                        if (J == this.over) {
                            if (z) {
                                H = B * M;
                                r = 0;
                                if (o.skew) {
                                    s += o.skew
                                }
                            } else {
                                w = a.TeX.big_op_spacing1 * M;
                                v = a.TeX.big_op_spacing3 * M;
                                H = Math.max(w, v - Math.max(0, u.d))
                            }
                            H = Math.max(H, 1500 / a.em);
                            s += L / 2;
                            q = o.y + o.h + u.d + H;
                            u.h += r;
                            if (u.h > u.H) {
                                u.H = u.h
                            }
                        } else {
                            if (J == this.under) {
                                if (z) {
                                    H = 3 * B * M;
                                    r = 0
                                } else {
                                    w = a.TeX.big_op_spacing2 * M;
                                    v = a.TeX.big_op_spacing4 * M;
                                    H = Math.max(w, v - u.h)
                                }
                                H = Math.max(H, 1500 / a.em);
                                s -= L / 2;
                                q = o.y - (o.d + u.h + H);
                                u.d += r;
                                if (u.d > u.D) {
                                    u.D = u.d
                                }
                            }
                        }
                        E.Add(u, s, q)
                    }
                }
                E.Clean();
                this.SVGhandleColor(E);
                this.SVGsaveData(E);
                return E
            }
        });
        g.msubsup.Augment({
            toSVG: function (G, z) {
                this.SVGgetStyles();
                var B = this.SVG(),
                    K = this.SVGgetScale(B);
                this.SVGhandleSpace(B);
                var E = this.SVGgetMu(B);
                var m = B.Add(this.SVGdataStretched(this.base, G, z));
                var l = (this.data[this.sup] || this.data[this.sub] || this).SVGgetScale();
                var I = a.TeX.x_height * K,
                    y = a.TeX.scriptspace * K;
                var k, n;
                if (this.SVGnotEmpty(this.data[this.sup])) {
                    k = this.data[this.sup].toSVG();
                    k.w += y;
                    k.r = Math.max(k.w, k.r)
                }
                if (this.SVGnotEmpty(this.data[this.sub])) {
                    n = this.data[this.sub].toSVG();
                    n.w += y;
                    n.r = Math.max(n.w, n.r)
                }
                var C = a.TeX.sup_drop * l,
                    A = a.TeX.sub_drop * l;
                var w = m.h + (m.y || 0) - C,
                    o = m.d - (m.y || 0) + A,
                    J = 0,
                    F;
                if (m.ic) {
                    m.w -= m.ic;
                    J = 1.3 * m.ic + 0.05
                }
                if (this.data[this.base] && (this.data[this.base].type === "mi" || this.data[this.base].type === "mo")) {
                    if (this.data[this.base].data.join("").length === 1 && m.scale === 1 && !m.stretched && !this.data[this.base].Get("largeop")) {
                        w = o = 0
                    }
                }
                var H = this.getValues("subscriptshift", "superscriptshift");
                H.subscriptshift = (H.subscriptshift === "" ? 0 : a.length2em(H.subscriptshift, E));
                H.superscriptshift = (H.superscriptshift === "" ? 0 : a.length2em(H.superscriptshift, E));
                if (!k) {
                    if (n) {
                        o = Math.max(o, a.TeX.sub1 * K, n.h - (4 / 5) * I, H.subscriptshift);
                        B.Add(n, m.w, -o);
                        this.data[this.sub].SVGdata.dy = -o
                    }
                } else {
                    if (!n) {
                        values = this.getValues("displaystyle", "texprimestyle");
                        F = a.TeX[(values.displaystyle ? "sup1" : (values.texprimestyle ? "sup3" : "sup2"))];
                        w = Math.max(w, F * K, k.d + (1 / 4) * I, H.superscriptshift);
                        B.Add(k, m.w + J, w);
                        this.data[this.sup].SVGdata.dx = J;
                        this.data[this.sup].SVGdata.dy = w
                    } else {
                        o = Math.max(o, a.TeX.sub2 * K);
                        var x = a.TeX.rule_thickness * K;
                        if ((w - k.d) - (n.h - o) < 3 * x) {
                            o = 3 * x - w + k.d + n.h;
                            C = (4 / 5) * I - (w - k.d);
                            if (C > 0) {
                                w += C;
                                o -= C
                            }
                        }
                        B.Add(k, m.w + J, Math.max(w, H.superscriptshift));
                        B.Add(n, m.w, -Math.max(o, H.subscriptshift));
                        this.data[this.sup].SVGdata.dx = J;
                        this.data[this.sup].SVGdata.dy = Math.max(w, H.superscriptshift);
                        this.data[this.sub].SVGdata.dy = -Math.max(o, H.subscriptshift)
                    }
                }
                B.Clean();
                this.SVGhandleColor(B);
                this.SVGsaveData(B);
                return B
            }
        });
        g.mmultiscripts.Augment({
            toSVG: g.mbase.SVGautoload
        });
        g.mtable.Augment({
            toSVG: g.mbase.SVGautoload
        });
        g["annotation-xml"].Augment({
            toSVG: g.mbase.SVGautoload
        });
        g.math.Augment({
            SVG: i.Subclass({
                type: "svg",
                removeable: false
            }),
            toSVG: function (t, m) {
                if (this.data[0]) {
                    this.SVGgetStyles();
                    g.mbase.prototype.displayAlign = c.config.displayAlign;
                    g.mbase.prototype.displayIndent = c.config.displayIndent;
                    var q = i.G({
                        stroke: "black",
                        fill: "black",
                        "stroke-width": 0,
                        transform: "matrix(1 0 0 -1 0 0)"
                    }).With({
                        removeable: false
                    });
                    q.Add(this.data[0].toSVG(), 0, 0, true);
                    q.Clean();
                    this.SVGhandleColor(q);
                    var s = this.SVG();
                    s.element.setAttribute("xmlns:xlink", j);
                    s.Add(q);
                    s.Clean();
                    this.SVGsaveData(s);
                    if (!t) {
                        s.element = s.element.firstChild;
                        s.element.removeAttribute("transform");
                        s.removable = true;
                        return s
                    }
                    var p = Math.max(-s.l, 0),
                        k = Math.max(s.r - s.w, 0);
                    var n = s.element.style;
                    n.width = a.Ex(p + s.w + k);
                    n.height = a.Ex(s.H + s.D + 2 * a.em);
                    n.verticalAlign = a.Ex(-s.D - 3 * a.em);
                    n.marginLeft = a.Ex(-p);
                    n.marginRight = a.Ex(-k);
                    s.element.setAttribute("viewBox", (-p) + " " + (-s.H - a.em) + " " + (p + s.w + k) + " " + (s.H + s.D + 2 * a.em));
                    s.element.style.margin = "1px 0px";
                    if (s.H > s.h || s.D > s.d) {
                        var o = e.Element("span", {
                            style: {
                                display: "inline-block",
                                "white-space": "nowrap",
                                padding: "1px 0px"
                            },
                            isMathJax: true
                        }, [
                            ["span", {
                                style: {
                                    display: "inline-block",
                                    position: "relative",
                                    isMathJax: true,
                                    width: a.Ex(s.w),
                                    height: a.Ex(s.h + s.d),
                                    "vertical-align": a.Ex(-s.d)
                                }
                            }]
                        ]);
                        o.firstChild.appendChild(s.element);
                        s.element = o;
                        n.verticalAlign = n.margin = "";
                        n.position = "absolute";
                        n.bottom = a.Ex(s.d - s.D);
                        n.left = 0
                    }
                    t.appendChild(s.element);
                    s.element = null;
                    if (!this.isMultiline && this.Get("display") === "block") {
                        var u = this.getValues("indentalignfirst", "indentshiftfirst", "indentalign", "indentshift");
                        if (u.indentalignfirst !== g.INDENTALIGN.INDENTALIGN) {
                            u.indentalign = u.indentalignfirst
                        }
                        if (u.indentalign === g.INDENTALIGN.AUTO) {
                            u.indentalign = this.displayAlign
                        }
                        m.style.textAlign = u.indentalign;
                        if (u.indentshiftfirst !== g.INDENTSHIFT.INDENTSHIFT) {
                            u.indentshift = u.indentshiftfirst
                        }
                        if (u.indentshift === "auto") {
                            u.indentshift = this.displayIndent
                        }
                        if (u.indentshift && u.indentalign !== g.INDENTALIGN.CENTER && !s.hasIndent) {
                            t.style[{
                                left: "marginLeft",
                                right: "marginRight"
                            }[u.indentalign]] = a.Ex(a.length2em(u.indentshift))
                        }
                    }
                }
                return t
            }
        });
        g.TeXAtom.Augment({
            toSVG: function (k, n) {
                this.SVGgetStyles();
                var l = this.SVG();
                this.SVGhandleSpace(l);
                if (this.data[0] != null) {
                    var m = this.SVGdataStretched(0, k, n),
                        o = 0;
                    if (this.texClass === g.TEXCLASS.VCENTER) {
                        o = a.TeX.axis_height - (m.h + m.d) / 2 + m.d
                    }
                    l.Add(m, 0, o);
                    l.ic = m.ic
                }
                this.SVGhandleColor(l);
                this.SVGsaveData(l);
                return l
            }
        });
        c.Register.StartupHook("onLoad", function () {
            setTimeout(MathJax.Callback(["loadComplete", a, "jax.js"]), 0)
        })
    });
    c.Browser.Select({
        Opera: function (k) {
            a.Augment({
                operaZoomRefresh: true
            })
        }
    });
    c.Register.StartupHook("End Cookie", function () {
        if (c.config.menuSettings.zoom !== "None") {
            h.Require("[MathJax]/extensions/MathZoom.js")
        }
    });
    if (!document.createElementNS) {
        if (!document.namespaces.svg) {
            document.namespaces.add("svg", b)
        }
        a.Augment({
            Element: function (k, l) {
                var m = (typeof (k) === "string" ? document.createElement("svg:" + k) : k);
                m.isMathJax = true;
                if (l) {
                    for (var n in l) {
                        if (l.hasOwnProperty(n)) {
                            m.setAttribute(n, l[n].toString())
                        }
                    }
                }
                return m
            }
        })
    }
})(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.SVG);