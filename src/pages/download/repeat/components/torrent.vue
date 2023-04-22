<script lang="ts" setup>
import numberFormat from '../../../../hooks/numberFormat'
import renderSize from '../../../../hooks/renderSize'
import timeFormat from '../../../../hooks/timeFormat'
import timestampToBeijingTime from '~/hooks/timestampToBeijingTime'
import type { Torrent } from '~/api/download'
import MenuIcon from '~/layouts/side-menu/menu-icon.vue'

defineProps<{
  torrent: Torrent
}>()
const trackerStatus = [
  'Tracker已禁用（用于 DHT、PeX 和 LSD）',
  'Tracker未联系',
  '工作中',
  '正在更新',
  '出错啦',
]
</script>

<template>
  <n-thing>
    <template #avatar>
      <n-avatar>
        <MenuIcon icon="Magnet" />
      </n-avatar>
    </template>
    <template #header>
      {{ torrent.name }}
    </template>
    <template #header-extra>
      <n-button
        circle size="small"
        :type="torrent.super_seeding ? 'success' : 'warning'"
      >
        <template #icon>
          <MenuIcon icon="Flash" />
        </template>
      </n-button>
    </template>
    <template #description>
      <n-space>
        <n-tag type="primary">
          hash：{{ torrent.hash }}
        </n-tag>
        <!--        <n-tag type="primary"> -->
        <!--          路径：{{ torrent.save_path }} -->
        <!--        </n-tag> -->
        <n-tag v-if="torrent.category" type="info">
          分类：{{ torrent.category }}
        </n-tag>
        <n-tag v-if="torrent.tags">
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
              size="small" class="text-8px!"
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
            <template #label>
              Tracker
            </template>

            <n-table striped :single-line="false" size="small">
              <thead>
                <tr>
                  <th>层级</th>
                  <th>url</th>
                  <th>状态</th>
                  <th>用户</th>
                  <th>种子</th>
                  <th>下载</th>
                  <th>吸血</th>
                  <th>消息</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="tracker in torrent.trackers"
                  :key="tracker.url"
                >
                  <td>{{ tracker.tier }}</td>
                  <td>
                    <n-ellipsis style="max-width: 220px">
                      {{ tracker.url }}
                    </n-ellipsis>
                  </td>
                  <td>{{ trackerStatus[tracker.status] }}</td>
                  <td>{{ tracker.num_peers }}</td>
                  <td>{{ tracker.num_seeds }}</td>
                  <td>{{ tracker.num_leeches }}</td>
                  <td>{{ tracker.num_downloaded }}</td>
                  <td>{{ tracker.msg }}</td>
                </tr>
              </tbody>
            </n-table>
          </n-tab-pane>
          <n-tab-pane v-if="torrent.peers > 0" name="Peers">
            <n-table striped :single-line="false" size="small">
              <thead>
                <tr>
                  <th class="w-50px">
                    国家地区
                  </th>
                  <th class="w-380px">
                    IP
                  </th>
                  <!--                  <th>端口</th> -->
                  <!--                  <th>连接</th> -->
                  <!--                  <th>标志</th> -->
                  <th class="w-200px">
                    客户端
                  </th>
                  <th class="w-70px">
                    进度
                  </th>
                  <th class="w-90px">
                    下载速度
                  </th>
                  <th class="w-90px">
                    上传速度
                  </th>
                  <th class="w-90px">
                    已下载
                  </th>
                  <th class="w-90px">
                    已上传
                  </th>
                  <th class="w-60px">
                    文件关联
                  </th>
                  <th>文件</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="peer in torrent.peerList"
                  :key="peer.ip"
                >
                  <td>{{ peer.country }}</td>
                  <td>{{ peer.ip }}:{{ peer.port }}</td>
                  <!--                  <td>{{ peer.port }}</td> -->
                  <!--                  <td>{{ peer.connection }}</td> -->
                  <!--                  <td>{{ peer.flags }}</td> -->
                  <td>{{ peer.client }}</td>
                  <td>{{ (numberFormat(peer.progress) * 100).toFixed(2) }}%</td>
                  <td>{{ renderSize(peer.dl_speed) }}/s</td>
                  <td>{{ renderSize(peer.up_speed) }}/s</td>
                  <td>{{ renderSize(peer.downloaded) }}</td>
                  <td>{{ renderSize(peer.uploaded) }}</td>
                  <td>{{ numberFormat(peer.relevance) * 100 }}%</td>
                  <td>
                    <n-ellipsis style="max-width: 120px">
                      {{ peer.files }}
                    </n-ellipsis>
                  </td>
                </tr>
              </tbody>
            </n-table>
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
</template>

<style scoped>

</style>
