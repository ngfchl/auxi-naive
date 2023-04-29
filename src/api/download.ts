import { getList } from '~/hooks/getList'

export interface DownloadSpeedType {
  name: string
  connection_status: boolean
  dl_info_data: number
  dl_info_speed: number
  up_info_data: number
  up_info_speed: number
  category: string
}

export interface Downloader {
  id: number
  name: string
  username?: string
  password?: string
  host?: string
  port?: number
  category: string
  enable?: boolean
  reserved_space?: number
}
export interface Peer {
  client: string
  connection: string
  country: string
  country_code: string
  dl_speed: number
  downloaded: number
  files: string
  flags: string
  flags_desc: string
  ip: string
  port: number
  progress: number
  relevance: number
  up_speed: number
  uploaded: number
}
export interface Tracker {
  'tier': number

  /**
   * QB
   */
  'url'?: string
  'msg'?: string
  'status'?: number
  'num_downloaded'?: number
  'num_leeches'?: number
  'num_peers'?: number
  'num_seeds'?: number
  /**
   * Tr
   */
  'id'?: number
  'scrape'?: string
  'announce'?: string
  'announceState'?: number
  'downloadCount'?: number
  'hasAnnounced'?: boolean
  'hasScraped'?: boolean
  'host'?: string
  'isBackup'?: boolean
  'lastAnnouncePeerCount'?: number
  'lastAnnounceResult'?: 'Success'
  'lastAnnounceStartTime'?: number
  'lastAnnounceSucceeded'?: boolean
  'lastAnnounceTime'?: number
  'lastAnnounceTimedOut'?: boolean
  'lastScrapeResult'?: string
  'lastScrapeStartTime'?: number
  'lastScrapeSucceeded'?: boolean
  'lastScrapeTime'?: number
  'lastScrapeTimedOut'?: boolean
  'leecherCount'?: number
  'nextAnnounceTime'?: number
  'nextScrapeTime'?: number
  'scrapeState'?: number
  'seederCount'?: number
}
export interface TransmissionFile {
  'bytesCompleted': number
  'length': number
  'name': string
}

export interface TransmissionFileState {
  'bytesCompleted': number
  'length': number
  'wanted': boolean
}
export interface Torrent {
  /**
   * 公共字段
   */
  // 名称
  name: string
  // hash ,Tr的是id
  hash: string
  // 备注
  comment?: string
  // 时间
  eta?: number
  // host
  host: string
  /**
   * Tr 字段
    */
  // 下载路径
  id?: number
  downloadDir?: string
  activityDate?: number
  addedDate?: number
  bandwidthPriority?: number
  corruptEver?: number
  creator?: string
  dateCreated?: number
  desiredAvailable?: number
  doneDate?: number
  downloadLimit?: number
  downloadLimited?: boolean
  downloadedEver?: number
  editDate?: number
  error?: number
  errorString?: string
  etaIdle?: number
  fileStats?: TransmissionFileState[]
  files?: TransmissionFile[]
  hashString?: string
  haveUnchecked?: number
  haveValid?: number
  honorsSessionLimits?: boolean
  isFinished?: boolean
  isPrivate?: boolean
  isStalled?: boolean
  labels?: string[]
  leftUntilDone?: number
  magnetLink?: string
  manualAnnounceTime?: number
  maxConnectedPeers?: number
  metadataPercentComplete?: number
  'peer-limit'?: number
  // peers?: []
  peersConnected?: number
  'peersFrom'?: {
    'fromCache': number
    'fromDht': number
    'fromIncoming': number
    'fromLpd': number
    'fromLtep': number
    'fromPex': number
    'fromTracker': number
  }
  peersGettingFromUs?: number
  peersSendingToUs?: number
  percentDone?: number
  pieceCount?: number
  pieceSize?: number
  pieces?: string
  priorities?: number[]
  queuePosition?: number
  rateDownload?: number
  rateUpload?: number
  recheckProgress?: number
  secondsDownloading?: number
  secondsSeeding?: number
  seedIdleLimit?: number
  seedIdleMode?: number
  seedRatioLimit?: number
  seedRatioMode?: number
  sizeWhenDone?: number
  startDate?: number
  status?: number
  torrentFile?: string
  totalSize?: number
  trackerStats?: Tracker[]
  uploadLimit?: number
  uploadLimited?: boolean
  uploadRatio?: number
  uploadedEver?: number
  wanted?: number[]
  webseeds?: []
  webseedsSendingToUs?: number
  /**
   * Qb字段
   */
  // 添加事件
  added_on?: number
  // 剩余要下载的大小
  amount_left?: number
  // 种子自动管理
  auto_tmm?: boolean
  // 可用片段百分比
  availability?: number
  // 分类
  category?: string
  // 已下载
  completed?: number
  // 完成于
  completion_on?: number
  // 文件路径
  content_path?: string
  // 下载限速
  dl_limit?: number
  // 下载速度
  dlspeed?: number
  // 已下载
  downloaded?: number
  // 会话下载
  downloaded_session?: number
  // 优先下载首尾区块
  f_l_piece_prio?: boolean
  // 强制
  force_start?: boolean

  // 最近活动
  last_activity?: number
  // 下载链接
  magnet_uri?: string
  // 最大分享率
  max_ratio?: number
  // 最大做种时间
  max_seeding_time?: number

