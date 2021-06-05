interface Test {
  (obj: Object): string
}

export const serialize: any = (obj: object): string => {
  const str: any = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}

export const test: Test = (obj: object): string => {
  return JSON.stringify(obj)
}

export function test2(obj: object): string {
  return JSON.stringify(obj)
}
