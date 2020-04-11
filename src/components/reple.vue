<template>
  <div style="text-align: left">
    <div>
      <el-input
        placeholder="输入进货单编号 供应商名搜索"
        style="margin-right: -100px;width:50%"
        v-model="input"
        clearable
      ></el-input>
      <el-button type="primary" style="float:right;margin-right:200px" @click="getrepleList()">搜索</el-button>
      <!--添加员工按钮-->
    </div>
    <el-table :data="repleList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="进货编号">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名">
              <span>{{ props.row.goodsName }}</span>
            </el-form-item>
            <el-form-item label="价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="进货数量">
              <span>{{ props.row.num }}</span>
            </el-form-item>
            <el-form-item label="供应商">
              <span>{{ props.row.suppName }}</span>
            </el-form-item>
            <el-form-item label="负责员工的id">
              <span>{{ props.row.employeeId }}</span>
            </el-form-item>
            <el-form-item label="进货时间">
              <span>{{ props.row.putTime | dateformat }}</span>
            </el-form-item>
            <el-form-item label="生产时间">
              <span>{{ props.row.produTime | dateformat }}</span>
            </el-form-item>
            <el-form-item label="过期时间">
              <span>{{ props.row.overdueTime | dateformat }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.note}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="供应商 ID" prop="id"></el-table-column>
      <el-table-column label="供应商名称" prop="suppName"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="dispaly:flex;justify-content:left">
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

      <el-button type="warning" style="float:right;margin-top: -40px" @click="openAdd()">添加进货信息</el-button>
    </div>

    <!--修改模态框框区域-->
    <el-dialog title="修改进货信息" :visible.sync="editVisble" width="50%" center>
      <el-form label-width="120px" :model="reple">
        <el-form-item label="进货价格（元）">
          <el-input v-model="reple.price"></el-input>
        </el-form-item>
        <el-form-item label="负责员工">
          <el-select v-model="reple.employeeId" :placeholder="employeeName">
            <el-option
              v-for="item in employeeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="购买的商品">
          <el-select v-model="reple.goodsId" :placeholder="goodsName">
            <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="供应商">
          <el-select v-model="reple.suppId" :placeholder="reple.suppName">
            <el-option v-for="item in suppList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="进货数量">
          <el-input v-model="reple.num"></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="reple.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="updatereple()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加进货信息" :visible.sync="addVisble" width="50%" center>
      <el-form label-width="120px" :model="reple">
        <el-form-item label="进货价格（元）">
          <el-input v-model="reple.price"></el-input>
        </el-form-item>
        <el-form-item label="负责员工">
          <el-select v-model="reple.employeeId" :placeholder="employeeName">
            <el-option
              v-for="item in employeeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="购买的商品">
          <el-select v-model="reple.goodsId" :placeholder="goodsName">
            <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="供应商">
          <el-select v-model="reple.suppId" :placeholder="reple.suppName">
            <el-option v-for="item in suppList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="进货数量">
          <el-input v-model="reple.num"></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="reple.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="addreple()">确 定</el-button>
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
      repleList: [],
      pageInfo: {},
      page: 1,
      reple: {
        id: null,
        goodsId: null,
        price: 0,
        num: 0,
        produTime: new Date(),
        overdueTime: new Date(),
        suppId: null,
        putTime: new Date(),
        employeeId: null,
        note: ""
      },
      employeeName: "",
      goodsName: "",
      employeeList: [],
      goodsList: "",
      input: "",
      suppName: "",
      suppList: []
    };
  },
  methods: {
    addreple() {
      this.$http
        .post("reple/addReple", this.reple)
        .then(result => {
          if (result.data) {
            this.$message.success("添加成功");
          } else {
            this.$message.error("添加失败");
          }
          this.addVisble = false;
        })
        .catch(error => {
          if (error) {
            this.$message.info("添加失败，请联系管理员");
          }
        });
    },
    openAdd() {
      this.getEmployeeList();
      this.getGoodsList();
      this.getSuppList();
      this.addVisble = true;
    },
    updatereple() {
      this.$http
        .put("reple/updateReple", this.reple)
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

      this.reple = row;
      this.getEmployeeList();
      this.getGoodsList();
      this.getSuppList();
    },
    handleDelete(index, row) {
      this.minSize = this.pageInfo.size;
      this.$confirm("将删除此个供应商，是否继续？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http
          .get("reple/delReple/" + row.id)
          .then(result => {
            if (result.data) {
              window.alert("删除成功")
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
    //获取商品数组
    getGoodsList() {
      this.$http.get("goods/getAllGoods").then(result => {
        this.goodsList = result.data;
      });
    },
    //获取Supp数组
    getSuppList() {
      this.$http.get("supplier/getAllSupp").then(result => {
        this.suppList = result.data;
      });
    },
    getEmployeeList() {
      this.$http.get("employee/getAllEmployee").then(result => {
        this.employeeList = result.data;
      });
    },
    toPage() {
      this.page = this.$refs.pagehelp.internalCurrentPage;
      this.getrepleList();
    },
    getrepleList() {
      this.$http
        .get("reple/search", {
          params: {
            page: this.page || 1,
            keyword: this.input
          }
        })
        .then(result => {
          this.repleList = result.data.list;
          this.pageInfo = result.data;
        })
        .catch(error => {
          this.$message.error("未查询到相关信息");
          this.input = ""
        });
    }
  },
  created() {
    this.getrepleList();
  },
  filters: {
    dateformat(date1) {
      var date = new Date(date1);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      if (hour < 10) {
        hour = "0" + hour;
      }
      var minte = date.getMinutes();
      if (minte < 10) {
        minte = "0" + minte;
      }
      var second = date.getSeconds();
      if (second < 10) {
        second = "0" + second;
      }
      return (
        "" +
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minte +
        ":" +
        second
      );
    }
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