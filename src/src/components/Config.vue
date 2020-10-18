<template>
  <div class="config">
    Configuration
    <el-upload
      action=""
      :limit="1"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :auto-upload="false">
      <el-button slot="trigger" type="primary">Upload</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'Config',
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      fileList.splice(fileList.indexOf(file), 1);
    },
    handleChange(file, fileList) {
      console.log(fileList);
      const reader = new FileReader();
      reader.readAsText(file.raw);
      reader.onload = function (e) {
        console.log(e.target.result);
      };
    },
    handleExceed(files, fileList) {
      var file = {
        name: files[0].name,
        percentage: 0,
        raw: files[0],
        status: 'ready',
        uid: 0
      }
      fileList.splice(0, 1);
      fileList.push(file);
      this.handleChange(file, fileList);
    }
  }
}
</script>

<style scoped>
</style>
