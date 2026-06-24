# 《南都爱情故事》音频生成与场景对应文档

本文档用于管理《南都爱情故事》需要生成、采集、制作和接入的全部音频资产，包括场景音乐、环境声、交互音效、语音对白、旁白、剧情短乐句，以及它们在游戏中的触发位置。

目标不是把音乐当背景填充，而是让音频参与叙事：玩家走到一个地点、靠近一封信、错过一个时间点时，音乐和声音要让玩家立刻感到“这封信在这里停住了”。

---

## 1. 总体声音方向

### 核心气质

- 慢、温柔、旧、含蓄。
- 浪漫不甜腻，悲伤不煽情。
- 时代感存在，但不压倒私人情感。
- 城市声音要像远处的风，不要像历史纪录片。

### 声音关键词

- 南都
- 旧南京
- 慢递
- 情书
- 雨巷
- 梧桐
- 邮戳
- 钟声
- 船灯
- 车站汽笛
- 旧书页
- 黄昏
- 分别

### 禁忌方向

- 不要宏大战争史诗。
- 不要现代流行歌编曲。
- 不要过度戏剧化的大鼓、史诗合唱、电影预告片式冲击。
- 不要过度使用方言，少量南京口音可以做质感，但对白必须清楚。
- 不要用完整歌词歌曲，避免抢走叙事焦点。

---

## 2. 音频类型

### BGM

场景主题音乐。可循环，负责情绪底色。

建议规格：

- 时长：60-120 秒循环。
- 格式源文件：`wav`，48kHz，24-bit。
- 游戏版本：`ogg` 或 `mp3`。
- 每个重要场景至少 1 条主循环。
- 重要剧情节点可加 1-2 条短变奏。

### Ambience

环境底声。负责地点真实感。

建议规格：

- 时长：45-90 秒循环。
- 应尽量无明显节拍点，方便循环。
- 可以分层：雨声、人声、船声、钟声、车站广播、风声。

### Stinger

短乐句。用于读信、选择、结局、时间变化。

建议规格：

- 时长：2-8 秒。
- 不循环。
- 需要和当前 BGM 调性兼容。

### SFX

交互音效。负责手感。

包括：

- 脚步
- 信封展开
- 盖邮戳
- 投入邮筒
- 敲门
- 翻书
- 船桨水声
- 火车汽笛
- 钟声

### Voice

语音对白和旁白。负责关键情绪句、NPC 个性和信件朗读。

原则：

- 不做全对白配音，优先配关键句。
- 重要 NPC 每人 3-6 条短句。
- 信件朗读只读关键句，不读整封信。
- 主角少说话，更多作为见证者。

---

## 3. 文件命名规范

```text
audio/
  bgm/
    bgm_<sceneId>_<mood>_loop_v01.ogg
    bgm_<sceneId>_<mood>_alt_v01.ogg
  ambience/
    amb_<sceneId>_<layer>_loop_v01.ogg
  sfx/
    sfx_<object>_<action>_v01.ogg
  stinger/
    stg_<sceneId>_<event>_v01.ogg
  voice/
    voice_<sceneId>_<characterId>_<lineId>_v01.ogg
```

示例：

```text
audio/bgm/bgm_mochou_road_rain_sorrow_loop_v01.ogg
audio/ambience/amb_mochou_road_light_rain_loop_v01.ogg
audio/sfx/sfx_mailbox_drop_letter_v01.ogg
audio/stinger/stg_mochou_road_letter_revealed_v01.ogg
audio/voice/voice_mochou_road_old_woman_line01_v01.ogg
```

---

## 4. 场景音频总表

