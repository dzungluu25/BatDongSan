const fs = require('fs');

const propertiesData = require('./properties_data.js');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// The layout parsing
const headMatch = indexHtml.match(/([\s\S]*?)<\/head>/);
let head = headMatch ? headMatch[1] + '</head>' : '';

const bodyMatch = indexHtml.match(/<body[^>]*>([\s\S]*?)<main>/);
let bodyStart = bodyMatch ? bodyMatch[0].replace('<main>', '') : '<body>';

// Replace navbar active links dynamically
const mainEndMatch = indexHtml.match(/<\/main>([\s\S]*)/);
let footerAndScripts = mainEndMatch ? mainEndMatch[1] : '';

function makePage(filename, title, activeHref, content) {
    // 1. Swap title
    let newHead = head.replace(/<title>.*?<\/title>/, `<title>${title} | The Digital Curator</title>`);
    
    // 2. Fix active menu
    let newBodyStart = bodyStart.replace(/<a class="nav-link nav-link-custom active" href=".*?">.*?<\/a>/g, (match) => {
        return match.replace(' active', '');
    });
    // Add active to the correct one
    if (activeHref) {
        newBodyStart = newBodyStart.replace(new RegExp(`<a class="nav-link nav-link-custom" href="${activeHref}">`, 'g'), `<a class="nav-link nav-link-custom active" href="${activeHref}">`);
    }

    const fullHtml = newHead + '\n' + newBodyStart + '\n<main>\n' + content + '\n</main>\n' + footerAndScripts;

    fs.writeFileSync(filename, fullHtml);
    console.log(`Generated ${filename}`);
}

// 1. Trang Danh sách Môi giới (agents.html)
makePage('agents.html', 'Danh sách Môi giới', 'agents.html', `
    <section class="section-space pb-0">
      <div class="container">
        <div class="text-center mb-5">
          <span class="section-kicker" data-aos="fade-up">Đội ngũ Tư vấn</span>
          <h1 class="section-title" data-aos="fade-up" data-aos-delay="100">Chuyên gia Bất động sản của Chúng tôi</h1>
          <p class="section-desc mx-auto" data-aos="fade-up" data-aos-delay="200">Đội ngũ tư vấn chuyên sâu theo từng khu vực, phân khúc và loại hình bất động sản tại Việt Nam.</p>
        </div>

        <div class="row g-4 experts-section bg-transparent" id="agent-list">
          <div class="col-md-3" data-aos="fade-up">
            <a href="agent-detail.html" class="text-decoration-none">
              <div class="agent-card">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop" alt="Nguyễn Minh Quân">
                <div class="agent-body">
                  <h3 class="agent-name">Nguyễn Minh Quân</h3>
                  <div class="agent-role">Chuyên gia Biệt thự & Nhà phố cao cấp</div>
                  <div class="agent-tags">
                     <span>Thảo Điền</span><span>Biệt thự</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div class="col-md-3" data-aos="fade-up" data-aos-delay="100">
            <a href="agent-detail.html" class="text-decoration-none">
              <div class="agent-card">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop" alt="Lê Thu Thảo">
                <div class="agent-body">
                  <h3 class="agent-name">Lê Thu Thảo</h3>
                  <div class="agent-role">Tư vấn Đầu tư & Pháp lý giao dịch</div>
                  <div class="agent-tags">
                     <span>Pháp lý</span><span>Đầu tư</span>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div class="col-md-3" data-aos="fade-up" data-aos-delay="200">
             <a href="agent-detail.html" class="text-decoration-none">
               <div class="agent-card">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1200&auto=format&fit=crop" alt="Phạm Mỹ Linh">
                  <div class="agent-body">
                    <h3 class="agent-name">Phạm Mỹ Linh</h3>
                    <div class="agent-role">Chuyên gia Căn hộ hạng sang</div>
                    <div class="agent-tags">
                       <span>Hồ Tây</span><span>Penthouse</span>
                    </div>
                  </div>
                </div>
             </a>
          </div>

          <div class="col-md-3" data-aos="fade-up" data-aos-delay="300">
             <a href="agent-detail.html" class="text-decoration-none">
               <div class="agent-card">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop" alt="Trần Hoàng Long">
                  <div class="agent-body">
                    <h3 class="agent-name">Trần Hoàng Long</h3>
                    <div class="agent-role">Chuyên gia Nghỉ dưỡng ven biển</div>
                    <div class="agent-tags">
                       <span>Đà Nẵng</span><span>Resort</span>
                    </div>
                  </div>
                </div>
             </a>
          </div>
        </div>
      </div>
    </section>
`);

