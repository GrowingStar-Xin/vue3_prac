<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addNewTodo"
        />
      </header>
      <section class="main">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="allDone"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{
              completed: item.completed,
              editing: item === editingTodoRef,
            }"
            v-for="item in filterTodosRef"
            :key="item.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="item.completed" />
              <label @dblclick="editTodo(item)">{{ item.title }}</label>
              <button class="destroy" @click="removeTodo(item)"></button>
            </div>
            <input
              v-model="item.title"
              class="edit"
              type="text"
              @blur="doneEdit(item)"
              @keyup.enter="doneEdit(item)"
              @keyup.esc="cancalEdit(item)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="filterTodosRef.length > 0">
        <span class="todo-count">
          <strong>{{ remainRef }}</strong>
          <span>item{{ filterTodosRef.length !== 1 ? "s" : "" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibleValRef === 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibleValRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibleValRef === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          v-show="completedRef > 0"
          @click="clearTodos"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilter from "./composition/useFliter";
import useEditTodo from "./composition/useEditTodo";
import useDelTodo from "./composition/useDelTodo";
export default {
  setup() {
    const { todosRef } = useTodoList();
    return {
      todosRef,
      ...useNewTodo(todosRef),
      ...useFilter(todosRef),
      ...useEditTodo(todosRef),
      ...useDelTodo(todosRef),
    };
  },
};
</script>