| Scene ID | 场景 | 情绪功能 | 音乐方向 | 环境声 | 语音重点 |
|---|---|---|---|---|---|
| `post_office` | 邮局 | 起点、归档、时间管理 | 木质、温暖、克制 | 纸张、邮戳、柜台、远街声 | 邮局职员、旁白 |
| `mochou_road` | 莫愁路 | 主线心脏、凄美爱情 | 雨中弦乐、钢琴、二胡点缀 | 雨声、电线、脚步、远钟 | 爱情主线关键句 |
| `mochou_church` | 莫愁路堂 | 见证、誓言、迟到 | 远钟、管风琴式和声、低弦 | 钟声、回响、雨檐滴水 | 琴师/旧友 |
| `mochou_awning` | 雨檐 | 等待、犹豫、错过 | 音乐抽薄，留下雨声 | 雨打瓦、茶碗、低声交谈 | 叮嘱、等待 |
| `mochou_closed_door` | 不打开的门 | 失去、告别 | 几乎无旋律，低频与雨 | 门环、空屋、远车声 | 最终告别句 |
| `qinhuai_boat` | 秦淮河画舫 | 夜灯、重逢、迟到 | 琵琶/二胡、波光感 | 水声、船桨、灯船人声 | 船娘、琴手 |
| `yihe_villas` | 颐和路民国别墅 | 体面、沉默、旧爱 | 钢琴、低弦、留白 | 皮鞋、门铃、树叶 | 主编/旧爱 |
| `pukou_station` | 浦口火车站 | 离别、远行、时代暗流 | 汽笛、低弦、缓慢鼓点 | 火车、人群、广播、箱包 | 站务员、离别者 |
| `laomendong_jiangyouji` | 老门东蒋有记老店 | 烟火气、缓冲、温暖 | 轻木琴、拨弦、柔和 | 锅气、人声、碗筷 | 老店伙计 |
| `nanyi_book_market` | 南艺后街旧书市 | 年轻、批注、暗恋 | 木吉他/钢片琴、轻快 | 翻书、摊贩、学生 | 旧书摊主、学生 |
| `chaotian_palace` | 朝天宫 | 旧物作证、历史余韵 | 古琴式点音、低鼓极少 | 风、石阶、远鸟、殿檐 | 文物管理员 |
| `mochou_lake` | 莫愁湖公园 | “莫愁”的反讽与安放 | 湖面、长笛、柔弦 | 湖水、风、远处游人 | 老人/旁白 |
| `moling_road` | 秣陵路 | 暗线街巷、秘密 | 低音、窄巷回声 | 巷风、脚步、门缝声 | 神秘寄信人 |
| `school` | 学校 | 青春、暗恋、毕业 | 清亮、单纯、轻微遗憾 | 课铃、操场、纸页 | 学生 |
| `archive_final` | 邮局档案柜/结尾 | 回望、归档、主角自己的信 | 主旋律回归，极简 | 抽屉、纸张、钟摆 | 旁白/主角内心 |

---

## 5. 场景详细生成清单

### 5.1 邮局 `post_office`

用途：游戏中心。接信、盖戳、回收未送达信件、查看档案。

音乐：

- `bgm_post_office_warm_loop_v01`
- 情绪：温暖、木质、清晨、可信赖。
- 乐器：低音提琴弱奏、木琴、柔和钢琴、极轻手风琴。
- 生成提示词方向：
  - “old Nanjing post office, warm wooden room, slow mail, gentle piano, soft strings, nostalgic but not sad, loopable, no vocals”

环境声：

- `amb_post_office_counter_loop_v01`：纸张、柜台、抽屉、邮票。
- `amb_post_office_morning_street_loop_v01`：门外早点摊和远处人声。

SFX：

- `sfx_stamp_press_v01`：盖邮戳。
- `sfx_letter_pickup_v01`：拿起信封。
- `sfx_archive_drawer_open_v01`：打开档案抽屉。

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_post_office_clerk_line01_v01` | 邮局职员 | 今天的信不多，但每一封都急不得。 |
| `voice_post_office_clerk_line02_v01` | 邮局职员 | 地址要看清，时间也要看清。错过一刻，有时就是错过一生。 |
| `voice_post_office_narrator_line01_v01` | 旁白 | 邮局的钟走得很慢，像在等谁把话说完。 |

---

### 5.2 莫愁路 `mochou_road`

用途：主线心脏。凄美爱情故事的核心街段。

音乐：

- `bgm_mochou_road_rain_sorrow_loop_v01`
- `bgm_mochou_road_memory_alt_v01`
- 情绪：雨中、克制、想说又不敢说。
- 乐器：弱音弦乐、钢琴单音、二胡或箫做短句，不要满编。
- 生成提示词方向：
  - “rainy old Nanjing street, tragic romantic love letter, slow piano, muted strings, sparse erhu motif, intimate, restrained, loopable, no vocals”

环境声：

- `amb_mochou_road_light_rain_loop_v01`
- `amb_mochou_road_wires_and_far_bell_loop_v01`
- `amb_mochou_road_wet_footsteps_loop_v01`

SFX：

- `sfx_mochou_road_sign_rain_drip_v01`
- `sfx_mochou_road_wet_letter_touch_v01`
- `sfx_mochou_road_umbrella_open_v01`

Stinger：

- `stg_mochou_road_first_seen_v01`：玩家第一次看见“莫愁路”路牌。
- `stg_mochou_road_letter_revealed_v01`：信件关键句显现。

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_mochou_road_narrator_line01_v01` | 旁白 | 南京有一条路，名字听起来像安慰。 |
| `voice_mochou_road_sender_line01_v01` | 寄信人 | 等雨小一点，我们沿着这条路走一走吧。 |
| `voice_mochou_road_sender_line02_v01` | 寄信人 | 我还有几句话，想慢慢叮嘱你。 |
| `voice_mochou_road_receiver_line01_v01` | 收信人 | 原来有些告别，不是说出口才算数。 |