// 2. Chi tiết Môi giới (agent-detail.html)
makePage('agent-detail.html', 'Chi tiết Môi giới', 'agents.html', `
    <section class="section-space">
      <div class="container">
        <div class="row align-items-center mb-5">
           <div class="col-md-4" data-aos="fade-right">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop" class="img-fluid rounded-4 shadow-lg w-100" style="object-fit: cover; height: 500px;" alt="Lê Thu Thảo">
           </div>
           <div class="col-md-7 offset-md-1" data-aos="fade-left">
              <span class="section-kicker">Chuyên gia Tư vấn</span>
              <h1 class="section-title">Lê Thu Thảo</h1>
              <h4 class="text-primary mt-2 fw-bold">Tư vấn Đầu tư & Pháp lý giao dịch</h4>
              <p class="section-desc mt-4">
                Chị Thảo có hơn 10 năm kinh nghiệm trong lĩnh vực bất động sản cao cấp, chuyên hỗ trợ khách hàng cá nhân và nhà đầu tư
                trong các giao dịch mua bán, chuyển nhượng và kiểm tra pháp lý tài sản tại TP.HCM và Hà Nội. Với phong cách tư vấn minh bạch,
                cẩn trọng và sát nhu cầu, chị mang lại sự an tâm cho khách hàng trong từng quyết định tài chính lớn.
              </p>

              <div class="d-flex gap-3 mt-4 flex-wrap">
                 <button class="btn btn-primary-custom px-4"><i class="fa-solid fa-phone me-2"></i> Gọi ngay: 0901 234 567</button>
                 <button class="btn btn-outline-dark px-4 fw-bold rounded-3">Nhắn Zalo</button>
              </div>

              <div class="mt-5 border-top pt-4">
                 <h5 class="fw-bold">Thông tin liên hệ</h5>
                 <ul class="list-unstyled mt-3 text-muted">
                    <li class="mb-2"><i class="fa-solid fa-envelope me-2"></i> thao.le@digitalcurator.vn</li>
                    <li class="mb-2"><i class="fa-solid fa-location-dot me-2"></i> Văn phòng Quận 1, TP.HCM</li>
                    <li class="mb-2"><i class="fa-solid fa-language me-2"></i> Tiếng Việt, English</li>
                    <li class="mb-2"><i class="fa-solid fa-briefcase me-2"></i> Chuyên môn: Biệt thự, căn hộ cao cấp, tài sản đầu tư</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </section>
`);

