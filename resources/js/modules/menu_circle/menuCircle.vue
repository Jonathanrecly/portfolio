<template>
    <div :class="{
        'circleMenuContainer': true,
        'fixedWindow': fixed,
        'fixedContainer': !fixed,
        'positionLeft': left,
        'positionRight': right,
        'positionMiddle': middle
    }">
        <div class="circleMenuMain">
            <v-btn
                fab
                class="btnMenuCircle"
                @click.stop.prevent
            >
                <v-icon>mdi-menu</v-icon>
            </v-btn>
        </div>
        <div class="circleMenuActions" ref="menuActions">
        </div>
    </div>
</template>

<script>


import vue from "vue"
import {mapActions, mapGetters} from "vuex";

export default {
    name: "AppMenuCircle",
    props: {
        menu: {
            type: Array,
            default: () => ([])
        },
        fixed: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: 'middle'
        }


    },
    data: () => ({
        show: false,
    }),
    computed: {

        left() {
            return this.position === "left"
        },
        middle() {
            return this.position === "middle"
        },
        right() {
            return this.position === "right"
        },
        angleReference() {
            switch(this.position) {
                case "middle":
                    return 180;
                case "left" :
                    return 90
                case "right":
                    return 90
            }
        },
        minusAngle() {
            switch(this.position) {
                case "middle":
                    return 180;
                case "left" :
                    return 90
                case "right":
                    return 180
            }
        }
    },
    watch: {
        position: {
            handler(value, oldValue) {
                if (value === oldValue) return
                this.$nextTick(() => {
                    this.createMenu()
                })
            },
            immediate: true
        },
    },
    methods: {
        showMenu() {
            this.show = true
            const nbMenu = this.menu.length
            for (let x = 0; x < nbMenu; x++) {
                let el = this.menu[x].el
                el.style.transform = "translate(" +  this.menu[x].coordinateOpen.x + ", " +  this.menu[x].coordinateOpen.y + ")"
                el.style.width = this.menu[x].width
                el.style.height = this.menu[x].height
            }
        },
        hideMenu() {
            this.show = false
            const nbMenu = this.menu.length
            for (let x = 0; x < nbMenu; x++) {
                let el = this.menu[x].el
                el.style.transform = ""
                el.style.width = "0"
                el.style.height = "0"
            }
        },
        clickMenu() {
            this.show ? this.hideMenu() : this.showMenu()
        },
        getComputedStyle(el) {
            return window.getComputedStyle(el, null)
        },
        createActionMenu(iconName) {
            const i = document.createElement("i")
            i.classList.add("v-icon")
            i.classList.add("notranslate")
            i.classList.add("mdi")
            i.classList.add("theme--ligth")
            i.classList.add(iconName)

            const span = document.createElement("span")
            span.classList.add("v-btn__content")
            span.appendChild(i)

            const btn = document.createElement("button")
            btn.classList.add("v-btn")
            btn.classList.add("v-btn--is-elevated")
            btn.classList.add("v-btn--fab")
            btn.classList.add("v-btn--has-bg")
            btn.classList.add("v-btn--round")
            btn.classList.add("theme--light")
            if (this.position === "middle") {
                btn.classList.add("v-size--default")
            } else {
                btn.classList.add("v-size--small")
            }


            btn.appendChild(span)

            return btn

        },
        createMenu() {
            if (this.menu.length === 0) return
            const menuActions = document.querySelector(".circleMenuActions")

            const nbMenu = this.menu.length
            let quarter = this.angleReference / (nbMenu -1)

            const cssMenuAction = this.getComputedStyle(menuActions)
            const centerX = parseInt(cssMenuAction.left, 10) / 2
            const centerY = parseInt(cssMenuAction.top, 10) / 2

            let angle = 0
            for (let x = 0; x < nbMenu; x++) {

                let btn = this.createActionMenu(this.menu[x].icon)
                let coordinate = this.calculateCoordinate(centerX, centerY, angle , 100)

                this.stylingButton(btn, centerY, centerX)

                if (this.menu[x].hasOwnProperty("callBack") && this.menu[x].callBack !== null ) {
                    this.appendEventButton(btn, this.menu[x].callBack)
                }
                menuActions.appendChild(btn)

                const calculatedCSSBtn = this.getComputedStyle(btn)
                const widthEl = calculatedCSSBtn.width
                const heightEl = calculatedCSSBtn.height

                btn.style.width = "0px"
                btn.style.height = "0px"

                this.menu[x].el = btn
                this.menu[x].coordinateOpen = {
                    x: (coordinate.x - (centerX *2))  + "px",
                    y: (coordinate.y - (centerY *2)) + "px"
                }
                this.menu[x].width = widthEl
                this.menu[x].height = heightEl

                btn.style.display = "flex"


                angle += quarter
            }


        },
        stylingButton(el, forTop, forLeft) {
            el.style.position = "absolute"
            el.style.display = "none"
            el.style.zIndex = "1"
            el.style.transition = "transform 0.3s, width 0.3s, height 0.3s"
            el.style.top = el.style.top + forTop + "px"
            el.style.left = el.style.left +  forLeft + "px"
        },
        appendEventButton(el, callBack) {
            el.addEventListener("click", (e) => {
                e.preventDefault()
                e.stopPropagation()
                callBack()
                this.hideMenu()
            })
        },
        bindEvent() {
            const mainButton = document.querySelector(".btnMenuCircle")

            if (this.$_isMobile) {
                mainButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.clickMenu()
                }, { passive: false })
            } else {
                mainButton.addEventListener("mouseover", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.showMenu()
                }, { passive: false })

            }

            const ignoredClick = document.querySelector(".circleMenuContainer")
            document.addEventListener("click", (e) => {
                const isClickInside = ignoredClick.contains(e.target)
                if (!isClickInside && this.show) {
                    this.clickMenu()
                }
            })



        },
        calculateCoordinate(x, y, angle, distance) {
            let result = {};
            angle = angle - this.minusAngle;

            result.x = Math.cos(angle * Math.PI / 180) * distance;
            result.y = Math.sin(angle * Math.PI / 180) * distance;

            return result
        }
    },
    mounted() {
        this.bindEvent()
    }
}
</script>

<style scoped>

.circleMenuContainer {
    position: absolute;
    top: calc(100% - 20px);
}

.positionMiddle {
    left: 50%;
    transform: translateX(-50%);
}

.positionRight {
    right: 5%
}
.positionLeft {
    left: 5%;
}


/*.fixedWindow {*/
/*    position: fixed;*/
/*    top: calc(100% - 80px) ;*/
/*}*/

.fixedWindow {
    position: fixed;
    top: calc(100% - 80px) ;
}

.fixedContainer {
    position: absolute;
    top: calc(100% - 80px);
}


.circleMenuMain {

}
.btnMenuCircle {
    z-index: 10;
}

.circleMenuActions {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

/*.circleMenuAction1 {*/
/*    position: absolute;*/
/*    transition: transform 0.8s;*/
/*}*/

/*.circleMenuAction1:hover {*/
/*    position: absolute;*/
/*    transform: translate(-47px, -39px);*/
/*    top: -39px;*/
/*    left: -47px;*/
/*}*/


/*.circleMenuAction2 {*/
/*    position: absolute;*/

/*}*/
</style>
