export function trim(str, length) {
  if(typeof str === 'string' || str instanceof String){
    return str.substring(0, length) + '...'
  }
  else{
    return ''
  }
}