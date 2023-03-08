import { ref, computed } from "vue"
export default function useEditTodo(todosRef) {
    const editingTodoRef = ref(null)
    let original = null;
    const editTodo = (todo) => {
        editingTodoRef.value = todo;
        original = todo.title;
    }
    const doneEdit = (todo) => {
        editingTodoRef.value = null;
        let title = "";
        if (todo.title) {
            title = todo.title.trim();
        }
        if (title) {
            todo.title = title;
        } else {
            //del
            todosRef.value.splice(todosRef.value.indexOf(todo), 1)
        }
    }
    const cancalEdit = (todo) => {
        editingTodoRef.value = null;
        todo.title = original
    }
    const allDone = computed({
        get() {
            return todosRef.value.filter((item) => !item.completed).length === 0;
        },
        set(checked) {
            todosRef.value.forEach(item => item.completed = checked)
        }
    })
    return {
        editTodo,
        editingTodoRef,
        doneEdit,
        cancalEdit,
        allDone
    }
}