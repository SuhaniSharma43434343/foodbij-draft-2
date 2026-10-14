# Stitch numbered JPEG frames into an animated WebP (about 12 fps). Usage: frames-to-webp.py <dir> <out.webp> <max_width>
import os, sys
from PIL import Image
d, out, mw = sys.argv[1], sys.argv[2], int(sys.argv[3])
files = sorted(f for f in os.listdir(d) if f.endswith(".jpg"))
frames = []
for f in files:
    im = Image.open(os.path.join(d, f)).convert("RGB")
    if im.width > mw:
        im = im.resize((mw, im.height * mw // im.width))
    frames.append(im)
frames[0].save(out, save_all=True, append_images=frames[1:], duration=83, loop=0, quality=70, method=4)
