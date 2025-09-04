export const isValidThaiID = (id: string) => {
  // allow only 13 digits
  if (!/^[0-9]{13}$/.test(id)) return false

  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += parseInt(id.charAt(i), 10) * (13 - i)
  }
  const checkDigit = (11 - (sum % 11)) % 10 // normalize 10 -> 0, 11 -> 1
  return checkDigit === parseInt(id.charAt(12), 10)
}

export const convertStrToFormat = (str: string | number, format: 'phone_number' | 'id_card' | 'idcar'): string => {
  if (!str) {
    return ''
  }

  switch (format) {
    case 'phone_number':
      str = str
        .toString()
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
      break
    case 'id_card':
      str = str
        .toString()
        .replace(/\D/g, '')
        .replace(/^(\d)(\d{4})(\d{5})(\d{2})(\d)$/, '$1-$2-$3-$4-$5')
      break
    case 'idcar':
      str = str.toString().replace(/-/g, '')
      let newString = str
      let index = 0
      const regexp2 = /[A-Za-zก-ฮ]/gi
      const result2 = regexp2.exec(str)
      if (result2 !== null) {
        if (result2.index !== 0) {
          for (let a = 0; a < result2.index; a++) {
            newString = newString.substring(0, a) + '-' + newString.substring(a + 1)
          }
        }

        const regexp = /[0-9]/gi
        const result = regexp.exec(newString)
        if (result !== null) {
          index = result.index
          str = str.substring(0, index) + '-' + str.substring(index)
        }
      }
      break
    default:
      str = str.toString()
      break
  }
  return str.toString()
}
