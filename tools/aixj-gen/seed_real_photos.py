"""用真实照片铺满新图位（AI 图生成成功后会被覆盖）。"""

import os
import shutil

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def seed(src, dst, width=1400, quality=86):
    s = os.path.join(ROOT, src)
    d = os.path.join(ROOT, dst)
    os.makedirs(os.path.dirname(d), exist_ok=True)
    im = Image.open(s).convert("RGB")
    if im.width > width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    im.save(d, "JPEG", quality=quality, optimize=True)
    print("seed", dst, "<-", src, im.size)


SEEDS = [
    ("public/media/gallery/11.jpg", "public/media/scene/k12-stage.jpg"),
    (
        "public/media/gallery/5532032ec1ecd25b5aab600c3c66653e.jpg",
        "public/media/scene/camp-project.jpg",
    ),
    (
        "public/media/scene/prompt-class-wide.jpg",
        "public/media/scene/dl-enterprise.jpg",
    ),
    ("public/media/scene/prompt-wall.jpg", "public/media/scene/dl-office.jpg"),
    ("public/media/scene/demo-outdoor.jpg", "public/media/scene/dl-handoff.jpg"),
]


if __name__ == "__main__":
    for src, dst in SEEDS:
        seed(src, dst)
    for old in ("adult-1on1.jpg",):
        p = os.path.join(ROOT, "public/media/scene", old)
        if os.path.exists(p):
            shutil.move(p, os.path.join(ROOT, "tmp/old", old))
            print("removed", old)
