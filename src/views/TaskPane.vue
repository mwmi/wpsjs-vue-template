<template>
  <div class="w-full max-w-4xl mx-auto p-4 space-y-6">
    <!-- 调试信息卡片 -->
    <Card>
      <template #content>
        <div class="text-base mb-4">
          这是一个网页，按<span class="font-bold">"F12"</span>可以打开调试器。
        </div>
        <div class="text-base mb-4">
          这个示例展示了wps加载项的相关基础能力，与B/S业务系统的交互，请用浏览器打开：
          <span class="font-bold text-primary cursor-pointer hover:underline" @click="onOpenWeb()">
            {{ DemoSpan || 'http://localhost:3889' }}
          </span>
        </div>
        <div class="text-base">
          开发文档:
          <span class="font-bold text-primary">https://open.wps.cn/previous/docs/client/wpsLoad</span>
        </div>
        <div class="mt-4 pt-4 border-t border-surface-200">
          <Button label="刷新 Demo URL" icon="pi pi-refresh" @click="refreshDemoUrl" size="small" severity="secondary" />
        </div>
      </template>
    </Card>

    <Divider />

    <!-- 功能按钮卡片 -->
    <Card>
      <template #title>
        <span class="text-lg font-medium">文档操作功能</span>
      </template>
      <template #content>
        <div class="flex flex-wrap gap-2">
          <Button label="停靠左边" @click="onbuttonclick('dockLeft')" severity="secondary" />
          <Button label="停靠右边" @click="onbuttonclick('dockRight')" severity="secondary" />
          <Button label="隐藏TaskPane" @click="onbuttonclick('hideTaskPane')" severity="warning" />
          <Button label="文档开头添加字符串" @click="onbuttonclick('addString')" severity="info" />
          <Button label="取文件名" @click="onDocNameClick()" severity="success" />
        </div>
      </template>
    </Card>

    <Divider />

    <!-- 文档信息卡片 -->
    <Card>
      <template #title>
        <span class="text-lg font-medium">文档信息</span>
      </template>
      <template #content>
        <div class="text-base">
          文档文件名为：<span class="font-medium">{{ docName || '暂无' }}</span>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import taskPane from '../scripts/taskpane.js'
import Util from "../scripts/util.js"

defineOptions({
  name: 'TaskPane'
})

const DemoSpan = ref('')
const docName = ref('')

const onbuttonclick = (id) => {
  return taskPane.onbuttonclick(id)
}

const onDocNameClick = () => {
  docName.value = taskPane.onbuttonclick('getDocName')
}

const onOpenWeb = () => {
  const url = DemoSpan.value || 'http://localhost:3889'
  console.log('尝试打开 URL:', url)
  Util.shellExecute(url)
}

const refreshDemoUrl = () => {
  console.log('正在刷新 Demo URL...')
  axios.get('/.debugTemp/NotifyDemoUrl')
    .then((res) => {
      if (typeof res.data === 'string' && res.data.includes('<!DOCTYPE html>')) {
        DemoSpan.value = 'http://localhost:3889'
        console.log('检测到 HTML 响应，使用默认 URL')
      } else {
        DemoSpan.value = res.data
        console.log('成功获取 URL:', res.data)
      }
    })
    .catch((error) => {
      console.warn('刷新 URL 失败:', error)
      DemoSpan.value = 'http://localhost:3889'
    })
}

onMounted(() => {
  axios.get('/.debugTemp/NotifyDemoUrl')
    .then((res) => {
      // 检查返回的数据是否是 HTML 页面
      if (typeof res.data === 'string' && res.data.includes('<!DOCTYPE html>')) {
        // 如果返回的是 HTML，使用默认的 demo URL
        DemoSpan.value = 'http://localhost:3889'
      } else {
        DemoSpan.value = res.data
      }
    })
    .catch((error) => {
      console.warn('无法获取 demo URL:', error)
      // 出错时使用默认 URL
      DemoSpan.value = 'http://localhost:3889'
    })
})
</script>
