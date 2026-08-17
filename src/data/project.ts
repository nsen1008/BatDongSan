/**
 * Single source of truth for all project content and media.
 * Every value below is safe to replace with real project information.
 * Bracketed values are intentional placeholders — do not present them as facts.
 */

export const realEstateAssets = {
  /**
   * Hero media. Accepts .mp4 / .webm video URLs OR image URLs.
   * When a video URL is supplied the hero automatically switches to
   * cursor-scrubbed cinematic video playback on desktop.
   */
  heroVideos: ["/4730425b-c432-4477-9baf-afd4ed91b819.jpg", "/1518c3ff-38e4-4142-a2f8-5a121e666a91.jpg"],



  gallery: ["/0f7babc3-d8e1-478b-8e27-f4e426d3fa71.jpg", "/215fcd16-beb1-4ec9-9ada-a6289cd85825.jpg", "/4c324fb0-8f25-4d46-9384-d8a60224066b.jpg", "/2170aca9-13a0-41fe-ab33-363f35e7c50c.jpg", "/d77cb0d0-55d1-4634-af22-a419fffc3c75.jpg", "/a1201b25-3323-418a-981d-f21a34e21d11.jpg", "/3ebd4b7d-d9ac-4066-b049-df91df3153ab.jpg", "/04172023-4f2e-4eaf-a69c-1b5b3a818241.jpg", "/3f504caf-6e85-4a3e-822c-2bcd7c57bc31.jpg", "/4d655e3b-d553-4307-8d97-af851f48417f.jpg"],











  architecture: "/2d9d587f-0e13-4ba8-8b4c-b2d4263b46dc.jpg",

  viewingCta: "/de705cdf-1636-41d6-9a1b-90d05aa952ab.jpg",

  location: "/1b19073f-52dd-4d50-ac43-20cb08e56f32.jpg"

} as const;

export const project = {
  name: 'THE MONOLITH RESIDENCES',
  tagline: 'Kiến Trúc Độc Bản & Dinh Thự Thượng Lưu',
  developer: 'PRMPT HERITAGE GROUP',
  architect: 'ATELIER SANCTUARY ARCHITECTURE',
  contractor: 'RICONS & SOL E&C',
  location: 'BÁN ĐẢO THẢO ĐIỀN, TP. THỦ ĐỨC',
  address: 'Số 01 Đại Lộ Vọng Cảnh, Phường Thảo Điền, TP. Thủ Đức, TP. HCM',
  price: '$4,850,000 (~120 Tỷ VNĐ)',
  unitTypes: 'Sky Villa & Dinh Thự Độc Bản',
  area: '450 m² — 820 m² GFA',
  bedrooms: '4 — 5 Phòng Ngủ Master',
  handover: 'Quý IV / 2026',
  hotline: '0908 888 999',
  formEndpoint: '#',
  /** Set to true only when a verified reference price exists. */
  showPrice: true
} as const;

export const galleryCaptions: readonly string[] = [
'KIẾN TRÚC NGOẠI THẤT',
'SẢNH ĐÓN',
'PHÒNG KHÁCH',
'PHÒNG NGỦ CHÍNH',
'BẾP',
'PHÒNG TẮM',
'HỒ BƠI',
'SKY LOUNGE',
'CẢNH QUAN',
'TẦM NHÌN THÀNH PHỐ'];


export const galleryAlts: readonly string[] = [
'Mặt đứng kiến trúc đương đại của dự án căn hộ cao cấp',
'Sảnh đón thông tầng với vật liệu đá tự nhiên và gỗ tối màu',
'Phòng khách căn hộ cao cấp với cửa kính sát trần',
'Phòng ngủ chính với tầm nhìn thành phố lúc bình minh',
'Khu bếp tối giản với đảo bếp bằng đá nguyên khối',
'Phòng tắm cao cấp với bồn tắm đá đặt tự do',
'Hồ bơi vô cực trên tầng thượng về đêm',
'Sky lounge riêng tư dành cho cư dân',
'Cảnh quan sân vườn nội khu',
'Tầm nhìn thành phố từ ban công riêng'];


