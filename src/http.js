
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
    if (!response.ok) {
        throw new Error("Failed to add user data.");
    }
    return resData;
}

export async function editTodos(todoItemId, todoItemData) {
    const response = await fetch(`https://easydev.club/api/v1/todos/${todoItemId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(todoItemData),
    });
    const resData = await response.json();
    if (!response.ok) {
        throw new Error("Failed to edit user data.");
    }
}

export async function deleteTodos(todoItemId) {
    try{
        const response = await fetch(`https://easydev.club/api/v1/todos/${todoItemId}`, {
        method: "DELETE",
    });
    }catch(e){
        throw new Error("Failed to delete user data.");
    }
}