// 3. Danh sách Bất động sản (properties.html)
makePage('properties.html', 'Tài sản Độc quyền', 'properties.html', `
    <section class="section-space pb-0 bg-surface">
      <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-5">
           <div>
              <span class="section-kicker" data-aos="fade-up">Bộ sưu tập</span>
              <h2 class="section-title" data-aos="fade-up" data-aos-delay="100">Bất động sản nổi bật tại Việt Nam</h2>
           </div>
        </div>

        <div class="bg-white p-4 rounded-4 shadow-sm mb-5" data-aos="fade-up">
           <div class="row g-3">
              <div class="col-md-4">
                 <input type="text" class="form-control filter-input" placeholder="Tìm theo tên tài sản, khu vực...">
              </div>
              <div class="col-md-3">
                 <select class="form-select">
                    <option>Tất cả loại hình</option>
                    <option>Biệt thự</option>
                    <option>Căn hộ</option>
                    <option>Nhà phố</option>
                    <option>Penthouse</option>
                 </select>
              </div>
              <div class="col-md-3">
                 <select class="form-select">
                    <option>Khu vực</option>
                    <option>TP.HCM</option>
                    <option>Hà Nội</option>
                    <option>Đà Nẵng</option>
                    <option>Nha Trang</option>
                    <option>Phú Quốc</option>
                 </select>
              </div>
              <div class="col-md-2">
                 <button class="btn btn-primary-custom w-100 filter-btn">Lọc nhanh</button>
              </div>
           </div>
        </div>

        <div class="row g-4 pb-5 property-section bg-transparent">
           ${propertiesData.map((p, index) => `
           <div class="col-md-4" data-aos="fade-up" ${index % 3 !== 0 ? 'data-aos-delay="' + ((index % 3) * 100) + '"' : ''}>
              <a href="property-detail-${p.id}.html" class="text-decoration-none">
                <div class="property-card">
                  <div class="property-media">
                    <img src="${p.heroImg}" alt="Property ${p.title}">
                    ${p.badge ? `<div class="property-badge">${p.badge}</div>` : ''}
                  </div>
                  <div class="property-body">
                    <h3 class="property-title">${p.title}</h3>
                    <div class="property-location"><i class="fa-solid fa-location-dot me-1"></i> ${p.location}</div>
                    <div class="property-price">${p.price}</div>
                    <div class="property-meta">
                      <span><i class="fa-solid fa-bed me-1"></i> ${p.beds}</span>
                      <span><i class="fa-solid fa-bath me-1"></i> ${p.baths}</span>
                      <span><i class="fa-solid fa-vector-square me-1"></i> ${p.area} m²</span>
                    </div>
                  </div>
                </div>
              </a>
           </div>
           `).join('')}
        </div>
      </div>
    </section>
`);

// 4. Chi tiết Bất động sản (property-detail.html)
const createPropertyPage = (id, propertyTitle, location, price, beds, baths, area, heroImg, galleryImg1, galleryImg2, desc) => {
   makePage(`property-detail-${id}.html`, 'Chi tiết Bất động sản', 'properties.html', `
    <section class="mt-5 pt-3">
       <div class="container-fluid px-0">
          <div class="row g-1">
             <div class="col-md-8">
                <a href="${heroImg}" data-lightbox="property-gallery">
                   <img src="${heroImg}" class="w-100" style="height: 600px; object-fit: cover;" alt="Hero">
                </a>
             </div>
             <div class="col-md-4 d-flex flex-column gap-1">
                <a href="${galleryImg1}" data-lightbox="property-gallery">
                   <img src="${galleryImg1}" class="w-100" style="height: 298px; object-fit: cover;" alt="Interior">
                </a>
                <a href="${galleryImg2}" data-lightbox="property-gallery">
                   <img src="${galleryImg2}" class="w-100" style="height: 298px; object-fit: cover;" alt="Interior">
                </a>
             </div>
          </div>
       </div>
    </section>

    <section class="section-space">
       <div class="container">
          <div class="row">
             <div class="col-lg-8 pe-lg-5" data-aos="fade-up">
                <span class="badge bg-primary px-3 py-2 rounded-pill uppercase tracking-widest mb-3">Bất động sản nổi bật</span>
                <h1 class="section-title mb-3">${propertyTitle}</h1>
                <p class="text-muted"><i class="fa-solid fa-location-dot me-2"></i>${location}</p>

                <div class="d-flex flex-wrap gap-4 py-4 border-top border-bottom mt-4">
                   <div class="text-center">
                      <div class="fs-4 fw-bold text-primary">${beds.toString().padStart(2, '0')}</div>
                      <div class="text-muted small text-uppercase">Phòng ngủ</div>
                   </div>
                   <div class="text-center">
                      <div class="fs-4 fw-bold text-primary">${baths.toString().padStart(2, '0')}</div>
                      <div class="text-muted small text-uppercase">Phòng tắm</div>
                   </div>
                   <div class="text-center">
                      <div class="fs-4 fw-bold text-primary">${area} m²</div>
                      <div class="text-muted small text-uppercase">Diện tích</div>
                   </div>
                </div>

                <h3 class="fw-bold mt-5 mb-4">Mô tả tài sản</h3>
                <p class="section-desc">${desc}</p>

                <h4 class="fw-bold mt-5 mb-3">Điểm nổi bật</h4>
                <ul class="text-muted lh-lg">
                  <li>Pháp lý rõ ràng, phù hợp nhu cầu ở thực hoặc đầu tư.</li>
                  <li>Vị trí kết nối nhanh đến trung tâm và các tiện ích trọng điểm.</li>
                  <li>Thiết kế hiện đại, tối ưu ánh sáng và không gian sống.</li>
                </ul>
             </div>

             <div class="col-lg-4 mt-5 mt-lg-0" data-aos="fade-left">
                <div class="card border-0 shadow-lg p-4 rounded-4 sticky-top" style="top: 100px;">
                   <div class="card-body p-4">
                      <p class="text-uppercase text-muted small fw-bold mb-1">Giá chào bán</p>
                      <h2 class="fw-bold text-primary mb-4">${price}</h2>

                      <form>
                         <div class="mb-3">
                            <input type="text" class="form-control form-control-lg bg-light border-0 rounded-3" placeholder="Họ và tên">
                         </div>
                         <div class="mb-3">
                            <input type="email" class="form-control form-control-lg bg-light border-0 rounded-3" placeholder="Email">
                         </div>
                         <div class="mb-3">
                            <textarea class="form-control bg-light border-0 rounded-3" rows="3" placeholder="Nhu cầu của bạn..."></textarea>
                         </div>
                         <button class="btn btn-primary-custom w-100 py-3">Yêu cầu tham quan</button>
                      </form>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
`);
};

