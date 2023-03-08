const LOCAL_KEY = "todo";

export function generateId() {
    const newId = Date.now() + Math.random().toString().substring(2, 5)
    return newId;
}

export function fetchData() {
    const data = localStorage.getItem(LOCAL_KEY)
    if (data) {
        return JSON.parse(data)
    }
    return []

}


export function saveData(value) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(value))
}



export function filter(todos, visibleVal) {
    if (visibleVal === "all") {
        return todos
    } else if (visibleVal === "active") {
        return todos.filter((item) => !item.completed)
    } else if (visibleVal === "completed") {
        return todos.filter((item) => item.completed)
    }
    return new Error("invalid visibilty value")
}