<template>
    <v-dialog
        v-model="dialog"
        width="500"
    >
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>
                <v-container fluid>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Contenu de la tache"
                                v-model="contentTask"
                                @keyup.enter="handlePressEnter"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    @click="closeDialog"
                >
                    Fermer
                </v-btn>
                <v-btn
                    color="primary"
                    @click="validTask"
                >
                    Valider
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "taskDialogForm",
    props: {
        value: Boolean,
        task: {
            type: Object,
            default: () => ({
                id: -1,
                content: '',
                finish: false
            })
        }
    },
    data: () => ({
       localContent: null
    }),
    computed: {
        dialog: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        title() {
            return this.task.id === -1 ? "Ajouter une tâche" : "Editer une tâche"
        },
        contentTask: {
            get() {
                if (
                    this.localContent === null
                    && this.task.content
                    && this.task.content !== ''
                    && this.dialog === true
                ) {
                    this.localContent = this.task.content
                }
                return this.localContent
            },
            set(content) {
                this.localContent = content
            }
        }
    },
    methods: {
        closeDialog() {
            this.dialog = false
            this.localContent = null
        },
        validTask() {
            this.$emit("saveTask", {
                ...this.task,
                content: this.localContent
            })
            this.closeDialog()
        },
        handlePressEnter() {
            this.validTask()
        }
    }
}
</script>

<style scoped>

</style>
