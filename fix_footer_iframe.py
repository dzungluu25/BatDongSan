import os
import glob
import re

search_dir = '/Users/abc/Documents/Projects/Bootstrap/BatDongSan'
html_files = glob.glob(os.path.join(search_dir, '*.html'))

good_iframe = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5132740348737!2d106.70181557579135!3d10.771946089376662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f416ca22ebf%3A0xe549bd92bf2cf502!2sBitexco%20Financial%20Tower!5e0!3m2!1sen!2svn!4v1700000000000!5m2!1sen!2svn" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'

old_pattern = r'<iframe src="https://www\.google\.com/maps/embed\?pb=[^"]+" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'

count = 0
for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content, num = re.subn(old_pattern, good_iframe, content)
    
    # Fix the stray </div></div>
    new_content = new_content.replace('      </div></div>\n\n    <div class="footer-bottom">', '      </div>\n    </div>\n\n    <div class="footer-bottom">')
    
    if content != new_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1

print(f"Fixed {count} files.")