版权提醒：不要直接使用来自其他小说的原句。可以保留“莫愁”意象，但公开版本应使用原创改写。

---

### 5.3 莫愁路堂 `mochou_church`

用途：誓言、钟声、迟到的见证。

音乐：

- `bgm_mochou_church_bell_memory_loop_v01`
- 情绪：庄重、空旷、不是宗教宏大，而是私人誓言。
- 乐器：远钟、柔和管风琴质感、低弦、少量合唱垫音但不要歌词。
- 生成提示词方向：
  - “small old church on rainy Nanjing street, distant bell, private vow, soft organ pad, low strings, restrained sorrow, loopable, no choir lyrics”

环境声：

- `amb_mochou_church_bell_far_loop_v01`
- `amb_mochou_church_rain_under_eaves_loop_v01`
- `amb_mochou_church_empty_room_tail_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_mochou_church_musician_line01_v01` | 琴师 | 钟声响过以后，街上会安静一小会儿。 |
| `voice_mochou_church_musician_line02_v01` | 琴师 | 有些人来这里不是祈祷，是把一句话放下。 |
| `voice_mochou_church_narrator_line01_v01` | 旁白 | 钟声没有替谁回答，只是把迟到的心事照亮。 |

---

### 5.4 雨檐 `mochou_awning`

用途：等待、犹豫、时间代价。

音乐：

- `bgm_mochou_awning_waiting_loop_v01`
- 情绪：音乐变薄，几乎只剩雨声和几个琴音。
- 生成提示词方向：
  - “waiting under a rainy eave, sparse piano notes, soft rain, hesitation, old street tea shop, intimate, minimal, loopable”

环境声：

- `amb_awning_heavy_drips_loop_v01`
- `amb_awning_tea_cup_small_room_loop_v01`

SFX：

- `sfx_awning_teacup_place_v01`
- `sfx_awning_rain_drop_close_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_awning_old_woman_line01_v01` | 老妇人 | 雨小了再走吧。急着送到的，未必就是好消息。 |
| `voice_awning_old_woman_line02_v01` | 老妇人 | 你手里的信，像是怕冷。 |

---

### 5.5 不打开的门 `mochou_closed_door`

用途：莫愁路小结局。送达不等于见到人。

音乐：

- `bgm_closed_door_empty_room_loop_v01`
- 情绪：低频、留白、雨声占主导。
- 生成提示词方向：
  - “closed old wooden door, no answer, rain, unresolved farewell, very sparse low strings, silence, intimate sadness, no melody overload”

环境声：

- `amb_closed_door_empty_house_loop_v01`
- `amb_closed_door_far_train_low_v01`

SFX：

- `sfx_closed_door_knock_v01`
- `sfx_closed_door_letter_slide_v01`
- `sfx_closed_door_doorknob_small_v01`

Stinger：

- `stg_closed_door_no_answer_v01`
- `stg_closed_door_letter_left_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_closed_door_narrator_line01_v01` | 旁白 | 门里没有回音，信却像终于到了。 |
| `voice_closed_door_sender_line01_v01` | 寄信人 | 往后的日子若难，也请你少替我担心一点。 |
| `voice_closed_door_postman_line01_v01` | 主角低语 | 我把它放在这里了。 |

---

### 5.6 秦淮河画舫 `qinhuai_boat`

用途：夜灯、水声、迟到重逢。

音乐：

