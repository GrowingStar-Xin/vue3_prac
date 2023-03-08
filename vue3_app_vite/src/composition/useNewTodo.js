import { ref } from "vue"
import * as todoStorage from "../utils/todoStorage"
export default function useNewTodo(todosRef) {
    const newTodoRef = ref("")
    const addNewTodo = function () {
        const val = newTodoRef.value && newTodoRef.value.trim();
        if (!val) {
            return
        }
        const newTodoObj = {
            id: todoStorage.generateId(),
            title: val,
            completed: false
        }
        todosRef.value.push(newTodoObj);
        newTodoRef.value = ""
    }

    return {
        newTodoRef,
        addNewTodo
    }
}