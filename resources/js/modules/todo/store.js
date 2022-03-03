
const state = {
    todos: [
        { id: 1, content: "Tâche 1", finish: false},
        { id: 2, content: "Tâche 2", finish: false}

    ],
    todo: {},
}

const getters = {
    todoList: (state) => state.todos
        .sort((task1, task2) => {
            if (task1.id > task2.id) return 1
            if (task1.id < task2.id) return -1
            return 0
        })
        .sort((task1, task2) => {
            return task1.finish === task2.finish ? 0 : task1.finish ? 1 : -1
        })
}

const actions = {
    setFinish({ commit }, payload = { finish: false, task: {}}) {
        commit("SET_FINISH", payload)
    },
    saveTask({ commit, state }, task) {

        if (task.id === -1) {
            if (state.todos.length === 0) {
                task.id = 1
            } else {
                let lastTask = state.todos.sort((task1, task2) => {
                    if (task1.id > task2.id) return -1
                    if (task1.id < task2.id) return 1
                    return 0
                })[0]
                task.id = lastTask.id +1
            }

            commit("NEW_TASK", task)
        } else {
            commit("UPDATE_TASK", task)
        }
    },
    deleteTask({ commit }, task) {

        commit("DELETE_TASK", task.id)
    }
}

const mutations = {
    SET_FINISH(state, payload) {
        const index = state.todos.findIndex(task => task.id === payload.task.id)
        if (index === -1) return
        state.todos.splice(index, 1, {
            ...state.todos[index],
            finish: payload.finish
        })
    },
    NEW_TASK(state, newTask) {
        state.todos.push(newTask)
    },
    UPDATE_TASK(state, newTask) {
        const index = state.todos.findIndex(task => task.id === newTask.id)
        if (index === -1) return
        state.todos.splice(index, 1, newTask)
    },
    DELETE_TASK(state, task_id) {
        const index = state.todos.findIndex(task => task.id === task_id)
        if (index === -1) return
        state.todos.splice(index, 1)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
