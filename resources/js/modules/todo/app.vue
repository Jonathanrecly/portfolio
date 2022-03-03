<template>
    <v-app>
        <v-main>
            <v-container >
                <v-row>
                    <v-col cols="6">
                        <v-data-table
                            :items="_todoList"
                            :headers="headers"
                        >
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>
                                        Liste des tâches
                                    </v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        fab
                                        small
                                        color="primary"
                                        @click="handleClickAddCircleTask"
                                    >
                                        <v-icon>mdi-plus</v-icon></v-btn>
                                </v-toolbar>
                            </template>
                            <template v-slot:body="{ items, headers }">
                                <tbody v-if="items.length > 0" name="list" is="transition-group">
                                <tr
                                    v-for="item in items"
                                    :key="item.id"
                                >
                                    <td>
                                        <v-switch
                                            :input-value="item.finished"
                                            @change="changeTask($event, item)"
                                        ></v-switch>
                                    </td>
                                    <td>
                                        <span :class="{ strike: item.finish}">
                                            {{ item.content}}
                                        </span>
                                    </td>
                                    <td>
                                        <v-icon
                                            small
                                            @click="handleClickEditTask(item)"
                                        >
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon
                                            small
                                            @click="handleClickDeleteTask(item)"
                                        >
                                            mdi-delete
                                        </v-icon>
                                    </td>
                                </tr>
                                </tbody>
                            </template>
                            <template v-slot:no-data>
                                <v-btn
                                    color="primary"
                                    @click="handleClickAddFirstTask"
                                >Ajouter une première tâche</v-btn>
                            </template>
                        </v-data-table>
                    </v-col>
                    <v-col cols="6">
                        <v-card flat>
                            <v-card-title>Résumé du projet</v-card-title>
                            <v-card-text>
                                <p>
                                    Le projet utilise les technologies suivantes :
                                </p>
                                <ul>
                                    <li><a href="https://v2.vuejs.org/">Vuejs V2</a></li>
                                    <li><a href="https://vuetifyjs.com/en/">Vuetify</a></li>
                                    <li><a href="https://v3.vuex.vuejs.org/">Vuex</a> </li>
                                </ul>
                                <p>
                                    le code source est disponible sur mon GitHub
                                </p>
                            </v-card-text>
                        </v-card>

                    </v-col>
                </v-row>
                <taskDialogForm
                    v-model="showTaskDialogForm"
                    :task="currentTask"
                    @saveTask="saveTask"
                />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import taskDialogForm from "./taskDialogForm"


export default {
    name: "app.vue",
    components: {
        taskDialogForm
    },
    data: () => ({
        headers: [
            { text: "#", value: "id", width: "15%"},
            { text: "Tâche", value: "content", width: "75%"},
            { text: "Action", value: "", width: "10%"},
        ],
        showTaskDialogForm: false,
        currentTask: {},
        defaultTask: {
            id: -1,
            content: '',
            finish: false
        }
    }),
    computed: {
        ...mapGetters("todo", {
            "_todoList": "todoList"
        })
    },
    methods: {
        ...mapActions("todo", {
            "_setFinish": "setFinish",
            "_saveTask": "saveTask",
            "_deleteTask": "deleteTask"
        }),
        async changeTask(finish, task) {
            await this._setFinish({
                finish,
                task
            })
        },
        handleClickAddFirstTask() {
            this.askNewTask()
        },
        handleClickAddCircleTask() {
            this.askNewTask()
        },
        askNewTask() {
            this.currentTask = this.defaultTask
            this.showTaskDialogForm = true
        },
        handleClickEditTask(task) {
            this.currentTask = task
            this.showTaskDialogForm = true
        },
        handleClickDeleteTask(task) {
            this._deleteTask(task);
        },
        saveTask(task) {
            this._saveTask(task)
        }
    }
}
</script>

<style scoped>

.strike {
    position: relative;
}

.strike::after {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background: black;
    animation-name: strike;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}
@keyframes strike{
    0%   { width : 0; }
    100% { width: 100%; }
}


.list-enter-active,
.list-leave-active {
    transition: all 0.8s;
}
.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateY(100%);
}
.list-move {
    transition: transform 0.5s;
}
.item-row {
    display: table-row;
}


</style>
