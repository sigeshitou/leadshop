<template>
    <el-container>
        <el-aside width="96px" class="apply-main__menus">
            <Sidebar></Sidebar>
        </el-aside>
        <el-main class="apply-main__content le-main">
            <el-scrollbar style="height: 100%;">
                <div style="padding: 24px;">
                    <router-view />
                </div>
                <div class="copyright">
                    {{copyright}}
                </div>
            </el-scrollbar>
        </el-main>
    </el-container>
</template>
<script type="text/javascript">
import "@/pages.js";

import Sidebar from '../mainbar/Side';
export default {
    components: {
        Sidebar
    },
    computed: {
        copyright() {
            return $_W.Copyright;
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';

.le-main {
    padding: 0;
}

/deep/.el-scrollbar__wrap {
    overflow-x: hidden;
}


/deep/.el-scrollbar__wrap {
    overflow-x: hidden;
}

.copyright {
    height: 30px;
    line-height: 30px;
    text-align: center;
}
</style>