- `bgm_qinhuai_boat_lantern_loop_v01`
- `bgm_qinhuai_boat_late_reunion_alt_v01`
- 情绪：水面温柔，有一点热闹，但核心是错过后的重逢。
- 乐器：琵琶、二胡、轻弦、木质打击、柔和水波合成垫。
- 生成提示词方向：
  - “Qinhuai river lantern boat at night, gentle pipa and erhu, warm lights on water, romantic but restrained, old Nanjing, loopable, no vocals”

环境声：

- `amb_qinhuai_boat_water_loop_v01`
- `amb_qinhuai_boat_lantern_crowd_far_loop_v01`
- `amb_qinhuai_boat_oar_loop_v01`

SFX：

- `sfx_boat_step_wood_v01`
- `sfx_boat_lantern_sway_v01`
- `sfx_boat_letter_unfold_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_qinhuai_boat_boatwoman_line01_v01` | 船娘 | 河上的灯一亮，很多人就不舍得走了。 |
| `voice_qinhuai_boat_musician_line01_v01` | 琴手 | 这封信若早一天来，我就不会在这里等到夜深。 |
| `voice_qinhuai_boat_narrator_line01_v01` | 旁白 | 水把灯影揉碎，也把一句迟来的话慢慢送远。 |

---

### 5.7 颐和路民国别墅 `yihe_villas`

用途：体面、沉默、旧爱。

音乐：

- `bgm_yihe_villas_old_love_loop_v01`
- 情绪：克制、漂亮、冷一点。
- 乐器：钢琴、低弦、黑胶质感、非常轻的室内混响。
- 生成提示词方向：
  - “Republican-era villa street, old love and restraint, elegant piano, low strings, quiet afternoon, polished but distant, loopable”

环境声：

- `amb_yihe_villas_plane_tree_wind_loop_v01`
- `amb_yihe_villas_distant_carriage_loop_v01`
- `amb_yihe_villas_inside_clock_loop_v01`

SFX：

- `sfx_villa_doorbell_v01`
- `sfx_villa_leather_shoes_v01`
- `sfx_villa_curtain_move_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_yihe_villas_butler_line01_v01` | 门房 | 主人今日不见客，但信可以留下。 |
| `voice_yihe_villas_old_love_line01_v01` | 收信人 | 他还是把字写得那么稳。 |
| `voice_yihe_villas_narrator_line01_v01` | 旁白 | 体面的人最会沉默，也最怕信纸太轻。 |

---

### 5.8 浦口火车站 `pukou_station`

用途：离别、远行、时代暗流。

音乐：

- `bgm_pukou_station_departure_loop_v01`
- `bgm_pukou_station_last_train_alt_v01`
- 情绪：宽阔、离别、人群中孤独。
- 乐器：低弦、远号、轻微军鼓质感但不可战争化。
- 生成提示词方向：
  - “old Pukou railway station, farewell, distant steam train, low strings, lonely crowd, restrained historical tension, loopable, no epic percussion”

环境声：

- `amb_pukou_station_steam_loop_v01`
- `amb_pukou_station_crowd_far_loop_v01`
- `amb_pukou_station_announcement_muffled_loop_v01`
- `amb_pukou_station_luggage_loop_v01`

SFX：

- `sfx_train_whistle_far_v01`
- `sfx_station_ticket_punch_v01`
- `sfx_station_luggage_set_down_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_pukou_station_clerk_line01_v01` | 站务员 | 下一班车不等人，信也未必等得起。 |
| `voice_pukou_station_departing_line01_v01` | 离别者 | 若他来了，别说我哭过。 |
| `voice_pukou_station_narrator_line01_v01` | 旁白 | 汽笛把人带走，月台把没说完的话留下。 |

---

### 5.9 老门东蒋有记老店 `laomendong_jiangyouji`

用途：烟火气、剧情缓冲、城市温度。

音乐：

- `bgm_laomendong_warm_shop_loop_v01`
- 情绪：温暖、稍微轻松，让玩家喘口气。
- 乐器：轻拨弦、木琴、小鼓刷、柔和低音。
- 生成提示词方向：
  - “old Nanjing local food shop, warm street life, gentle plucked strings, light wooden percussion, nostalgic and cozy, loopable”

环境声：

- `amb_laomendong_kitchen_loop_v01`
- `amb_laomendong_customers_far_loop_v01`
- `amb_laomendong_old_street_loop_v01`

SFX：