propertiesData.forEach(p => {
    createPropertyPage(p.id, p.title, p.location, p.price, p.beds, p.baths, p.area, p.heroImg, p.galleryImg1, p.galleryImg2, p.desc);
});

// 5. Dự án & Chi tiết (projects.html / project-detail.html)
makePage('projects.html', 'Dự án', 'projects.html', `
    <section class="section-space">
       <div class="container text-center">
          <span class="section-kicker">Dự án nổi bật</span>
          <h1 class="section-title mb-5">Dự án đang được quan tâm</h1>
          <div class="row g-5">
             <div class="col-12" data-aos="fade-up">
                <div class="card border-0 rounded-4 overflow-hidden shadow-lg area-card" style="min-height: 450px;">
                   <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1600&auto=format&fit=crop" alt="Project">
                   <div class="area-overlay"></div>
                   <div class="area-content">
                      <div class="area-mini">Đang mở bán</div>
                      <h3>The Metropole Thủ Thiêm</h3>
                      <a href="project-detail.html" class="btn btn-outline-light mt-3 py-2 px-4 rounded-pill fw-bold">Tìm hiểu thêm</a>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
`);

makePage('project-detail.html', 'Chi tiết Dự án', 'projects.html', `
    <section class="mt-5 pt-3">
       <div class="container-fluid px-0 position-relative">
          <img src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1600&auto=format&fit=crop" class="w-100" style="height: 60vh; object-fit: cover;" alt="Project Hero">
          <div class="position-absolute bottom-0 start-0 w-100 p-5" style="background: linear-gradient(0deg, rgba(0,0,0,0.8), transparent);">
             <h1 class="text-white fw-bold display-4">The Metropole Thủ Thiêm</h1>
             <p class="text-white-50"><i class="fa-solid fa-location-dot me-2"></i>Thủ Thiêm, TP. Thủ Đức, TP.HCM</p>
          </div>
       </div>
       <div class="container mt-5">
          <div class="row">
             <div class="col-md-8">
                <h3 class="fw-bold mb-3 text-primary">Về dự án</h3>
                <p class="section-desc">
                  The Metropole Thủ Thiêm là tổ hợp căn hộ hạng sang tọa lạc ngay lõi trung tâm mới của TP.HCM,
                  sở hữu tầm nhìn hướng sông Sài Gòn và khu vực Quận 1. Dự án nổi bật với kiến trúc hiện đại,
                  tiện ích cao cấp và vị trí kết nối chiến lược, phù hợp cho nhu cầu ở thực lẫn đầu tư.
                </p>
             </div>
             <div class="col-md-4">
                <div class="card shadow-sm p-4 border-0 bg-light rounded-4">
                   <h5 class="fw-bold text-primary border-bottom pb-2">Thông tin bán hàng</h5>
                   <ul class="list-unstyled mt-3 mb-4 text-muted">
                      <li class="mb-2"><strong>Trạng thái:</strong> Đang mở bán</li>
                      <li class="mb-2"><strong>Loại hình:</strong> Căn hộ, Penthouse, Shophouse</li>
                      <li class="mb-2"><strong>Pháp lý:</strong> Sở hữu lâu dài / 50 năm với người nước ngoài</li>
                   </ul>
                   <button class="btn btn-primary-custom w-100">Đăng ký nhận bảng giá</button>
                </div>
             </div>
          </div>
       </div>
    </section>
`);

