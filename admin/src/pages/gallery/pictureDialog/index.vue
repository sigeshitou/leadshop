<template>
    <popup @confirm="handleConfirm" @close="handleClose" :limit="limit" :max="max" v-model="url">
        <slot name="preview" v-if="url" :url="url"></slot>
        <slot name="upload" v-else></slot>
    </popup>
</template>
<script type="text/javascript">
import popup from './popup.vue'

export default {
    components: {
        popup,
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        /**
         * 上传限制
         * @type {Number}
         */
        limit: {
            type: Number,
            default: 1
        },
        max: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            ddd: [1, 23, 4, 2]
        };
    },
    computed: {
        url: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        }
    },
    methods: {
        handleConfirm(value) {
            console.log(value);
            this.url = value;
            this.$emit("blur", value);
            this.$emit("confirm", value);
        },
        handleClose(value) {
            this.$emit("blur", value);
        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>