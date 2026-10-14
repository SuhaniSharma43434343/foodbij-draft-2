"""Dominant (average) colour of every photo in public/images -> src/content/image-colors.json (W10.2).

Usage (from the project root):  python -I scripts/image-colors.py
The JSON maps a public path ("/images/...jpg") to a "#rrggbb" colour. Photo frames paint it behind the
<img> (src/components/media/photo-bg.ts) so a frame is never an empty box while the photo downloads.
Re-run after adding or replacing photos. Needs Pillow.
"""
import json
import os
import sys

from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
SRC = os.path.join(ROOT, "public", "images")
OUT = os.path.join(ROOT, "src", "content", "image-colors.json")
EXTS = (".jpg", ".jpeg", ".png", ".webp", ".avif")


def colour(path):
    with Image.open(path) as im:
        im = im.convert("RGB")
        im.draft("RGB", (64, 64))  # fast JPEG downscale
        im.thumbnail((48, 48))
        # Average of the box-filtered thumbnail = the colour the photo reads as from a distance.
        r, g, b = im.resize((1, 1), Image.Resampling.BOX).getpixel((0, 0))
        return "#%02x%02x%02x" % (r, g, b)


def main():
    out = {}
    for dirpath, _, files in os.walk(SRC):
        for name in sorted(files):
            if not name.lower().endswith(EXTS):
                continue
            full = os.path.join(dirpath, name)
            key = "/" + os.path.relpath(full, os.path.join(ROOT, "public")).replace(os.sep, "/")
            out[key] = colour(full)
    out = dict(sorted(out.items()))
    with open(OUT, "w", encoding="utf-8", newline="\n") as f:
        f.write("{\n" + ",\n".join(f"  {json.dumps(k)}: {json.dumps(v)}" for k, v in out.items()) + "\n}\n")
    print(f"{len(out)} colours -> {os.path.relpath(OUT, ROOT)}")


if __name__ == "__main__":
    sys.exit(main())
