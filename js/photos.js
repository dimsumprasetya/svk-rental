/* Foto alat.
   items: { <id item>: { file, product:true, brand, credit, url } } -> foto produk resmi per model (situs pabrikan)
   types: { <jenis>: { file, title, credit, url } }                  -> foto stok per jenis (field "art" di data.js),
                                                                       dipakai item yang belum punya foto produk
   Item tanpa foto sama sekali menampilkan placeholder. Foto stok berasal dari Wikimedia Commons / Openverse
   (lisensi terbuka); foto produk milik masing-masing pabrikan. Kredit tampil di footer website. */
window.SVK_PHOTOS = {
 "types": {
  "camcorder": {
   "file": "img/camcorder.jpg",
   "title": "Ikegami Professional Camcorder.",
   "credit": "MIKI Yoshihito. (#mikiyoshihito) · BY 2.0",
   "url": "https://www.flickr.com/photos/7940758@N07/53887628972"
  },
  "lens": {
   "file": "img/lens.jpg",
   "title": "Fujifilm Fujinon DigiPower 99 Lens.jpg",
   "credit": "TaurusEmerald · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:Fujifilm_Fujinon_DigiPower_99_Lens.jpg"
  },
  "drone": {
   "file": "img/drone.jpg",
   "title": "¡Phantom 3 Advanced en subasta! Entra ya a www.compudemano.com/subast…",
   "credit": "Compudemano · BY 2.0",
   "url": "https://www.flickr.com/photos/44797427@N08/27845033205"
  },
  "actioncam": {
   "file": "img/actioncam.jpg",
   "title": "GoPro Camera",
   "credit": "Tidak diketahui · CC0 1.0",
   "url": "https://www.rawpixel.com/image/5969104/gopro-camera"
  },
  "multicam": {
   "file": "img/multicam.jpg",
   "title": "Sony television camera with DIGI SUPER 86II xs 20120211a.jpg",
   "credit": "ArildV · CC BY-SA 3.0",
   "url": "https://commons.wikimedia.org/wiki/File:Sony_television_camera_with_DIGI_SUPER_86II_xs_20120211a.jpg"
  },
  "switcher": {
   "file": "img/switcher.jpg",
   "title": "Vision mixer (22114832045).jpg",
   "credit": "Alex Liivet from Chester, United Kingdom · CC0",
   "url": "https://commons.wikimedia.org/wiki/File:Vision_mixer_(22114832045).jpg"
  },
  "rackbox": {
   "file": "img/rackbox.jpg",
   "title": "Production studio rack (4039601190).jpg",
   "credit": "Atomic Taco from Seattle, WA, USA · CC BY-SA 2.0",
   "url": "https://commons.wikimedia.org/wiki/File:Production_studio_rack_(4039601190).jpg"
  },
  "box": {
   "file": "img/box.jpg",
   "title": "HDMI to SDI Converter.jpg",
   "credit": "Mauerquadrant · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:HDMI_to_SDI_Converter.jpg"
  },
  "headset": {
   "file": "img/headset.jpg",
   "title": "Hollyland Soildcom remote headset.jpg",
   "credit": "北藝大通識課小組 · CC BY 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:Hollyland_Soildcom_remote_headset.jpg"
  },
  "radio": {
   "file": "img/radio.jpg",
   "title": "Retevis RT87 handheld radios.jpg",
   "credit": "FederalElection · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:Retevis_RT87_handheld_radios.jpg"
  },
  "wirelesstx": {
   "file": "img/wirelesstx.jpg",
   "title": "Wireless Transmitter Receiver by Gibson Torreon.JPG",
   "credit": "Gibson Torreon C · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:Wireless_Transmitter_Receiver_by_Gibson_Torreon.JPG"
  },
  "lavmic": {
   "file": "img/lavmic.jpg",
   "title": "Sennheiser SK 5212C & MKE 1.jpg",
   "credit": "CLI · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:Sennheiser_SK_5212C_%26_MKE_1.jpg"
  },
  "micro": {
   "file": "img/micro.jpg",
   "title": "Multible microphones",
   "credit": "Henry Söderlund · BY 2.0",
   "url": "https://www.flickr.com/photos/46563758@N04/51696735175"
  },
  "speaker": {
   "file": "img/speaker.jpg",
   "title": "Mackie SR loudspeakers.jpg",
   "credit": "matthew venn · CC BY-SA 2.0",
   "url": "https://commons.wikimedia.org/wiki/File:Mackie_SR_loudspeakers.jpg"
  },
  "soundsys": {
   "file": "img/soundsys.jpg",
   "title": "Line array speakers.jpg",
   "credit": "Epolk · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:Line_array_speakers.jpg"
  },
  "mixer": {
   "file": "img/mixer.jpg",
   "title": "Sound Mixer",
   "credit": "Freestocks.org · CC0 1.0",
   "url": "https://stocksnap.io/photo/sound-mixer-ANWY0F4BTN"
  },
  "recorder": {
   "file": "img/recorder.jpg",
   "title": "LA2 Zoom H4n top.jpg",
   "credit": "LA2 · CC BY-SA 3.0",
   "url": "https://commons.wikimedia.org/wiki/File:LA2_Zoom_H4n_top.jpg"
  },
  "guitar": {
   "file": "img/guitar.jpg",
   "title": "Beautiful Old Electric Guitar",
   "credit": "dejankrsmanovic · BY 2.0",
   "url": "https://www.flickr.com/photos/155403590@N07/51911796955"
  },
  "amp": {
   "file": "img/amp.jpg",
   "title": "Guitar amplifier – Fender Deluxe Reverb",
   "credit": "Michael Burridge · CC0 1.0",
   "url": "https://wordpress.org/photos/photo/88961ee7fb/"
  },
  "drums": {
   "file": "img/drums.jpg",
   "title": "A well-arranged drum kit sits in a rehearsal studio, featuring variou…",
   "credit": "nenad53 · BY 2.0",
   "url": "https://www.flickr.com/photos/202780880@N02/54525968198"
  },
  "cable": {
   "file": "img/cable.jpg",
   "title": "Jack mono jack stereo xlr male and female.JPG",
   "credit": "Trude Bergheim Mikkelsen · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:Jack_mono_jack_stereo_xlr_male_and_female.JPG"
  },
  "lightkit": {
   "file": "img/lightkit.jpg",
   "title": "PhotoSEL LS21E52 Softbox Studio Lighting Kit (2).jpg",
   "credit": "Katie Chan · CC BY-SA 3.0",
   "url": "https://commons.wikimedia.org/wiki/File:PhotoSEL_LS21E52_Softbox_Studio_Lighting_Kit_(2).jpg"
  },
  "spot": {
   "file": "img/spot.jpg",
   "title": "Fresnel2.JPG",
   "credit": "User:KeepOnTruckin · CC BY 2.5",
   "url": "https://commons.wikimedia.org/wiki/File:Fresnel2.JPG"
  },
  "softbox": {
   "file": "img/softbox.jpg",
   "title": "Photo Studio - Credit to https://www.semtrio.com/",
   "credit": "Semtrio · BY 2.0",
   "url": "https://www.flickr.com/photos/163837264@N07/43870922254"
  },
  "movinghead": {
   "file": "img/movinghead.jpg",
   "title": "MovingYoke.JPG",
   "credit": "Scoreed · CC BY 2.5",
   "url": "https://commons.wikimedia.org/wiki/File:MovingYoke.JPG"
  },
  "tube": {
   "file": "img/tube.jpg",
   "title": "YONGNUO LED video light.jpg",
   "credit": "Luca Doncic · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:YONGNUO_LED_video_light.jpg"
  },
  "truss": {
   "file": "img/truss.jpg",
   "title": "Lighting truss 1.JPG",
   "credit": "KeepOnTruckin · CC BY 2.5",
   "url": "https://commons.wikimedia.org/wiki/File:Lighting_truss_1.JPG"
  },
  "ladder": {
   "file": "img/ladder.jpg",
   "title": "Ladder aluminum.jpg",
   "credit": "Amin · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:Ladder_aluminum.jpg"
  },
  "backdrop": {
   "file": "img/backdrop.jpg",
   "title": "Green screen studio (25113564876).jpg",
   "credit": "Colin and Sarah Northway from Wherever, We find ourselves · CC BY 2.0",
   "url": "https://commons.wikimedia.org/wiki/File:Green_screen_studio_(25113564876).jpg"
  },
  "dolly": {
   "file": "img/dolly.jpg",
   "title": "Fisher dolly on track wide.JPG",
   "credit": "Eliot Lash · CC BY 2.5",
   "url": "https://commons.wikimedia.org/wiki/File:Fisher_dolly_on_track_wide.JPG"
  },
  "gimbal": {
   "file": "img/gimbal.jpg",
   "title": "DJI Ronin RSC2 Pro 1.jpg",
   "credit": "-stk · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:DJI_Ronin_RSC2_Pro_1.jpg"
  },
  "tripod": {
   "file": "img/tripod.jpg",
   "title": "123 365 Manfrotto 190XB + 804RC2 (5685134538).jpg",
   "credit": "Andrés Nieto Porras from Palma de Mallorca, España · CC BY-SA 2.0",
   "url": "https://commons.wikimedia.org/wiki/File:123_365_Manfrotto_190XB_%2B_804RC2_(5685134538).jpg"
  },
  "tv": {
   "file": "img/tv.jpg",
   "title": "Panasonic TH-43DS630W 20160419.jpg",
   "credit": "Kenming Wang · CC BY-SA 2.0",
   "url": "https://commons.wikimedia.org/wiki/File:Panasonic_TH-43DS630W_20160419.jpg"
  },
  "ledwall": {
   "file": "img/ledwall.jpg",
   "title": "T-Mobile HQ Video Screen.jpg",
   "credit": "H005 · PUBLIC DOMAIN",
   "url": "https://commons.wikimedia.org/wiki/File:T-Mobile_HQ_Video_Screen.jpg"
  },
  "projector": {
   "file": "img/projector.jpg",
   "title": "Video projector",
   "credit": "Tidak diketahui · CC0 1.0",
   "url": "https://www.rawpixel.com/image/5921858/video-projector-free-public-domain-cc0-image"
  },
  "teleprompter": {
   "file": "img/teleprompter.jpg",
   "title": "Studio Teleprompter.jpg",
   "credit": "Enchantmentvideo · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:Studio_Teleprompter.jpg"
  },
  "laptop": {
   "file": "img/laptop.jpg",
   "title": "Laptop Computer",
   "credit": "Marc Chouinard · CC0 1.0",
   "url": "https://stocksnap.io/photo/laptop-computer-54B2TTIV9T"
  },
  "card": {
   "file": "img/card.jpg",
   "title": "Memory Card",
   "credit": "Tidak diketahui · CC0 1.0",
   "url": "https://www.rawpixel.com/image/5967864/memory-card"
  },
  "genset": {
   "file": "img/genset.jpg",
   "title": "Portable electrical generator side.jpg",
   "credit": "Tidak diketahui · CC BY-SA 3.0",
   "url": "https://commons.wikimedia.org/wiki/File:Portable_electrical_generator_side.jpg"
  },
  "car": {
   "file": "img/car.jpg",
   "title": "2017 Toyota HiAce (TRH201R) LWB van (2018-10-01) 01.jpg",
   "credit": "EurovisionNim · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:2017_Toyota_HiAce_(TRH201R)_LWB_van_(2018-10-01)_01.jpg"
  },
  "ac": {
   "file": "img/ac.jpg",
   "title": "Condizionatore verticale poggiato a pavimento Mitsubishi Electric 1.j…",
   "credit": "Air fans · CC BY-SA 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:Condizionatore_verticale_poggiato_a_pavimento_Mitsubishi_Electric_1.jpg"
  },
  "tent": {
   "file": "img/tent.jpg",
   "title": "White Center Jubilee Days - tent 02A.jpg",
   "credit": "Joe Mabel · CC BY-SA 3.0",
   "url": "https://commons.wikimedia.org/wiki/File:White_Center_Jubilee_Days_-_tent_02A.jpg"
  },
  "chair": {
   "file": "img/chair.jpg",
   "title": "Mogens Koch for Carl Hansen & Søn.jpg",
   "credit": "Stiftelsen Kunstindustrimuseet, The Design Collections · CC BY 4.0",
   "url": "https://commons.wikimedia.org/wiki/File:Mogens_Koch_for_Carl_Hansen_%26_S%C3%B8n.jpg"
  },
  "case": {
   "file": "img/case.jpg",
   "title": "Road-case-removable-lid-vol-case.jpg",
   "credit": "VCCmatt · CC0",
   "url": "https://commons.wikimedia.org/wiki/File:Road-case-removable-lid-vol-case.jpg"
  }
 },
 "items": {
  "audio-020": {
   "file": "img/p/p-f1220ea1.webp",
   "product": true,
   "brand": "Hollyland",
   "credit": "Hollyland (situs resmi)",
   "url": "https://www.hollyland.com/product/solidcom-c1",
   "title": "Solidcom C1 Paket A (6 Headset, Tanpa Base)"
  },
  "audio-021": {
   "file": "img/p/p-f1220ea1.webp",
   "product": true,
   "brand": "Hollyland",
   "credit": "Hollyland (situs resmi)",
   "url": "https://www.hollyland.com/product/solidcom-c1",
   "title": "Solidcom C1 Paket B (8 Headset + 1 Base)"
  },
  "audio-022": {
   "file": "img/p/p-f1220ea1.webp",
   "product": true,
   "brand": "Hollyland",
   "credit": "Hollyland (situs resmi)",
   "url": "https://www.hollyland.com/product/solidcom-c1",
   "title": "Solidcom C1 Paket C (12 Headset + 2 Base)"
  },
  "audio-023": {
   "file": "img/p/p-f1220ea1.webp",
   "product": true,
   "brand": "Hollyland",
   "credit": "Hollyland (situs resmi)",
   "url": "https://www.hollyland.com/product/solidcom-c1",
   "title": "Solidcom C1 Paket D (16 Headset + 2 Base)"
  },
  "audio-024": {
   "file": "img/p/p-f1f691d4.webp",
   "product": true,
   "brand": "Hollyland",
   "credit": "Hollyland (situs resmi)",
   "url": "https://www.hollyland.com/product/solidcom-m1",
   "title": "Solidcom M1 Full-Duplex Wireless Intercom Solution (8 Beltpacks)"
  },
  "audio-045": {
   "file": "img/p/p-b2d21802.webp",
   "product": true,
   "brand": "Hollyland",
   "credit": "Hollyland (situs resmi)",
   "url": "https://www.hollyland.com/product/mars-4k",
   "title": "Mars 4K Wireless Video Transmission System"
  },
  "audio-052": {
   "file": "img/p/p-1f6c3564.webp",
   "product": true,
   "brand": "Hollyland",
   "credit": "Hollyland (situs resmi)",
   "url": "https://www.hollyland.com/product/mars-400s-pro",
   "title": "Mars 400S PRO SDI/HDMI Wireless Video Transmission System"
  },
  "audio-054": {
   "file": "img/p/p-c952ccc5.webp",
   "product": true,
   "brand": "Hollyland",
   "credit": "Hollyland (situs resmi)",
   "url": "https://www.hollyland.com/product/cosmo-c1",
   "title": "Cosmo C1 SDI/HDMI Wireless Video Transmission System"
  },
  "lighting-040": {
   "file": "img/p/p-050a4e23.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/lantern-90",
   "title": "Lantern Softbox 90 for 600D/600X"
  },
  "lighting-044": {
   "file": "img/p/p-2258df8f.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/accent-b7c",
   "title": "Accent B7c LED RGBWW Light"
  },
  "lighting-049": {
   "file": "img/p/p-6f7a931e.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/nova-p300c",
   "title": "Nova P300c RGB LED Panel (Standard)"
  },
  "lighting-050": {
   "file": "img/p/p-c9ab6d89.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/nova-p600c",
   "title": "Nova P600c RGBWW LED Panel"
  },
  "lighting-054": {
   "file": "img/p/p-f8aa9882.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/ls-60x",
   "title": "LS 60x (Standard)"
  },
  "lighting-055": {
   "file": "img/p/p-f8aa9882.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/ls-60x",
   "title": "LS 60x KIT"
  },
  "lighting-061": {
   "file": "img/p/p-dcea3960.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/ls-300d-ii",
   "title": "Light Storm 300d Mark II (Standard)"
  },
  "lighting-062": {
   "file": "img/p/p-dcea3960.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/ls-300d-ii",
   "title": "Light Storm 300d Mark II (Kit)"
  },
  "lighting-063": {
   "file": "img/p/p-cbdb7502.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/ls-300x",
   "title": "Light Storm 300X Bi-Color (Standard)"
  },
  "lighting-064": {
   "file": "img/p/p-cbdb7502.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/ls-300x",
   "title": "Light Storm 300X Bi-Color (KIT)"
  },
  "lighting-065": {
   "file": "img/p/p-dbff095e.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/ls-600d-pro",
   "title": "Light Storm 600D Pro (Standard)"
  },
  "lighting-066": {
   "file": "img/p/p-3d4b3a74.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/ls-600x-pro-lamp-head",
   "title": "LS 600x Pro Lamp Head (Standard)"
  },
  "lighting-067": {
   "file": "img/p/p-5bc8e5c7.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/ls-600c-pro",
   "title": "LS 600c Pro RGB LED Light (Standard)"
  },
  "lighting-068": {
   "file": "img/p/p-60ad4a6a.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/ls-1200d-pro",
   "title": "LS 1200d Pro LED Light"
  },
  "lighting-072": {
   "file": "img/p/p-ead8703a.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/light-dome-150",
   "title": "Big Dome 150"
  },
  "lighting-073": {
   "file": "img/p/p-4965ba5e.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/lantern",
   "title": "Lantern Softbox"
  },
  "lighting-074": {
   "file": "img/p/p-eef129cc.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/space-light",
   "title": "Space Light Reflector With Bowens Mount For LS C120 300D"
  },
  "lighting-076": {
   "file": "img/p/p-b62a6959.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/fresnel-2x",
   "title": "Fresnel Mount 2x (for LS 120d/ 300d)"
  },
  "lighting-077": {
   "file": "img/p/p-f8a3abce.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/f10-fresnel",
   "title": "F10 Fresnel Mount + Barndoors (for LS 600d)"
  },
  "lighting-078": {
   "file": "img/p/p-a55d9166.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/spotlight-mount-ii-19-lens",
   "title": "Spotlight Mount Set with 19° Lens"
  },
  "lighting-079": {
   "file": "img/p/p-c1fe509a.webp",
   "product": true,
   "brand": "Aputure",
   "credit": "Aputure (situs resmi)",
   "url": "https://aputure.com/en-US/products/aputure-2-bay-battery-power-station",
   "title": "2-Bay Battery Power Station (V-Mount)"
  },
  "router-002": {
   "file": "img/p/p-7d38a2eb.webp",
   "product": true,
   "brand": "Hollyland",
   "credit": "Hollyland (situs resmi)",
   "url": "https://www.hollyland.com/product/solidcom-c1-pro",
   "title": "Solidcom C1 Pro (8 Headset)"
  },
  "support-085": {
   "file": "img/p/p-c79f1edd.webp",
   "product": true,
   "brand": "Zhiyun",
   "credit": "Zhiyun (situs resmi)",
   "url": "https://www.zhiyun-tech.com/en/downloads/crane-3s",
   "title": "CRANE 3S Handheld Stabilizer"
  },
  "audio-019": {
   "file": "img/p/p-ccccdfd9.webp",
   "product": true,
   "brand": "Hollyland",
   "credit": "Hollyland (situs resmi)",
   "url": "https://www.hollyland.com/product/mars-t1000",
   "title": "Mars T1000 Wireless Intercom System (4 Beltpack + 5 Headset)"
  },
  "audio-038": {
   "file": "img/p/p-84d13c9b.webp",
   "product": true,
   "brand": "Roland",
   "credit": "Roland (situs resmi)",
   "url": "https://www.roland.com/global/products/jc-120/",
   "title": "JC 120 Guitar Amp"
  },
  "audio-074": {
   "file": "img/p/p-f688a442.webp",
   "product": true,
   "brand": "Midas",
   "credit": "Midas (situs resmi)",
   "url": "https://www.midasconsoles.com/en/products/0603-AAC",
   "title": "Pro2c 48 Channel Digital Mixer Console"
  },
  "audio-077": {
   "file": "img/p/p-a9b27158.webp",
   "product": true,
   "brand": "Zoom",
   "credit": "Zoom (situs resmi)",
   "url": "https://zoomcorp.com/en/us/handheld-recorders/handheld-recorders/h4n-pro/",
   "title": "Audio Recorder Zoom H4N"
  },
  "audio-079": {
   "file": "img/p/p-c93f53b3.webp",
   "product": true,
   "brand": "Zoom",
   "credit": "Zoom (situs resmi)",
   "url": "https://zoomcorp.com/en/us/handheld-recorders/handheld-recorders/h8/",
   "title": "H8 8-Input / 12-Track Portable Handy Recorder"
  },
  "lighting-020": {
   "file": "img/p/p-f890026e.webp",
   "product": true,
   "brand": "ARRI",
   "credit": "ARRI (situs resmi)",
   "url": "https://www.arri.com/en/lighting/led-spotlights/discontinued/s60-c",
   "title": "SkyPanel S60-C LED Softlight with Manual Yoke (Blue/Silver, Edison)"
  },
  "support-002": {
   "file": "img/p/p-f3ada220.webp",
   "product": true,
   "brand": "Samsung",
   "credit": "Samsung (situs resmi)",
   "url": "https://www.samsung.com/ie/memory-storage/portable-ssd/portable-ssd-t5-1tb-black-mu-pa1t0b-eu/",
   "title": "T5 Portable SSD 500GB USB 3.1"
  },
  "support-007": {
   "file": "img/p/p-65e8d860.webp",
   "product": true,
   "brand": "AJA",
   "credit": "AJA (situs resmi)",
   "url": "https://www.aja.com/products/u-tap-hdmi",
   "title": "HDMI Capture Device AJA U-TAP (HDMI Input, USB 3.0 Output)"
  },
  "support-083": {
   "file": "img/p/p-0159e2e1.webp",
   "product": true,
   "brand": "Easyrig",
   "credit": "Easyrig (situs resmi)",
   "url": "https://easyrig.se/products/vario-5/",
   "title": "Vario 5"
  },
  "support-084": {
   "file": "img/p/p-06e6bde9.webp",
   "product": true,
   "brand": "Zhiyun",
   "credit": "Zhiyun (situs resmi)",
   "url": "https://store.zhiyun-tech.com/products/weebill-s",
   "title": "WEEBILL-S Handheld Gimbal Stabilizer"
  },
  "support-087": {
   "file": "img/p/p-b0e12d55.webp",
   "product": true,
   "brand": "Zhiyun",
   "credit": "Zhiyun (situs resmi)",
   "url": "https://www.zhiyun-tech.com/en/downloads/crane-2",
   "title": "Crane 2 3-Axis Handheld Gimbal Stabilizer"
  },
  "support-088": {
   "file": "img/p/p-7e56e04b.webp",
   "product": true,
   "brand": "Zhiyun",
   "credit": "Zhiyun (situs resmi)",
   "url": "https://www.zhiyun-tech.com/en/downloads/crane-3-lab",
   "title": "Crane 3-Lab (Unit Only)"
  },
  "support-104": {
   "file": "img/p/p-651c7124.webp",
   "product": true,
   "brand": "Manfrotto",
   "credit": "Manfrotto (situs resmi)",
   "url": "https://www.manfrotto.com/global-en/055-carbon-fiber-4-section-tripod-with-horizontal-column-mt055cxpro4/",
   "title": "Tripod Manfrotto MT055CXPRO4 4-Sections Carbon Fiber + Manfrotto MVH50"
  },
  "support-108": {
   "file": "img/p/p-955ab4af.webp",
   "product": true,
   "brand": "Sachtler",
   "credit": "Sachtler (situs resmi)",
   "url": "https://www.sachtler.com/en/product/tripod-flowtech-100-ms/",
   "title": "Tripod Video Sachtler Flowtech with Carbon 100"
  }
 }
};
