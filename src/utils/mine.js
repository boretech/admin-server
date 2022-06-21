export const mine = (js) => {
  js = `${js}`
  const isIdent = /[a-z0-9_.$]/i
  const isWhitespace = /[ \r\n\t]/

  let names = [], state = 0, ident, quote, name, start

  let $close, $escape, $ident, $lineComment, $multilineComment, $multilineEnding, $name, $nameEscape, $slash, $string, $start, $call

  $multilineEnding = (char) => {
    if (char === "/") return $start
    if (char === "*") return $multilineEnding
    return $multilineComment
  }

  $multilineComment = (char) => {
    if (char === "*") return $multilineEnding
    return $multilineComment
  }

  $lineComment = (char) => {
    if (char === "\r" || char === "\n") return $start
    return $lineComment
  }

  $slash = (char) => {
    if (char === "/") return $lineComment
    if (char === "*") return $multilineComment
    return $start(char)
  }

  $escape = () => $string

  $string = (char) => {
    if (char === "\\") {
      return $escape
    }
    if (char === quote) {
      return $start
    }
    return $string
  }

  $close = (char) => {
    if (isWhitespace.test(char)) return $close
    if (char === ")" || char === ',') {
      names.push({
        name: name,
        offset: start
      })
    }
    name = undefined
    return $start(char)
  }


  $nameEscape = (char) => {
    if (char === "\\") {
      name += char
    } else {
      name += JSON.parse(`"\\${char}"`)
    }
    return $name
  }

  $name = (char) => {
    if (char === quote) {
      return $close
    }
    if (char === "\\") {
      return $nameEscape
    }
    name += char
    return $name
  }

  $call = (char) => {
    if (isWhitespace.test(char)) return $call
    if (char === "'" || char === '"') {
      quote = char
      name = ""
      start = i + 1
      return $name
    }
    return $start(char)
  }

  $ident = (char) => {
    if (isIdent.test(char)) {
      ident += char
      return $ident
    }
    if (char === "(" && ident === "require") {
      ident = undefined
      return $call
    } else {
      if (isWhitespace.test(char)) {
        if (ident !== 'yield' && ident !== 'return') {
          return $ident
        }
      }
    }
    return $start(char)
  }

  $start = (char) => {
    if (char === "/") return $slash
    if (char === "'" || char === '"') {
      quote = char
      return $string
    }
    if (isIdent.test(char)) {
      ident = char
      return $ident
    }
    return $start
  }

  state = $start

  for (var i = 0, l = js.length; i < l; i++) {
    state = state(js[i])
  }
  return names
}


console.log(mine(`/test.js`))

export default mine
