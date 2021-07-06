/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+bash */
self =
  "undefined" != typeof window
    ? window
    : "undefined" != typeof WorkerGlobalScope &&
      self instanceof WorkerGlobalScope
    ? self
    : {};
var Prism = (function () {
  var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
    t = (self.Prism = {
      util: {
        encode: function (e) {
          return e instanceof n
            ? new n(e.type, t.util.encode(e.content), e.alias)
            : "Array" === t.util.type(e)
            ? e.map(t.util.encode)
            : e
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/\u00a0/g, " ");
        },
        type: function (e) {
          return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
        },
        clone: function (e) {
          var n = t.util.type(e);
          switch (n) {
            case "Object":
              var a = {};
              for (var r in e)
                e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
              return a;
            case "Array":
              return e.slice();
          }
          return e;
        },
      },
      languages: {
        extend: function (e, n) {
          var a = t.util.clone(t.languages[e]);
          for (var r in n) a[r] = n[r];
          return a;
        },
        insertBefore: function (e, n, a, r) {
          r = r || t.languages;
          var i = r[e],
            l = {};
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              if (o == n) for (var s in a) a.hasOwnProperty(s) && (l[s] = a[s]);
              l[o] = i[o];
            }
          return (r[e] = l);
        },
        DFS: function (e, n, a) {
          for (var r in e)
            e.hasOwnProperty(r) &&
              (n.call(e, r, e[r], a || r),
              "Object" === t.util.type(e[r])
                ? t.languages.DFS(e[r], n)
                : "Array" === t.util.type(e[r]) && t.languages.DFS(e[r], n, r));
        },
      },
      highlightAll: function (e, n) {
        for (
          var a,
            r = document.querySelectorAll(
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            ),
            i = 0;
          (a = r[i++]);

        )
          t.highlightElement(a, e === !0, n);
      },
      highlightElement: function (a, r, i) {
        for (var l, o, s = a; s && !e.test(s.className); ) s = s.parentNode;
        if (
          (s &&
            ((l = (s.className.match(e) || [, ""])[1]), (o = t.languages[l])),
          o)
        ) {
          (a.className =
            a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l),
            (s = a.parentNode),
            /pre/i.test(s.nodeName) &&
              (s.className =
                s.className.replace(e, "").replace(/\s+/g, " ") +
                " language-" +
                l);
          var c = a.textContent;
          if (c) {
            var g = { element: a, language: l, grammar: o, code: c };
            if ((t.hooks.run("before-highlight", g), r && self.Worker)) {
              var u = new Worker(t.filename);
              (u.onmessage = function (e) {
                (g.highlightedCode = n.stringify(JSON.parse(e.data), l)),
                  t.hooks.run("before-insert", g),
                  (g.element.innerHTML = g.highlightedCode),
                  i && i.call(g.element),
                  t.hooks.run("after-highlight", g);
              }),
                u.postMessage(
                  JSON.stringify({ language: g.language, code: g.code })
                );
            } else
              (g.highlightedCode = t.highlight(g.code, g.grammar, g.language)),
                t.hooks.run("before-insert", g),
                (g.element.innerHTML = g.highlightedCode),
                i && i.call(a),
                t.hooks.run("after-highlight", g);
          }
        }
      },
      highlight: function (e, a, r) {
        var i = t.tokenize(e, a);
        return n.stringify(t.util.encode(i), r);
      },
      tokenize: function (e, n) {
        var a = t.Token,
          r = [e],
          i = n.rest;
        if (i) {
          for (var l in i) n[l] = i[l];
          delete n.rest;
        }
        e: for (var l in n)
          if (n.hasOwnProperty(l) && n[l]) {
            var o = n[l];
            o = "Array" === t.util.type(o) ? o : [o];
            for (var s = 0; s < o.length; ++s) {
              var c = o[s],
                g = c.inside,
                u = !!c.lookbehind,
                f = 0,
                h = c.alias;
              c = c.pattern || c;
              for (var p = 0; p < r.length; p++) {
                var d = r[p];
                if (r.length > e.length) break e;
                if (!(d instanceof a)) {
                  c.lastIndex = 0;
                  var m = c.exec(d);
                  if (m) {
                    u && (f = m[1].length);
                    var y = m.index - 1 + f,
                      m = m[0].slice(f),
                      v = m.length,
                      k = y + v,
                      b = d.slice(0, y + 1),
                      w = d.slice(k + 1),
                      N = [p, 1];
                    b && N.push(b);
                    var O = new a(l, g ? t.tokenize(m, g) : m, h);
                    N.push(O),
                      w && N.push(w),
                      Array.prototype.splice.apply(r, N);
                  }
                }
              }
            }
          }
        return r;
      },
      hooks: {
        all: {},
        add: function (e, n) {
          var a = t.hooks.all;
          (a[e] = a[e] || []), a[e].push(n);
        },
        run: function (e, n) {
          var a = t.hooks.all[e];
          if (a && a.length) for (var r, i = 0; (r = a[i++]); ) r(n);
        },
      },
    }),
    n = (t.Token = function (e, t, n) {
      (this.type = e), (this.content = t), (this.alias = n);
    });
  if (
    ((n.stringify = function (e, a, r) {
      if ("string" == typeof e) return e;
      if ("[object Array]" == Object.prototype.toString.call(e))
        return e
          .map(function (t) {
            return n.stringify(t, a, e);
          })
          .join("");
      var i = {
        type: e.type,
        content: n.stringify(e.content, a, r),
        tag: "span",
        classes: ["token", e.type],
        attributes: {},
        language: a,
        parent: r,
      };
      if (
        ("comment" == i.type && (i.attributes.spellcheck = "true"), e.alias)
      ) {
        var l = "Array" === t.util.type(e.alias) ? e.alias : [e.alias];
        Array.prototype.push.apply(i.classes, l);
      }
      t.hooks.run("wrap", i);
      var o = "";
      for (var s in i.attributes) o += s + '="' + (i.attributes[s] || "") + '"';
      return (
        "<" +
        i.tag +
        ' class="' +
        i.classes.join(" ") +
        '" ' +
        o +
        ">" +
        i.content +
        "</" +
        i.tag +
        ">"
      );
    }),
    !self.document)
  )
    return self.addEventListener
      ? (self.addEventListener(
          "message",
          function (e) {
            var n = JSON.parse(e.data),
              a = n.language,
              r = n.code;
            self.postMessage(
              JSON.stringify(t.util.encode(t.tokenize(r, t.languages[a])))
            ),
              self.close();
          },
          !1
        ),
        self.Prism)
      : self.Prism;
  var a = document.getElementsByTagName("script");
  return (
    (a = a[a.length - 1]),
    a &&
      ((t.filename = a.src),
      document.addEventListener &&
        !a.hasAttribute("data-manual") &&
        document.addEventListener("DOMContentLoaded", t.highlightAll)),
    self.Prism
  );
})();
"undefined" != typeof module && module.exports && (module.exports = Prism);
(Prism.languages.markup = {
  comment: /<!--[\w\W]*?-->/g,
  prolog: /<\?.+?\?>/,
  doctype: /<!DOCTYPE.+?>/,
  cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
  tag: {
    pattern:
      /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
    inside: {
      tag: {
        pattern: /^<\/?[\w:-]+/i,
        inside: { punctuation: /^<\/?/, namespace: /^[\w-]+?:/ },
      },
      "attr-value": {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
        inside: { punctuation: /=|>|"/g },
      },
      punctuation: /\/?>/g,
      "attr-name": { pattern: /[\w:-]+/g, inside: { namespace: /^[\w-]+?:/ } },
    },
  },
  entity: /\&#?[\da-z]{1,8};/gi,
}),
  Prism.hooks.add("wrap", function (t) {
    "entity" === t.type &&
      (t.attributes.title = t.content.replace(/&amp;/, "&"));
  });
(Prism.languages.css = {
  comment: /\/\*[\w\W]*?\*\//g,
  atrule: {
    pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
    inside: { punctuation: /[;:]/g },
  },
  url: /url\((["']?).*?\1\)/gi,
  selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
  property: /(\b|\B)[\w-]+(?=\s*:)/gi,
  string: /("|')(\\?.)*?\1/g,
  important: /\B!important\b/gi,
  punctuation: /[\{\};:]/g,
  function: /[-a-z0-9]+(?=\()/gi,
}),
  Prism.languages.markup &&
    Prism.languages.insertBefore("markup", "tag", {
      style: {
        pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
        inside: {
          tag: {
            pattern: /<style[\w\W]*?>|<\/style>/gi,
            inside: Prism.languages.markup.tag.inside,
          },
          rest: Prism.languages.css,
        },
      },
    });
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g, lookbehind: !0 },
  ],
  string: /("|')(\\?.)*?\1/g,
  "class-name": {
    pattern:
      /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
    lookbehind: !0,
    inside: { punctuation: /(\.|\\)/ },
  },
  keyword:
    /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
  boolean: /\b(true|false)\b/g,
  function: { pattern: /[a-z0-9_]+\(/gi, inside: { punctuation: /\(/ } },
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
  operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
  ignore: /&(lt|gt|amp);/gi,
  punctuation: /[{}[\];(),.:]/g,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword:
    /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g,
})),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern:
        /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
      lookbehind: !0,
    },
  }),
  Prism.languages.markup &&
    Prism.languages.insertBefore("markup", "tag", {
      script: {
        pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi,
        inside: {
          tag: {
            pattern: /<script[\w\W]*?>|<\/script>/gi,
            inside: Prism.languages.markup.tag.inside,
          },
          rest: Prism.languages.javascript,
        },
      },
    });
(Prism.languages.bash = Prism.languages.extend("clike", {
  comment: { pattern: /(^|[^"{\\])(#.*?(\r?\n|$))/g, lookbehind: !0 },
  string: {
    pattern: /("|')(\\?[\s\S])*?\1/g,
    inside: { property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/g },
  },
  keyword:
    /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/g,
})),
  Prism.languages.insertBefore("bash", "keyword", {
    property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/g,
  }),
  Prism.languages.insertBefore("bash", "comment", {
    important: /(^#!\s*\/bin\/bash)|(^#!\s*\/bin\/sh)/g,
  });
