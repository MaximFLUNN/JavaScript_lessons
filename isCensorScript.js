function censor() {
    const ObjectsArray = [];
    return (str1, str2 = undefined) => {
        if (str1 && str2) { 
            ObjectsArray.push({ 
                    what: str1,  
                    forWhat: str2 
                }
            ); 
        }
        else if (str1 && str2 === undefined) { 
            ObjectsArray.forEach(obj => str1 = str1.replaceAll(obj.what, obj.forWhat))
            return str1;
        }
    }
}

const changeScene = censor();
changeScene('PHP','JS');
changeScene('backend', 'frontend')
console.log(changeScene('PHP PHP is the most popular programming language for backend web-development'));
