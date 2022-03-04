<template>
    <v-app>
        <v-main>
            <v-container>
                <v-card>
                    <v-card-title>
                        <span class="text-h3">
                            Jonathan Recly : Portfolio
                        </span>
                    </v-card-title>
                    <v-card-text>
                        <v-container fluid>
                            <v-row>
                                <v-col
                                    cols="12"
                                    sm="3"
                                    v-for="project in projects"
                                    :key="project.id"
                                >
                                    <v-card
                                        @click="goTo(project)"
                                    >
                                        <v-card-title>
                                            {{ project.name }}
                                            <v-spacer></v-spacer>
                                            <v-icon>mdi-eye</v-icon>
                                        </v-card-title>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>

            </v-container>
        </v-main>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            projects: [
                {
                    id: 1,
                    name: "Todo list",
                    description: "",
                    target: "todo"
                }, {
                    id: 2,
                    name: "Menu Circle",
                    description: "",
                    target: "menu_circle"
                }
            ]
        }),
        methods: {
            goTo(project) {
                window.open(
                    window.location.protocol + "//" + project.target + "." + window.location.host,
                    "_blank"
                )
            }
        },
    }
</script>


<style scoped>

</style>