- `sfx_shop_bowl_place_v01`
- `sfx_shop_steam_lid_v01`
- `sfx_shop_coin_counter_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_laomendong_shopkeeper_line01_v01` | 店主 | 先吃点热的。送信的人，也不能只顾着别人。 |
| `voice_laomendong_shopkeeper_line02_v01` | 店主 | 这城里每天都有人分别，也每天都有人回头。 |

---

### 5.10 南艺后街旧书市 `nanyi_book_market`

用途：青春、旧书批注、暗恋支线。

音乐：

- `bgm_nanyi_book_market_youth_loop_v01`
- 情绪：清亮、年轻、带一点笨拙。
- 乐器：木吉他、钢片琴、轻钢琴、少量环境噪声。
- 生成提示词方向：
  - “old book market behind art school, young secret crush, light guitar, celesta, soft piano, sunny afternoon, wistful, loopable”

环境声：

- `amb_book_market_pages_loop_v01`
- `amb_book_market_students_loop_v01`
- `amb_book_market_bicycle_bell_loop_v01`

SFX：

- `sfx_book_page_turn_v01`
- `sfx_book_pencil_note_v01`
- `sfx_book_stack_move_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_book_market_student_line01_v01` | 学生 | 我把话写在书页边上，他会不会看见？ |
| `voice_book_market_bookseller_line01_v01` | 摊主 | 旧书不怕旧，怕的是没人再翻到那一页。 |
| `voice_book_market_narrator_line01_v01` | 旁白 | 有些情书没有信封，只藏在铅笔批注里。 |

---

### 5.11 朝天宫 `chaotian_palace`

用途：旧物作证、历史余韵。

音乐：

- `bgm_chaotian_palace_witness_loop_v01`
- 情绪：古老、稳、像石阶上的风。
- 乐器：古琴式点音、低弦、非常轻的鼓，不要古装剧味。
- 生成提示词方向：
  - “old palace museum in Nanjing, red walls and stone steps, historical memory, guqin-like plucked notes, low strings, solemn but intimate, loopable”

环境声：

- `amb_chaotian_palace_stone_wind_loop_v01`
- `amb_chaotian_palace_birds_far_loop_v01`
- `amb_chaotian_palace_roof_chime_loop_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_chaotian_palace_keeper_line01_v01` | 管理员 | 旧物不会开口，但它们记得手心的温度。 |
| `voice_chaotian_palace_narrator_line01_v01` | 旁白 | 这座城看过太多离合，所以它从不催人回答。 |

---

### 5.12 莫愁湖公园 `mochou_lake`

用途：“莫愁”的反讽与安放。

音乐：

- `bgm_mochou_lake_release_loop_v01`
- 情绪：比莫愁路开阔，悲伤被湖水慢慢放下。
- 乐器：长笛、柔弦、钢琴、水面颗粒音。
- 生成提示词方向：
  - “Mochou Lake park, quiet lake, sorrow slowly released, flute, soft strings, gentle piano, reflective, loopable”

环境声：

- `amb_mochou_lake_water_wind_loop_v01`
- `amb_mochou_lake_evening_people_far_loop_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_mochou_lake_old_man_line01_v01` | 老人 | 人说莫愁，其实只是把愁放到水面上。 |
| `voice_mochou_lake_narrator_line01_v01` | 旁白 | 湖风把名字念得很轻，像怕惊动谁。 |

---

### 5.13 秣陵路 `moling_road`

用途：暗线街巷、秘密寄信人。

音乐：

- `bgm_moling_road_secret_loop_v01`
- 情绪：窄、暗、低声，不恐怖但有秘密。
- 乐器：低音拨弦、轻微不协和钢琴、巷道混响。
- 生成提示词方向：
  - “narrow old Nanjing alley, secret letter, low plucked strings, sparse dissonant piano, quiet suspense, not horror, loopable”

环境声：

- `amb_moling_road_alley_wind_loop_v01`
- `amb_moling_road_door_gap_loop_v01`
- `amb_moling_road_footsteps_close_loop_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_moling_road_stranger_line01_v01` | 神秘寄信人 | 别问是谁寄的。你只要把它送到雨停以前。 |
| `voice_moling_road_narrator_line01_v01` | 旁白 | 巷子越窄，声音越像贴着墙走。 |

---

### 5.14 学校 `school`

用途：少年、暗恋、毕业。

音乐：

