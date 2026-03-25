import os
import glob
import re

search_dir = '/Users/abc/Documents/Projects/Bootstrap/BatDongSan'
html_files = glob.glob(os.path.join(search_dir, '*.html'))

pattern = r'(<div class="row g-4">\s*)<div class="col-lg-4">(.*?)<div class="col-6 col-lg-3">(\s*<div class="footer-title">Khu vực</div>.*?)<div class="col-lg-3">(\s*<div class="footer-title">Liên hệ</div>.*?)</div>\s*</div>\s*(?=</div>\s*<div class="footer-bottom">)'

repl = r'''\1<div class="col-lg-3">\2<div class="col-6 col-lg-2">\3<div class="col-6 col-lg-2">\4</div>

        <div class="col-lg-3 mt-4 mt-lg-0">
          <div class="footer-title">Bản đồ</div>
          <div class="rounded-3 overflow-hidden shadow-sm" style="height: 140px;">
            <iframe src="https://www.google.com/maps/embed?pb=clearm18clearm12clearm3cleard3919.5132740348737lsd106.70181557579135cd Documentsd10.771946089376662lsm3clearf0lsf0cd Documentsf0cd Documentsm2cleari1024lsi768lsf13.1cd Documentsm3clearm2clears0x31752f416ca22ebf%3A0xe549bd92bf2cf502lssBitexco%20Financial%20Towercd Projectse0cd Documentsm2clearsenlssvnlsv1700000000000cd Projectsm2clearsenlssvn" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>'''

count = 0
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We use re.DOTALL so that .* can match across newlines
    new_content, num_subs = re.subn(pattern, repl, content, flags=re.DOTALL)
    
    if num_subs > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        
print(f"Updated {count} HTML files out of {len(html_files)}")
