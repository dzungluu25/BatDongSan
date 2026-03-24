const locations = {
  hcm: {
    city: 'TP.HCM',
    districts: ['Quận 1', 'Quận 2', 'Quận 7', 'Bình Thạnh', 'TP Thủ Đức', 'Phú Nhuận']
  },
  hanoi: {
    city: 'Hà Nội',
    districts: ['Ba Đình', 'Tây Hồ', 'Cầu Giấy', 'Nam Từ Liêm', 'Long Biên']
  },
  danang: {
    city: 'Đà Nẵng',
    districts: ['Hải Châu', 'Sơn Trà', 'Ngũ Hành Sơn']
  },
  nhatrang: {
    city: 'Khánh Hòa',
    districts: ['Nha Trang']
  },
  phuquoc: {
    city: 'Kiên Giang',
    districts: ['Phú Quốc']
  },
  halong: {
    city: 'Quảng Ninh',
    districts: ['Hạ Long']
  }
};

const propertyCatalog = {
  villa: {
    segment: 'luxury',
    titles: [
      'Biệt thự ven sông cao cấp',
      'Biệt thự compound đẳng cấp',
      'Biệt thự sân vườn hiện đại',
      'Biệt thự nghỉ dưỡng riêng tư'
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6'
    ],
    priceRange: [25, 120]
  },
  apartment: {
    segment: 'upperMid',
    titles: [
      'Căn hộ cao cấp trung tâm',
      'Căn hộ view sông sang trọng',
      'Căn hộ hiện đại đầy đủ nội thất',
      'Căn hộ hạng sang chuẩn quốc tế'
    ],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
      'https://images.unsplash.com/photo-1600607686527-6fb886090705',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227'
    ],
    priceRange: [3, 25]
  },
  townhouse: {
    segment: 'upperMid',
    titles: [
      'Nhà phố thương mại vị trí đẹp',
      'Nhà phố khu compound an ninh',
      'Nhà phố trung tâm thuận tiện kinh doanh',
      'Nhà phố hiện đại khu dân cư cao cấp'
    ],
    images: [
      'https://images.unsplash.com/photo-1572120360610-d971b9d7767c',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      'https://images.unsplash.com/photo-1494526585095-c41746248156',
      'https://images.unsplash.com/photo-1448630360428-65456885c650'
    ],
    priceRange: [8, 45]
  },
  penthouse: {
    segment: 'luxury',
    titles: [
      'Penthouse skyline độc bản',
      'Penthouse duplex giới hạn',
      'Sky villa tầm nhìn toàn cảnh',
      'Penthouse hạng sang trung tâm'
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      'https://images.unsplash.com/photo-1494526585095-c41746248156',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85'
    ],
    priceRange: [18, 90]
  },
  resort: {
    segment: 'resort',
    titles: [
      'Biệt thự biển nghỉ dưỡng',
      'Second home view biển',
      'Beach villa đầu tư khai thác',
      'Biệt thự nghỉ dưỡng phong cách nhiệt đới'
    ],
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b'
    ],
    priceRange: [12, 70]
  }
};

const badges = ['Bán', 'Cho thuê', 'Nổi bật', 'Mới đăng'];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatPrice(billion) {
  return `${billion} Tỷ VNĐ`;
}

function getRandomLocation() {
  const keys = Object.keys(locations);
  const selectedKey = randomFrom(keys);
  const selected = locations[selectedKey];
  const district = randomFrom(selected.districts);

  return {
    cityKey: selectedKey,
    city: selected.city,
    district,
    full: `${district}, ${selected.city}`
  };
}

function imageUrl(url) {
  return `${url}?q=80&w=1400&auto=format&fit=crop`;
}

function randomImagesByType(type) {
  const list = propertyCatalog[type].images.slice();
  const shuffled = list.sort(() => 0.5 - Math.random());

  return {
    heroImg: imageUrl(shuffled[0]),
    galleryImg1: imageUrl(shuffled[1] || shuffled[0]),
    galleryImg2: imageUrl(shuffled[2] || shuffled[0])
  };
}

function getAreaByType(type) {
  switch (type) {
    case 'villa':
      return randomInt(250, 650);
    case 'apartment':
      return randomInt(75, 220);
    case 'townhouse':
      return randomInt(90, 320);
    case 'penthouse':
      return randomInt(180, 450);
    case 'resort':
      return randomInt(180, 500);
    default:
      return randomInt(80, 300);
  }
}

function getBedsByType(type) {
  switch (type) {
    case 'apartment':
      return randomInt(2, 4);
    case 'penthouse':
      return randomInt(3, 5);
    case 'villa':
    case 'resort':
      return randomInt(3, 6);
    case 'townhouse':
      return randomInt(3, 5);
    default:
      return randomInt(2, 4);
  }
}

