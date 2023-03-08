import { ref, onMounted, onUnmounted, computed } from "vue"
import { filter } from "../utils/todoStorage"
const filterFlags = ["all", "completed", "active"];

export default function useFilter(todosRef) {
    const visibleValRef = ref("all");
    //读取hash值
    const onHashChange = () => {
        const hash = location.hash.replace(/#\/?/, "");
        if (filterFlags.includes(hash)) {
            visibleValRef.value = hash
        } else {
            location.hash = "";
            visibleValRef.value = "all"
        }

    }
    onMounted(() => {
        window.addEventListener("hashchange", onHashChange)
    })
    onUnmounted(() => {
        window.removeEventListener("hashchange", onHashChange)
    })
    const filterTodosRef = computed(() => {
        return filter(todosRef.value, visibleValRef.value)
    })

    //剩余多少项目
    const remainRef = computed(() => {
        return filter(todosRef.value, "active").length
    })
    //已经有多少完成的项目
    const completedRef = computed(() => {
        return filter(todosRef.value, "completed").length
    })
    return {
        visibleValRef,
        filterTodosRef,
        remainRef,
        completedRef
    }
}