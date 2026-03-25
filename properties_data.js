// =============================================
// properties_data.js  — browser-compatible
// Exposed as: window.LOCATIONS, window.PROPERTY_CATALOG, window.PROPERTIES_DATA
// =============================================

const LOCATIONS = {
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

const PROPERTY_CATALOG = {
  villa: {
    label: 'Biệt thự',
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
    label: 'Căn hộ',
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
    label: 'Nhà phố',
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
    label: 'Penthouse',
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
    label: 'Biệt thự biển',
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

const _badges = ['Bán', 'Cho thuê', 'Nổi bật', 'Mới đăng'];

function _randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function _randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _formatPrice(billion) {
  return billion + ' Tỷ VNĐ';
}

function _imageUrl(url) {
  return url + '?q=80&w=1400&auto=format&fit=crop';
}

function _getRandomLocation() {
  const keys = Object.keys(LOCATIONS);
  const selectedKey = _randomFrom(keys);
  const selected = LOCATIONS[selectedKey];
  const district = _randomFrom(selected.districts);
  return {
    cityKey: selectedKey,
    city: selected.city,
    district,
    full: district + ', ' + selected.city
  };
}

function _randomImagesByType(type) {
  const list = PROPERTY_CATALOG[type].images.slice();
  const shuffled = list.sort(() => 0.5 - Math.random());
  return {
    heroImg: _imageUrl(shuffled[0]),
    galleryImg1: _imageUrl(shuffled[1] || shuffled[0]),
    galleryImg2: _imageUrl(shuffled[2] || shuffled[0])
  };
}

function _getAreaByType(type) {
  switch (type) {
    case 'villa':     return _randomInt(250, 650);
    case 'apartment': return _randomInt(75, 220);
    case 'townhouse': return _randomInt(90, 320);
    case 'penthouse': return _randomInt(180, 450);
    case 'resort':    return _randomInt(180, 500);
    default:          return _randomInt(80, 300);
  }
}

function _getBedsByType(type) {
  switch (type) {
    case 'apartment': return _randomInt(2, 4);
    case 'penthouse': return _randomInt(3, 5);
    case 'villa':
    case 'resort':    return _randomInt(3, 6);
    case 'townhouse': return _randomInt(3, 5);
    default:          return _randomInt(2, 4);
  }
}

function _buildDescription(type, title, fullLocation) {
  const descMap = {
    villa: title + ' tọa lạc tại ' + fullLocation + ', thuộc khu dân cư cao cấp với không gian sống riêng tư, kiến trúc hiện đại và pháp lý rõ ràng.',
    apartment: title + ' tại ' + fullLocation + ' sở hữu thiết kế tối ưu công năng, tiện ích nội khu đầy đủ và kết nối thuận tiện đến trung tâm.',
    townhouse: title + ' nằm tại ' + fullLocation + ', phù hợp để ở kết hợp kinh doanh hoặc đầu tư khai thác. Tài sản có vị trí thuận lợi, hạ tầng hoàn chỉnh.',
    penthouse: title + ' tại ' + fullLocation + ' là dòng sản phẩm giới hạn dành cho khách hàng ưu tiên tầm nhìn đẹp và không gian sống đẳng cấp.',
    resort: title + ' tại ' + fullLocation + ' mang phong cách nghỉ dưỡng, phù hợp cho nhu cầu second home hoặc đầu tư khai thác lưu trú.'
  };
  return descMap[type] || '';
}

const _propertyTypes = Object.keys(PROPERTY_CATALOG);

const _featuredSeed = [
  {
    id: 'p1',
    title: 'Biệt thự ven sông cao cấp',
    type: 'villa',
    segment: 'luxury',
    city: 'TP.HCM',
    district: 'TP Thủ Đức',
    location: 'Thảo Điền, TP Thủ Đức, TP.HCM',
    price: '68 Tỷ VNĐ',
    priceNum: 68,
    beds: 5,
    baths: 6,
    area: 390,
    badge: 'Bán',
    mode: 'sale',
    heroImg: _imageUrl('https://images.unsplash.com/photo-1512917774080-9991f1c4c750'),
    galleryImg1: _imageUrl('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'),
    galleryImg2: _imageUrl('https://images.unsplash.com/photo-1600585154340-be6161a56a0c'),
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
    priceNum: 92,
    beds: 4,
    baths: 5,
    area: 350,
    badge: 'Cho thuê',
    mode: 'rent',
    heroImg: _imageUrl('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'),
    galleryImg1: _imageUrl('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0'),
    galleryImg2: _imageUrl('https://images.unsplash.com/photo-1600607686527-6fb886090705'),
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
    priceNum: 54,
    beds: 3,
    baths: 3,
    area: 380,
    badge: 'Nổi bật',
    mode: 'sale',
    heroImg: _imageUrl('https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b'),
    galleryImg1: _imageUrl('https://images.unsplash.com/photo-1600566752355-35792bedcfea'),
    galleryImg2: _imageUrl('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3'),
    desc: 'Biệt thự nghỉ dưỡng gần biển tại Đà Nẵng, thích hợp cho nhu cầu second home hoặc đầu tư khai thác với không gian xanh và thiết kế tinh giản.'
  }
];

// Seed a deterministic pseudo-random sequence so IDs are stable
function _seededRand(seed) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const _generated = (function() {
  const rand = _seededRand(42);
  function rFrom(arr) { return arr[Math.floor(rand() * arr.length)]; }
  function rInt(min, max) { return Math.floor(rand() * (max - min + 1)) + min; }
  function imgUrl(url) { return url + '?q=80&w=1400&auto=format&fit=crop'; }

  const result = [];
  for (let i = 0; i < 97; i++) {
    const id = 'p' + (i + 4);
    const type = rFrom(_propertyTypes);
    const catalog = PROPERTY_CATALOG[type];
    const locKeys = Object.keys(LOCATIONS);
    const locKey = rFrom(locKeys);
    const loc = LOCATIONS[locKey];
    const district = rFrom(loc.districts);
    const fullLoc = district + ', ' + loc.city;
    const title = rFrom(catalog.titles);
    const area = (function() {
      switch (type) {
        case 'villa':     return rInt(250, 650);
        case 'apartment': return rInt(75, 220);
        case 'townhouse': return rInt(90, 320);
        case 'penthouse': return rInt(180, 450);
        case 'resort':    return rInt(180, 500);
        default:          return rInt(80, 300);
      }
    })();
    const beds = (function() {
      switch (type) {
        case 'apartment': return rInt(2, 4);
        case 'penthouse': return rInt(3, 5);
        case 'villa':
        case 'resort':    return rInt(3, 6);
        case 'townhouse': return rInt(3, 5);
        default:          return rInt(2, 4);
      }
    })();
    const baths = Math.max(2, beds + rInt(0, 1));
    const [minP, maxP] = catalog.priceRange;
    const priceNum = rInt(minP, maxP);
    const imgList = catalog.images.slice();
    const heroImg = imgUrl(imgList[rInt(0, imgList.length - 1)]);
    const g1 = imgUrl(imgList[rInt(0, imgList.length - 1)]);
    const g2 = imgUrl(imgList[rInt(0, imgList.length - 1)]);
    const badge = rFrom(_badges);
    const mode = (badge === 'Cho thuê') ? 'rent' : 'sale';

    result.push({
      id,
      title,
      type,
      segment: catalog.segment,
      city: loc.city,
      district,
      location: fullLoc,
      price: priceNum + ' Tỷ VNĐ',
      priceNum,
      beds,
      baths,
      area,
      badge,
      mode,
      heroImg,
      galleryImg1: g1,
      galleryImg2: g2,
      desc: _buildDescription(type, title, fullLoc)
    });
  }
  return result;
})();

// Expose globally for browser use
window.LOCATIONS = LOCATIONS;
window.PROPERTY_CATALOG = PROPERTY_CATALOG;
window.PROPERTIES_DATA = [..._featuredSeed, ..._generated];
