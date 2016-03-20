function iterate(obj, objToCompare, diffs, parentProperty){

	for(var property in obj){

		if(obj.hasOwnProperty(property) && objToCompare.hasOwnProperty(property)){
			
			parentProperty = (parentProperty) ? (parentProperty += '.'+property) : property;
			
			if(typeof obj[property] === 'object'){
				iterate(obj[property], objToCompare[property], diffs, parentProperty);
			}
			else {
			        if(obj[property] !== objToCompare[property]){
					 diffs.push(parentProperty)	
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
