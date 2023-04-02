import { fileURLToPath } from 'url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'

const baseSrc = fileURLToPath(new URL('src', import.meta.url))
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          ws: false,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            naiveUI: ['naive-ui'],
            ionicons5: ['@vicons/ionicons5'],
            lodash: ['lodash-es', '@vueuse/core'],
            vue: ['vue', 'vue-router', 'vue-i18n', 'pinia'],
          },
        },
      },
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: false,
      __VUE_I18N_LEGACY_API__: false,
    },
    resolve: {
      alias: {
        '~': baseSrc,
        '~@': baseSrc,
        '@': baseSrc,
      },
    },
    plugins: [
      vue(),
      AutoImport({
      // 配置需要自动导入的库
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          'vue-i18n',
          '@vueuse/core',
          'pinia',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
        // 生成到的地址
        dts: 'types/auto-imports.d.ts',
        // 配置本地需要自动导入的库
        dirs: [
        // pinia状态管理目录
          'src/stores',
          // 自定义组合式api目录
          'src/composables',
        ],
      }),
      Components({
      // 导入naiveui的配置项目
        resolvers: [
          NaiveUiResolver(),
        ],
        // 生成类型的地址
        dts: 'types/components.d.ts',
      }),
      Unocss(),
    ],
  }
})