// 6. Khu vực (areas.html)
makePage('areas.html', 'Khu vực', 'areas.html', `
    <section class="section-space">
       <div class="container">
          <div class="text-center mb-5">
             <span class="section-kicker">Thị trường</span>
             <h1 class="section-title">Khám phá khu vực nổi bật</h1>
          </div>
          <div class="row g-4 area-section bg-transparent">
             <div class="col-md-6" data-aos="zoom-in">
                <div class="area-card">
                   <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop" alt="Thảo Điền">
                   <div class="area-overlay"></div>
                   <div class="area-content"><h3>Thảo Điền</h3><p class="text-white-50">Khu biệt thự và căn hộ cao cấp ven sông tại TP. Thủ Đức</p></div>
                </div>
             </div>
             <div class="col-md-6" data-aos="zoom-in" data-aos-delay="100">
                <div class="area-card">
                   <img src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop" alt="Phú Mỹ Hưng">
                   <div class="area-overlay"></div>
                   <div class="area-content"><h3>Phú Mỹ Hưng</h3><p class="text-white-50">Đô thị hiện đại, quy hoạch đồng bộ tại Quận 7</p></div>
                </div>
             </div>
          </div>
       </div>
    </section>
`);

// 7. Blog (blog.html)
makePage('blog.html', 'Tạp chí Đời sống', 'blog.html', `
    <section class="section-space bg-surface">
       <div class="container">
          <div class="text-center mb-5">
             <span class="section-kicker">Cẩm nang</span>
             <h1 class="section-title">Tạp chí Bất động sản</h1>
          </div>
          <div class="row g-4">
             <div class="col-md-4" data-aos="fade-up">
                <article class="journal-card">
                   <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop" alt="Blog">
                   <div class="journal-body">
                      <span class="journal-cat">Đầu tư</span>
                      <h3 class="journal-title">Xu hướng chọn nhà ở cao cấp tại TP.HCM năm nay</h3>
                      <p>Những tiêu chí được khách hàng quan tâm khi chọn căn hộ, biệt thự và tài sản đầu tư giá trị cao.</p>
                   </div>
                </article>
             </div>
          </div>
       </div>
    </section>
`);

