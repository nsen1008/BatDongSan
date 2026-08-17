export interface EstateItem {
  id: number;
  code: string;
  title: string;
  vietnameseTitle: string;
  category: string;
  area: string;
  materials: string;
  description: string;
  specs: {
    ceilingHeight: string;
    orientation: string;
    finishes: string;
    features: string[];
  };
  imageUrl: string;
  priceTag?: string;
}

export const ESTATE_ITEMS: EstateItem[] = [
  {
    id: 1,
    code: "ARC-01",
    title: "CANTILEVER PAVILION & HORIZON POOL",
    vietnameseTitle: "Gian Khối Vươn & Hồ Bơi Vô Cực",
    category: "Outdoor Architecture",
    area: "340 m²",
    materials: "Travertine, Low-E Glass, Teak Wood",
    description: "Khối kiến trúc vươn cantilever 12m không cột chống, hướng trực diện đường chân trời với mặt nước tràn vô cực.",
    specs: {
      ceilingHeight: "4.2m",
      orientation: "Hướng Nam - Đón gió tự nhiên",
      finishes: "Đá cẩm thạch Calacatta & Kính chống tia UV 3 lớp",
      features: ["Hệ thống sưởi khoáng", "Sàn deck gỗ Teak tự nhiên", "Đèn chiếu sáng ẩn Lutron"]
    },
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    priceTag: "$1,250,000"
  },
  {
    id: 2,
    code: "ARC-02",
    title: "DOUBLE-HEIGHT MONOLITH LIVING ATRIUM",
    vietnameseTitle: "Đại Sảnh Thông Tầng Nguyên Khối",
    category: "Interior Space",
    area: "185 m²",
    materials: "Silver Travertine, Dark Bronze, Linen",
    description: "Không gian sinh hoạt trung tâm với chiều cao thông tầng 7.8m, vách đá Travertine nguyên phiến xẻ rãnh âm thanh học.",
    specs: {
      ceilingHeight: "7.8m",
      orientation: "Đông Nam",
      finishes: "Đá Travertine Ý & Gỗ óc chó Bắc Mỹ (Black Walnut)",
      features: ["Hệ thống lọc không khí y tế", "Rèm âm trần Somfy", "Lò sưởi hơi nước sinh học"]
    },
    imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    priceTag: "$980,000"
  },
  {
    id: 3,
    code: "ARC-03",
    title: "PANORAMIC MASTER SANCTUARY",
    vietnameseTitle: "Phòng Ngủ Master View Toàn Cảnh",
    category: "Private Suite",
    area: "140 m²",
    materials: "Cashmere Wallcoverings, Oak, Bronze",
    description: "Tổ ấm riêng tư với hệ cửa kính kịch trần góc bo cong không đố, bao trọn cảnh quan rừng thông và bình minh nguyên sơ.",
    specs: {
      ceilingHeight: "3.6m",
      orientation: "Chính Đông",
      finishes: "Gỗ sồi Pháp hun khói & Da bò Ý Nappa",
      features: ["Walk-in closet thông minh Poliform", "Hệ thống kính cách âm 42dB", "Ánh sáng sinh học Circadian"]
    },
    imageUrl: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85",
    priceTag: "$850,000"
  },
  {
    id: 4,
    code: "ARC-04",
    title: "ATRIUM & SCULPTURAL SKYLIGHT PORTAL",
    vietnameseTitle: "Giếng Trời Điêu Khắc & Sảnh Đón",
    category: "Architectural Core",
    area: "95 m²",
    materials: "Exposed Concrete, White Terrazzo, Brass",
    description: "Trục ánh sáng tự nhiên với giếng trời hình học tạo vệt bóng đổ nghệ thuật thay đổi theo từng giờ trong ngày.",
    specs: {
      ceilingHeight: "11.2m",
      orientation: "Thiết kế Đỉnh đón Thiên đỉnh",
      finishes: "Bê tông trần xử lý nano & Terrazzo hạt thạch anh",
      features: ["Cây cổ thụ Bonsai trung tâm", "Cầu thang bay xoắn ốc thép uốn", "Kính quang điện tự làm sạch"]
    },
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    priceTag: "$620,000"
  },
  {
    id: 5,
    code: "ARC-05",
    title: "MONOLITHIC CHEF KITCHEN & WINE VAULT",
    vietnameseTitle: "Đảo Bếp Khối Travertine & Hầm Rượu",
    category: "Culinary & Dining",
    area: "115 m²",
    materials: "Titanium Travertine, Gaggenau 400, Smoked Glass",
    description: "Đảo bếp đá nguyên khối nặng 4.2 tấn trang bị toàn bộ thiết bị âm cao cấp của Đức cùng tủ bảo quản vang nhiệt độ kép.",
    specs: {
      ceilingHeight: "3.8m",
      orientation: "Bắc",
      finishes: "Mặt đá xử lý chống thấm khoáng & Phụ kiện Blum Antaro",
      features: ["Bếp cảm ứng toàn vùng Gaggenau", "Hút mùi ngầm mặt bàn BORA", "Tủ lạnh âm Liebherr Monolith"]
    },
    imageUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85",
    priceTag: "$480,000"
  },
  {
    id: 6,
    code: "ARC-06",
    title: "ZEN MEDITATION GARDEN & WATER COURTYARD",
    vietnameseTitle: "Vườn Thiền Trầm Tĩnh & Sân Mặt Nước",
    category: "Landscape Sanctuary",
    area: "260 m²",
    materials: "Basalt Stone, Black Gravel, Bamboo Moss",
    description: "Không gian cảnh quan tối giản phong cách Wabi-Sabi với tiếng nước tuần hoàn tạo tần số êm dịu tái tạo năng lượng.",
    specs: {
      ceilingHeight: "Không gian mở ngoài trời",
      orientation: "Tây Nam",
      finishes: "Đá núi lửa bazan & Rêu tự nhiên phủ dưỡng ẩm",
      features: ["Hệ thống phun sương ion âm", "Đá cảnh quan phong thủy chọn lọc", "Lối đi ngập mặt nước"]
    },
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=85",
    priceTag: "$390,000"
  },
  {
    id: 7,
    code: "ARC-07",
    title: "PRIVATE SOMMELIER CELLAR & CIGAR LOUNGE",
    vietnameseTitle: "Hầm Rượu Vang & Lounge Cigar Thượng Lưu",
    category: "Private Amenities",
    area: "88 m²",
    materials: "Weathered Steel, Cedar, Spanish Marble",
    description: "Hầm kiểm soát vi khí hậu độ ẩm 70%, sức chứa 1,500 chai vang hảo hạng cùng phòng hút xì gà khử mùi chủ động plasma.",
    specs: {
      ceilingHeight: "3.2m",
      orientation: "Tầng ngầm cách nhiệt",
      finishes: "Gỗ tuyết tùng đỏ Tây Ban Nha & Thép Corten oxy hóa tự nhiên",
      features: ["Kiểm soát độ ẩm EuroCave", "Hệ thống lọc khí than hoạt tính", "Khóa sinh trắc học vân tay & mống mắt"]
    },
    imageUrl: "https://images.unsplash.com/photo-1597218868981-1b68e15f0063?auto=format&fit=crop&w=1200&q=85",
    priceTag: "$550,000"
  },
  {
    id: 8,
    code: "ARC-08",
    title: "SCULPTED NATURAL STONE ONSEN SPA",
    vietnameseTitle: "Phòng Tắm Onsen Đá Tự Nhiên & Xông Hơi",
    category: "Wellness & Bath",
    area: "65 m²",
    materials: "Hinanoki Wood, Grey Granite, Dornbracht",
    description: "Bồn tắm Onsen tạc nguyên khối từ đá granite tự nhiên, phòng xông hơi khô gỗ Hinoki Nhật Bản tỏa hương thơm dịu nhẹ.",
    specs: {
      ceilingHeight: "3.4m",
      orientation: "Kín đáo hướng vườn riêng",
      finishes: "Gỗ thông Hinoki 100 năm tuổi & Sen tắm mưa Dornbracht",
      features: ["Nước khoáng tuần hoàn", "Xông đá muối Himalaya", "Sưởi sàn bức xạ nhiệt"]
    },
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85",
    priceTag: "$360,000"
  },
  {
    id: 9,
    code: "ARC-09",
    title: "EXECUTIVE SKYLOUNGE & WORKSPACE",
    vietnameseTitle: "Phòng Làm Việc Penthouse Tầng Thượng",
    category: "Private Office",
    area: "90 m²",
    materials: "Smoked Oak, Matte Black Steel, Sound Absorption Felt",
    description: "Không gian điều hành cá nhân tầm nhìn 360 độ cách âm tuyệt đối với thư viện tài liệu cao kịch trần.",
    specs: {
      ceilingHeight: "4.0m",
      orientation: "Toàn cảnh 3 hướng",
      finishes: "Tường nỉ tiêu âm Baux & Bàn làm việc đúc nhôm Poltrona Frau",
      features: ["Đường truyền vệ tinh mã hóa", "Hệ thống họp trực tuyến Bang & Olufsen", "Tủ bảo mật tài liệu chống cháy"]
    },
    imageUrl: "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=85",
    priceTag: "$420,000"
  },
  {
    id: 10,
    code: "ARC-10",
    title: "ARCHITECTURAL ILLUMINATION AT DUSK",
    vietnameseTitle: "Toàn Cảnh Kiến Trúc Hoàng Hôn & Đêm",
    category: "Master Facade",
    area: "Khuôn viên 1,450 m²",
    materials: "Architectural Concrete, Architectural Mesh, Fiber Optics",
    description: "Hệ thống chiếu sáng kiến trúc mô phỏng nhịp điệu ánh trăng, tôn vinh các khối hình học điêu khắc về đêm mà không gây ô nhiễm ánh sáng.",
    specs: {
      ceilingHeight: "Tổng thể dinh thự 3 tầng",
      orientation: "Tọa độ đắc địa ven đồi",
      finishes: "Hệ thống chiếu sáng thông minh iGuzzini từ Ý",
      features: ["Cảnh quan ánh sáng theo mùa", "Hệ thống an ninh laser và camera AI", "Sân đỗ trực thăng mini"]
    },
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    priceTag: "$4,850,000"
  }
];

export const PROJECT_DETAILS = {
  brandName: "PRMPT ESTATES",
  tagline: "ARCHITECTURAL MONOLITHS & PRIVATE RESIDENCES",
  vietnameseTagline: "KIẾN TRÚC ĐỘC BẢN & DINH THỰ THƯỢNG LƯU",
  collection: "SANCTUARY RESIDENCES",
  subCollection: "PROMPT VILLA 2026",
  location: "BÁN ĐẢO THIÊN NHIÊN NGUYÊN SƠ / PRIVATE CLIFFSIDE",
  startingPrice: "$4,850,000",
  startingPriceVN: "120 TỶ VNĐ",
  totalArea: "1,450 m²",
  builtArea: "820 m²",
  bedrooms: "4 Suites",
  bathrooms: "6 Baths",
  poolLength: "28m Infinity Edge",
  philosophy: "When exploring the estate, glide across the horizon to inspect twilight facade and inner architectural volumes. Our responsive scrub engine connects light, material, and spatial rhythm seamlessly."
};
