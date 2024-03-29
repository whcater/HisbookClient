/*
 *  /MathJax/jax/input/TeX/jax.js
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
(function (d, c, i) {
    var h, g = "\u00A0";
    var j = function (l) {
        return MathJax.Localization._.apply(MathJax.Localization, [
            ["TeX", l]
        ].concat([].slice.call(arguments, 1)))
    };
    var e = MathJax.Object.Subclass({
        Init: function (m, l) {
            this.global = {
                isInner: l
            };
            this.data = [b.start(this.global)];
            if (m) {
                this.data[0].env = m
            }
            this.env = this.data[0].env
        }, Push: function () {
            var n, l, o, p;
            for (n = 0, l = arguments.length; n < l; n++) {
                o = arguments[n];
                if (!o) {
                    continue
                }
                if (o instanceof h.mbase) {
                    o = b.mml(o)
                }
                o.global = this.global;
                p = (this.data.length ? this.Top().checkItem(o) : true);
                if (p instanceof Array) {
                    this.Pop();
                    this.Push.apply(this, p)
                } else {
                    if (p instanceof b) {
                        this.Pop();
                        this.Push(p)
                    } else {
                        if (p) {
                            this.data.push(o);
                            if (o.env) {
                                for (var q in this.env) {
                                    if (this.env.hasOwnProperty(q)) {
                                        o.env[q] = this.env[q]
                                    }
                                }
                                this.env = o.env
                            } else {
                                o.env = this.env
                            }
                        }
                    }
                }
            }
        }, Pop: function () {
            var l = this.data.pop();
            if (!l.isOpen) {
                delete l.env
            }
            this.env = (this.data.length ? this.Top().env : {});
            return l
        }, Top: function (l) {
            if (l == null) {
                l = 1
            }
            if (this.data.length < l) {
                return null
            }
            return this.data[this.data.length - l]
        }, Prev: function (l) {
            var m = this.Top();
            if (l) {
                return m.data[m.data.length - 1]
            } else {
                return m.Pop()
            }
        }, toString: function () {
            return "stack[\n  " + this.data.join("\n  ") + "\n]"
        }
    });
    var b = e.Item = MathJax.Object.Subclass({
        type: "base",
        endError: ["ExtraOpenMissingClose", "Extra open brace or missing close brace"],
        closeError: ["ExtraCloseMissingOpen", "Extra close brace or missing open brace"],
        rightError: ["MissingLeftExtraRight", "Missing \\left or extra \\right"],
        Init: function () {
            if (this.isOpen) {
                this.env = {}
            }
            this.data = [];
            this.Push.apply(this, arguments)
        }, Push: function () {
            this.data.push.apply(this.data, arguments)
        }, Pop: function () {
            return this.data.pop()
        }, mmlData: function (l, m) {
            if (l == null) {
                l = true
            }
            if (this.data.length === 1 && !m) {
                return this.data[0]
            }
            return h.mrow.apply(h, this.data).With((l ? {
                inferred: true
            } : {}))
        }, checkItem: function (l) {
            if (l.type === "over" && this.isOpen) {
                l.num = this.mmlData(false);
                this.data = []
            }
            if (l.type === "cell" && this.isOpen) {
                if (l.linebreak) {
                    return false
                }
                d.Error(["Misplaced", "Misplaced %1", l.name])
            }
            if (l.isClose && this[l.type + "Error"]) {
                d.Error(this[l.type + "Error"])
            }
            if (!l.isNotStack) {
                return true
            }
            this.Push(l.data[0]);
            return false
        }, With: function (l) {
            for (var m in l) {
                if (l.hasOwnProperty(m)) {
                    this[m] = l[m]
                }
            }
            return this
        }, toString: function () {
            return this.type + "[" + this.data.join("; ") + "]"
        }
    });
    b.start = b.Subclass({
        type: "start",
        isOpen: true,
        Init: function (l) {
            this.SUPER(arguments).Init.call(this);
            this.global = l
        }, checkItem: function (l) {
            if (l.type === "stop") {
                return b.mml(this.mmlData())
            }
            return this.SUPER(arguments).checkItem.call(this, l)
        }
    });
    b.stop = b.Subclass({
        type: "stop",
        isClose: true
    });
    b.open = b.Subclass({
        type: "open",
        isOpen: true,
        stopError: ["ExtraOpenMissingClose", "Extra open brace or missing close brace"],
        checkItem: function (m) {
            if (m.type === "close") {
                var l = this.mmlData();
                return b.mml(h.TeXAtom(l))
            }
            return this.SUPER(arguments).checkItem.call(this, m)
        }
    });
    b.close = b.Subclass({
        type: "close",
        isClose: true
    });
    b.prime = b.Subclass({
        type: "prime",
        checkItem: function (l) {
            if (this.data[0].type !== "msubsup") {
                return [h.msup(this.data[0], this.data[1]), l]
            }
            this.data[0].SetData(this.data[0].sup, this.data[1]);
            return [this.data[0], l]
        }
    });
    b.subsup = b.Subclass({
        type: "subsup",
        stopError: ["MissingScript", "Missing superscript or subscript argument"],
        supError: ["MissingOpenForSup", "Missing open brace for superscript"],
        subError: ["MissingOpenForSub", "Missing open brace for subscript"],
        checkItem: function (l) {
            if (l.type === "open" || l.type === "left") {
                return true
            }
            if (l.type === "mml") {
                if (this.primes) {
                    if (this.position !== 2) {
                        this.data[0].SetData(2, this.primes)
                    } else {
                        l.data[0] = h.mrow(this.primes.With({
                            variantForm: true
                        }), l.data[0])
                    }
                }
                this.data[0].SetData(this.position, l.data[0]);
                return b.mml(this.data[0])
            }
            if (this.SUPER(arguments).checkItem.call(this, l)) {
                d.Error(this[["", "subError", "supError"][this.position]])
            }
        }, Pop: function () { }
    });
    b.over = b.Subclass({
        type: "over",
        isClose: true,
        name: "\\over",
        checkItem: function (n, l) {
            if (n.type === "over") {
                d.Error(["AmbiguousUseOf", "Ambiguous use of %1", n.name])
            }
            if (n.isClose) {
                var m = h.mfrac(this.num, this.mmlData(false));
                if (this.thickness != null) {
                    m.linethickness = this.thickness
                }
                if (this.open || this.close) {
                    m.texClass = h.TEXCLASS.INNER;
                    m.texWithDelims = true;
                    m = d.fenced(this.open, m, this.close)
                }
                return [b.mml(m), n]
            }
            return this.SUPER(arguments).checkItem.call(this, n)
        }, toString: function () {
            return "over[" + this.num + " / " + this.data.join("; ") + "]"
        }
    });
    b.left = b.Subclass({
        type: "left",
        isOpen: true,
        delim: "(",
        stopError: ["ExtraLeftMissingRight", "Extra \\left or missing \\right"],
        checkItem: function (l) {
            if (l.type === "right") {
                return b.mml(d.fenced(this.delim, this.mmlData(), l.delim))
            }
            return this.SUPER(arguments).checkItem.call(this, l)
        }
    });
    b.right = b.Subclass({
        type: "right",
        isClose: true,
        delim: ")"
    });
    b.begin = b.Subclass({
        type: "begin",
        isOpen: true,
        checkItem: function (l) {
            if (l.type === "end") {
                if (l.name !== this.name) {
                    d.Error(["EnvBadEnd", "\\begin{%1} ended with \\end{%2}", this.name, l.name])
                }
                if (!this.end) {
                    return b.mml(this.mmlData())
                }
                return this.parse[this.end].call(this.parse, this, this.data)
            }
            if (l.type === "stop") {
                d.Error(["EnvMissingEnd", "Missing \\end{%1}", this.name])
            }
            return this.SUPER(arguments).checkItem.call(this, l)
        }
    });
    b.end = b.Subclass({
        type: "end",
        isClose: true
    });
    b.style = b.Subclass({
        type: "style",
        checkItem: function (m) {
            if (!m.isClose) {
                return this.SUPER(arguments).checkItem.call(this, m)
            }
            var l = h.mstyle.apply(h, this.data).With(this.styles);
            return [b.mml(l), m]
        }
    });
    b.position = b.Subclass({
        type: "position",
        checkItem: function (m) {
            if (m.isClose) {
                d.Error(["MissingBoxFor", "Missing box for %1", this.name])
            }
            if (m.isNotStack) {
                var l = m.mmlData();
                switch (this.move) {
                    case "vertical":
                        l = h.mpadded(l).With({
                            height: this.dh,
                            depth: this.dd,
                            voffset: this.dh
                        });
                        return [b.mml(l)];
                    case "horizontal":
                        return [b.mml(this.left), m, b.mml(this.right)]
                }
            }
            return this.SUPER(arguments).checkItem.call(this, m)
        }
    });
    b.array = b.Subclass({
        type: "array",
        isOpen: true,
        arraydef: {},
        Init: function () {
            this.table = [];
            this.row = [];
            this.env = {};
            this.frame = [];
            this.SUPER(arguments).Init.apply(this, arguments)
        }, checkItem: function (m) {
            if (m.isClose && m.type !== "over") {
                if (m.isEntry) {
                    this.EndEntry();
                    this.clearEnv();
                    return false
                }
                if (m.isCR) {
                    this.EndEntry();
                    this.EndRow();
                    this.clearEnv();
                    return false
                }
                this.EndTable();
                this.clearEnv();
                var l = h.mtable.apply(h, this.table).With(this.arraydef);
                if (this.frame.length === 4) {
                    l.frame = (this.frame.dashed ? "dashed" : "solid")
                } else {
                    if (this.frame.length) {
                        l.hasFrame = true;
                        if (this.arraydef.rowlines) {
                            this.arraydef.rowlines = this.arraydef.rowlines.replace(/none( none)+$/, "none")
                        }
                        l = h.menclose(l).With({
                            notation: this.frame.join(" "),
                            isFrame: true
                        });
                        if ((this.arraydef.columnlines || "none") != "none" || (this.arraydef.rowlines || "none") != "none") {
                            l.padding = 0
                        }
                    }
                } if (this.open || this.close) {
                    l = d.fenced(this.open, l, this.close)
                }
                l = b.mml(l);
                if (this.requireClose) {
                    if (m.type === "close") {
                        return l
                    }
                    d.Error(["MissingCloseBrace", "Missing close brace"])
                }
                return [l, m]
            }
            return this.SUPER(arguments).checkItem.call(this, m)
        }, EndEntry: function () {
            this.row.push(h.mtd.apply(h, this.data));
            this.data = []
        }, EndRow: function () {
            this.table.push(h.mtr.apply(h, this.row));
            this.row = []
        }, EndTable: function () {
            if (this.data.length || this.row.length) {
                this.EndEntry();
                this.EndRow()
            }
            this.checkLines()
        }, checkLines: function () {
            if (this.arraydef.rowlines) {
                var l = this.arraydef.rowlines.split(/ /);
                if (l.length === this.table.length) {
                    this.frame.push("bottom");
                    l.pop();
                    this.arraydef.rowlines = l.join(" ")
                } else {
                    if (l.length < this.table.length - 1) {
                        this.arraydef.rowlines += " none"
                    }
                }
            }
            if (this.rowspacing) {
                var m = this.arraydef.rowspacing.split(/ /);
                while (m.length < this.table.length) {
                    m.push(this.rowspacing + "em")
                }
                this.arraydef.rowspacing = m.join(" ")
            }
        }, clearEnv: function () {
            for (var l in this.env) {
                if (this.env.hasOwnProperty(l)) {
                    delete this.env[l]
                }
            }
        }
    });
    b.cell = b.Subclass({
        type: "cell",
        isClose: true
    });
    b.mml = b.Subclass({
        type: "mml",
        isNotStack: true,
        Add: function () {
            this.data.push.apply(this.data, arguments);
            return this
        }
    });
    b.fn = b.Subclass({
        type: "fn",
        checkItem: function (m) {
            if (this.data[0]) {
                if (m.type !== "mml" || !m.data[0]) {
                    return [this.data[0], m]
                }
                if (m.data[0].isa(h.mspace)) {
                    return [this.data[0], m]
                }
                var l = m.data[0];
                if (l.isEmbellished()) {
                    l = l.CoreMO()
                }
                if ([0, 0, 1, 1, 0, 1, 1, 0, 0, 0][l.Get("texClass")]) {
                    return [this.data[0], m]
                }
                return [this.data[0], h.mo(h.entity("#x2061")).With({
                    texClass: h.TEXCLASS.NONE
                }), m]
            }
            return this.SUPER(arguments).checkItem.apply(this, arguments)
        }
    });
    b.not = b.Subclass({
        type: "not",
        checkItem: function (m) {
            var l, n;
            if (m.type === "open" || m.type === "left") {
                return true
            }
            if (m.type === "mml" && m.data[0].type.match(/^(mo|mi|mtext)$/)) {
                l = m.data[0], n = l.data.join("");
                if (n.length === 1 && !l.movesupsub) {
                    n = b.not.remap[n.charCodeAt(0)];
                    if (n) {
                        l.SetData(0, h.chars(String.fromCharCode(n)))
                    } else {
                        l.Append(h.chars("\u0338"))
                    }
                    return m
                }
            }
            l = h.mpadded(h.mtext("\u29F8")).With({
                width: 0
            });
            l = h.TeXAtom(l).With({
                texClass: h.TEXCLASS.REL
            });
            return [l, m]
        }
    });
    b.not.remap = {
        8592: 8602,
        8594: 8603,
        8596: 8622,
        8656: 8653,
        8658: 8655,
        8660: 8654,
        8712: 8713,
        8715: 8716,
        8739: 8740,
        8741: 8742,
        8764: 8769,
        126: 8769,
        8771: 8772,
        8773: 8775,
        8776: 8777,
        8781: 8813,
        61: 8800,
        8801: 8802,
        60: 8814,
        62: 8815,
        8804: 8816,
        8805: 8817,
        8818: 8820,
        8819: 8821,
        8822: 8824,
        8823: 8825,
        8826: 8832,
        8827: 8833,
        8834: 8836,
        8835: 8837,
        8838: 8840,
        8839: 8841,
        8866: 8876,
        8872: 8877,
        8873: 8878,
        8875: 8879,
        8828: 8928,
        8829: 8929,
        8849: 8930,
        8850: 8931,
        8882: 8938,
        8883: 8939,
        8884: 8940,
        8885: 8941,
        8707: 8708
    };
    b.dots = b.Subclass({
        type: "dots",
        checkItem: function (m) {
            if (m.type === "open" || m.type === "left") {
                return true
            }
            var n = this.ldots;
            if (m.type === "mml" && m.data[0].isEmbellished()) {
                var l = m.data[0].CoreMO().Get("texClass");
                if (l === h.TEXCLASS.BIN || l === h.TEXCLASS.REL) {
                    n = this.cdots
                }
            }
            return [n, m]
        }
    });
    var f = {
        Add: function (l, o, n) {
            if (!o) {
                o = this
            }
            for (var m in l) {
                if (l.hasOwnProperty(m)) {
                    if (typeof l[m] === "object" && !(l[m] instanceof Array) && (typeof o[m] === "object" || typeof o[m] === "function")) {
                        this.Add(l[m], o[m], l[m], n)
                    } else {
                        if (!o[m] || !o[m].isUser || !n) {
                            o[m] = l[m]
                        }
                    }
                }
            }
            return o
        }
    };
    var k = function () {
        h = MathJax.ElementJax.mml;
        c.Insert(f, {
            letter: /[a-z]/i,
            digit: /[0-9.]/,
            number: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)*|\.[0-9]+)/,
            special: {
                "\\": "ControlSequence",
                "{": "Open",
                "}": "Close",
                "~": "Tilde",
                "^": "Superscript",
                _: "Subscript",
                " ": "Space",
                "\t": "Space",
                "\r": "Space",
                "\n": "Space",
                "'": "Prime",
                "%": "Comment",
                "&": "Entry",
                "#": "Hash",
                "\u00A0": "Space",
                "\u2019": "Prime"
            },
            remap: {
                "-": "2212",
                "*": "2217",
                "`": "2018"
            },
            mathchar0mi: {
                alpha: "03B1",
                beta: "03B2",
                gamma: "03B3",
                delta: "03B4",
                epsilon: "03F5",
                zeta: "03B6",
                eta: "03B7",
                theta: "03B8",
                iota: "03B9",
                kappa: "03BA",
                lambda: "03BB",
                mu: "03BC",
                nu: "03BD",
                xi: "03BE",
                omicron: "03BF",
                pi: "03C0",
                rho: "03C1",
                sigma: "03C3",
                tau: "03C4",
                upsilon: "03C5",
                phi: "03D5",
                chi: "03C7",
                psi: "03C8",
                omega: "03C9",
                varepsilon: "03B5",
                vartheta: "03D1",
                varpi: "03D6",
                varrho: "03F1",
                varsigma: "03C2",
                varphi: "03C6",
                S: ["00A7", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                aleph: ["2135", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                hbar: ["210F", {
                    variantForm: true
                }],
                imath: "0131",
                jmath: "0237",
                ell: "2113",
                wp: ["2118", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                Re: ["211C", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                Im: ["2111", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                partial: ["2202", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                infty: ["221E", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                prime: ["2032", {
                    mathvariant: h.VARIANT.NORMAL,
                    variantForm: true
                }],
                emptyset: ["2205", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                nabla: ["2207", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                top: ["22A4", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                bot: ["22A5", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                angle: ["2220", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                triangle: ["25B3", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                backslash: ["2216", {
                    mathvariant: h.VARIANT.NORMAL,
                    variantForm: true
                }],
                forall: ["2200", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                exists: ["2203", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                neg: ["00AC", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                lnot: ["00AC", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                flat: ["266D", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                natural: ["266E", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                sharp: ["266F", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                clubsuit: ["2663", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                diamondsuit: ["2662", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                heartsuit: ["2661", {
                    mathvariant: h.VARIANT.NORMAL
                }],
                spadesuit: ["2660", {
                    mathvariant: h.VARIANT.NORMAL
                }]
            },
            mathchar0mo: {
                surd: "221A",
                coprod: ["2210", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                bigvee: ["22C1", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                bigwedge: ["22C0", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                biguplus: ["2A04", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                bigcap: ["22C2", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                bigcup: ["22C3", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                "int": ["222B", {
                    texClass: h.TEXCLASS.OP
                }],
                intop: ["222B", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true,
                    movablelimits: true
                }],
                iint: ["222C", {
                    texClass: h.TEXCLASS.OP
                }],
                iiint: ["222D", {
                    texClass: h.TEXCLASS.OP
                }],
                prod: ["220F", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                sum: ["2211", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                bigotimes: ["2A02", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                bigoplus: ["2A01", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                bigodot: ["2A00", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                oint: ["222E", {
                    texClass: h.TEXCLASS.OP
                }],
                bigsqcup: ["2A06", {
                    texClass: h.TEXCLASS.OP,
                    movesupsub: true
                }],
                smallint: ["222B", {
                    largeop: false
                }],
                triangleleft: "25C3",
                triangleright: "25B9",
                bigtriangleup: "25B3",
                bigtriangledown: "25BD",
                wedge: "2227",
                land: "2227",
                vee: "2228",
                lor: "2228",
                cap: "2229",
                cup: "222A",
                ddagger: "2021",
                dagger: "2020",
                sqcap: "2293",
                sqcup: "2294",
                uplus: "228E",
                amalg: "2A3F",
                diamond: "22C4",
                bullet: "2219",
                wr: "2240",
                div: "00F7",
                odot: ["2299", {
                    largeop: false
                }],
                oslash: ["2298", {
                    largeop: false
                }],
                otimes: ["2297", {
                    largeop: false
                }],
                ominus: ["2296", {
                    largeop: false
                }],
                oplus: ["2295", {
                    largeop: false
                }],
                mp: "2213",
                pm: "00B1",
                circ: "2218",
                bigcirc: "25EF",
                setminus: ["2216", {
                    variantForm: true
                }],
                cdot: "22C5",
                ast: "2217",
                times: "00D7",
                star: "22C6",
                propto: "221D",
                sqsubseteq: "2291",
                sqsupseteq: "2292",
                parallel: "2225",
                mid: "2223",
                dashv: "22A3",
                vdash: "22A2",
                leq: "2264",
                le: "2264",
                geq: "2265",
                ge: "2265",
                lt: "003C",
                gt: "003E",
                succ: "227B",
                prec: "227A",
                approx: "2248",
                succeq: "2AB0",
                preceq: "2AAF",
                supset: "2283",
                subset: "2282",
                supseteq: "2287",
                subseteq: "2286",
                "in": "2208",
                ni: "220B",
                notin: "2209",
                owns: "220B",
                gg: "226B",
                ll: "226A",
                sim: "223C",
                simeq: "2243",
                perp: "22A5",
                equiv: "2261",
                asymp: "224D",
                smile: "2323",
                frown: "2322",
                ne: "2260",
                neq: "2260",
                cong: "2245",
                doteq: "2250",
                bowtie: "22C8",
                models: "22A8",
                notChar: "29F8",
                Leftrightarrow: "21D4",
                Leftarrow: "21D0",
                Rightarrow: "21D2",
                leftrightarrow: "2194",
                leftarrow: "2190",
                gets: "2190",
                rightarrow: "2192",
                to: "2192",
                mapsto: "21A6",
                leftharpoonup: "21BC",
                leftharpoondown: "21BD",
                rightharpoonup: "21C0",
                rightharpoondown: "21C1",
                nearrow: "2197",
                searrow: "2198",
                nwarrow: "2196",
                swarrow: "2199",
                rightleftharpoons: "21CC",
                hookrightarrow: "21AA",
                hookleftarrow: "21A9",
                longleftarrow: "27F5",
                Longleftarrow: "27F8",
                longrightarrow: "27F6",
                Longrightarrow: "27F9",
                Longleftrightarrow: "27FA",
                longleftrightarrow: "27F7",
                longmapsto: "27FC",
                ldots: "2026",
                cdots: "22EF",
                vdots: "22EE",
                ddots: "22F1",
                dotsc: "2026",
                dotsb: "22EF",
                dotsm: "22EF",
                dotsi: "22EF",
                dotso: "2026",
                ldotp: ["002E", {
                    texClass: h.TEXCLASS.PUNCT
                }],
                cdotp: ["22C5", {
                    texClass: h.TEXCLASS.PUNCT
                }],
                colon: ["003A", {
                    texClass: h.TEXCLASS.PUNCT
                }]
            },
            mathchar7: {
                Gamma: "0393",
                Delta: "0394",
                Theta: "0398",
                Lambda: "039B",
                Xi: "039E",
                Pi: "03A0",
                Sigma: "03A3",
                Upsilon: "03A5",
                Phi: "03A6",
                Psi: "03A8",
                Omega: "03A9",
                _: "005F",
                "#": "0023",
                "$": "0024",
                "%": "0025",
                "&": "0026",
                And: "0026"
            },
            delimiter: {
                "(": "(",
                ")": ")",
                "[": "[",
                "]": "]",
                "<": "27E8",
                ">": "27E9",
                "\\lt": "27E8",
                "\\gt": "27E9",
                "/": "/",
                "|": ["|", {
                    texClass: h.TEXCLASS.ORD
                }],
                ".": "",
                "\\\\": "\\",
                "\\lmoustache": "23B0",
                "\\rmoustache": "23B1",
                "\\lgroup": "27EE",
                "\\rgroup": "27EF",
                "\\arrowvert": "23D0",
                "\\Arrowvert": "2016",
                "\\bracevert": "23AA",
                "\\Vert": ["2225", {
                    texClass: h.TEXCLASS.ORD
                }],
                "\\|": ["2225", {
                    texClass: h.TEXCLASS.ORD
                }],
                "\\vert": ["|", {
                    texClass: h.TEXCLASS.ORD
                }],
                "\\uparrow": "2191",
                "\\downarrow": "2193",
                "\\updownarrow": "2195",
                "\\Uparrow": "21D1",
                "\\Downarrow": "21D3",
                "\\Updownarrow": "21D5",
                "\\backslash": "\\",
                "\\rangle": "27E9",
                "\\langle": "27E8",
                "\\rbrace": "}",
                "\\lbrace": "{",
                "\\}": "}",
                "\\{": "{",
                "\\rceil": "2309",
                "\\lceil": "2308",
                "\\rfloor": "230B",
                "\\lfloor": "230A",
                "\\lbrack": "[",
                "\\rbrack": "]"
            },
            macros: {
                displaystyle: ["SetStyle", "D", true, 0],
                textstyle: ["SetStyle", "T", false, 0],
                scriptstyle: ["SetStyle", "S", false, 1],
                scriptscriptstyle: ["SetStyle", "SS", false, 2],
                rm: ["SetFont", h.VARIANT.NORMAL],
                mit: ["SetFont", h.VARIANT.ITALIC],
                oldstyle: ["SetFont", h.VARIANT.OLDSTYLE],
                cal: ["SetFont", h.VARIANT.CALIGRAPHIC],
                it: ["SetFont", "-tex-mathit"],
                bf: ["SetFont", h.VARIANT.BOLD],
                bbFont: ["SetFont", h.VARIANT.DOUBLESTRUCK],
                scr: ["SetFont", h.VARIANT.SCRIPT],
                frak: ["SetFont", h.VARIANT.FRAKTUR],
                sf: ["SetFont", h.VARIANT.SANSSERIF],
                tt: ["SetFont", h.VARIANT.MONOSPACE],
                tiny: ["SetSize", 0.5],
                Tiny: ["SetSize", 0.6],
                scriptsize: ["SetSize", 0.7],
                small: ["SetSize", 0.85],
                normalsize: ["SetSize", 1],
                large: ["SetSize", 1.2],
                Large: ["SetSize", 1.44],
                LARGE: ["SetSize", 1.73],
                huge: ["SetSize", 2.07],
                Huge: ["SetSize", 2.49],
                arcsin: ["NamedFn"],
                arccos: ["NamedFn"],
                arctan: ["NamedFn"],
                arg: ["NamedFn"],
                cos: ["NamedFn"],
                cosh: ["NamedFn"],
                cot: ["NamedFn"],
                coth: ["NamedFn"],
                csc: ["NamedFn"],
                deg: ["NamedFn"],
                det: "NamedOp",
                dim: ["NamedFn"],
                exp: ["NamedFn"],
                gcd: "NamedOp",
                hom: ["NamedFn"],
                inf: "NamedOp",
                ker: ["NamedFn"],
                lg: ["NamedFn"],
                lim: "NamedOp",
                liminf: ["NamedOp", "lim&thinsp;inf"],
                limsup: ["NamedOp", "lim&thinsp;sup"],
                ln: ["NamedFn"],
                log: ["NamedFn"],
                max: "NamedOp",
                min: "NamedOp",
                Pr: "NamedOp",
                sec: ["NamedFn"],
                sin: ["NamedFn"],
                sinh: ["NamedFn"],
                sup: "NamedOp",
                tan: ["NamedFn"],
                tanh: ["NamedFn"],
                limits: ["Limits", 1],
                nolimits: ["Limits", 0],
                overline: ["UnderOver", "00AF"],
                underline: ["UnderOver", "005F"],
                overbrace: ["UnderOver", "23DE", 1],
                underbrace: ["UnderOver", "23DF", 1],
                overrightarrow: ["UnderOver", "2192"],
                underrightarrow: ["UnderOver", "2192"],
                overleftarrow: ["UnderOver", "2190"],
                underleftarrow: ["UnderOver", "2190"],
                overleftrightarrow: ["UnderOver", "2194"],
                underleftrightarrow: ["UnderOver", "2194"],
                overset: "Overset",
                underset: "Underset",
                stackrel: ["Macro", "\\mathrel{\\mathop{#2}\\limits^{#1}}", 2],
                over: "Over",
                overwithdelims: "Over",
                atop: "Over",
                atopwithdelims: "Over",
                above: "Over",
                abovewithdelims: "Over",
                brace: ["Over", "{", "}"],
                brack: ["Over", "[", "]"],
                choose: ["Over", "(", ")"],
                frac: "Frac",
                sqrt: "Sqrt",
                root: "Root",
                uproot: ["MoveRoot", "upRoot"],
                leftroot: ["MoveRoot", "leftRoot"],
                left: "LeftRight",
                right: "LeftRight",
                middle: "Middle",
                llap: "Lap",
                rlap: "Lap",
                raise: "RaiseLower",
                lower: "RaiseLower",
                moveleft: "MoveLeftRight",
                moveright: "MoveLeftRight",
                ",": ["Spacer", h.LENGTH.THINMATHSPACE],
                ":": ["Spacer", h.LENGTH.MEDIUMMATHSPACE],
                ">": ["Spacer", h.LENGTH.MEDIUMMATHSPACE],
                ";": ["Spacer", h.LENGTH.THICKMATHSPACE],
                "!": ["Spacer", h.LENGTH.NEGATIVETHINMATHSPACE],
                enspace: ["Spacer", ".5em"],
                quad: ["Spacer", "1em"],
                qquad: ["Spacer", "2em"],
                thinspace: ["Spacer", h.LENGTH.THINMATHSPACE],
                negthinspace: ["Spacer", h.LENGTH.NEGATIVETHINMATHSPACE],
                hskip: "Hskip",
                hspace: "Hskip",
                kern: "Hskip",
                mskip: "Hskip",
                mspace: "Hskip",
                mkern: "Hskip",
                Rule: ["Rule"],
                Space: ["Rule", "blank"],
                big: ["MakeBig", h.TEXCLASS.ORD, 0.85],
                Big: ["MakeBig", h.TEXCLASS.ORD, 1.15],
                bigg: ["MakeBig", h.TEXCLASS.ORD, 1.45],
                Bigg: ["MakeBig", h.TEXCLASS.ORD, 1.75],
                bigl: ["MakeBig", h.TEXCLASS.OPEN, 0.85],
                Bigl: ["MakeBig", h.TEXCLASS.OPEN, 1.15],
                biggl: ["MakeBig", h.TEXCLASS.OPEN, 1.45],
                Biggl: ["MakeBig", h.TEXCLASS.OPEN, 1.75],
                bigr: ["MakeBig", h.TEXCLASS.CLOSE, 0.85],
                Bigr: ["MakeBig", h.TEXCLASS.CLOSE, 1.15],
                biggr: ["MakeBig", h.TEXCLASS.CLOSE, 1.45],
                Biggr: ["MakeBig", h.TEXCLASS.CLOSE, 1.75],
                bigm: ["MakeBig", h.TEXCLASS.REL, 0.85],
                Bigm: ["MakeBig", h.TEXCLASS.REL, 1.15],
                biggm: ["MakeBig", h.TEXCLASS.REL, 1.45],
                Biggm: ["MakeBig", h.TEXCLASS.REL, 1.75],
                mathord: ["TeXAtom", h.TEXCLASS.ORD],
                mathop: ["TeXAtom", h.TEXCLASS.OP],
                mathopen: ["TeXAtom", h.TEXCLASS.OPEN],
                mathclose: ["TeXAtom", h.TEXCLASS.CLOSE],
                mathbin: ["TeXAtom", h.TEXCLASS.BIN],
                mathrel: ["TeXAtom", h.TEXCLASS.REL],
                mathpunct: ["TeXAtom", h.TEXCLASS.PUNCT],
                mathinner: ["TeXAtom", h.TEXCLASS.INNER],
                vcenter: ["TeXAtom", h.TEXCLASS.VCENTER],
                mathchoice: ["Extension", "mathchoice"],
                buildrel: "BuildRel",
                hbox: ["HBox", 0],
                text: "HBox",
                mbox: ["HBox", 0],
                fbox: "FBox",
                strut: "Strut",
                mathstrut: ["Macro", "\\vphantom{(}"],
                phantom: "Phantom",
                vphantom: ["Phantom", 1, 0],
                hphantom: ["Phantom", 0, 1],
                smash: "Smash",
                acute: ["Accent", "00B4"],
                grave: ["Accent", "0060"],
                ddot: ["Accent", "00A8"],
                tilde: ["Accent", "007E"],
                bar: ["Accent", "00AF"],
                breve: ["Accent", "02D8"],
                check: ["Accent", "02C7"],
                hat: ["Accent", "005E"],
                vec: ["Accent", "2192"],
                dot: ["Accent", "02D9"],
                widetilde: ["Accent", "007E", 1],
                widehat: ["Accent", "005E", 1],
                matrix: "Matrix",
                array: "Matrix",
                pmatrix: ["Matrix", "(", ")"],
                cases: ["Matrix", "{", "", "left left", null, ".1em", null, true],
                eqalign: ["Matrix", null, null, "right left", h.LENGTH.THICKMATHSPACE, ".5em", "D"],
                displaylines: ["Matrix", null, null, "center", null, ".5em", "D"],
                cr: "Cr",
                "\\": "CrLaTeX",
                newline: "Cr",
                hline: ["HLine", "solid"],
                hdashline: ["HLine", "dashed"],
                eqalignno: ["Matrix", null, null, "right left right", h.LENGTH.THICKMATHSPACE + " 3em", ".5em", "D"],
                leqalignno: ["Matrix", null, null, "right left right", h.LENGTH.THICKMATHSPACE + " 3em", ".5em", "D"],
                bmod: ["Macro", '\\mmlToken{mo}[lspace="thickmathspace" rspace="thickmathspace"]{mod}'],
                pmod: ["Macro", "\\pod{\\mmlToken{mi}{mod}\\kern 6mu #1}", 1],
                mod: ["Macro", "\\mathchoice{\\kern18mu}{\\kern12mu}{\\kern12mu}{\\kern12mu}\\mmlToken{mi}{mod}\\,\\,#1", 1],
                pod: ["Macro", "\\mathchoice{\\kern18mu}{\\kern8mu}{\\kern8mu}{\\kern8mu}(#1)", 1],
                iff: ["Macro", "\\;\\Longleftrightarrow\\;"],
                skew: ["Macro", "{{#2{#3\\mkern#1mu}\\mkern-#1mu}{}}", 3],
                mathcal: ["Macro", "{\\cal #1}", 1],
                mathscr: ["Macro", "{\\scr #1}", 1],
                mathrm: ["Macro", "{\\rm #1}", 1],
                mathbf: ["Macro", "{\\bf #1}", 1],
                mathbb: ["Macro", "{\\bbFont #1}", 1],
                Bbb: ["Macro", "{\\bbFont #1}", 1],
                mathit: ["Macro", "{\\it #1}", 1],
                mathfrak: ["Macro", "{\\frak #1}", 1],
                mathsf: ["Macro", "{\\sf #1}", 1],
                mathtt: ["Macro", "{\\tt #1}", 1],
                textrm: ["Macro", "\\mathord{\\rm\\text{#1}}", 1],
                textit: ["Macro", "\\mathord{\\it\\text{#1}}", 1],
                textbf: ["Macro", "\\mathord{\\bf\\text{#1}}", 1],
                textsf: ["Macro", "\\mathord{\\sf\\text{#1}}", 1],
                texttt: ["Macro", "\\mathord{\\tt\\text{#1}}", 1],
                pmb: ["Macro", "\\rlap{#1}\\kern1px{#1}", 1],
                TeX: ["Macro", "T\\kern-.14em\\lower.5ex{E}\\kern-.115em X"],
                LaTeX: ["Macro", "L\\kern-.325em\\raise.21em{\\scriptstyle{A}}\\kern-.17em\\TeX"],
                " ": ["Macro", "\\text{ }"],
                not: "Not",
                dots: "Dots",
                space: "Tilde",
                "\u00A0": "Tilde",
                begin: "BeginEnd",
                end: "BeginEnd",
                newcommand: ["Extension", "newcommand"],
                renewcommand: ["Extension", "newcommand"],
                newenvironment: ["Extension", "newcommand"],
                renewenvironment: ["Extension", "newcommand"],
                def: ["Extension", "newcommand"],
                let: ["Extension", "newcommand"],
                verb: ["Extension", "verb"],
                boldsymbol: ["Extension", "boldsymbol"],
                tag: ["Extension", "AMSmath"],
                notag: ["Extension", "AMSmath"],
                label: ["Extension", "AMSmath"],
                ref: ["Extension", "AMSmath"],
                eqref: ["Extension", "AMSmath"],
                nonumber: ["Macro", "\\notag"],
                unicode: ["Extension", "unicode"],
                color: "Color",
                href: ["Extension", "HTML"],
                "class": ["Extension", "HTML"],
                style: ["Extension", "HTML"],
                cssId: ["Extension", "HTML"],
                bbox: ["Extension", "bbox"],
                mmlToken: "MmlToken",
                require: "Require"
            },
            environment: {
                array: ["AlignedArray"],
                matrix: ["Array", null, null, null, "c"],
                pmatrix: ["Array", null, "(", ")", "c"],
                bmatrix: ["Array", null, "[", "]", "c"],
                Bmatrix: ["Array", null, "\\{", "\\}", "c"],
                vmatrix: ["Array", null, "\\vert", "\\vert", "c"],
                Vmatrix: ["Array", null, "\\Vert", "\\Vert", "c"],
                cases: ["Array", null, "\\{", ".", "ll", null, ".2em", "T"],
                equation: [null, "Equation"],
                "equation*": [null, "Equation"],
                eqnarray: ["ExtensionEnv", null, "AMSmath"],
                "eqnarray*": ["ExtensionEnv", null, "AMSmath"],
                align: ["ExtensionEnv", null, "AMSmath"],
                "align*": ["ExtensionEnv", null, "AMSmath"],
                aligned: ["ExtensionEnv", null, "AMSmath"],
                multline: ["ExtensionEnv", null, "AMSmath"],
                "multline*": ["ExtensionEnv", null, "AMSmath"],
                split: ["ExtensionEnv", null, "AMSmath"],
                gather: ["ExtensionEnv", null, "AMSmath"],
                "gather*": ["ExtensionEnv", null, "AMSmath"],
                gathered: ["ExtensionEnv", null, "AMSmath"],
                alignat: ["ExtensionEnv", null, "AMSmath"],
                "alignat*": ["ExtensionEnv", null, "AMSmath"],
                alignedat: ["ExtensionEnv", null, "AMSmath"]
            },
            p_height: 1.2 / 0.85
        });
        if (this.config.Macros) {
            var l = this.config.Macros;
            for (var m in l) {
                if (l.hasOwnProperty(m)) {
                    if (typeof (l[m]) === "string") {
                        f.macros[m] = ["Macro", l[m]]
                    } else {
                        f.macros[m] = ["Macro"].concat(l[m])
                    }
                    f.macros[m].isUser = true
                }
            }
        }
    };
    var a = MathJax.Object.Subclass({
        Init: function (m, n) {
            this.string = m;
            this.i = 0;
            this.macroCount = 0;
            var l;
            if (n) {
                l = {};
                for (var o in n) {
                    if (n.hasOwnProperty(o)) {
                        l[o] = n[o]
                    }
                }
            }
            this.stack = d.Stack(l, !!n);
            this.Parse();
            this.Push(b.stop())
        }, Parse: function () {
            var m, l;
            while (this.i < this.string.length) {
                m = this.string.charAt(this.i++);
                l = m.charCodeAt(0);
                if (l >= 55296 && l < 56320) {
                    m += this.string.charAt(this.i++)
                }
                if (f.special[m]) {
                    this[f.special[m]](m)
                } else {
                    if (f.letter.test(m)) {
                        this.Variable(m)
                    } else {
                        if (f.digit.test(m)) {
                            this.Number(m)
                        } else {
                            this.Other(m)
                        }
                    }
                }
            }
        }, Push: function () {
            this.stack.Push.apply(this.stack, arguments)
        }, mml: function () {
            if (this.stack.Top().type !== "mml") {
                return null
            }
            return this.stack.Top().data[0]
        }, mmlToken: function (l) {
            return l
        }, ControlSequence: function (o) {
            var l = this.GetCS(),
                n = this.csFindMacro(l);
            if (n) {
                if (!(n instanceof Array)) {
                    n = [n]
                }
                var m = n[0];
                if (!(m instanceof Function)) {
                    m = this[m]
                }
                m.apply(this, [o + l].concat(n.slice(1)))
            } else {
                if (f.mathchar0mi[l]) {
                    this.csMathchar0mi(l, f.mathchar0mi[l])
                } else {
                    if (f.mathchar0mo[l]) {
                        this.csMathchar0mo(l, f.mathchar0mo[l])
                    } else {
                        if (f.mathchar7[l]) {
                            this.csMathchar7(l, f.mathchar7[l])
                        } else {
                            if (f.delimiter["\\" + l] != null) {
                                this.csDelimiter(l, f.delimiter["\\" + l])
                            } else {
                                this.csUndefined(o + l)
                            }
                        }
                    }
                }
            }
        }, csFindMacro: function (l) {
            return f.macros[l]
        }, csMathchar0mi: function (l, n) {
            var m = {
                mathvariant: h.VARIANT.ITALIC
            };
            if (n instanceof Array) {
                m = n[1];
                n = n[0]
            }
            this.Push(this.mmlToken(h.mi(h.entity("#x" + n)).With(m)))
        }, csMathchar0mo: function (l, n) {
            var m = {
                stretchy: false
            };
            if (n instanceof Array) {
                m = n[1];
                m.stretchy = false;
                n = n[0]
            }
            this.Push(this.mmlToken(h.mo(h.entity("#x" + n)).With(m)))
        }, csMathchar7: function (l, n) {
            var m = {
                mathvariant: h.VARIANT.NORMAL
            };
            if (n instanceof Array) {
                m = n[1];
                n = n[0]
            }
            if (this.stack.env.font) {
                m.mathvariant = this.stack.env.font
            }
            this.Push(this.mmlToken(h.mi(h.entity("#x" + n)).With(m)))
        }, csDelimiter: function (l, n) {
            var m = {};
            if (n instanceof Array) {
                m = n[1];
                n = n[0]
            }
            if (n.length === 4) {
                n = h.entity("#x" + n)
            } else {
                n = h.chars(n)
            }
            this.Push(this.mmlToken(h.mo(n).With({
                fence: false,
                stretchy: false
            }).With(m)))
        }, csUndefined: function (l) {
            d.Error(["UndefinedControlSequence", "Undefined control sequence %1", l])
        }, Variable: function (m) {
            var l = {};
            if (this.stack.env.font) {
                l.mathvariant = this.stack.env.font
            }
            this.Push(this.mmlToken(h.mi(h.chars(m)).With(l)))
        }, Number: function (o) {
            var l, m = this.string.slice(this.i - 1).match(f.number);
            if (m) {
                l = h.mn(m[0].replace(/[{}]/g, ""));
                this.i += m[0].length - 1
            } else {
                l = h.mo(h.chars(o))
            } if (this.stack.env.font) {
                l.mathvariant = this.stack.env.font
            }
            this.Push(this.mmlToken(l))
        }, Open: function (l) {
            this.Push(b.open())
        }, Close: function (l) {
            this.Push(b.close())
        }, Tilde: function (l) {
            this.Push(h.mtext(h.chars(g)))
        }, Space: function (l) { }, Superscript: function (p) {
            if (this.GetNext().match(/\d/)) {
                this.string = this.string.substr(0, this.i + 1) + " " + this.string.substr(this.i + 1)
            }
            var l, o, m, n = this.stack.Top();
            if (n.type === "prime") {
                m = n.data[0];
                o = n.data[1];
                this.stack.Pop()
            } else {
                m = this.stack.Prev();
                if (!m) {
                    m = h.mi("")
                }
            } if (m.isEmbellishedWrapper) {
                m = m.data[0].data[0]
            }
            if (m.type === "msubsup") {
                if (m.data[m.sup]) {
                    d.Error(["DoubleExponent", "Double exponent: use braces to clarify"])
                }
                l = m.sup
            } else {
                if (m.movesupsub) {
                    if (m.type !== "munderover" || m.data[m.over]) {
                        if (m.movablelimits && m.isa(h.mi)) {
                            m = this.mi2mo(m)
                        }
                        m = h.munderover(m, null, null).With({
                            movesupsub: true
                        })
                    }
                    l = m.over
                } else {
                    m = h.msubsup(m, null, null);
                    l = m.sup
                }
            }
            this.Push(b.subsup(m).With({
                position: l,
                primes: o
            }))
        }, Subscript: function (p) {
            if (this.GetNext().match(/\d/)) {
                this.string = this.string.substr(0, this.i + 1) + " " + this.string.substr(this.i + 1)
            }
            var l, o, m, n = this.stack.Top();
            if (n.type === "prime") {
                m = n.data[0];
                o = n.data[1];
                this.stack.Pop()
            } else {
                m = this.stack.Prev();
                if (!m) {
                    m = h.mi("")
                }
            } if (m.isEmbellishedWrapper) {
                m = m.data[0].data[0]
            }
            if (m.type === "msubsup") {
                if (m.data[m.sub]) {
                    d.Error(["DoubleSubscripts", "Double subscripts: use braces to clarify"])
                }
                l = m.sub
            } else {
                if (m.movesupsub) {
                    if (m.type !== "munderover" || m.data[m.under]) {
                        if (m.movablelimits && m.isa(h.mi)) {
                            m = this.mi2mo(m)
                        }
                        m = h.munderover(m, null, null).With({
                            movesupsub: true
                        })
                    }
                    l = m.under
                } else {
                    m = h.msubsup(m, null, null);
                    l = m.sub
                }
            }
            this.Push(b.subsup(m).With({
                position: l,
                primes: o
            }))
        }, PRIME: "\u2032",
        SMARTQUOTE: "\u2019",
        Prime: function (n) {
            var m = this.stack.Prev();
            if (!m) {
                m = h.mi()
            }
            if (m.type === "msubsup" && m.data[m.sup]) {
                d.Error(["DoubleExponentPrime", "Prime causes double exponent: use braces to clarify"])
            }
            var l = "";
            this.i--;
            do {
                l += this.PRIME;
                this.i++ , n = this.GetNext()
            } while (n === "'" || n === this.SMARTQUOTE);
            l = ["", "\u2032", "\u2033", "\u2034", "\u2057"][l.length] || l;
            this.Push(b.prime(m, this.mmlToken(h.mo(l))))
        }, mi2mo: function (l) {
            var m = h.mo();
            m.Append.apply(m, l.data);
            var n;
            for (n in m.defaults) {
                if (m.defaults.hasOwnProperty(n) && l[n] != null) {
                    m[n] = l[n]
                }
            }
            for (n in h.copyAttributes) {
                if (h.copyAttributes.hasOwnProperty(n) && l[n] != null) {
                    m[n] = l[n]
                }
            }
            return m
        }, Comment: function (l) {
            while (this.i < this.string.length && this.string.charAt(this.i) != "\n") {
                this.i++
            }
        }, Hash: function (l) {
            d.Error(["CantUseHash1", "You can't use 'macro parameter character #' in math mode"])
        }, Other: function (n) {
            var m, l;
            if (this.stack.env.font) {
                m = {
                    mathvariant: this.stack.env.font
                }
            }
            if (f.remap[n]) {
                n = f.remap[n];
                if (n instanceof Array) {
                    m = n[1];
                    n = n[0]
                }
                l = h.mo(h.entity("#x" + n)).With(m)
            } else {
                l = h.mo(n).With(m)
            } if (l.autoDefault("stretchy", true)) {
                l.stretchy = false
            }
            if (l.autoDefault("texClass", true) == "") {
                l = h.TeXAtom(l)
            }
            this.Push(this.mmlToken(l))
        }, SetFont: function (m, l) {
            this.stack.env.font = l
        }, SetStyle: function (m, l, n, o) {
            this.stack.env.style = l;
            this.stack.env.level = o;
            this.Push(b.style().With({
                styles: {
                    displaystyle: n,
                    scriptlevel: o
                }
            }))
        }, SetSize: function (l, m) {
            this.stack.env.size = m;
            this.Push(b.style().With({
                styles: {
                    mathsize: m + "em"
                }
            }))
        }, Color: function (n) {
            var m = this.GetArgument(n);
            var l = this.stack.env.color;
            this.stack.env.color = m;
            var o = this.ParseArg(n);
            if (l) {
                this.stack.env.color
            } else {
                delete this.stack.env.color
            }
            this.Push(h.mstyle(o).With({
                mathcolor: m
            }))
        }, Spacer: function (l, m) {
            this.Push(h.mspace().With({
                width: m,
                mathsize: h.SIZE.NORMAL,
                scriptlevel: 0
            }))
        }, LeftRight: function (l) {
            this.Push(b[l.substr(1)]().With({
                delim: this.GetDelimiter(l)
            }))
        }, Middle: function (l) {
            var m = this.GetDelimiter(l);
            if (this.stack.Top().type !== "left") {
                d.Error(["MisplacedMiddle", "%1 must be within \\left and \\right", l])
            }
            this.Push(h.mo(m).With({
                stretchy: true
            }))
        }, NamedFn: function (m, n) {
            if (!n) {
                n = m.substr(1)
            }
            var l = h.mi(n).With({
                texClass: h.TEXCLASS.OP
            });
            this.Push(b.fn(this.mmlToken(l)))
        }, NamedOp: function (m, n) {
            if (!n) {
                n = m.substr(1)
            }
            n = n.replace(/&thinsp;/, "\u2006");
            var l = h.mo(n).With({
                movablelimits: true,
                movesupsub: true,
                form: h.FORM.PREFIX,
                texClass: h.TEXCLASS.OP
            });
            l.useMMLspacing &= ~l.SPACE_ATTR.form;
            this.Push(this.mmlToken(l))
        }, Limits: function (m, l) {
            var n = this.stack.Prev("nopop");
            if (!n || n.texClass !== h.TEXCLASS.OP) {
                d.Error(["MisplacedLimits", "%1 is allowed only on operators", m])
            }
            n.movesupsub = (l ? true : false);
            n.movablelimits = false
        }, Over: function (n, m, o) {
            var l = b.over().With({
                name: n
            });
            if (m || o) {
                l.open = m;
                l.close = o
            } else {
                if (n.match(/withdelims$/)) {
                    l.open = this.GetDelimiter(n);
                    l.close = this.GetDelimiter(n)
                }
            } if (n.match(/^\\above/)) {
                l.thickness = this.GetDimen(n)
            } else {
                if (n.match(/^\\atop/) || m || o) {
                    l.thickness = 0
                }
            }
            this.Push(l)
        }, Frac: function (m) {
            var l = this.ParseArg(m);
            var n = this.ParseArg(m);
            this.Push(h.mfrac(l, n))
        }, Sqrt: function (o) {
            var p = this.GetBrackets(o),
                l = this.GetArgument(o);
            if (l === "\\frac") {
                l += "{" + this.GetArgument(l) + "}{" + this.GetArgument(l) + "}"
            }
            var m = d.Parse(l, this.stack.env).mml();
            if (!p) {
                m = h.msqrt.apply(h, m.array())
            } else {
                m = h.mroot(m, this.parseRoot(p))
            }
            this.Push(m)
        }, Root: function (m) {
            var o = this.GetUpTo(m, "\\of");
            var l = this.ParseArg(m);
            this.Push(h.mroot(l, this.parseRoot(o)))
        }, parseRoot: function (q) {
            var m = this.stack.env,
                l = m.inRoot;
            m.inRoot = true;
            var p = d.Parse(q, m);
            q = p.mml();
            var o = p.stack.global;
            if (o.leftRoot || o.upRoot) {
                q = h.mpadded(q);
                if (o.leftRoot) {
                    q.width = o.leftRoot
                }
                if (o.upRoot) {
                    q.voffset = o.upRoot;
                    q.height = o.upRoot
                }
            }
            m.inRoot = l;
            return q
        }, MoveRoot: function (l, o) {
            if (!this.stack.env.inRoot) {
                d.Error(["MisplacedMoveRoot", "%1 can appear only within a root", l])
            }
            if (this.stack.global[o]) {
                d.Error(["MultipleMoveRoot", "Multiple use of %1", l])
            }
            var m = this.GetArgument(l);
            if (!m.match(/-?[0-9]+/)) {
                d.Error(["IntegerArg", "The argument to %1 must be an integer", l])
            }
            m = (m / 15) + "em";
            if (m.substr(0, 1) !== "-") {
                m = "+" + m
            }
            this.stack.global[o] = m
        }, Accent: function (n, l, q) {
            var p = this.ParseArg(n);
            var o = {
                accent: true
            };
            if (this.stack.env.font) {
                o.mathvariant = this.stack.env.font
            }
            var m = this.mmlToken(h.mo(h.entity("#x" + l)).With(o));
            m.stretchy = (q ? true : false);
            this.Push(h.TeXAtom(h.munderover(p, null, m).With({
                accent: true
            })))
        }, UnderOver: function (n, q, l) {
            var p = {
                o: "over",
                u: "under"
            }[n.charAt(1)];
            var o = this.ParseArg(n);
            if (o.Get("movablelimits")) {
                o.movablelimits = false
            }
            var m = h.munderover(o, null, null);
            if (l) {
                m.movesupsub = true
            }
            m.data[m[p]] = this.mmlToken(h.mo(h.entity("#x" + q)).With({
                stretchy: true,
                accent: (p == "under")
            }));
            this.Push(m)
        }, Overset: function (l) {
            var n = this.ParseArg(l),
                m = this.ParseArg(l);
            this.Push(h.mover(m, n))
        }, Underset: function (l) {
            var n = this.ParseArg(l),
                m = this.ParseArg(l);
            this.Push(h.munder(m, n))
        }, TeXAtom: function (o, q) {
            var p = {
                texClass: q
            },
                n;
            if (q == h.TEXCLASS.OP) {
                p.movesupsub = p.movablelimits = true;
                var l = this.GetArgument(o);
                var m = l.match(/^\s*\\rm\s+([a-zA-Z0-9 ]+)$/);
                if (m) {
                    p.mathvariant = h.VARIANT.NORMAL;
                    n = b.fn(this.mmlToken(h.mi(m[1]).With(p)))
                } else {
                    n = b.fn(h.TeXAtom(d.Parse(l, this.stack.env).mml()).With(p))
                }
            } else {
                n = h.TeXAtom(this.ParseArg(o)).With(p)
            }
            this.Push(n)
        }, MmlToken: function (n) {
            var o = this.GetArgument(n),
                l = this.GetBrackets(n, "").replace(/^\s+/, ""),
                r = this.GetArgument(n),
                q = {
                    attrNames: []
                },
                m;
            if (!h[o] || !h[o].prototype.isToken) {
                d.Error(["NotMathMLToken", "%1 is not a token element", o])
            }
            while (l !== "") {
                m = l.match(/^([a-z]+)\s*=\s*(\'[^']*'|"[^"]*"|[^ ]*)\s*/i);
                if (!m) {
                    d.Error(["InvalidMathMLAttr", "Invalid MathML attribute: %1", l])
                }
                if (!h[o].prototype.defaults[m[1]] && !this.MmlTokenAllow[m[1]]) {
                    d.Error(["UnknownAttrForElement", "%1 is not a recognized attribute for %2", m[1], o])
                }
                var p = this.MmlFilterAttribute(m[1], m[2].replace(/^(['"])(.*)\1$/, "$2"));
                if (p) {
                    if (p.toLowerCase() === "true") {
                        p = true
                    } else {
                        if (p.toLowerCase() === "false") {
                            p = false
                        }
                    }
                    q[m[1]] = p;
                    q.attrNames.push(m[1])
                }
                l = l.substr(m[0].length)
            }
            this.Push(this.mmlToken(h[o](r).With(q)))
        }, MmlFilterAttribute: function (l, m) {
            return m
        }, MmlTokenAllow: {
            fontfamily: 1,
            fontsize: 1,
            fontweight: 1,
            fontstyle: 1,
            color: 1,
            background: 1,
            id: 1,
            "class": 1,
            href: 1,
            style: 1
        }, Strut: function (l) {
            this.Push(h.mpadded(h.mrow()).With({
                height: "8.6pt",
                depth: "3pt",
                width: 0
            }))
        }, Phantom: function (m, l, n) {
            var o = h.mphantom(this.ParseArg(m));
            if (l || n) {
                o = h.mpadded(o);
                if (n) {
                    o.height = o.depth = 0
                }
                if (l) {
                    o.width = 0
                }
            }
            this.Push(h.TeXAtom(o))
        }, Smash: function (n) {
            var m = this.trimSpaces(this.GetBrackets(n, ""));
            var l = h.mpadded(this.ParseArg(n));
            switch (m) {
                case "b":
                    l.depth = 0;
                    break;
                case "t":
                    l.height = 0;
                    break;
                default:
                    l.height = l.depth = 0
            }
            this.Push(h.TeXAtom(l))
        }, Lap: function (m) {
            var l = h.mpadded(this.ParseArg(m)).With({
                width: 0
            });
            if (m === "\\llap") {
                l.lspace = "-1width"
            }
            this.Push(h.TeXAtom(l))
        }, RaiseLower: function (l) {
            var m = this.GetDimen(l);
            var n = b.position().With({
                name: l,
                move: "vertical"
            });
            if (m.charAt(0) === "-") {
                m = m.slice(1);
                l = {
                    raise: "\\lower",
                    lower: "\\raise"
                }[l.substr(1)]
            }
            if (l === "\\lower") {
                n.dh = "-" + m;
                n.dd = "+" + m
            } else {
                n.dh = "+" + m;
                n.dd = "-" + m
            }
            this.Push(n)
        }, MoveLeftRight: function (l) {
            var o = this.GetDimen(l);
            var n = (o.charAt(0) === "-" ? o.slice(1) : "-" + o);
            if (l === "\\moveleft") {
                var m = o;
                o = n;
                n = m
            }
            this.Push(b.position().With({
                name: l,
                move: "horizontal",
                left: h.mspace().With({
                    width: o,
                    mathsize: h.SIZE.NORMAL
                }),
                right: h.mspace().With({
                    width: n,
                    mathsize: h.SIZE.NORMAL
                })
            }))
        }, Hskip: function (l) {
            this.Push(h.mspace().With({
                width: this.GetDimen(l),
                mathsize: h.SIZE.NORMAL
            }))
        }, Rule: function (n, p) {
            var l = this.GetDimen(n),
                o = this.GetDimen(n),
                r = this.GetDimen(n);
            var m, q = {
                width: l,
                height: o,
                depth: r
            };
            if (p !== "blank") {
                if (parseFloat(l) && parseFloat(o) + parseFloat(r)) {
                    q.mathbackground = (this.stack.env.color || "black")
                }
                m = h.mpadded(h.mrow()).With(q)
            } else {
                m = h.mspace().With(q)
            }
            this.Push(m)
        }, MakeBig: function (l, o, m) {
            m *= f.p_height;
            m = String(m).replace(/(\.\d\d\d).+/, "$1") + "em";
            var n = this.GetDelimiter(l, true);
            this.Push(h.TeXAtom(h.mo(n).With({
                minsize: m,
                maxsize: m,
                fence: true,
                stretchy: true,
                symmetric: true
            })).With({
                texClass: o
            }))
        }, BuildRel: function (l) {
            var m = this.ParseUpTo(l, "\\over");
            var n = this.ParseArg(l);
            this.Push(h.TeXAtom(h.munderover(n, null, m)).With({
                mclass: h.TEXCLASS.REL
            }))
        }, HBox: function (l, m) {
            this.Push.apply(this, this.InternalMath(this.GetArgument(l), m))
        }, FBox: function (l) {
            this.Push(h.menclose.apply(h, this.InternalMath(this.GetArgument(l))).With({
                notation: "box"
            }))
        }, Not: function (l) {
            this.Push(b.not())
        }, Dots: function (l) {
            this.Push(b.dots().With({
                ldots: this.mmlToken(h.mo(h.entity("#x2026")).With({
                    stretchy: false
                })),
                cdots: this.mmlToken(h.mo(h.entity("#x22EF")).With({
                    stretchy: false
                }))
            }))
        }, Require: function (l) {
            var m = this.GetArgument(l).replace(/.*\//, "").replace(/[^a-z0-9_.-]/ig, "");
            this.Extension(null, m)
        }, Extension: function (l, m, n) {
            if (l && !typeof (l) === "string") {
                l = l.name
            }
            m = d.extensionDir + "/" + m;
            if (!m.match(/\.js$/)) {
                m += ".js"
            }
            if (!i.loaded[i.fileURL(m)]) {
                if (l != null) {
                    delete f[n || "macros"][l.replace(/^\\/, "")]
                }
                c.RestartAfter(i.Require(m))
            }
        }, Macro: function (n, q, p, r) {
            if (p) {
                var m = [];
                if (r != null) {
                    var l = this.GetBrackets(n);
                    m.push(l == null ? r : l)
                }
                for (var o = m.length; o < p; o++) {
                    m.push(this.GetArgument(n))
                }
                q = this.SubstituteArgs(m, q)
            }
            this.string = this.AddArgs(q, this.string.slice(this.i));
            this.i = 0;
            if (++this.macroCount > d.config.MAXMACROS) {
                d.Error(["MaxMacroSub1", "MathJax maximum macro substitution count exceeded; is there a recursive macro call?"])
            }
        }, Matrix: function (m, o, t, q, s, n, l, u) {
            var r = this.GetNext();
            if (r === "") {
                d.Error(["MissingArgFor", "Missing argument for %1", m])
            }
            if (r === "{") {
                this.i++
            } else {
                this.string = r + "}" + this.string.slice(this.i + 1);
                this.i = 0
            }
            var p = b.array().With({
                requireClose: true,
                arraydef: {
                    rowspacing: (n || "4pt"),
                    columnspacing: (s || "1em")
                }
            });
            if (u) {
                p.isCases = true
            }
            if (o || t) {
                p.open = o;
                p.close = t
            }
            if (l === "D") {
                p.arraydef.displaystyle = true
            }
            if (q != null) {
                p.arraydef.columnalign = q
            }
            this.Push(p)
        }, Entry: function (o) {
            this.Push(b.cell().With({
                isEntry: true,
                name: o
            }));
            if (this.stack.Top().isCases) {
                var n = this.string;
                var r = 0,
                    p = this.i,
                    l = n.length;
                while (p < l) {
                    var s = n.charAt(p);
                    if (s === "{") {
                        r++;
                        p++
                    } else {
                        if (s === "}") {
                            if (r === 0) {
                                l = 0
                            } else {
                                r--;
                                p++
                            }
                        } else {
                            if (s === "&" && r === 0) {
                                d.Error(["ExtraAlignTab", "Extra alignment tab in \\cases text"])
                            } else {
                                if (s === "\\") {
                                    if (n.substr(p).match(/^((\\cr)[^a-zA-Z]|\\\\)/)) {
                                        l = 0
                                    } else {
                                        p += 2
                                    }
                                } else {
                                    p++
                                }
                            }
                        }
                    }
                }
                var q = n.substr(this.i, p - this.i);
                if (!q.match(/^\s*\\text[^a-zA-Z]/)) {
                    this.Push.apply(this, this.InternalMath(q));
                    this.i = p
                }
            }
        }, Cr: function (l) {
            this.Push(b.cell().With({
                isCR: true,
                name: l
            }))
        }, CrLaTeX: function (l) {
            var p;
            if (this.string.charAt(this.i) === "[") {
                p = this.GetBrackets(l, "").replace(/ /g, "");
                if (p && !p.match(/^((-?(\.\d+|\d+(\.\d*)?))(pt|em|ex|mu|mm|cm|in|pc))$/)) {
                    d.Error(["BracketMustBeDimension", "Bracket argument to %1 must be a dimension", l])
                }
            }
            this.Push(b.cell().With({
                isCR: true,
                name: l,
                linebreak: true
            }));
            var o = this.stack.Top();
            if (o.isa(b.array)) {
                if (p && o.arraydef.rowspacing) {
                    var m = o.arraydef.rowspacing.split(/ /);
                    if (!o.rowspacing) {
                        o.rowspacing = this.dimen2em(m[0])
                    }
                    while (m.length < o.table.length) {
                        m.push(this.Em(o.rowspacing))
                    }
                    m[o.table.length - 1] = this.Em(Math.max(0, o.rowspacing + this.dimen2em(p)));
                    o.arraydef.rowspacing = m.join(" ")
                }
            } else {
                if (p) {
                    this.Push(h.mspace().With({
                        depth: p
                    }))
                }
                this.Push(h.mspace().With({
                    linebreak: h.LINEBREAK.NEWLINE
                }))
            }
        }, emPerInch: 7.2,
        dimen2em: function (p) {
            var n = p.match(/^(-?(?:\.\d+|\d+(?:\.\d*)?))(pt|em|ex|mu|pc|in|mm|cm)/);
            var l = parseFloat(n[1] || "1"),
                o = n[2];
            if (o === "em") {
                return l
            }
            if (o === "ex") {
                return l * 0.43
            }
            if (o === "pt") {
                return l / 10
            }
            if (o === "pc") {
                return l * 1.2
            }
            if (o === "in") {
                return l * this.emPerInch
            }
            if (o === "cm") {
                return l * this.emPerInch / 2.54
            }
            if (o === "mm") {
                return l * this.emPerInch / 25.4
            }
            if (o === "mu") {
                return l / 18
            }
            return 0
        }, Em: function (l) {
            if (Math.abs(l) < 0.0006) {
                return "0em"
            }
            return l.toFixed(3).replace(/\.?0+$/, "") + "em"
        }, HLine: function (m, n) {
            if (n == null) {
                n = "solid"
            }
            var o = this.stack.Top();
            if (!o.isa(b.array) || o.data.length) {
                d.Error(["Misplaced", "Misplaced %1", m])
            }
            if (o.table.length == 0) {
                o.frame.push("top")
            } else {
                var l = (o.arraydef.rowlines ? o.arraydef.rowlines.split(/ /) : []);
                while (l.length < o.table.length) {
                    l.push("none")
                }
                l[o.table.length - 1] = n;
                o.arraydef.rowlines = l.join(" ")
            }
        }, BeginEnd: function (n) {
            var o = this.GetArgument(n),
                q = false;
            if (o.match(/^\\end\\/)) {
                q = true;
                o = o.substr(5)
            }
            if (o.match(/\\/i)) {
                d.Error(["InvalidEnv", "Invalid environment name '%1'", o])
            }
            var p = this.envFindName(o);
            if (!p) {
                d.Error(["UnknownEnv", "Unknown environment '%1'", o])
            }
            if (!(p instanceof Array)) {
                p = [p]
            }
            var l = (p[1] instanceof Array ? p[1][0] : p[1]);
            var m = b.begin().With({
                name: o,
                end: l,
                parse: this
            });
            if (n === "\\end") {
                if (!q && p[1] instanceof Array && this[p[1][1]]) {
                    m = this[p[1][1]].apply(this, [m].concat(p.slice(2)))
                } else {
                    m = b.end().With({
                        name: o
                    })
                }
            } else {
                if (++this.macroCount > d.config.MAXMACROS) {
                    d.Error(["MaxMacroSub2", "MathJax maximum substitution count exceeded; is there a recursive latex environment?"])
                }
                if (p[0] && this[p[0]]) {
                    m = this[p[0]].apply(this, [m].concat(p.slice(2)))
                }
            }
            this.Push(m)
        }, envFindName: function (l) {
            return f.environment[l]
        }, Equation: function (l, m) {
            return m
        }, ExtensionEnv: function (m, l) {
            this.Extension(m.name, l, "environment")
        }, Array: function (m, o, t, r, s, n, l, p) {
            if (!r) {
                r = this.GetArgument("\\begin{" + m.name + "}")
            }
            var u = ("c" + r).replace(/[^clr|:]/g, "").replace(/[^|:]([|:])+/g, "$1");
            r = r.replace(/[^clr]/g, "").split("").join(" ");
            r = r.replace(/l/g, "left").replace(/r/g, "right").replace(/c/g, "center");
            var q = b.array().With({
                arraydef: {
                    columnalign: r,
                    columnspacing: (s || "1em"),
                    rowspacing: (n || "4pt")
                }
            });
            if (u.match(/[|:]/)) {
                if (u.charAt(0).match(/[|:]/)) {
                    q.frame.push("left");
                    q.frame.dashed = u.charAt(0) === ":"
                }
                if (u.charAt(u.length - 1).match(/[|:]/)) {
                    q.frame.push("right")
                }
                u = u.substr(1, u.length - 2);
                q.arraydef.columnlines = u.split("").join(" ").replace(/[^|: ]/g, "none").replace(/\|/g, "solid").replace(/:/g, "dashed")
            }
            if (o) {
                q.open = this.convertDelimiter(o)
            }
            if (t) {
                q.close = this.convertDelimiter(t)
            }
            if (l === "D") {
                q.arraydef.displaystyle = true
            } else {
                if (l) {
                    q.arraydef.displaystyle = false
                }
            } if (l === "S") {
                q.arraydef.scriptlevel = 1
            }
            if (p) {
                q.arraydef.useHeight = false
            }
            this.Push(m);
            return q
        }, AlignedArray: function (l) {
            var m = this.GetBrackets("\\begin{" + l.name + "}");
            return this.setArrayAlign(this.Array.apply(this, arguments), m)
        }, setArrayAlign: function (m, l) {
            l = this.trimSpaces(l || "");
            if (l === "t") {
                m.arraydef.align = "baseline 1"
            } else {
                if (l === "b") {
                    m.arraydef.align = "baseline -1"
                } else {
                    if (l === "c") {
                        m.arraydef.align = "center"
                    } else {
                        if (l) {
                            m.arraydef.align = l
                        }
                    }
                }
            }
            return m
        }, convertDelimiter: function (l) {
            if (l) {
                l = f.delimiter[l]
            }
            if (l == null) {
                return null
            }
            if (l instanceof Array) {
                l = l[0]
            }
            if (l.length === 4) {
                l = String.fromCharCode(parseInt(l, 16))
            }
            return l
        }, trimSpaces: function (l) {
            if (typeof (l) != "string") {
                return l
            }
            return l.replace(/^\s+|\s+$/g, "")
        }, nextIsSpace: function () {
            return this.string.charAt(this.i).match(/\s/)
        }, GetNext: function () {
            while (this.nextIsSpace()) {
                this.i++
            }
            return this.string.charAt(this.i)
        }, GetCS: function () {
            var l = this.string.slice(this.i).match(/^([a-z]+|.) ?/i);
            if (l) {
                this.i += l[1].length;
                return l[1]
            } else {
                this.i++;
                return " "
            }
        }, GetArgument: function (m, n) {
            switch (this.GetNext()) {
                case "":
                    if (!n) {
                        d.Error(["MissingArgFor", "Missing argument for %1", m])
                    }
                    return null;
                case "}":
                    if (!n) {
                        d.Error(["ExtraCloseMissingOpen", "Extra close brace or missing open brace"])
                    }
                    return null;
                case "\\":
                    this.i++;
                    return "\\" + this.GetCS();
                case "{":
                    var l = ++this.i,
                        o = 1;
                    while (this.i < this.string.length) {
                        switch (this.string.charAt(this.i++)) {
                            case "\\":
                                this.i++;
                                break;
                            case "{":
                                o++;
                                break;
                            case "}":
                                if (--o == 0) {
                                    return this.string.slice(l, this.i - 1)
                                }
                                break
                        }
                    }
                    d.Error(["MissingCloseBrace", "Missing close brace"]);
                    break
            }
            return this.string.charAt(this.i++)
        }, GetBrackets: function (m, o) {
            if (this.GetNext() != "[") {
                return o
            }
            var l = ++this.i,
                n = 0;
            while (this.i < this.string.length) {
                switch (this.string.charAt(this.i++)) {
                    case "{":
                        n++;
                        break;
                    case "\\":
                        this.i++;
                        break;
                    case "}":
                        if (n-- <= 0) {
                            d.Error(["ExtraCloseLooking", "Extra close brace while looking for %1", "']'"])
                        }
                        break;
                    case "]":
                        if (n == 0) {
                            return this.string.slice(l, this.i - 1)
                        }
                        break
                }
            }
            d.Error(["MissingCloseBracket", "Couldn't find closing ']' for argument to %1", m])
        }, GetDelimiter: function (l, m) {
            while (this.nextIsSpace()) {
                this.i++
            }
            var n = this.string.charAt(this.i);
            this.i++;
            if (this.i <= this.string.length) {
                if (n == "\\") {
                    n += this.GetCS(l)
                } else {
                    if (n === "{" && m) {
                        this.i--;
                        n = this.GetArgument(l)
                    }
                } if (f.delimiter[n] != null) {
                    return this.convertDelimiter(n)
                }
            }
            d.Error(["MissingOrUnrecognizedDelim", "Missing or unrecognized delimiter for %1", l])
        }, GetDimen: function (m) {
            var n;
            if (this.nextIsSpace()) {
                this.i++
            }
            if (this.string.charAt(this.i) == "{") {
                n = this.GetArgument(m);
                if (n.match(/^\s*([-+]?(\.\d+|\d+(\.\d*)?))\s*(pt|em|ex|mu|px|mm|cm|in|pc)\s*$/)) {
                    return n.replace(/ /g, "")
                }
            } else {
                n = this.string.slice(this.i);
                var l = n.match(/^\s*(([-+]?(\.\d+|\d+(\.\d*)?))\s*(pt|em|ex|mu|px|mm|cm|in|pc)) ?/);
                if (l) {
                    this.i += l[0].length;
                    return l[1].replace(/ /g, "")
                }
            }
            d.Error(["MissingDimOrUnits", "Missing dimension or its units for %1", m])
        }, GetUpTo: function (n, o) {
            while (this.nextIsSpace()) {
                this.i++
            }
            var m = this.i,
                l, q, p = 0;
            while (this.i < this.string.length) {
                l = this.i;
                q = this.string.charAt(this.i++);
                switch (q) {
                    case "\\":
                        q += this.GetCS();
                        break;
                    case "{":
                        p++;
                        break;
                    case "}":
                        if (p == 0) {
                            d.Error(["ExtraCloseLooking", "Extra close brace while looking for %1", o])
                        }
                        p--;
                        break
                }
                if (p == 0 && q == o) {
                    return this.string.slice(m, l)
                }
            }
            d.Error(["TokenNotFoundForCommand", "Couldn't find %1 for %2", o, n])
        }, ParseArg: function (l) {
            return d.Parse(this.GetArgument(l), this.stack.env).mml()
        }, ParseUpTo: function (l, m) {
            return d.Parse(this.GetUpTo(l, m), this.stack.env).mml()
        }, InternalMath: function (q, s) {
            var p = {
                displaystyle: false
            };
            if (s != null) {
                p.scriptlevel = s
            }
            if (this.stack.env.font) {
                p.mathvariant = this.stack.env.font
            }
            if (!q.match(/\\?\$|\\\(|\\(eq)?ref\s*\{/)) {
                return [this.InternalText(q, p)]
            }
            var o = 0,
                l = 0,
                r, n = "";
            var m = [];
            while (o < q.length) {
                r = q.charAt(o++);
                if (r === "$") {
                    if (n === "$") {
                        m.push(h.TeXAtom(d.Parse(q.slice(l, o - 1), {}).mml().With(p)));
                        n = "";
                        l = o
                    } else {
                        if (n === "") {
                            if (l < o - 1) {
                                m.push(this.InternalText(q.slice(l, o - 1), p))
                            }
                            n = "$";
                            l = o
                        }
                    }
                } else {
                    if (r === "}" && n === "}") {
                        m.push(h.TeXAtom(d.Parse(q.slice(l, o), {}).mml().With(p)));
                        n = "";
                        l = o
                    } else {
                        if (r === "\\") {
                            if (n === "" && q.substr(o).match(/^(eq)?ref\s*\{/)) {
                                if (l < o - 1) {
                                    m.push(this.InternalText(q.slice(l, o - 1), p))
                                }
                                n = "}";
                                l = o - 1
                            } else {
                                r = q.charAt(o++);
                                if (r === "(" && n === "") {
                                    if (l < o - 2) {
                                        m.push(this.InternalText(q.slice(l, o - 2), p))
                                    }
                                    n = ")";
                                    l = o
                                } else {
                                    if (r === ")" && n === ")") {
                                        m.push(h.TeXAtom(d.Parse(q.slice(l, o - 2), {}).mml().With(p)));
                                        n = "";
                                        l = o
                                    } else {
                                        if (r === "$" && n === "") {
                                            o--;
                                            q = q.substr(0, o - 1) + q.substr(o)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (n !== "") {
                d.Error(["MathNotTerminated", "Math not terminated in text box"])
            }
            if (l < q.length) {
                m.push(this.InternalText(q.slice(l), p))
            }
            return m
        }, InternalText: function (m, l) {
            m = m.replace(/^\s+/, g).replace(/\s+$/, g);
            return h.mtext(h.chars(m)).With(l)
        }, SubstituteArgs: function (m, l) {
            var p = "";
            var o = "";
            var q;
            var n = 0;
            while (n < l.length) {
                q = l.charAt(n++);
                if (q === "\\") {
                    p += q + l.charAt(n++)
                } else {
                    if (q === "#") {
                        q = l.charAt(n++);
                        if (q === "#") {
                            p += q
                        } else {
                            if (!q.match(/[1-9]/) || q > m.length) {
                                d.Error(["IllegalMacroParam", "Illegal macro parameter reference"])
                            }
                            o = this.AddArgs(this.AddArgs(o, p), m[q - 1]);
                            p = ""
                        }
                    } else {
                        p += q
                    }
                }
            }
            return this.AddArgs(o, p)
        }, AddArgs: function (m, l) {
            if (l.match(/^[a-z]/i) && m.match(/(^|[^\\])(\\\\)*\\[a-z]+$/i)) {
                m += " "
            }
            if (m.length + l.length > d.config.MAXBUFFER) {
                d.Error(["MaxBufferSize", "MathJax internal buffer size exceeded; is there a recursive macro call?"])
            }
            return m + l
        }
    });
    d.Augment({
        Stack: e,
        Parse: a,
        Definitions: f,
        Startup: k,
        config: {
            MAXMACROS: 10000,
            MAXBUFFER: 5 * 1024
        },
        sourceMenuTitle: ["TeXCommands", "TeX Commands"],
        annotationEncoding: "application/x-tex",
        prefilterHooks: MathJax.Callback.Hooks(true),
        postfilterHooks: MathJax.Callback.Hooks(true),
        Config: function () {
            this.SUPER(arguments).Config.apply(this, arguments);
            if (this.config.equationNumbers.autoNumber !== "none") {
                if (!this.config.extensions) {
                    this.config.extensions = []
                }
                this.config.extensions.push("AMSmath.js")
            }
        }, Translate: function (l) {
            var m, n = false,
                p = MathJax.HTML.getScript(l);
            var r = (l.type.replace(/\n/g, " ").match(/(;|\s|\n)mode\s*=\s*display(;|\s|\n|$)/) != null);
            var q = {
                math: p,
                display: r,
                script: l
            };
            this.prefilterHooks.Execute(q);
            p = q.math;
            try {
                m = d.Parse(p).mml()
            } catch (o) {
                if (!o.texError) {
                    throw o
                }
                m = this.formatError(o, p, r, l);
                n = true
            }
            if (m.inferred) {
                m = h.apply(MathJax.ElementJax, m.data)
            } else {
                m = h(m)
            } if (r) {
                m.root.display = "block"
            }
            if (n) {
                m.texError = true
            }
            q.math = m;
            this.postfilterHooks.Execute(q);
            return q.math
        }, prefilterMath: function (m, n, l) {
            return m
        }, postfilterMath: function (m, n, l) {
            this.combineRelations(m.root);
            return m
        }, formatError: function (o, n, p, l) {
            var m = o.message.replace(/\n.*/, "");
            c.signal.Post(["TeX Jax - parse error", m, n, p, l]);
            return h.Error(m)
        }, Error: function (l) {
            if (l instanceof Array) {
                l = j.apply(j, l)
            }
            throw c.Insert(Error(l), {
                texError: true
            })
        }, Macro: function (l, m, n) {
            f.macros[l] = ["Macro"].concat([].slice.call(arguments, 1));
            f.macros[l].isUser = true
        }, fenced: function (n, m, o) {
            var l = h.mrow().With({
                open: n,
                close: o,
                texClass: h.TEXCLASS.INNER
            });
            if (n) {
                l.Append(h.mo(n).With({
                    fence: true,
                    stretchy: true,
                    texClass: h.TEXCLASS.OPEN
                }))
            }
            if (m.type === "mrow") {
                l.Append.apply(l, m.data)
            } else {
                l.Append(m)
            } if (o) {
                l.Append(h.mo(o).With({
                    fence: true,
                    stretchy: true,
                    texClass: h.TEXCLASS.CLOSE
                }))
            }
            return l
        }, combineRelations: function (p) {
            var q, l, o, n;
            for (q = 0, l = p.data.length; q < l; q++) {
                if (p.data[q]) {
                    if (p.isa(h.mrow)) {
                        while (q + 1 < l && (o = p.data[q]) && (n = p.data[q + 1]) && o.isa(h.mo) && n.isa(h.mo) && o.Get("texClass") === h.TEXCLASS.REL && n.Get("texClass") === h.TEXCLASS.REL) {
                            if (o.variantForm == n.variantForm && o.Get("mathvariant") == n.Get("mathvariant") && o.style == n.style && o["class"] == n["class"] && !o.id && !n.id) {
                                o.Append.apply(o, n.data);
                                p.data.splice(q + 1, 1);
                                l--
                            } else {
                                o.rspace = n.lspace = "0pt";
                                q++
                            }
                        }
                    }
                    if (!p.data[q].isToken) {
                        this.combineRelations(p.data[q])
                    }
                }
            }
        }
    });
    d.prefilterHooks.Add(function (l) {
        l.math = d.prefilterMath(l.math, l.display, l.script)
    });
    d.postfilterHooks.Add(function (l) {
        l.math = d.postfilterMath(l.math, l.display, l.script)
    });
    d.loadComplete("jax.js")
})(MathJax.InputJax.TeX, MathJax.Hub, MathJax.Ajax);