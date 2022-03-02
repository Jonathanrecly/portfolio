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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
