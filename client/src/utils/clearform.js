const clearForm = function(object){
  for(let value of Object.values(object)){
    value = '';
  }
}

export default clearForm;