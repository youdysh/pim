<script lang="ts" setup>
import {isDark} from '~/composables';
import {ref} from "vue";
import {ElMessage} from 'element-plus'
import {useFingerprint} from '~/store/fingerprint'
import {SHA256} from 'crypto-js';
import {hexToOther} from "~/components/util";
import {Sunny, Moon} from "@element-plus/icons-vue";

const fingerprint = useFingerprint()
const password = ref("")
const passwordAgain = ref("")
const certified = () => {
  if (password.value !== '' && passwordAgain.value !== '') {
    if (password.value === passwordAgain.value) {
      const sha256 = SHA256(password.value).toString()
      const baseString = hexToOther(sha256)
      fingerprint.setPassword(baseString)
      ElMessage.success('认证成功')
    } else {
      ElMessage.warning('两次输入的主密码不一致')
    }
  } else {
    ElMessage.warning('主密码不能为空')
  }
}

</script>

<template>
  <div class="base-header">
    <el-button v-if="fingerprint.password" class="un-certified" @click="fingerprint.setPassword('')" type="primary">
      退出认证
    </el-button>
    <template v-else>
      <el-input placeholder="主密码" class="master-password" v-model="password" show-password></el-input>
      <el-input placeholder="再次输入主密码" class="master-password" v-model="passwordAgain" show-password></el-input>
      <el-button class="certified" @click="certified" type="primary">认证</el-button>
    </template>

    <el-switch size="large" class="dark-selector" v-model="isDark"
               :active-icon="Moon" :inactive-icon="Sunny" :class="isDark ? 'dark' : 'light'"
               inline-prompt active-color="#2c2c2c" inactive-color="#f2f2f2"></el-switch>
  </div>
</template>
<style scoped lang="scss">
.base-header {
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  width: calc(100% - 20px);
  align-items: center;
  justify-content: flex-end;

  .master-password {
    margin-right: 10px;

    :deep(.ep-input-group__prepend) {
      padding: 0 10px;
    }
  }

  .un-certified {
    width: 90px;
    margin-right: 10px;
  }

  .certified {
    width: 50px;
    margin-right: 10px;
  }

  .dark-selector {
    &.light {
      :deep(.el-icon) {
        color: var(--ep-color-black)
      }
    }
  }
}
</style>
