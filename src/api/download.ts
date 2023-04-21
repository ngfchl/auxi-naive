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
  usernames?: string
  password?: string
  host: string
  port?: number
  category: string
  enable: boolean
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
export interface Torrent {
  added_on: string
  amount_left: number
  auto_tmm: boolean
  availability: number
  category: string
  completed: number
  completion_on: string
  content_path: string
  dl_limit: number
  dlspeed: number
  downloaded: number
  downloaded_session: number
  eta: number
  f_l_piece_prio: boolean
  force_start: boolean
  hash: string
  last_activity: number
  magnet_uri: string
  max_ratio: number
  max_seeding_time: number
  name: string
  num_complete: number
  num_incomplete: number
  num_leechs: number
  num_seeds: number
  priority: number
  progress: number
  ratio: number
  ratio_limit: number
  save_path: string
  seeding_time: number
  seeding_time_limit: number
  seen_complete: number
  seq_dl: boolean
  size: number
  state: 'uploading' | 'downloading' | 'pausedUP' | 'pausedDL' | 'checkingUP' | 'forcedDL' | 'stalledUP' | 'stalledDL' |
  'missingFiles' | 'forcedUP' | 'moving' | 'queuedDL' | 'queuedUP' | 'error' | 'unknown' | 'checkingDL' | 'checkingResumeData'
  super_seeding: boolean
  tags: string
  time_active: number
  total_size: number
  tracker: string
  trackers_count: number
  up_limit: number
  uploaded: number
  uploaded_session: number
  upspeed: number
  peers: Peer[]
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
export const $getDownloadSpeedList: () => Promise<any> = async () => {
  return await getList<null, DownloadSpeedType[]>(downloadSpeedUrl)
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

export const $getDownloading: (params: object) => Promise<any> = async (params: object) => {
  return await getList<object, Downloading>('download/downloaders/downloading', params)
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