export const navLinks = [
{ label: 'OVERVIEW', href: '#overview' },
{ label: 'RESIDENCES', href: '#residences' },
{ label: 'AMENITIES', href: '#amenities' },
{ label: 'LOCATION', href: '#location' }] as
const;

export const residenceHighlights = [
{ label: 'PANORAMIC VIEW', note: 'Tầm nhìn không giới hạn về phía thành phố.' },
{ label: 'PRIVATE TERRACE', note: 'Không gian ngoài trời thuộc về riêng căn hộ.' },
{ label: 'FLOOR-TO-CEILING WINDOWS', note: 'Ánh sáng tự nhiên trọn vẹn suốt ngày.' },
{ label: 'PREMIUM MATERIALS', note: 'Đá tự nhiên, gỗ và kim loại hoàn thiện thủ công.' },
{ label: 'PRIVATE LIVING', note: 'Lối tiếp cận và không gian riêng tư tuyệt đối.' }] as
const;

export const residenceSpaces = [
{ name: 'PHÒNG KHÁCH', image: realEstateAssets.gallery[2], alt: galleryAlts[2] },
{ name: 'PHÒNG NGỦ', image: realEstateAssets.gallery[3], alt: galleryAlts[3] },
{ name: 'BẾP', image: realEstateAssets.gallery[4], alt: galleryAlts[4] },
{ name: 'PHÒNG TẮM', image: realEstateAssets.gallery[5], alt: galleryAlts[5] },
{ name: 'BAN CÔNG', image: realEstateAssets.gallery[9], alt: galleryAlts[9] }] as
const;

export const amenities = [
{
  index: '01',
  name: 'INFINITY POOL',
  caption: 'Hồ bơi vô cực hướng thành phố.',
  image: realEstateAssets.gallery[6],
  alt: galleryAlts[6]
},
{
  index: '02',
  name: 'PRIVATE LOUNGE',
  caption: 'Không gian tiếp khách riêng của cư dân.',
  image: realEstateAssets.gallery[7],
  alt: galleryAlts[7]
},
{
  index: '03',
  name: 'LANDSCAPED GARDEN',
  caption: 'Cảnh quan nội khu tĩnh tại.',
  image: realEstateAssets.gallery[8],
  alt: galleryAlts[8]
},
{
  index: '04',
  name: 'ENTRANCE LOBBY',
  caption: 'Sảnh đón với dịch vụ lễ tân.',
  image: realEstateAssets.gallery[1],
  alt: galleryAlts[1]
}] as
const;

export const locationPoints = [
  { time: '5 PHÚT', place: 'TRUNG TÂM QUẬN 1 & BẾN BẠCH ĐẰNG' },
  { time: '8 PHÚT', place: 'TRƯỜNG QUỐC TẾ BIS & TAS' },
  { time: '15 PHÚT', place: 'SÂN BAY QUỐC TẾ TÂN SƠN NHẤT' },
  { time: '3 PHÚT', place: 'BẾN DU THUYỀN RIÊNG VEN SÔNG' }
] as const;

export const valuePillars = [
  {
    title: 'VỊ TRÍ ĐỘC TÔN',
    body: 'Quỹ đất bán đảo ven sông hữu hạn tại Thảo Điền — giá trị không thể tái tạo.'
  },
  {
    title: 'SỐ LƯỢNG GIỚI HẠN',
    body: 'Dự án chỉ gồm 18 dinh thự và Sky Mansion độc bản, mỗi căn được thiết kế riêng biệt.'
  },
  {
    title: 'CHẤT LƯỢNG BÀN GIAO',
    body: 'Tiêu chuẩn vật liệu đá Travertine, kính Low-E 3 lớp và nội thất Poliform kiểm soát nghiêm ngặt.'
  },
  {
    title: 'GIÁ TRỊ DI SẢN',
    body: 'Định vị dành cho chủ sở hữu nhìn nhận bất động sản như tài sản truyền đời.'
  }
] as const;

export const trustFacts = [
  { label: 'DEVELOPED BY', value: 'PRMPT HERITAGE GROUP' },
  { label: 'DESIGNED BY', value: 'ATELIER SANCTUARY ARCHITECTURE' },
  { label: 'BUILT BY', value: 'RICONS & SOL E&C' },
  { label: 'HANDOVER', value: 'QUÝ IV / 2026' }
] as const;