export default class WordCase{

  static capitalizeFirstLetter (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static snakeCaseToCamel (str) {
    return str.replace(/_\w/g, (str) => str[1].toUpperCase())
  }
  static camelCaseToSnake (str) {
    return str.replace(/\w[A-Z]+/g, (str) => str[0]+'_'+str.substring(1).toLowerCase())
  }

  static isSnakeCase (str) {
    return /_\w/g.test(str)
  }

  static isCamelCase (str) {
    return /\w[A-Z]+/g.test(str)
  }

  static objSnakeKeysToCamelCase (obj) {

    if(Array.isArray(obj)){
      for(let item of obj){
        WordCase.objSnakeKeysToCamelCase(item);
      }
    }

    if(typeof obj == "object" && obj != null){
      let newKey;
      for(let key of Object.keys(obj)){

        if(WordCase.isSnakeCase(key)){
          newKey = WordCase.snakeCaseToCamel(key);
          Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, key));
          delete obj[key];
        }

        if(typeof obj[key] == "object" && obj != null){
          WordCase.objSnakeKeysToCamelCase(obj[key]);
        }

      }

      return obj;
    }


    return obj;
  }

  static objCamelKeysToSnakeCase (obj) {
    let newObj;

    if(Array.isArray(obj)){
      newObj = []
      for(let key in obj){
        newObj.push(WordCase.objCamelKeysToSnakeCase(obj[key]))
      }
    }

    if (typeof obj == "object" && obj != null){
      let newKey;
      newObj = {};

      for(let key of Object.keys(obj)){

        if(WordCase.isCamelCase(key)){
          newKey = WordCase.camelCaseToSnake(key);
          Object.defineProperty(newObj, newKey, Object.getOwnPropertyDescriptor(obj, key));
        }else{
          Object.defineProperty(newObj, key, Object.getOwnPropertyDescriptor(obj, key));
        }

        if(typeof obj[key] == "object" && obj != null){
          newObj[key] = WordCase.objCamelKeysToSnakeCase(obj[key]);
        }

      }

      return newObj;
    }
    else
      return obj;
  }
}
