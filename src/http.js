
export async function fetchAvalaibleToDos(reqFilter) {
    const response = await fetch(`https://easydev.club/api/v1/todos?filter=${reqFilter}`);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch places");
    }
    return resData; 
}


export async function addTodos(todoItemData) {
    const response = await fetch('https://easydev.club/api/v1/todos', {
        method: 'POST',
        body: JSON.stringify(todoItemData),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const resData = await response.json();
    if(!response.ok){
        throw new Error("Failed to add user data.");
    }
    return resData;
}

export const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try{
        const response = await fetch(url, optionsObj);
        if(!response.ok) throw new Error('Please reload the app');
    }catch (err) {
        errMsg = err.message;
    }finally{
        return errMsg;
    }
}
export default apiRequest;