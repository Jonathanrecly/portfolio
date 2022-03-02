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
                                    </tr>
                                </tbody>
                            </template>
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-toolbar-title>
                                        Liste des tâches
                                    </v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <v-btn fab small color="primary"><v-icon>mdi-plus</v-icon></v-btn>
                                </v-toolbar>
                            </template>
                            <template v-slot:no-data>
                                <v-btn color="primary">Ajouter une première tâche</v-btn>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";


export default {
    name: "app.vue",
    data: () => ({
        headers: [
            { text: "#", value: "id", width: "15%"},
            { text: "Tâche", value: "content", width: "85%"},
        ]
    }),
    computed: {
        ...mapGetters("todo", {
            "_todoList": "todoList"
        })
    },
    methods: {
        ...mapActions("todo", {
            "_setFinish": "setFinish"
        }),
        async changeTask(finish, task) {
            await this._setFinish({
                finish,
                task
            })
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
