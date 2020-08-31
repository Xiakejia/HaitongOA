<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-card style="padding-left: 15px">

        <!-- 查询条件 -->
        <el-form
                :model="queryForm"
                ref="queryFormRef">
          <!-- element-ui是24分栏（bootstrap是12分栏） -->
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="项目名称">
                <el-input type="text" v-model="queryForm.projectName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="创建人">
                <el-input type="text" v-model="queryForm.creator"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商务负责人">
                <el-input type="text" v-model="queryForm.commercialDirector"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="客户名称">
                <el-input type="text" v-model="queryForm.customerName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 按钮区域 -->
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="primary" @click="queryProjectList">查询</el-button>
                <el-button @click="ResetProjectList">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>

  <el-card>
    <!-- data属性: 房源列表数据 -->
    <el-table :data="projectList"
            stripe
            border
            style="width: 100%">
      <!-- prop: 房源字段 -->
      <el-table-column
            prop="projectId"
            label="项目编码">
      </el-table-column>
      <el-table-column
              prop="projectName"
              label="项目名称">
      </el-table-column>
      <el-table-column
              prop="creator"
              label="创建人">
      </el-table-column>
      <el-table-column
              prop="commercialDirector"
              label="商务负责人">
      </el-table-column>
      <el-table-column
              prop="customerName"
              label="客户名称">
      </el-table-column>
      <el-table-column
              prop="customerContact"
              label="客户联系人">
      </el-table-column>
      <el-table-column
              prop="projectManager"
              label="项目经理">
      </el-table-column>
      <el-table-column
              prop="remarks"
              label="备注">
      </el-table-column>

      <el-table-column
              prop="time"
              label="发布时间">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              @click="editHouse(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteHouse(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div style="margin-top: 15px">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :current-page="pageNum"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        @size-change="sizeChange"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </el-card>

    <!-- 编辑房源 -->
    <el-dialog title="项目维护" :visible.sync="dialogFormVisible">
      <el-form :model="editForm"
               ref="editFormRef"
               :label-width="labelWidth">
        <!-- 8. 详细地址 -->
        <el-form-item label="项目编码" >
          <el-input type="text" v-model="editForm.projectId"></el-input>
        </el-form-item>
      <!-- 8. 详细地址 -->
      <el-form-item label="项目名称" >
        <el-input type="text" v-model="editForm.projectName"></el-input>
      </el-form-item>
      <!-- 8. 详细地址 -->
      <el-form-item label="创建人" >
        <el-input type="text" v-model="editForm.creator"></el-input>
      </el-form-item>
      <!-- 8. 详细地址 -->
      <el-form-item label="商务负责人" >
        <el-input type="text" v-model="editForm.commercialDirector"></el-input>
      </el-form-item>
      <!-- 8. 详细地址 -->
      <el-form-item label="客户名称" >
        <el-input type="text" v-model="editForm.customerName"></el-input>
      </el-form-item>
      <!-- 8. 详细地址 -->
      <el-form-item label="客户联系人" >
        <el-input type="text" v-model="editForm.customerContact"></el-input>
      </el-form-item>
      <!-- 8. 详细地址 -->
      <el-form-item label="项目经理" >
        <el-input type="text" v-model="editForm.projectManager"></el-input>
      </el-form-item>
        <!-- 8. 详细地址 -->
        <el-form-item label="备注" >
          <el-input type="textarea" v-model="editForm.remarks"></el-input>
        </el-form-item>
      <el-form-item label="发布时间" >
        <el-input type="text" v-model="editForm.time" disabled></el-input>
      </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormSubmit('editFormRef')">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>
