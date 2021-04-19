<template>
    <el-form label-width="120px" class="le-card">
        <el-form-item label="物流查询来源">
            阿里云
        </el-form-item>
        <el-form-item label="阿里云appcode">
            <el-input v-model="code"></el-input>
            <a target="_blank" href="https://www.aliyun.com" class="le-router">阿里云接口申请</a>
        </el-form-item>
        <div class="le-cardpin">
            <el-button @click="submit" type="primary">保存</el-button>
        </div>
    </el-form>
</template>

<script>
export default {
    name: "logisticsSettings",
    data() {
        return {
            code: ''
        }
    },
    methods: {
        submit: function () {
            let _this = this;
            this.$heshop.setting('post', {
                keyword: 'express_setting',
                content: {
                    type: 1,
                    code: this.code
                }
            }).then(res=> {
                if (_this.code) {
                    _this.$message.success('保存成功');
                } else {
                    _this.$message.success('请设置物流配置');
                }
            }).catch(err => {
                _this.$message.error('保存失败');
            });
        },
        search: function () {
            let _this = this;
            this.$heshop.search('post', {include: 'setting'}, {
                keyword: 'express_setting',
            }).then(function (res) {
                _this.code = res.content.code;
            });
        }
    },
    mounted() {
        this.search();
    }
}
</script>

<style scoped>
.le-card {
    background-color: #ffffff;
    padding: 24px;
}

.le-router {
    display: block;
    color: #623ceb;
}
</style>