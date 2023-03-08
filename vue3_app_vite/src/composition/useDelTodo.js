export default function useDelTodo(todosRef) {
    const clearTodos = () => {
        todosRef.value = todosRef.value.filter(item => !item.completed)
    }
    const removeTodo = (item) => {
        todosRef.value.splice(todosRef.value.indexOf(item), 1)
    }
    return {
        clearTodos,
        removeTodo
    }
}