function buildDescription(type, title, fullLocation) {
  const descMap = {
    villa: `${title} tọa lạc tại ${fullLocation}, thuộc khu dân cư cao cấp với không gian sống riêng tư, kiến trúc hiện đại và pháp lý rõ ràng. Phù hợp cho khách hàng tìm kiếm nơi an cư chất lượng hoặc tài sản giữ giá lâu dài.`,
    apartment: `${title} tại ${fullLocation} sở hữu thiết kế tối ưu công năng, tiện ích nội khu đầy đủ và kết nối thuận tiện đến trung tâm. Đây là lựa chọn phù hợp cho nhu cầu ở thực hoặc cho thuê.`,
    townhouse: `${title} nằm tại ${fullLocation}, phù hợp để ở kết hợp kinh doanh hoặc đầu tư khai thác. Tài sản có vị trí thuận lợi, hạ tầng hoàn chỉnh và tiềm năng tăng giá tốt.`,
    penthouse: `${title} tại ${fullLocation} là dòng sản phẩm giới hạn dành cho khách hàng ưu tiên tầm nhìn đẹp, không gian sống đẳng cấp và trải nghiệm riêng tư giữa khu trung tâm.`,
    resort: `${title} tại ${fullLocation} mang phong cách nghỉ dưỡng, phù hợp cho nhu cầu second home hoặc đầu tư khai thác lưu trú. Không gian thoáng, gần biển hoặc khu du lịch trọng điểm.`
  };

  return descMap[type];
}

const propertyTypes = Object.keys(propertyCatalog);

const featuredSeed = [
  {
    id: 'p1',
    title: 'Biệt thự ven sông cao cấp',
    type: 'villa',
    segment: 'luxury',
    city: 'TP.HCM',
    district: 'TP Thủ Đức',
    location: 'Thảo Điền, TP Thủ Đức, TP.HCM',
    price: '68 Tỷ VNĐ',
    beds: 5,
    baths: 6,
    area: 390,
    badge: 'Bán',
    heroImg: imageUrl('https://images.unsplash.com/photo-1512917774080-9991f1c4c750'),
    galleryImg1: imageUrl('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'),
    galleryImg2: imageUrl('https://images.unsplash.com/photo-1600585154340-be6161a56a0c'),
    desc: 'Biệt thự compound cao cấp tại Thảo Điền, thiết kế mở sang trọng, phù hợp nhu cầu an cư lâu dài cho gia đình hoặc sở hữu tài sản giá trị tại khu Đông TP.HCM.'
  },
  {
    id: 'p2',
    title: 'Penthouse hạng sang trung tâm',
    type: 'penthouse',
    segment: 'luxury',
    city: 'Hà Nội',
    district: 'Tây Hồ',
    location: 'Tây Hồ, Hà Nội',
    price: '92 Tỷ VNĐ',
    beds: 4,
    baths: 5,
    area: 350,
    badge: 'Cho thuê',
    heroImg: imageUrl('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'),
    galleryImg1: imageUrl('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0'),
    galleryImg2: imageUrl('https://images.unsplash.com/photo-1600607686527-6fb886090705'),
    desc: 'Penthouse độc bản tại khu Tây Hồ với tầm nhìn rộng, nội thất cao cấp và không gian sống riêng tư, phù hợp cho khách hàng thuê ở tiêu chuẩn quốc tế.'
  },
  {
    id: 'p3',
    title: 'Biệt thự biển nghỉ dưỡng',
    type: 'resort',
    segment: 'resort',
    city: 'Đà Nẵng',
    district: 'Ngũ Hành Sơn',
    location: 'Ngũ Hành Sơn, Đà Nẵng',
    price: '54 Tỷ VNĐ',
    beds: 3,
    baths: 3,
    area: 380,
    badge: 'Nổi bật',
    heroImg: imageUrl('https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b'),
    galleryImg1: imageUrl('https://images.unsplash.com/photo-1600566752355-35792bedcfea'),
    galleryImg2: imageUrl('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3'),
    desc: 'Biệt thự nghỉ dưỡng gần biển tại Đà Nẵng, thích hợp cho nhu cầu second home hoặc đầu tư khai thác với không gian xanh và thiết kế tinh giản.'
  }
];

const generated = Array.from({ length: 97 }).map((_, i) => {
  const id = `p${i + 4}`;
  const type = randomFrom(propertyTypes);
  const catalog = propertyCatalog[type];
  const loc = getRandomLocation();
  const images = randomImagesByType(type);
  const title = randomFrom(catalog.titles);
  const area = getAreaByType(type);
  const beds = getBedsByType(type);
  const baths = Math.max(2, beds + randomInt(0, 1));
  const [minPrice, maxPrice] = catalog.priceRange;
  const price = formatPrice(randomInt(minPrice, maxPrice));

  return {
    id,
    title,
    type,
    segment: catalog.segment,
    city: loc.city,
    district: loc.district,
    location: loc.full,
    price,
    beds,
    baths,
    area,
    badge: randomFrom(badges),
    heroImg: images.heroImg,
    galleryImg1: images.galleryImg1,
    galleryImg2: images.galleryImg2,
    desc: buildDescription(type, title, loc.full)
  };
});

module.exports = [...featuredSeed, ...generated];