<template>
  <div style="text-align: left">
    <div>
      <el-input
        placeholder="输入供应商编号 供应商名搜索"
        style="margin-right: -100px;width:50%"
        v-model="input"
        clearable
      ></el-input>
      <el-button type="primary" style="float:right;margin-right:200px" @click="getSuppList()">搜索</el-button>
              <!--添加员工按钮-->
      
    </div>
    <el-table :data="suppList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="供应商名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="联系人姓名">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="供应商地址">
              <span>{{ props.row.location }}</span>
            </el-form-item>
            <el-form-item label="负责员工的id">
              <span>{{ props.row.employeeId }}</span>
            </el-form-item>
            <el-form-item label="联系邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="供应商 ID" prop="id"></el-table-column>
      <el-table-column label="供应商名称" prop="name"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style = "dispaly:flex;justify-content:left">
      <!--分页条区域-->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.total"
        :page="pageInfo.pages"
        @current-change="toPage()"
        ref="pagehelp"
        style="margin-top: 50px; margin-left:30px"
      ></el-pagination>

      <el-button type="warning" style = "float:right;margin-top: -40px" @click = "openAdd()" >添加员工</el-button>

    </div>

    <!--修改模态框框区域-->
    <el-dialog title="修改员工信息" :visible.sync="editVisble" width="50%" center>
      <el-form label-width="120px" :model="supp">
        <el-form-item label="供应商名称">
          <el-input v-model="supp.name"></el-input>
        </el-form-item>
        <el-form-item label="联系手机号">
          <el-input v-model="supp.phone"></el-input>
        </el-form-item>
        <el-form-item label="负责员工">
          <el-select v-model="supp.employeeId" :placeholder="employeeName">
            <el-option
              v-for="item in employeeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商地址">
          <el-input v-model="supp.location"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="supp.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="updateSupp()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加员工信息" :visible.sync="addVisble" width="50%" center>
      <el-form label-width="120px" :model="supp">
        <el-form-item label="供应商名称">
          <el-input v-model="supp.name"></el-input>
        </el-form-item>
        <el-form-item label="联系手机号">
          <el-input v-model="supp.phone"></el-input>
        </el-form-item>
        <el-form-item label="负责员工">
          <el-select v-model="supp.employeeId" :placeholder="employeeName">
            <el-option
              v-for="item in employeeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商地址">
          <el-input v-model="supp.location"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱">
          <el-input v-model="supp.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisble = false">取 消</el-button>
        <el-button type="primary" @click="addSupp()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data() {
    return {
        addVisble: false,
      editVisble: false,
      suppList: [],
      pageInfo: {},
      page: 1,
      supp: {
        id: null,
        name: "",
        location: "",
        phone: "",
        employeeId: null,
        email: ""
      },
      employeeName: "",
      employeeList: [],
      input: ""
    };
  },
  methods: {
      addSupp(){
          this.$http.post ('supplier/addSupp',this.supp).then ( result => {
              if (result.data){
                  this.$message.success("添加成功");
              }else {
                  this.$message.error("添加失败")
              }
              this.addVisble = false;
          }).catch( error => {
              if (error){
                  this.$message.info("添加失败，请联系管理员");
              }
          })
      },
      openAdd(){
          this.getEmployeeList();
          this.addVisble = true;
      },
    updateSupp() {
      this.$http
        .put("supplier/updateSupp", this.supp)
        .then(result => {
          if (result.data) {
            this.$message.success("更新成功");
          } else {
            this.$message.error("更新失败");
          }
          this.editVisble = false;
        })
        .catch(error => {
          if (error.response) {
            this.$message.info("更新失败，请检查输入的参数");
          }
        });
    },
    cancel() {
      //点击模态框的取消按钮，首先清除模态框里面的信息
      //然后将模态框关闭
      this.editVisble = false;
    },
    handleEdit(index, row) {
      //点击编辑按钮，首先查询出供应商信息，然后进行修改

      this.editVisble = true;

      this.supp = row;
      this.getEmployeeList();
    },
    handleDelete(index, row) {
      this.minSize = this.pageInfo.size;
      this.$confirm("将删除此个供应商，是否继续？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http
          .get("supplier/delSupp/" + row.id)
          .then(result => {
            if (result.data) {
              this.$message.success("删除成功");
              this.$router.go(0);
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch(error => {
            if (error.response) {
              this.$message.info("系统错误，请联系管理员");
            }
          });
      });
    },
    //获取员工数组
    getEmployeeList() {
      this.$http.get("employee/getAllEmployee").then(result => {
        this.employeeList = result.data;
      });
    },
    toPage() {
      this.page = this.$refs.pagehelp.internalCurrentPage;
      this.getSuppList();
    },
    getSuppList() {
      this.$http
        .get("supplier/search", {
          params: {
            page: this.page || 1,
            keyword: this.input
          }
        })
        .then(result => {
          this.suppList = result.data.list;
          this.pageInfo = result.data;
        })
        .catch(error => {
          this.$message.error("未查询到相关信息");
          this.input = ""
        });
    }
  },
  created() {
    this.getSuppList();
  }
};
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>