
// tidy data from django
export const tidyObj= obj => {
    return {id: obj.pk, ...obj.fields}
}

export const flatFields = pdObj => {
    if(Array.isArray(pdObj)) {
        return pdObj.map(a => tidyObj(a))
    }
    return tidyObj(pdObj)
}

