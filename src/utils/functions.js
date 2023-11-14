export const add = (array, element, property) => {
    let newArray = [...array]
    const index = newArray.findIndex(item => element[property] === item[property])
    if (index !== -1) {
        newArray[index] = {
            ...array[index],
            quantity: array[index].quantity + element.quantity
        }
    } else {
        newArray = [...array, element]
    }
    return newArray
}