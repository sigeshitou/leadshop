<template>
    <div class="le-matter">
        <div class="le-header le-card">
            <div class="le-announcement">
                批量发货注意事项： <br/>
                1. 请先按照模板填写订单号、物流公司、物流单号信息。物流单号不可写成E+22的科学计数法<br/>
                2. 未成功发货的订单，可下载【失败记录】查看详细的失败原因，对症修改<br/>
                3. 发货订单数据，最大不超过1000条（支持csv、xls、xlsx，文件大小请控制在2MB以内）<br/>
                4. 物流公司名称，请填写全称，如圆通速递，不可填写为圆通<br/>
            </div>
            <div class="le-editor">
                <button class="le-button le-default" @click="bulkShipping">批量发货</button>
                <input ref="upload" type="file" style="display: none;"
                       accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv,application/vnd.ms-excel"
                       @change="upload">
                <button class="le-button le-text">
                    <a :href="origin+'/static/files/bulk-shipping-template.xlsx'" download="批量发货模板.xlsx">下载批量发货模板</a>
                </button>
            </div>
        </div>
        <div class="le-search le-card">
            <span class="le-label">发货时间</span>
            <el-date-picker class="le-search-date" v-model="time_start" type="datetime" placeholder="开始日期">
            </el-date-picker>
            <span class="le-label">至</span>
            <el-date-picker class="le-search-date" v-model="time_end" type="datetime" placeholder="结束日期">
            </el-date-picker>
            <div class="le-editor">
                <button class="le-button le-default" @click="getSearch">筛选</button>
                <el-button @click="empty" style="margin-left:10px; ">清空</el-button>
            </div>
        </div>
        <div class="le-body le-card">
            <el-table class="le-table" row-class-name="le-table-row" height="680" :data="list">
                <el-table-column label="发货编号">
                    <template slot-scope="scope">
                        {{ scope.row.handle_sn }}
                    </template>
                </el-table-column>
                <el-table-column label="发货订单数">
                    <template slot-scope="scope">
                        {{ scope.row.order_number }}
                    </template>
                </el-table-column>
                <el-table-column label="成功发货订单数">
                    <template slot-scope="scope">
                        {{ scope.row.success_number }}
                    </template>
                </el-table-column>
                <el-table-column label="操作时间">
                    <template slot-scope="scope">{{ scope.row.created_time | timeFormat('yyyy-mm-dd hh:MM:ss') }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <button v-if="scope.row.order_number !== scope.row.success_number" class="le-button le-text" @click="exportData(scope.row.id)">失败记录</button>
                        <template v-else>
                            — —
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <div class="le-pagination flex justify-end align-center">
                <el-pagination background layout="prev, pager, next, jumper" @current-change="currentChange"
                               :current-page="page.current" :page-count="page.count">
                </el-pagination>
            </div>
        </div>
        <he-loading title="文件上传处理中，请稍后..." :show="loading"></he-loading>
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            top="35vh"
        >
            <div style="text-align: center;margin-top: 43px">
                <i class="le-icon le-icon-zhushi"></i>
                <div class="le-dialog-text">
                    {{ dialogType === 1 ? '文件格式错误，请使用csv、xls、xlsx的格式文件' : dialogType === 2 ? '文件大小超过2MB，请压缩或删减内容后上传' : '订单数据量超过1000条，请删减后分多次上传' }}
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">重新上传</el-button>
              </span>
        </el-dialog>
    </div>
</template>
<script>
import heLoading from "../../components/heloading2.vue";
import XLSX from 'xlsx'

export default {
    name: "bulkShipping",
    components: {
        heLoading
    },
    data() {
        return {
            origin:'',
            list: [],
            time_start: '',
            time_end: '',
            loading: false,
            page: {
                size: 20,
                current: 1,
                count: 1
            },
            dialogVisible: false,
            dialogType: 1
        }
    },
    methods: {
        currentChange: function (e) {
            this.page.current = e;
            this.getList();
        },
        bulkShipping: function () {
            this.$refs.upload.click();
        },
        getSearch() {
            this.page.current = 1;
            this.getList();
        },
        empty() {
            this.time_start = '';
            this.time_end = '';
            this.page.current = 1;
            this.getList();
        },
        getList: function () {
            let time = {};
            if (this.time_start) {
                time.time_start = new Date(this.time_start).getTime().toString().substr(0, 10);
            }
            if (this.time_end) {
                time.time_end = new Date(this.time_end).getTime().toString().substr(0, 10);
            }
            this.$heshop.orderhandle('get', time).page(this.page.current, this.page.size).then(res => {
                let {data, headers} = res;
                this.list = data;
                this.page = {
                    current: +headers['x-pagination-current-page'],
                    count: +headers['x-pagination-page-count'],
                    size: +headers['x-pagination-per-page'],
                    total: +headers['x-pagination-total-count']
                }
            }).catch(() => {
                this.$message.error('获取失败');
            });
        },
        upload() {
            let files = this.$refs.upload.files;
            this.readExcel(files);
        },
        readExcel(files) { // 表格导入
            let _this = this;
            if (files.length <= 0) { // 如果没有文件名
                return false;
            } else if (!/\.(csv|xls|xlsx)$/.test(files[0].name.toLowerCase())) {
                this.dialogVisible = true;
                this.dialogType = 1;
                return false;
            } else if (files[0].size / 1024 / 1024 > 2) {
                console.log(files[0].size);
                this.dialogVisible = true;
                this.dialogType = 2;
                return false;
            }

            this.loading = true;
            const fileReader = new FileReader();
            fileReader.onload = (ev) => {
                try {
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, {
                        type: 'binary'
                    })
                    const wsname = workbook.SheetNames[0] // 取第一张表
                    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]) // 生成json表格内容
                    let list = [];
                    if (list.length > 1000) {
                        this.dialogVisible = true;
                        this.dialogType = 3;
                        return false;
                    }
                    ws.forEach(v => {
                        list.push([v['订单号'] ?? '', v['物流公司'] ?? '', v['物流单号'] ?? ''])
                    });
                    _this.$heshop.orderhandle('post', list).then(() => {
                        _this.$message.success('操作成功');
                        _this.loading = false;
                        _this.getList();
                    }).catch(err => {
                        console.error(err)
                        _this.loading = false;
                        _this.$message.error(err.data.message);
                    });
                    // 重写数据
                    _this.$refs.upload.value = '';
                } catch (e) {
                    _this.loading = false;
                    _this.$message.error('系统错误');
                }
            }
            fileReader.readAsBinaryString(files[0])
        },
        exportData: function(id) {
            let _this = this
            this.loading = true;
            this.$heshop.orderhandle('get',id ).then(function (res) {
                let header = ['订单号','物流公司','物流单号','失败描述'];
                let data = res.error_data;
                require.ensure([], function () {
                    _this.$h.Export2Excel.export_json_to_excel({ header, data, filename: name + '批量发货失败记录(' + _this.$moment(new Date()).format('YYYYMMDDHHmmss') + ')' });
                    _this.loading = false;
                });
            }).catch(function(err) {
                _this.loading = false;
                _this.$message.error(err.data.message);
            });
        },

    },
    mounted() {
        this.origin = window.location.origin;
        this.getList();
    }
}
</script>
<style scoped lang="scss">
@import "./bulkShipping.less";
</style>