<script>
  export default {
    name: "projectList",
    data() {
      return {
        labelWidth: '120px',
        total: 0, // 保存总记录数
        pageNum: 1, // 当前页
        pageSize: 5, // 每页显示记录数
        projectList: [], // 存放房源列表

        queryForm: { // 查询表单
            projectName:'',
            creator:'',
            commercialDirector:'',
            customerName:''
        },
        // 控制模态框显示
        dialogFormVisible: false,

        // 编辑模态框的form表单
        editForm: {
            projectId: '',
            projectName: '',
            creator: '',
            commercialDirector: '',
            customerName: '',
            customerContact: '',
            projectManager: '',
            remarks: '',
            time:'',
        },
      }
    },

    methods: {

      // 查询房源列表
      queryProjectList() {
          console.log(this.queryForm.projectName);
        this.$http.get('/record', {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            projectName:this.queryForm.projectName,
            creator:this.queryForm.creator,
            commercialDirector:this.queryForm.commercialDirector,
            customerName:this.queryForm.customerName

          }
        }).then(res => {
          // res.data = {"code":200,"message":"success","data":{"pageNum":1,"pageSize":10,"rows":[{"id":2,"province":2,"city":7,"area":18,"areaName":"雨花区","rentMode":2,"houseType":null,"direction":1,"rental":3400,"address":"夫子庙","pic":"/pics/e3cc55f88a214ab6ae123a6752de3244.jpg","publishTime":"2020-08-20","updateTime":null,"rentModeName":"整租","houseTypeName":"两居","directionName":"东"}],"pageCount":1,"total":1}}
          if(res.data.code === 200) {
            this.projectList = res.data.data.rows

            // 为当前页、每页显示记录数、总记录数赋值
            this.pageNum = res.data.data.pageNum
            this.total = res.data.data.total


          } else {
            this.$message({message: '查询失败', type: 'error'})
          }
        }).catch(error => {
          console.log(error)
          this.$message({message: '查询失败', type: 'error'})
        })
      },
        ResetProjectList(){
            this.queryForm.projectName='',
            this.queryForm.creator='',
            this.queryForm.commercialDirector='',
            this.queryForm.customerName=''
        },
      // 当每页显示记录数改变时触发，回调参数是每页显示记录数
      sizeChange(pageSize) {
        this.pageSize = pageSize
        this.queryProjectList()
      },
      // 当页码改变时触发，回调参数是修改后的页码
      currentChange(pageNum) {
        this.pageNum = pageNum
        this.queryProjectList()
      },
      // 删除房源
      deleteHouse(houseId) {
        this.$confirm('是否删除该房源?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除房源 /house/{id}
          let url = "/house/" + houseId
          this.$http.delete(url).then(res => {
            if(res.data.code === 200) {
              // 删除成功之后重新查询列表
              this.queryProjectList()
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          }).catch(error => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '已取消删除'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      editHouse(propject) {
        // 点击编辑，显示模态框
        this.dialogFormVisible = true

        this.editForm.projectId = propject.projectId
        this.editForm.projectName = propject.projectName
        this.editForm.creator = propject.creator
        this.editForm.commercialDirector = propject.commercialDirector
        this.editForm.customerName = propject.customerName
        this.editForm.customerContact = propject.customerContact
        this.editForm.projectManager = propject.projectManager
        this.editForm.projectStatus = propject.projectStatus
        this.editForm.remarks = propject.remarks
        this.editForm.time = propject.time



        //
        this.editForm.id = propject.id
      },
      // 提交更新请求
      editFormSubmit(formName) {
        // 发送请求
        this.$http.put('/record', this.editForm).then(res => {
          if(res.data.code === 200) {
            this.$message({message: "更新成功", type: 'success'})
            // 更新成功之后，关闭模态框
            this.dialogFormVisible = false

            // 重置更新表单
            this.$refs[formName].resetFields()

            // 重新查询房源列表
            this.queryProjectList()
          }
        }).catch(error => {
          console.log(error)
          this.$message({message: "系统异常", type: 'error'})
        })
      }
    },

    // 当数据初始化完成后执行
    created() {
      this.queryProjectList()
    }

  }
</script>
<style scoped>

</style>