- `bgm_school_first_love_loop_v01`
- 情绪：清晨、课铃、笨拙表达。
- 乐器：钢片琴、钢琴、轻木琴、柔和弦乐。
- 生成提示词方向：
  - “old school morning, first love letter, gentle celesta, light piano, innocent and wistful, loopable”

环境声：

- `amb_school_bell_yard_loop_v01`
- `amb_school_paper_classroom_loop_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_school_student_line01_v01` | 学生 | 我没有写名字。可他要是认得我的字呢？ |
| `voice_school_student_line02_v01` | 学生 | 毕业以后，信还能追上人吗？ |

---

### 5.15 邮局档案柜/结尾 `archive_final`

用途：回望所有信件，主角自己的信。

音乐：

- `bgm_archive_final_main_theme_return_v01`
- 情绪：主旋律回归，但更慢、更轻。
- 乐器：钢琴、弱音弦、极轻木管。
- 生成提示词方向：
  - “final archive room, all letters remembered, main theme reprise, slow piano, soft muted strings, intimate closure, no vocals”

环境声：

- `amb_archive_drawer_room_loop_v01`
- `amb_archive_clock_close_loop_v01`

Stinger：

- `stg_archive_own_letter_found_v01`
- `stg_archive_end_stamp_v01`

语音：

| 文件名 | 角色 | 内容 |
|---|---|---|
| `voice_archive_narrator_line01_v01` | 旁白 | 他送了一整天别人的信，最后才看见写给自己的那一封。 |
| `voice_archive_postman_line01_v01` | 主角 | 原来我也在等一个人把话送到。 |

---

## 6. 语音角色表

| Character ID | 角色 | 声线方向 | 使用场景 |
|---|---|---|---|
| `narrator` | 旁白 | 温柔、低声、克制，普通话清晰，可带一点江南气质 | 全局关键句 |
| `postman` | 主角 | 年轻、安静、少说话，不要热血 | 结尾、少量互动 |
| `clerk` | 邮局职员 | 稳、可信、略年长 | 邮局 |
| `sender` | 莫愁路寄信人 | 柔和、压住情绪 | 莫愁路主线 |
| `receiver` | 莫愁路收信人 | 成熟、克制、略哽咽但不要哭腔 | 莫愁路主线 |
| `old_woman` | 雨檐老妇人 | 慢、暖、看透但不说破 | 雨檐 |
| `musician` | 琴师 | 有艺术气质，声音干净 | 莫愁路堂、秦淮河 |
| `boatwoman` | 船娘 | 亲切、夜色里的烟火感 | 秦淮河 |
| `station_clerk` | 站务员 | 短促、职业化、带远行压力 | 浦口站 |
| `student` | 学生 | 年轻、笨拙、真诚 | 学校、旧书市 |
| `bookseller` | 旧书摊主 | 松弛、幽默但不油滑 | 旧书市 |
| `shopkeeper` | 老店店主 | 热乎、有人情味 | 老门东 |
| `keeper` | 朝天宫管理员 | 稳、低、像讲旧物 | 朝天宫 |
| `stranger` | 神秘寄信人 | 低声、急、但不悬疑片化 | 秣陵路 |

---

## 7. 场景触发规则

### 基础触发

| 触发条件 | 音频行为 |
|---|---|
| 进入新场景 | 当前 BGM 2 秒淡出，新场景 BGM 3 秒淡入 |
| 靠近地标 | 加入对应环境层或短乐句 |
| 打开信件 | 播放信纸 SFX + 对应 stinger |
| 读到关键句 | 降低 BGM 音量，播放 voice 或短乐句 |
| 选择结果确认 | 播放低强度 stinger |
| 任务完成 | 播放结尾短乐句，不要过度胜利感 |
| 时间变化 | 环境声和音乐层改变 |
| 下雨 | 雨声层淡入，部分 BGM 进入雨天版本 |

### 音量层级建议

```text
BGM:       -18 LUFS 左右，剧情时可压低
Ambience:  -24 LUFS 左右，持续存在
Voice:     清楚优先，播放时自动压低 BGM 4-8 dB
SFX:       短促清晰，不刺耳
Stinger:   情绪提示，不抢对白
```

---

## 8. 首个 Demo 必做音频

首个 Demo 不需要把所有场景声音做完。优先做莫愁路垂直切片。

### 必做

