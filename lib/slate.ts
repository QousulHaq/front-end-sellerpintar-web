const camelize = (str: string): string => {
  return str.replace(/(?:^|[-])(\w)/g, (a: string, c: string): string => {
    c = a.substring(0, 1) === '-' ? c.toUpperCase() : c
    return c ? c : ''
  })
}

export const parseStyleCssText = (value: string): Record<string, string> => {
  const output: Record<string, string> = {}

  if (!value) {
    return output
  }

  const style = value.split(';')

  for (const s of style) {
    const rule = s.trim()

    if (rule) {
      const ruleParts = rule.split(':')
      const key = camelize(ruleParts[0].trim())
      output[key] = ruleParts[1].trim()
    }
  }

  return output
}

export const encodeBreakingEntities = (str: string): string => {
  const swapChar = (charToSwap: string): string => {
    switch (charToSwap) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      default:
        return charToSwap
    }
  }

  return str.replace(/[&<>]/g, (match: string) => swapChar(match))
}

export const decodeBreakingEntities = (str: string): string => {
  return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}

export const styleToString = (style: Record<string, string>): string => {
  return Object.keys(style).reduce(
    (acc, key) =>
      acc +
      key
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase() +
      ':' +
      style[key] +
      ';',
    '',
  )
}

export const isEmptyObject = (obj: object): boolean =>
  obj &&
  Object.keys(obj).length === 0 &&
  Object.getPrototypeOf(obj) === Object.prototype

export const styleMapToAttribs = ({
  elementStyleMap,
  node,
}: {
  elementStyleMap: Record<string, string>
  node: Record<string, string | undefined>
}): Record<string, string> => {
  let attribs: Record<string, string> = {}
  const styleAttrs: Record<string, string> = {}

  Object.keys(elementStyleMap).forEach((slateKey) => {
    const cssProperty = elementStyleMap[slateKey]
    const cssValue = node[slateKey]

    if (cssValue) {
      styleAttrs[cssProperty] = cssValue
    }
  })

  if (!isEmptyObject(styleAttrs)) {
    attribs = {
      ...attribs,
      style: styleToString(styleAttrs),
    }
  }

  return isEmptyObject(attribs) ? {} : attribs
}

export const intersection = (
  o1: Record<string, unknown>,
  o2: Record<string, unknown>,
): string[] => {
  return Object.keys(o1)
    .concat(Object.keys(o2))
    .sort()
    .reduce((r: string[], a, i, aa) => {
      if (i && aa[i - 1] === a) {
        r.push(a)
      }
      return r
    }, [])
}