// 8. Liên hệ (contact.html)
makePage('contact.html', 'Liên hệ', 'contact.html', `
    <section class="section-space">
       <div class="container">
          <div class="row align-items-center">
             <div class="col-md-6 pe-lg-5" data-aos="fade-right">
                <span class="section-kicker">Kết nối</span>
                <h1 class="section-title mb-4">Liên hệ với chúng tôi</h1>
                <p class="section-desc mb-5">Đội ngũ chuyên viên sẽ hỗ trợ bạn tìm kiếm bất động sản phù hợp hoặc tư vấn giải pháp đầu tư, ký gửi và chuyển nhượng.</p>
                <form>
                   <input type="text" class="form-control form-control-lg mb-3 bg-light border-0" placeholder="Họ và tên">
                   <input type="email" class="form-control form-control-lg mb-3 bg-light border-0" placeholder="Email">
                   <textarea rows="4" class="form-control bg-light border-0 mb-4" placeholder="Nội dung cần tư vấn..."></textarea>
                   <button class="btn btn-primary-custom px-5 py-3 rounded-pill w-100 fw-bold">Gửi yêu cầu</button>
                </form>
             </div>
             <div class="col-md-6 mt-5 mt-md-0" data-aos="fade-left">
                <div class="bg-primary text-white p-5 rounded-4 shadow-lg">
                   <h3 class="fw-bold mb-4">Văn phòng chính</h3>
                   <ul class="list-unstyled">
                      <li class="mb-4 d-flex"><i class="fa-solid fa-map-pin fs-4 mt-1 me-3 text-secondary"></i> <div>Tòa nhà Bitexco, 2 Hải Triều, Quận 1, TP.HCM</div></li>
                      <li class="mb-4 d-flex"><i class="fa-solid fa-phone fs-4 mt-1 me-3 text-secondary"></i> <div>(+84) 901 234 567</div></li>
                      <li class="mb-4 d-flex"><i class="fa-solid fa-envelope fs-4 mt-1 me-3 text-secondary"></i> <div>contact@digitalcurator.vn</div></li>
                   </ul>
                </div>
             </div>
          </div>
       </div>
    </section>
`);

// 9. Gia nhập Đội ngũ (join-team.html)
makePage('join-team.html', 'Gia nhập', '', `
    <section class="py-5 bg-dark text-white text-center" style="background: linear-gradient(rgba(0,0,0,0.68), rgba(0,0,0,0.68)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop') center/cover; padding-top: 150px !important; padding-bottom: 100px !important;">
       <div class="container">
          <h1 class="display-3 fw-bold mb-3 animate__animated animate__fadeInDown">Gia nhập Đội ngũ Tư vấn Tinh tuyển</h1>
          <p class="lead text-white-50 mx-auto animate__animated animate__fadeInUp" style="max-width:600px;">Đồng hành cùng chúng tôi để phát triển sự nghiệp trong lĩnh vực bất động sản cao cấp tại Việt Nam.</p>
          <button class="btn btn-outline-light btn-lg mt-4 animate__animated animate__zoomIn">Xem vị trí tuyển dụng</button>
       </div>
    </section>
`);

// 10. Đăng tin (post-property.html)
makePage('post-property.html', 'Đăng tin Bất động sản', '', `
    <section class="section-space">
       <div class="container">
          <div class="text-center mb-5">
             <h1 class="section-title">Ký gửi Bất động sản</h1>
             <p class="section-desc mx-auto">Gửi thông tin tài sản để đội ngũ chúng tôi hỗ trợ thẩm định, tư vấn giá và triển khai truyền thông phù hợp.</p>
          </div>
          <div class="row justify-content-center">
             <div class="col-md-8">
                <form class="bg-light p-5 rounded-4 shadow-sm">
                   <h4 class="fw-bold mb-4">Thông tin cơ bản</h4>
                   <input type="text" class="form-control mb-3" placeholder="Tên bất động sản / tiêu đề tin">
                   <div class="row">
                      <div class="col-6"><input type="text" class="form-control mb-3" placeholder="Giá chào bán / cho thuê"></div>
                      <div class="col-6"><input type="text" class="form-control mb-3" placeholder="Diện tích (m²)"></div>
                   </div>
                   <input type="text" class="form-control mb-3" placeholder="Khu vực / địa chỉ">
                   <textarea class="form-control mb-4" rows="4" placeholder="Mô tả nổi bật về tài sản..."></textarea>
                   <button class="btn btn-primary-custom w-100">Gửi hồ sơ thẩm định</button>
                </form>
             </div>
          </div>
       </div>
    </section>
`);