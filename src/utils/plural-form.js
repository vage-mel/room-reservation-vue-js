export default function getNounDeclensionFromNumber(n, word){
  let dictWords = {
    'место': ['место', 'места', 'мест']
  }
  let wordForms = []

  if (!dictWords[word] || !(!isNaN(parseFloat(n)) && isFinite(n)) ) {
    return word
  }

  let plural = (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);

  return dictWords[word][plural]
}
