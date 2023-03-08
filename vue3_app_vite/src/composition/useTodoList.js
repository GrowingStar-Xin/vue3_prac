import { ref, watchEffect } from "vue"
import * as todoStorage from "../utils/todoStorage"
export default function useTodoList() {
    const todosRef = ref(todoStorage.fetchData());
    watchEffect(() => {
        todoStorage.saveData(todosRef.value)
    })
    return {
        todosRef,
    }
}