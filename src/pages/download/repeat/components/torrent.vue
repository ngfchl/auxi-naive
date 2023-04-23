<script lang="ts" setup>
import numberFormat from '../../../../hooks/numberFormat'
import renderSize from '../../../../hooks/renderSize'
import timeFormat from '../../../../hooks/timeFormat'
import { useQueryBreakPoints } from '~/composables/query-breakpoints'
import timestampToBeijingTime from '~/hooks/timestampToBeijingTime'
import type { Torrent } from '~/api/download'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
defineProps<{
  torrent: Torrent
}>()

const { isMobile, isPad, isDesktop } = useQueryBreakPoints()
const columns = ref(3)
watchEffect(() => {
  if (isPad.value)
    columns.value = 2

  else if (isDesktop.value)
    columns.value = 3

  if (isMobile.value)
    columns.value = 1
})
const trackerStatus = [
  'Tracker已禁用（用于 DHT、PeX 和 LSD）',
  'Tracker未联系',
  '工作中',
  '正在更新',
  '出错啦',
]
</script>

<template>
  <n-row>
    <n-col :span="24" />
    <n-thing>
      <!--      <template #avatar> -->
      <!--        <n-avatar> -->
      <!--          <MenuIcon icon="Magnet" /> -->
      <!--        </n-avatar> -->
      <!--      </template> -->
      <template #header>
        <n-ellipsis style="max-width: 280px">
          <span class="text-10px!">
            {{ torrent.name }}
          </span>
        </n-ellipsis>
      </template>
      <template #header-extra>
        <n-button
          circle
          size="tiny"
          :type="torrent.super_seeding ? 'success' : 'warning'"
        >
          <template #icon>
            <MenuIcon icon="Flash" />
          </template>
        </n-button>
      </template>
      <template #description>
        <n-space>
          <!--          <n-tag type="primary" size="small"> -->
          <!--            hash：{{ torrent.hash }} -->
          <!--          </n-tag> -->
          <!--        <n-tag type="primary"> -->
          <!--          路径：{{ torrent.save_path }} -->
          <!--        </n-tag> -->

          <n-tag v-if="torrent.tags" size="small">
            标签：{{ torrent.tags }}
          </n-tag>
        </n-space>
      </template>
      <div>
        <n-card>
          <n-tabs
            type="line"
            size="small"
          >
            <n-tab-pane name="信息">
              <n-descriptions
                label-placement="left"
                size="small"
                :columns="columns"
                class="text-8px!"
                bordered
              >
                <n-descriptions-item>
                  <template #label>
                    总大小
                  </template>
                  {{ renderSize(torrent.total_size) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    区块
                  </template>
                  {{ `${torrent.peers_total}x${renderSize(torrent.piece_size)}(已下载：${torrent.pieces_have})` }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    创建
                  </template>
                  {{ torrent.created_by }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    添加于
                  </template>
                  {{ timestampToBeijingTime(torrent.addition_date) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    完成于
                  </template>
                  {{ timestampToBeijingTime(torrent.completion_date) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    创建于
                  </template>
                  {{ timestampToBeijingTime(torrent.creation_date) }}
                </n-descriptions-item>
                <n-descriptions-item v-if="torrent.category">
                  <template #label>
                    分类
                  </template>
                  {{ torrent.category }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    保存路径
                  </template>
                  {{ torrent.save_path }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    注释
                  </template>
                  {{ torrent.comment }}
                </n-descriptions-item>
              </n-descriptions>
            </n-tab-pane>
            <n-tab-pane name="传输">
              <n-descriptions
                label-placement="left"
                size="small"
                :columns="columns"
                class="text-8px!"
                bordered
              >
                <n-descriptions-item>
                  <template #label>
                    活动时间
                  </template>
                  {{ timeFormat(torrent.time_active) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    剩余时间
                  </template>
                  {{ timeFormat(torrent.amount_left / torrent.dl_speed) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    连接
                  </template>
                  {{ `${torrent.nb_connections}(链接限制：${torrent.nb_connections_limit})` }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    已下载
                  </template>
                  {{ `${renderSize(torrent.total_downloaded)}(会话：${renderSize(torrent.total_downloaded_session)})` }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    已上传
                  </template>
                  {{ `${renderSize(torrent.total_uploaded)}(会话：${renderSize(torrent.total_uploaded_session)})` }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    种子：
                  </template>
                  {{ `${torrent.seeds}(${torrent.seeds_total})` }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    下载速度
                  </template>
                  {{ `${renderSize(torrent.dl_speed)}/s(平均：${renderSize(torrent.dl_speed_avg)}/s)` }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    上传速度
                  </template>
                  {{ `${renderSize(torrent.up_speed)}/s(平均：${renderSize(torrent.up_speed_avg)}/s)` }}
                </n-descriptions-item>

                <n-descriptions-item>
                  <template #label>
                    用户
                  </template>
                  {{ `${torrent.num_leechs}(总计：${torrent.num_incomplete})` }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    下载限制
                  </template>
                  {{ torrent.dl_limit < 0 ? '' : `${renderSize(torrent.dl_limit)}/s` }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    上传限制
                  </template>
                  {{ torrent.up_limit < 0 ? '' : `${renderSize(torrent.up_limit)}/s` }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    已丢弃
                  </template>
                  {{ renderSize(torrent.total_wasted) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    分享率
                  </template>
                  {{ torrent.ratio.toFixed(2) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    下次汇报
                  </template>
                  {{ timeFormat(torrent.reannounce) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    最后完整可见
                  </template>
                  {{ timestampToBeijingTime(torrent.last_seen) }}
                </n-descriptions-item>
              </n-descriptions>
            </n-tab-pane>
            <n-tab-pane name="Tracker">
              <n-descriptions
                v-for="(tracker, index) in torrent.trackers"
                :key="tracker.url"
                :title="`Tracker${index + 1}`"
                label-placement="left"
                size="small"
                :columns="columns"
                class="text-8px!"
                bordered
              >
                <n-descriptions-item>
                  <template #label>
                    层级
                  </template>
                  {{ tracker.tier }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    url
                  </template>
                  <n-ellipsis style="max-width: 200px">
                    {{ tracker.url }}
                  </n-ellipsis>
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    状态
                  </template>
                  {{ trackerStatus[tracker.status] }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    用户
                  </template>
                  {{ tracker.num_peers }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    种子
                  </template>
                  {{ tracker.num_seeds }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    下载
                  </template>
                  {{ tracker.num_leeches }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    吸血
                  </template>
                  {{ tracker.num_downloaded }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    消息
                  </template>
                  <n-ellipsis style="max-width: 200px">
                    {{ tracker.msg }}
                  </n-ellipsis>
                </n-descriptions-item>
              </n-descriptions>
            </n-tab-pane>
            <n-tab-pane v-if="torrent.peers > 0" name="Peers">
              <n-descriptions
                v-for="(peer, index) in torrent.peerList"
                :key="peer.ip"
                :title="`Peer${index + 1}`"
                label-placement="left"
                size="small"
                :columns="columns"
                class="text-8px!"
                bordered
              >
                <n-descriptions-item>
                  <template #label>
                    国家/地区
                  </template>
                  {{ peer.country }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    IP
                  </template>
                  {{ peer.ip }}:{{ peer.port }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    客户端
                  </template>
                  {{ peer.client }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    进度
                  </template>
                  {{ (numberFormat(peer.progress) * 100).toFixed(2) }}%
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    下载速度
                  </template>
                  {{ renderSize(peer.dl_speed) }}/s
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    上传速度
                  </template>
                  {{ renderSize(peer.up_speed) }}/s
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    已下载
                  </template>
                  {{ renderSize(peer.downloaded) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    已上传
                  </template>
                  {{ renderSize(peer.uploaded) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    文件关联
                  </template>
                  {{ numberFormat(peer.relevance) * 100 }}%
                </n-descriptions-item>
                <n-descriptions-item v-if="peer.files">
                  <template #label>
                    文件
                  </template>
                  <n-ellipsis style="max-width: 120px">
                    {{ peer.files }}
                  </n-ellipsis>
                </n-descriptions-item>
              </n-descriptions>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </div>
      <template #footer />
      <template #action>
        <n-space justify="center">
          <n-button size="tiny" type="success">
            <template #icon>
              <MenuIcon icon="Play" />
            </template>
            开始
          </n-button>
          <n-button size="tiny" type="warning">
            <template #icon>
              <MenuIcon icon="Pause" />
            </template>
            暂停
          </n-button>

          <n-button size="tiny" type="primary">
            <template #icon>
              <MenuIcon icon="Copy" />
            </template>
            辅种
          </n-button>
          <n-button size="tiny" type="error">
            <template #icon>
              <MenuIcon icon="Trash" />
            </template>
            删除
          </n-button>
        </n-space>
      </template>
    </n-thing>
  </n-row>
</template>

<style scoped>
:deep(.n-descriptions .n-descriptions-header){
    font-size: 12px !important;
    margin-bottom: 0!important;
}
</style>
