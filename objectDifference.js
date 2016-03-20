function iterate(obj, objToCompare, diffs, parentProperty){

	for(var property in obj){

		if(obj.hasOwnProperty(property) && objToCompare.hasOwnProperty(property)){

			if(typeof obj[property] === 'object'){
				
				parentProperty = (parentProperty) ? (parentProperty += '.'+property) : property;
				iterate(obj[property], objToCompare[property], diffs, parentProperty);
			}
			else {
				
	
				if(obj[property] !== objToCompare[property]){
					if(parentProperty)diffs.push(parentProperty + '.' +property);
					else diffs.push(property)	
				}
				
			}

		}
		else{ 
		   parentProperty = (parentProperty) ? (parentProperty += '.'+property) : property;
		   diffs.push(parentProperty); 
		}

	}//end of iteration

	return diffs;
	
}//end of getObjectDifferences