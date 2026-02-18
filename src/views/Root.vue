<template>
  <div class="w-full max-w-6xl mx-auto p-6 space-y-8">
    <!-- 欢迎标题卡片 -->
    <Card>
      <template #content>
        <div class="text-center py-8">
          <div class="flex justify-center mb-6">
            <div class="bg-primary text-primary-contrast rounded-full p-4">
              <i class="pi pi-home text-3xl"></i>
            </div>
          </div>
          <h1 class="text-3xl font-bold mb-4">欢迎来到 WPS Vue3 插件世界</h1>
          <p class="text-lg text-surface-600 max-w-2xl mx-auto">
            这是一个基于 Vue3 和 PrimeVue 构建的现代化 WPS Office 插件开发框架，
            提供丰富的 UI 组件和便捷的开发体验。
          </p>
        </div>
      </template>
    </Card>

    <Divider />

    <!-- 快速导航卡片 -->
    <Card>
      <template #title>
        <div class="flex items-center gap-2">
          <i class="pi pi-directions text-primary"></i>
          <span class="text-xl font-semibold">快速导航</span>
        </div>
      </template>
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 对话框页面卡片 -->
          <Card class="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            @click="navigateTo('/dialog')">
            <template #content>
              <div class="text-center p-6">
                <div
                  class="bg-info text-info-contrast rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i class="pi pi-comments text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">对话框页面</h3>
                <p class="text-surface-600 mb-4">演示对话框功能和文档操作能力</p>
                <Button label="访问对话框" icon="pi pi-arrow-right" class="w-full" severity="info" outlined />
              </div>
            </template>
          </Card>

          <!-- 任务窗格页面卡片 -->
          <Card class="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            @click="navigateTo('/taskpane')">
            <template #content>
              <div class="text-center p-6">
                <div
                  class="bg-success text-success-contrast rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <i class="pi pi-window-maximize text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold mb-2">任务窗格页面</h3>
                <p class="text-surface-600 mb-4">展示任务窗格功能和侧边栏操作</p>
                <Button label="访问任务窗格" icon="pi pi-arrow-right" class="w-full" severity="success" outlined />
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Card>

    <Divider />

    <!-- 项目信息卡片 -->
    <Card>
      <template #title>
        <div class="flex items-center gap-2">
          <i class="pi pi-info-circle text-primary"></i>
          <span class="text-xl font-semibold">项目信息</span>
        </div>
      </template>
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-surface-100 rounded-lg">
            <i class="pi pi-code text-2xl text-primary mb-2 block"></i>
            <h4 class="font-semibold mb-1">技术栈</h4>
            <p class="text-sm text-surface-600">Vue3 + PrimeVue + Vite</p>
          </div>
          <div class="text-center p-4 bg-surface-100 rounded-lg">
            <i class="pi pi-book text-2xl text-primary mb-2 block"></i>
            <h4 class="font-semibold mb-1">开发文档</h4>
            <p class="text-sm text-surface-600">完善的技术文档支持</p>
          </div>
          <div class="text-center p-4 bg-surface-100 rounded-lg">
            <i class="pi pi-bolt text-2xl text-primary mb-2 block"></i>
            <h4 class="font-semibold mb-1">快速开发</h4>
            <p class="text-sm text-surface-600">高效的插件开发体验</p>
          </div>
        </div>
      </template>
    </Card>

    <!-- 底部操作区域 -->
    <div class="text-center py-6">
      <div class="flex flex-wrap justify-center gap-4">
        <Button label="查看 GitHub" icon="pi pi-github" @click="openExternalLink('https://github.com')"
          severity="secondary" outlined />
        <Button label="开发文档" icon="pi pi-book" @click="openExternalLink('https://open.wps.cn/previous/docs/client/wpsLoad')"
          severity="help" />
        <Button label="刷新页面" icon="pi pi-refresh" @click="refreshPage" severity="secondary" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  console.log('导航到:', path)
  router.push(path)
}

const openExternalLink = (url) => {
  console.log('打开外部链接:', url)
  window.open(url, '_blank')
}

const refreshPage = () => {
  console.log('刷新页面')
  window.location.reload()
}
</script>