  // 完成用户数
  num_complete?: number
  // 未完成用户数
  num_incomplete?: number
  // 正在下载
  num_leechs?: number
  // 做种数
  num_seeds?: number
  // 优先
  priority?: number
  // 进度
  progress?: number
  // 分享率
  ratio?: number
  // 分享率限制
  ratio_limit?: number
  // 保存路径
  save_path?: string
  // 做种时间
  seeding_time?: number
  // 做种时间限制
  seeding_time_limit?: number
  // 最后完整可见
  seen_complete?: number
  // 启用队列
  seq_dl?: boolean
  // 文件大小
  size?: number
  // 任务状态
  state?: 'uploading' | 'downloading' | 'pausedUP' | 'pausedDL' | 'checkingUP' | 'forcedDL' | 'stalledUP' | 'stalledDL' |
  'missingFiles' | 'forcedUP' | 'moving' | 'queuedDL' | 'queuedUP' | 'error' | 'unknown' | 'checkingDL' | 'checkingResumeData'
  // 超级做种
  super_seeding?: boolean
  // 标签
  tags?: string
  // 活动时间
  time_active?: number
  // 总大小
  total_size?: number
  // Tracker
  tracker?: string
  trackers?: Tracker[]
  // Tracker计数
  trackers_count?: number
  // 上传限制
  up_limit?: number
  // 已上传
  uploaded?: number
  // 会话上传
  uploaded_session?: number
  // 上传速度
  upspeed?: number
  // 连接信息
  peerList?: Peer[]
  // 添加此种子的时间
  addition_date?: number
  // 种子完成日期
  completion_date?: number
  // 创建者
  created_by?: string
  // 种子创建日期
  creation_date?: number
  // 下载速度
  dl_speed?: number
  // 平均下载速度
  dl_speed_avg?: number
  // 上次查看的完整日期
  last_seen?: number
  // 种子连接计数
  nb_connections?: number
  // 种子连接计数限制
  nb_connections_limit?: number
  // 连接到的节点
  peers?: number | Peer[]
  // 节点总数
  peers_total?: number
  // 区块大小
  piece_size?: number
  // 已下载区块数
  pieces_have?: number
  // 区块总数
  pieces_num?: number
  // 距离下次汇报时间
  reannounce?: number
  // 连接到的种子数
  seeds?: number
  // 种子总数
  seeds_total?: number
  // 分享率
  share_ratio?: number
  // 种子运行时间
  time_elapsed?: number
  // 总下载
  total_downloaded?: number
  // 本次会话下载
  total_downloaded_session?: number
  // 总上传
  total_uploaded?: number
  // 会话上传
  total_uploaded_session?: number
  // 已丢弃
  total_wasted?: number
  // 上传速度
  up_speed?: number
  // 平均上传速度
  up_speed_avg?: number
}

export interface Category {
  name: string
  savePath: string
}

export interface ServerState {
  alltime_dl: number
  alltime_ul: number
  average_time_queue: number
  connection_status: 'connected'
  dht_nodes: number
  dl_info_data: number
  dl_info_speed: number
  dl_rate_limit: number
  free_space_on_disk: number
  global_ratio: number
  queued_io_jobs: number
  queueing: boolean
  read_cache_hits: number
  read_cache_overload: number
  refresh_interval: number
  total_buffers_size: number
  total_peer_connections: number
  total_queued_size: number
  total_wasted_session: number
  up_info_data: number
  up_info_speed: number
  up_rate_limit: number
  use_alt_speed_limits: boolean
  write_cache_overload: number
}

export interface NewTorrent {
  urls?: string | string[]
  cookie?: string
  category?: string
  is_paused?: boolean
  upload_limit?: number
  download_limit?: number
  is_skip_checking?: boolean
  use_auto_torrent_management?: boolean
}

export interface Downloading {
  categories: Category[]
  server_state?: ServerState
  torrents: Torrent[]
}
const { message } = useGlobalConfig()

export const downloadSpeedUrl = 'download/downloaders/speed'
/**
 * 获取下载器实时数据
 */
export const $getDownloadSpeedList: (downloader_id: number) => Promise<any> = async (downloader_id = 0) => {
  return await getList<object, DownloadSpeedType>(downloadSpeedUrl, { downloader_id })
}

/**
 * 获取下载器列表
 */
export const $getDownloaderList: () => Promise<any> = async () => {
  return await getList<Downloader[]>('download/downloaders')
}

export const $getDownloader: (params: object) => Promise<any> = async (params: object) => {
  return await getList<object, Downloader>('download/downloader', params)
}

export const $getTorrentList: (params: object) => Promise<any> = async (params: object) => {
  return await getList<object, Downloading>('download/downloaders/downloading', params)
}

export const $getCategoryList: (downloader_id: number) => Promise<any> = async (downloader_id: number) => {
  return await getList<object, Category[]>('download/downloaders/categories', { downloader_id })
}
export const $controlTorrent: (params: object) => Promise<any> = async (params) => {
  const { msg, code } = await usePost('download/control', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

export const $addTorrent: (params: object) => Promise<any> = async (params) => {
  const { msg, code } = await usePost('download/add_torrent', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}
export const $getTorrentProp: (params: object) => Promise<any> = async (params: object) => {
  return await getList<object, Downloading>('download/downloaders/torrent/props', params)
}
export const $addDownloader = async (downloader: Downloader) => {
  const { msg, code } = await usePost('download/downloader', downloader)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

export const $editDownloader = async (downloader: Downloader) => {
  const { msg, code } = await usePut('download/downloader', downloader)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}

export const $removeDownloader = async (params: object) => {
  const { msg, code } = await useDelete('download/downloader', params)
  switch (code) {
    case 0:
      message?.success(msg)
      return true
    default:
      message?.error(msg)
      return false
  }
}