```text
bgm_post_office_warm_loop_v01
amb_post_office_counter_loop_v01
sfx_stamp_press_v01
sfx_letter_pickup_v01

bgm_mochou_road_rain_sorrow_loop_v01
amb_mochou_road_light_rain_loop_v01
amb_mochou_road_wires_and_far_bell_loop_v01
sfx_mochou_road_wet_letter_touch_v01
stg_mochou_road_first_seen_v01
stg_mochou_road_letter_revealed_v01

bgm_mochou_church_bell_memory_loop_v01
amb_mochou_church_bell_far_loop_v01

bgm_closed_door_empty_room_loop_v01
sfx_closed_door_knock_v01
sfx_closed_door_letter_slide_v01
stg_closed_door_no_answer_v01

voice_mochou_road_narrator_line01_v01
voice_mochou_road_sender_line01_v01
voice_mochou_road_sender_line02_v01
voice_closed_door_narrator_line01_v01
```

### 第二优先级

```text
bgm_qinhuai_boat_lantern_loop_v01
amb_qinhuai_boat_water_loop_v01
bgm_pukou_station_departure_loop_v01
amb_pukou_station_steam_loop_v01
bgm_yihe_villas_old_love_loop_v01
```

---

## 9. 生成提示词通用模板

### 音乐模板

```text
Create a loopable instrumental track for a narrative exploration game set in old Nanjing.
Scene: <scene name>.
Emotion: <emotion>.
Instruments: <instruments>.
Tempo: slow, restrained.
Style: intimate, nostalgic, cinematic but not epic.
Avoid: vocals, modern pop drums, trailer percussion, heroic orchestra, horror sound design.
Length: 60-90 seconds, seamless loop.
```

### 环境声模板

```text
Create a seamless ambient loop for <scene name> in old Nanjing.
Include: <specific sounds>.
Mood: subtle, immersive, not busy.
Perspective: close to the player, with distant city texture.
Avoid: modern traffic, modern phones, loud crowds, obvious loop points.
Length: 45-90 seconds.
```

### 语音模板

```text
Voice line for a Chinese narrative game set in old Nanjing.
Character: <character>.
Age and tone: <age/tone>.
Performance: restrained, intimate, emotional but not theatrical.
Language: Mandarin Chinese, clear pronunciation, slight regional softness optional.
Line: <line>.
Avoid: exaggerated drama, stage performance, heavy dialect, crying.
```

---

## 10. 接入命名建议

游戏代码中可以统一用音频事件 ID，而不是直接写文件路径。

示例：

```ts
type AudioEvent =
  | 'scene.enter.post_office'
  | 'scene.enter.mochou_road'
  | 'scene.enter.qinhuai_boat'
  | 'landmark.near.mochou_church'
  | 'letter.open'
  | 'letter.reveal.mochou_main'
  | 'choice.confirm'
  | 'ending.closed_door';
```

音频映射示例：

```ts
{
  'scene.enter.mochou_road': {
    bgm: 'bgm_mochou_road_rain_sorrow_loop_v01',
    ambience: [
      'amb_mochou_road_light_rain_loop_v01',
      'amb_mochou_road_wires_and_far_bell_loop_v01'
    ]
  }
}
```

---

## 11. 质量检查清单

每条音频进入项目之前检查：

- 是否符合场景情绪。
- 是否能循环且无明显断点。
- 是否没有现代感过强的元素。
- 是否和其他场景共享统一音色。
- 是否对白清晰，且不表演过度。
- 是否不会盖住关键 UI 或玩家操作音。
- 是否有源文件和游戏压缩文件两个版本。
- 是否记录了生成提示词、版本号和使用场景。
- 是否有版权和授权记录。

---

## 12. 版权与来源记录

每条音频都要记录：

```text
Asset ID:
Type:
Scene:
Generated by:
Prompt:
Date:
License / usage rights:
Source file:
Game file:
Notes:
```

不要使用来源不明的音乐采样、影视配乐、商业游戏音效、未授权人声模型。AI 生成音频也要保存提示词和服务授权说明。

---

## 13. 当前结论

音频系统应和场景设计同步推进，不要等地图做完才补声音。

首个高质量目标是：莫愁路小场景从邮局出发，到莫愁路路牌、莫愁路堂、雨檐、不打开的门，形成一条完整声音弧线：

```text
邮局温暖 -> 雨街凄婉 -> 钟声见证 -> 雨檐等待 -> 空门告别
```

只要这条声音弧线成立，玩家会相信整个《南京慢递》的气质成立。
