<script lang="ts" setup>
import numberFormat from '../../../../hooks/numberFormat'
import renderSize from '../../../../hooks/renderSize'
import timeFormat from '../../../../hooks/timeFormat'
import { useQueryBreakPoints } from '~/composables/query-breakpoints'
import timestampToBeijingTime from '~/hooks/timestampToBeijingTime'
import type { Torrent } from '~/api/download'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'
const props = defineProps<{
  torrent: Torrent
  // eslint-disable-next-line vue/prop-name-casing
  downloader_id: number
}>()
const downloadStore = useDownloadStore()
const {
  handleSelected,
  handleDeleteModal,
} = downloadStore
const {
  categories,
  deleteModal,
  trackerStatus,
  categoryFlag,
} = storeToRefs(downloadStore)
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
</script>

<template>
  <n-row>
    <n-col :span="24" />
    <n-thing class="w-100%">
      <!--      <template #avatar> -->
      <!--        <n-avatar> -->
      <!--          <MenuIcon icon="Magnet" /> -->
      <!--        </n-avatar> -->
      <!--      </template> -->
      <template #header>
        <n-ellipsis class="w-100% text-10px">
          {{ torrent.name }}
        </n-ellipsis>
      </template>
      <template #header-extra>
        <!--        <n-button -->
        <!--          v-if="torrent.super_seeding" -->
        <!--          circle -->
        <!--          size="tiny" -->
        <!--          :type="torrent.super_seeding ? 'success' : 'warning'" -->
        <!--        > -->
        <!--          <template #icon> -->
        <!--            <MenuIcon icon="Flash" /> -->
        <!--          </template> -->
        <!--        </n-button> -->
      </template>
      <template #description>
        <n-space v-if="categoryFlag" justify="center">
          <n-button
            size="tiny"
            type="success"
            @click="handleSelected('resume')"
          >
            <template #icon>
              <MenuIcon icon="Play" />
            </template>
            开始
          </n-button>
          <n-button
            size="tiny"
            type="warning"
            @click="handleSelected('pause')"
          >
            <template #icon>
              <MenuIcon icon="Pause" />
            </template>
            暂停
          </n-button>
          <n-button
            size="tiny"
            type="success"
            secondary
            @click="handleSelected('set_auto_management')"
          >
            <template #icon>
              <MenuIcon icon="Car" />
            </template>
            自动
          </n-button>
          <n-button
            size="tiny"
            type="warning" secondary
            @click="handleSelected('set_force_start')"
          >
            <template #icon>
              <MenuIcon icon="PlayForward" />
            </template>
            强制
          </n-button>
          <n-button
            size="tiny"
            type="info"
            @click="handleSelected('recheck')"
          >
            <template #icon>
              <MenuIcon icon="CheckmarkDone" />
            </template>
            校验
          </n-button>
          <n-button
            size="tiny"
            type="info" secondary
            @click="handleSelected('reannounce')"
          >
            <template #icon>
              <MenuIcon icon="Mic" />
            </template>
            汇报
          </n-button>

          <n-button size="tiny" type="primary">
            <template #icon>
              <MenuIcon icon="Copy" />
            </template>
            辅种
          </n-button>
          <n-button
            size="tiny" type="error"
            @click="handleDeleteModal(true)"
          >
            <template #icon>
              <MenuIcon icon="Trash" />
            </template>
            删除
          </n-button>
        </n-space>
        <n-space v-else justify="center">
          <n-button
            size="tiny"
            type="success"
            @click="handleSelected('start_torrent')"
          >
            <template #icon>
              <MenuIcon icon="Play" />
            </template>
            开始
          </n-button>
          <n-button
            size="tiny"
            type="warning"
            @click="handleSelected('stop_torrent')"
          >
            <template #icon>
              <MenuIcon icon="Pause" />
            </template>
            停止
          </n-button>
          <!--          <n-button -->
          <!--            size="tiny" -->
          <!--            type="success" -->
          <!--            secondary -->
          <!--            @click="handleSelected('categoryForm')" -->
          <!--          > -->
          <!--            <template #icon> -->
          <!--              <MenuIcon icon="Car" /> -->
          <!--            </template> -->
          <!--            路径 -->
          <!--          </n-button> -->
          <n-button
            size="tiny"
            type="info"
            @click="handleSelected('verify_torrent')"
          >
            <template #icon>
              <MenuIcon icon="CheckmarkDone" />
            </template>
            校验
          </n-button>
          <n-button
            size="tiny"
            type="info" secondary
            @click="handleSelected('reannounce_torrent')"
          >
            <template #icon>
              <MenuIcon icon="Mic" />
            </template>
            汇报
          </n-button>
          <n-button
            size="tiny"
            type="info" secondary
            @click="handleSelected('queue_top')"
          >
            <template #icon>
              <MenuIcon icon="Mic" />
            </template>
            队列顶部
          </n-button><n-button
            size="tiny"
            type="info" secondary
            @click="handleSelected('queue_bottom')"
          >
            <template #icon>
              <MenuIcon icon="Mic" />
            </template>
            队列底部
          </n-button>
          <n-button
            size="tiny"
            type="info" secondary
            @click="handleSelected('queue_up')"
          >
            <template #icon>
              <MenuIcon icon="Mic" />
            </template>
            上移
          </n-button> <n-button
            size="tiny"
            type="info" secondary
            @click="handleSelected('queue_down')"
          >
            <template #icon>
              <MenuIcon icon="Mic" />
            </template>
            下移
          </n-button>
          <n-button size="tiny" type="primary">
            <template #icon>
              <MenuIcon icon="Copy" />
            </template>
            辅种
          </n-button>
          <n-button
            size="tiny" type="error"
            @click="handleDeleteModal(true)"
          >
            <template #icon>
              <MenuIcon icon="Trash" />
            </template>
            删除
          </n-button>
        </n-space>
      </template>
      <div>
        <n-card v-if="categoryFlag">
          <n-tabs
            type="line"
            size="small"
            justify-content="center"
          >
            <n-tab-pane name="信息">
              <n-descriptions
                label-placement="left"
                size="small"
                :columns="columns"
                class="text-8px!"
                :title="torrent.name"
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
                <n-descriptions-item v-if="torrent.tags">
                  <template #label>
                    标签
                  </template>
                  {{ torrent.tags }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    保存路径
                  </template>
                  {{ torrent.save_path }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    HASH
                  </template>
                  <n-ellipsis style="max-width: 200px">
                    {{ torrent.hash }}
                  </n-ellipsis>
                </n-descriptions-item>
                <n-descriptions-item v-if="torrent.comment">
                  <template #label>
                    注释
                  </template>
                  <n-ellipsis style="max-width: 200px">
                    {{ torrent.comment }}
                  </n-ellipsis>
                </n-descriptions-item>
              </n-descriptions>
              <n-descriptions
                label-placement="left"
                size="small"
                :columns="columns"
                class="text-8px!"
                title="传输"
                bordered
              >
                <n-descriptions-item>
                  <template #label>
                    活动时间
                  </template>
                  {{ torrent.time_active ? timeFormat(torrent.time_active) : 0 }}
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
                    已丢弃
                  </template>
                  {{ torrent.total_wasted ? renderSize(torrent.total_wasted) : 0 }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    分享率
                  </template>
                  {{ torrent.ratio ? torrent.ratio.toFixed(2) : 0 }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    下次汇报
                  </template>
                  {{ torrent.reannounce ? timeFormat(torrent.reannounce) : 0 }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    最后完整可见
                  </template>
                  {{ torrent.last_seen ? timestampToBeijingTime(torrent.last_seen) : 0 }}
                </n-descriptions-item>
              </n-descriptions>
            </n-tab-pane>
            <n-tab-pane name="连接">
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
                <n-descriptions-item v-if="tracker.tier">
                  <template #label>
                    层级
                  </template>
                  {{ tracker.tier }}
                </n-descriptions-item>
                <n-descriptions-item v-if="tracker.url">
                  <template #label>
                    url
                  </template>
                  <n-ellipsis style="max-width: 200px">
                    {{ tracker.url }}
                  </n-ellipsis>
                </n-descriptions-item>
                <n-descriptions-item v-if="tracker.status">
                  <template #label>
                    状态
                  </template>
                  {{ trackerStatus[tracker.status] }}
                </n-descriptions-item>
                <n-descriptions-item v-if="tracker.num_peers">
                  <template #label>
                    用户
                  </template>
                  {{ tracker.num_peers }}
                </n-descriptions-item>
                <n-descriptions-item v-if="tracker.num_seeds">
                  <template #label>
                    种子
                  </template>
                  {{ tracker.num_seeds }}
                </n-descriptions-item>
                <n-descriptions-item v-if="tracker.num_leeches">
                  <template #label>
                    下载
                  </template>
                  {{ tracker.num_leeches }}
                </n-descriptions-item>
                <n-descriptions-item v-if="tracker.num_downloaded">
                  <template #label>
                    吸血
                  </template>
                  {{ tracker.num_downloaded }}
                </n-descriptions-item>
                <n-descriptions-item v-if="tracker.msg">
                  <template #label>
                    消息
                  </template>
                  <n-ellipsis style="max-width: 200px">
                    {{ tracker.msg }}
                  </n-ellipsis>
                </n-descriptions-item>
              </n-descriptions>
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
                  <n-progress
                    type="line"
                    :percentage="Number((peer.progress * 100).toFixed(2))"
                    :height="20"
                    indicator-placement="inside"
                    :border-radius="4"
                    :fill-border-radius="0"
                  />
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
            <n-tab-pane name="文件" display-directive="show:lazy">
              <n-descriptions
                v-for="(file, index) in torrent.files"
                :key="file.ip"
                :title="`Peer${index + 1}`"
                label-placement="left"
                size="small"
                :columns="columns"
                class="text-8px!"
                bordered
              >
                <n-descriptions-item span="2">
                  <template #label>
                    文件名
                  </template>
                  {{ file.name }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    index
                  </template>
                  {{ file.index }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    可用性
                  </template>
                  <n-progress
                    type="line"
                    :percentage="Number((file.availability * 100).toFixed(2))"
                    :height="20"
                    indicator-placement="inside"
                    :border-radius="4"
                    :fill-border-radius="0"
                  />
                </n-descriptions-item>
                <!--                <n-descriptions-item> -->
                <!--                  <template #label> -->
                <!--                    文件名 -->
                <!--                  </template> -->
                <!--                  {{ file.is_seed }} -->
                <!--                </n-descriptions-item> -->
                <n-descriptions-item>
                  <template #label>
                    优先级
                  </template>
                  {{ file.priority }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    大小
                  </template>
                  {{ renderSize(file.size) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    进度
                  </template>
                  <n-progress
                    type="line"
                    :percentage="Number((file.progress * 100).toFixed(2))"
                    :height="20"
                    indicator-placement="inside"
                    :border-radius="4"
                    :fill-border-radius="0"
                  />
                </n-descriptions-item>
              </n-descriptions>
            </n-tab-pane>
          </n-tabs>
        </n-card>

        <n-card v-else>
          <n-tabs
            type="line"
            size="small"
            justify-content="center"
          >
            <n-tab-pane name="信息">
              <n-descriptions
                label-placement="left"
                size="small"
                :columns="columns"
                class="text-8px!"
                :title="torrent.name"
                bordered
              >
                <n-descriptions-item>
                  <template #label>
                    总大小
                  </template>
                  {{ renderSize(torrent.totalSize) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    hash
                  </template>
                  <n-ellipsis style="max-width: 150px">
                    {{ torrent.hash }}
                  </n-ellipsis>
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    注释
                  </template>
                  <n-ellipsis style="max-width: 150px">
                    {{ torrent.comment }}
                  </n-ellipsis>
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    最后活动
                  </template>
                  {{ timestampToBeijingTime(torrent.activityDate) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    添加时间
                  </template>
                  {{ timestampToBeijingTime(torrent.addedDate) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    带宽优先级
                  </template>
                  {{ torrent.bandwidthPriority }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    丢弃
                  </template>
                  {{ torrent.corruptEver > 0 ? renderSize(torrent.corruptEver) : 0 }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    创建者
                  </template>
                  <n-ellipsis style="max-width: 150px">
                    {{ torrent.creator }}
                  </n-ellipsis>
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    创建日期
                  </template>
                  {{ timestampToBeijingTime(torrent.dateCreated) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    未下载
                  </template>
                  {{ torrent.desiredAvailable > 0 ? renderSize(torrent.desiredAvailable) : 0 }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    完成时间
                  </template>
                  {{ timestampToBeijingTime(torrent.doneDate) }}
                </n-descriptions-item>

                <n-descriptions-item>
                  <template #label>
                    已下载
                  </template>
                  {{ renderSize(torrent.downloadedEver) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    修改日期
                  </template>
                  {{ timestampToBeijingTime(torrent.editDate) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    错误码
                  </template>
                  {{ torrent.error }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    错误信息
                  </template>
                  {{ torrent.errorString }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    eta Idle
                  </template>
                  {{ torrent.etaIdle }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    未校验
                  </template>
                  {{ torrent.haveUnchecked > 0 ? renderSize(torrent.haveUnchecked) : 0 }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    已校验
                  </template>
                  {{ renderSize(torrent.haveValid) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    会话限制
                  </template>
                  {{ torrent.honorsSessionLimits }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    已完成
                  </template>
                  {{ torrent.isFinished }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    私有
                  </template>
                  {{ torrent.isPrivate }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    等待中
                  </template>
                  {{ torrent.isStalled }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    标签
                  </template>
                  {{ torrent.labels.length > 0 ? torrent.labels : '' }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    未下载
                  </template>
                  {{ torrent.leftUntilDone > 0 ? renderSize(torrent.leftUntilDone) : 0 }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    磁力链接
                  </template>
                  <n-ellipsis style="max-width: 150px">
                    {{ torrent.magnetLink }}
                  </n-ellipsis>
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    手动汇报
                  </template>
                  {{ torrent.manualAnnounceTime > 0 ? timeFormat(torrent.manualAnnounceTime) : '' }}
                </n-descriptions-item>

                <n-descriptions-item>
                  <template #label>
                    元数据
                  </template>
                  {{ torrent.metadataPercentComplete * 100 }}%
                </n-descriptions-item>

                <n-descriptions-item>
                  <template #label>
                    进度
                  </template>
                  {{ torrent.percentDone * 100 }}%
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    块数量
                  </template>
                  {{ torrent.pieceCount }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    块大小
                  </template>
                  {{ renderSize(torrent.pieceSize) }}
                </n-descriptions-item>
                <!--                <n-descriptions-item> -->
                <!--                  <template #label> -->
                <!--                    pieces -->
                <!--                  </template> -->
                <!--                  <n-ellipsis style="max-width: 150px"> -->
                <!--                    {{ torrent.pieces }} -->
                <!--                  </n-ellipsis> -->
                <!--                </n-descriptions-item> -->
                <!--                <n-descriptions-item> -->
                <!--                  <template #label> -->
                <!--                    优先级 -->
                <!--                  </template> -->
                <!--                  {{ torrent.priorities }} -->
                <!--                </n-descriptions-item> -->
                <n-descriptions-item>
                  <template #label>
                    队列
                  </template>
                  {{ torrent.queuePosition }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    下载速度
                  </template>
                  {{ torrent.rateDownload > 0 ? renderSize(torrent.rateDownload) : 0 }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    上传速度
                  </template>
                  {{ torrent.rateUpload > 0 ? renderSize(torrent.rateUpload) : 0 }}
                </n-descriptions-item>
                <n-descriptions-item v-if="torrent.recheckProgress > 0">
                  <template #label>
                    校验进度
                  </template>
                  {{ torrent.recheckProgress }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    下载耗时
                  </template>
                  {{ timeFormat(torrent.secondsDownloading) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    做种时间
                  </template>
                  {{ timeFormat(torrent.secondsSeeding) }}
                </n-descriptions-item>

                <n-descriptions-item>
                  <template #label>
                    完成时大小
                  </template>
                  {{ renderSize(torrent.sizeWhenDone) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    开始时间
                  </template>
                  {{ timestampToBeijingTime(torrent.startDate) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    状态
                  </template>
                  {{ torrent.status }}
                </n-descriptions-item>
                <!--                <n-descriptions-item> -->
                <!--                  <template #label> -->
                <!--                    种子文件 -->
                <!--                  </template> -->
                <!--                  {{ torrent.torrentFile }} -->
                <!--                </n-descriptions-item> -->
                <n-descriptions-item>
                  <template #label>
                    分享率
                  </template>
                  {{ torrent.uploadRatio }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    已上传
                  </template>
                  {{ renderSize(torrent.uploadedEver) }}
                </n-descriptions-item>

                <n-descriptions-item>
                  <template #label>
                    webseeds
                  </template>
                  {{ torrent.webseeds }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    webseedsSendingToUs
                  </template>
                  {{ torrent.webseedsSendingToUs }}
                </n-descriptions-item>
              </n-descriptions>
            </n-tab-pane>
            <n-tab-pane name="peer">
              <n-descriptions
                label-placement="left"
                size="small"
                :columns="columns"
                class="text-8px!"
                :title="torrent.name"
                bordered
              >
                <n-descriptions-item>
                  <template #label>
                    最大连接数
                  </template>
                  {{ torrent.maxConnectedPeers }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    peer-limit
                  </template>
                  {{ torrent['peer-limit'] }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    已连接节点
                  </template>
                  {{ torrent.peersConnected }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    peersGettingFromUs
                  </template>
                  {{ torrent.peersGettingFromUs }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    peersSendingToUs
                  </template>
                  {{ torrent.peersSendingToUs }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    peersFrom
                  </template>
                  {{ torrent.peersFrom }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    peers
                  </template>
                  {{ torrent.peers }}
                </n-descriptions-item>
              </n-descriptions>
            </n-tab-pane>
            <n-tab-pane name="tracker">
              <n-descriptions
                v-for="(tracker, index) in torrent.trackerStats"
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
                    scrape
                  </template>
                  {{ tracker.scrape }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    announce
                  </template>
                  {{ tracker.announce }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    announceState
                  </template>
                  {{ tracker.announceState }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    downloadCount
                  </template>
                  {{ tracker.downloadCount }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    hasAnnounced
                  </template>
                  {{ tracker.hasAnnounced }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    hasScraped
                  </template>
                  {{ tracker.hasScraped }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    host
                  </template>
                  {{ tracker.host }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    isBackup
                  </template>
                  {{ tracker.isBackup }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastAnnouncePeerCount
                  </template>
                  {{ tracker.lastAnnouncePeerCount }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastAnnounceResult
                  </template>
                  {{ tracker.lastAnnounceResult }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastAnnounceStartTime
                  </template>
                  {{ tracker.lastAnnounceStartTime }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastAnnounceSucceeded
                  </template>
                  {{ tracker.lastAnnounceSucceeded }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastAnnounceTime
                  </template>
                  {{ tracker.lastAnnounceTime }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastAnnounceTimedOut
                  </template>
                  {{ tracker.lastAnnounceTimedOut }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastScrapeResult
                  </template>
                  {{ tracker.lastScrapeResult }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastScrapeStartTime
                  </template>
                  {{ tracker.lastScrapeStartTime }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastScrapeSucceeded
                  </template>
                  {{ tracker.lastScrapeSucceeded }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastScrapeStartTime
                  </template>
                  {{ tracker.lastScrapeStartTime }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastScrapeTime
                  </template>
                  {{ tracker.lastScrapeTime }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    lastScrapeTimedOut
                  </template>
                  {{ tracker.lastScrapeTimedOut }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    leecherCount
                  </template>
                  {{ tracker.leecherCount }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    nextAnnounceTime
                  </template>
                  {{ tracker.nextAnnounceTime }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    nextScrapeTime
                  </template>
                  {{ tracker.nextScrapeTime }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    scrapeState
                  </template>
                  {{ tracker.scrapeState }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    seederCount
                  </template>
                  {{ tracker.seederCount }}
                </n-descriptions-item>
              </n-descriptions>
            </n-tab-pane>
            <n-tab-pane name="files">
              <!--              <n-descriptions -->
              <!--                label-placement="left" -->
              <!--                size="small" -->
              <!--                :columns="columns" -->
              <!--                class="text-8px!" -->
              <!--                :title="torrent.name" -->
              <!--                bordered -->
              <!--              > -->
              <!--                <n-descriptions-item> -->
              <!--                  <template #label> -->
              <!--                    wanted -->
              <!--                  </template> -->
              <!--                  {{ torrent.wanted }} -->
              <!--                </n-descriptions-item> -->
              <!--                <n-descriptions-item> -->
              <!--                  <template #label> -->
              <!--                    fileStats -->
              <!--                  </template> -->
              <!--                  {{ torrent.fileStats }} -->
              <!--                </n-descriptions-item> -->
              <!--                <n-descriptions-item> -->
              <!--                  <template #label> -->
              <!--                    files -->
              <!--                  </template> -->
              <!--                  {{ torrent.files }} -->
              <!--                </n-descriptions-item> -->
              <!--              </n-descriptions> -->
              <n-descriptions
                v-for="(file, index) in torrent.files"
                :key="file.name"
                :title="`File${index + 1}`"
                label-placement="left"
                size="small"
                :columns="columns"
                class="text-8px!"
                bordered
              >
                <n-descriptions-item span="2">
                  <template #label>
                    文件名
                  </template>

                  <n-ellipsis style="max-width: 200px">
                    {{ file.name }}
                  </n-ellipsis>
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    大小
                  </template>
                  {{ renderSize(file.length) }}
                </n-descriptions-item>

                <n-descriptions-item>
                  <template #label>
                    已下载
                  </template>
                  {{ renderSize(file.bytesCompleted) }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    进度
                  </template>
                  <n-progress
                    type="line"
                    :percentage="Number((file.bytesCompleted / file.length * 100).toFixed(2))"
                    :height="20"
                    indicator-placement="inside"
                    :border-radius="4"
                    :fill-border-radius="0"
                  />
                </n-descriptions-item>
              </n-descriptions>
            </n-tab-pane>
            <n-tab-pane name="设置">
              <n-descriptions
                label-placement="left"
                size="small"
                :columns="columns"
                class="text-8px!"
                :title="torrent.name"
                bordered
              >
                <n-descriptions-item>
                  <template #label>
                    下载限速
                  </template>
                  {{ renderSize(torrent.downloadLimit) }}/s
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    下载限速
                  </template>
                  {{ torrent.downloadLimited }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    下载限制
                  </template>
                  {{ (torrent.dl_limit && torrent.dl_limit < 0) ? '' : `${renderSize(torrent.dl_limit * 1024)}/s` }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    上传限制
                  </template>
                  {{ (torrent.up_limit && torrent.up_limit < 0) ? '' : `${renderSize(torrent.up_limit)}/s` }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    种子空闲限制
                  </template>
                  {{ torrent.seedIdleLimit }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    seedIdleMode
                  </template>
                  {{ torrent.seedIdleMode }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    seedRatioLimit
                  </template>
                  {{ torrent.seedRatioLimit }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    seedRatioMode
                  </template>
                  {{ torrent.seedRatioMode }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    上传限制
                  </template>
                  {{ torrent.uploadLimit * 1024 }}
                </n-descriptions-item>
                <n-descriptions-item>
                  <template #label>
                    开启上传限制
                  </template>
                  {{ torrent.uploadLimited }}
                </n-descriptions-item>
              </n-descriptions>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </div>
      <template #footer />
      <template #action />
    </n-thing>
  </n-row>
</template>

<style scoped>
:deep(.n-descriptions .n-descriptions-header){
    font-size: 12px !important;
    margin-bottom: 0!important;
}
</style>
