<template>
    <v-app>
        <v-main>
            <v-container >
                <v-row>
                    <v-col cols="6">
                        <v-sheet width="100%" height="500" elevation="2">
                            <v-card flat>
                                <v-card-title>Menu flotant circulaire</v-card-title>
                                <v-card-text>
                                    <v-select
                                        label="Position du menu"
                                        v-model="position"
                                        :items="positionList"
                                        item-text="text"
                                        item-value="id"
                                    >
                                    </v-select>
                                </v-card-text>
                            </v-card>
                            <menu-circle
                                :menu="menuCircle"
                                :position="position"
                            />
                        </v-sheet>
                    </v-col>
                    <v-col cols="6">
                        <v-card flat>
                            <v-card-title>Résumé du projet</v-card-title>
                            <v-card-text>
                                <p>
                                    Le projet utilise les technologies suivantes :
                                </p>
                                <ul>
                                    <li><a href="https://v2.vuejs.org/" target="_blank">Vuejs (version 2)</a></li>
                                    <li><a href="https://vuetifyjs.com/en/" target="_blank">Vuetify</a></li>
                                </ul>
                                <p>
                                    Le code source est disponible sur mon <a href="https://github.com/Jonathanrecly/portfolio" target="_blank"> GitHub</a> dans le dossier resource/js/module/menu_circle
                                </p>
                                <p>
                                    Eléments importants :
                                </p>
                                <ul>
                                    <li>
                                        Le composant "MenuCircle" est paramétrable via un tableau. Exemple :
                                    </li>
                                </ul>
                                <code>
                                    [{
                                    icon: 'mdi-home', callBack: () => {},
                                    }, {
                                    icon: 'mdi-magnify', callBack: () => {},
                                    }, {
                                    icon: 'mdi-microphone', callBack: () => {}
                                    }, {
                                    icon: 'mdi-cog', callBack: () => {},
                                    }, {
                                    icon: 'mdi-account', callBack: () => {},
                                    }, {
                                    icon: 'mdi-logout', callBack: () => {},
                                    }]
                                </code>
                                <ul>
                                    <li>
                                        L'apparence et les annimations sont gérés via CSS et Javascript
                                        <ul>
                                            <li>EventListener</li>
                                            <li>CreateElement</li>
                                            <li>AppendChild</li>
                                            <li>classList.add</li>
                                            <li>el.style</li>
                                        </ul>
                                    </li>
                                    <li>Aucun librairie tierce utilisé</li>
                                    <li>Le positionnement des boutons se fait de manière dynamique en fonction du nombre de paramètre dans le tableau</li>
                                </ul>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import menuCircle from "@modules/menu_circle/menuCircle";
export default {
    name: "app.vue",
    components: { menuCircle },
    data: () => ({
        position: 'middle',
        positionList: [
            { id: "left", text: "Gauche"},
            { id: "right", text: "Droite"},
            { id: "middle", text: "Milieu"},
        ],
        menuCircle:
            [{
                icon: 'mdi-home', callBack: () => {},
            }, {
                icon: 'mdi-magnify', callBack: () => {},
            }, {
                icon: 'mdi-microphone', callBack: () => {}
            }, {
                icon: 'mdi-cog', callBack: () => {},
            }, {
                icon: 'mdi-account', callBack: () => {},
            }, {
                icon: 'mdi-logout', callBack: () => {},
            }]
    })
}
</script>

<style scoped>

</style>
