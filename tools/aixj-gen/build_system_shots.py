# -*- coding: utf-8 -*-
"""合成两张「真实交付系统」界面图。

这两张不是 AI 生成的假照片，而是按真实系统画面的结构做的界面图，
内容全部来自站内已有的真实照片（课堂现场 / 抖音作品）。
"""

import os

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
P = lambda *a: os.path.join(ROOT, *a)

FONT = r"C:\Windows\Fonts\msyh.ttc"
FONT_B = r"C:\Windows\Fonts\msyhbd.ttc"
MONO = r"C:\Windows\Fonts\consola.ttf"


def f(path, size):
    return ImageFont.truetype(path, size)


def cover(src, w, h):
    im = Image.open(src).convert("RGB")
    r = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    left = (im.width - w) // 2
    top = (im.height - h) // 2
    return im.crop((left, top, left + w, top + h))


def rounded(d, box, r, fill=None, outline=None, width=1):
    d.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)


def chip(d, x, y, text, fnt, fg, bg):
    tw = d.textlength(text, font=fnt)
    rounded(d, (x, y, x + tw + 18, y + 26), 5, fill=bg)
    d.text((x + 9, y + 5), text, font=fnt, fill=fg)
    return x + tw + 18


# ── 1. YOLO 实时检测控制台 ────────────────────────────────────────────
def build_yolo():
    W, H = 1600, 900
    canvas = Image.new("RGB", (W, H), (9, 11, 14))
    d = ImageDraw.Draw(canvas)

    # 顶栏
    d.rectangle((0, 0, W, 56), fill=(13, 16, 20))
    d.line((0, 56, W, 56), fill=(28, 34, 42), width=2)
    d.ellipse((26, 22, 38, 34), fill=(94, 210, 210))
    d.text((50, 16), "YOLO 实时检测 · 推理服务控制台", font=f(FONT_B, 24), fill=(226, 232, 240))
    st = f(FONT, 20)
    d.text((W - 390, 18), "模型 yolov8n", font=st, fill=(120, 134, 150))
    d.text((W - 170, 18), "24 FPS", font=st, fill=(94, 210, 156))
    d.ellipse((W - 196, 24, W - 188, 32), fill=(94, 210, 156))

    # 左：摄像头画面
    feed_x, feed_y, feed_w, feed_h = 24, 80, 1010, 600
    feed = cover(P("public/media/scene/student-lab.jpg"), feed_w, feed_h)
    feed = ImageEnhance.Color(feed).enhance(0.72)
    canvas.paste(feed, (feed_x, feed_y))
    d.rectangle((feed_x, feed_y, feed_x + feed_w, feed_y + feed_h), outline=(34, 44, 54), width=2)

    # 检测框（画面里真实存在的人 / 电脑）
    boxes = [
        (612, 268, 812, 486, "人 0.98"),
        (452, 236, 556, 372, "人 0.96"),
        (300, 240, 396, 366, "人 0.94"),
        (36, 468, 190, 676, "笔记本 0.91"),
        (936, 232, 1022, 366, "人 0.93"),
    ]
    cy = (94, 210, 210)
    for bx, by, bw, bh, label in boxes:
        d.rectangle((feed_x + bx, feed_y + by, feed_x + bw, feed_y + bh), outline=cy, width=3)
        chip(d, feed_x + bx, feed_y + by - 32, label, f(FONT, 18), (7, 20, 22), (94, 210, 210))
        # 角标
        for cx, cy2, dx, dy in (
            (bx, by, 1, 1), (bw, by, -1, 1), (bx, bh, 1, -1), (bw, bh, -1, -1)
        ):
            d.line(
                (feed_x + cx, feed_y + cy2, feed_x + cx + 22 * dx, feed_y + cy2),
                fill=(150, 255, 255), width=4,
            )
            d.line(
                (feed_x + cx, feed_y + cy2, feed_x + cx, feed_y + cy2 + 22 * dy),
                fill=(150, 255, 255), width=4,
            )

    # 画面角标
    d.rectangle((feed_x + 16, feed_y + 14, feed_x + 250, feed_y + 48), fill=(0, 0, 0))
    d.text((feed_x + 28, feed_y + 19), "CAM-01  实时画面", font=f(FONT, 20), fill=(226, 232, 240))

    # 右：检测结果
    px, py, pw = 1060, 80, 516
    rounded(d, (px, py, px + pw, py + 600), 14, fill=(13, 16, 20), outline=(28, 34, 42), width=2)
    d.text((px + 24, py + 22), "本帧检测结果", font=f(FONT_B, 24), fill=(226, 232, 240))
    d.text((px + 24, py + 58), "共 5 个目标 · 置信度阈值 0.80", font=f(FONT, 18), fill=(110, 124, 140))
    d.line((px + 24, py + 92, px + pw - 24, py + 92), fill=(28, 34, 42), width=2)

    rows = [
        ("人", "0.98", 0.98),
        ("人", "0.96", 0.96),
        ("人", "0.94", 0.94),
        ("人", "0.93", 0.93),
        ("笔记本", "0.91", 0.91),
    ]
    y = py + 108
    for name, conf, v in rows:
        d.text((px + 24, y), name, font=f(FONT, 20), fill=(210, 220, 232))
        d.text((px + 120, y), conf, font=f(MONO, 20), fill=(94, 210, 156))
        rounded(d, (px + 210, y + 4, px + pw - 24, y + 18), 7, fill=(26, 32, 40))
        rounded(d, (px + 210, y + 4, px + 210 + int((pw - 234) * v), y + 18), 7, fill=(94, 210, 156))
        y += 46

    d.text((px + 24, py + 372), "推理服务", font=f(FONT, 18), fill=(110, 124, 140))
    for i, line in enumerate((
        "输入    图片流 / 视频流双路",
        "输出    结构化 JSON + 业务回调",
        "部署    已接入客户业务流程",
    )):
        d.text((px + 24, py + 404 + i * 30), line, font=f(FONT, 19), fill=(180, 192, 206))

    # 底栏
    d.rectangle((0, 700, W, H), fill=(11, 13, 17))
    d.line((0, 700, W, 700), fill=(24, 30, 38), width=2)
    foot = f(FONT, 20)
    items = [
        "数据集处理  ·  已完成",
        "模型训练与迭代  ·  已完成",
        "推理服务部署  ·  已完成",
        "业务侧对接  ·  已完成",
    ]
    x = 40
    for it in items:
        d.text((x, 800), it, font=foot, fill=(150, 164, 180))
        x += d.textlength(it, font=foot) + 46
    d.text((W - 320, 800), "有人每天在用的东西", font=f(FONT_B, 20), fill=(94, 210, 156))

    canvas.save(P("public/media/scene/dl-yolo.jpg"), "JPEG", quality=88, optimize=True)
    print("dl-yolo.jpg built")


# ── 2. 爆款复刻工作流智能体 ───────────────────────────────────────────
def build_douyin():
    W, H = 1600, 900
    canvas = Image.new("RGB", (W, H), (10, 10, 12))
    d = ImageDraw.Draw(canvas)

    d.rectangle((0, 0, W, 58), fill=(14, 14, 18))
    d.line((0, 58, W, 58), fill=(30, 30, 36), width=2)
    d.ellipse((26, 24, 38, 36), fill=(222, 140, 170))
    d.text((50, 17), "爆款复刻工作流智能体", font=f(FONT_B, 24), fill=(235, 235, 240))
    d.text((W - 250, 20), "批量生产  ·  不靠人肉", font=f(FONT, 20), fill=(150, 150, 162))

    # 三段流程
    cols = [
        ("01", "爆款源", P("public/media/douyin/7676115863665333169.jpg")),
        ("02", "结构拆解", None),
        ("03", "二创产出", None),
    ]
    cw = 486
    gap = 24
    x0 = 40
    for i, (num, title, _) in enumerate(cols):
        x = x0 + i * (cw + gap)
        rounded(d, (x, 92, x + cw, 752), 16, fill=(14, 15, 19), outline=(30, 32, 40), width=2)
        d.text((x + 24, 116), num, font=f(MONO, 20), fill=(120, 124, 140))
        d.text((x + 66, 112), title, font=f(FONT_B, 24), fill=(235, 235, 240))
        d.line((x + 24, 156, x + cw - 24, 156), fill=(30, 32, 40), width=2)

    # 01 源视频
    x = x0
    thumb = cover(P("public/media/douyin/7676115863665333169.jpg"), 250, 420)
    canvas.paste(thumb, (x + 24, 180))
    d.rectangle((x + 24, 180, x + 274, 600), outline=(52, 54, 62), width=2)
    d.text((x + 24, 622), "已拆解：钩子 · 痛点 · 演示 · 逼单", font=f(FONT, 18), fill=(150, 150, 162))
    d.text((x + 24, 654), "时长 42s · 完播 46.7w", font=f(FONT, 18), fill=(150, 150, 162))
    chip(d, x + 24, 690, "丢进来", f(FONT, 18), (12, 12, 16), (222, 140, 170))

    # 02 拆解
    x = x0 + cw + gap
    segs = [
        ("钩子  0–3s", "冲突前置，一句话说完痛点", 0.95),
        ("痛点  3–8s", "场景化描述 + 实物出镜", 0.82),
        ("演示  8–20s", "步骤拆解，节奏最密", 0.9),
        ("逼单  20–28s", "对比 + 限时，给出理由", 0.7),
    ]
    y = 186
    for name, detail, v in segs:
        rounded(d, (x + 24, y, x + cw - 24, y + 116), 12, fill=(19, 20, 25), outline=(32, 34, 42), width=2)
        d.text((x + 44, y + 18), name, font=f(FONT_B, 22), fill=(235, 235, 240))
        d.text((x + 44, y + 54), detail, font=f(FONT, 18), fill=(148, 148, 160))
        rounded(d, (x + 44, y + 84, x + cw - 44, y + 96), 6, fill=(30, 32, 40))
        rounded(d, (x + 44, y + 84, x + 44 + int((cw - 88) * v), y + 96), 6, fill=(222, 140, 170))
        y += 130

    # 03 产出
    x = x0 + 2 * (cw + gap)
    covers = [
        "public/media/douyin/7678756921637716465.jpg",
        "public/media/douyin/7688227097130823601.jpg",
        "public/media/douyin/7700608943311332091.jpg",
        "public/media/douyin/7699866315155411377.jpg",
    ]
    tw = 206
    for i, c in enumerate(covers):
        cx = x + 24 + (i % 2) * (tw + 18)
        cyy = 180 + (i // 2) * (252 + 14)
        th = cover(P(c), tw, 252)
        canvas.paste(th, (cx, cyy))
        d.rectangle((cx, cyy, cx + tw, cyy + 252), outline=(52, 54, 62), width=2)
        
    chip(d, x + 24, 700, "脚本已生成", f(FONT, 18), (12, 12, 16), (94, 210, 156))
    chip(d, x + 150, 700, "分镜已生成", f(FONT, 18), (12, 12, 16), (94, 210, 156))
    chip(d, x + 276, 700, "可批量跑", f(FONT, 18), (12, 12, 16), (94, 210, 156))

    # 底栏
    d.rectangle((0, 776, W, H), fill=(13, 13, 17))
    d.line((0, 776, W, 776), fill=(28, 28, 34), width=2)
    steps = ["①  丢一条爆款", "②  自动拆结构", "③  出脚本分镜", "④  批量生产"]
    x = 40
    for s in steps:
        d.text((x, 820), s, font=f(FONT, 22), fill=(200, 200, 210))
        x += d.textlength(s, font=f(FONT, 22)) + 48
    d.text((W - 350, 820), "可复用的工作流，不是一次性演示", font=f(FONT_B, 22), fill=(222, 140, 170))

    canvas.save(P("public/media/scene/dl-douyin-agent.jpg"), "JPEG", quality=88, optimize=True)
    print("dl-douyin-agent.jpg built")


if __name__ == "__main__":
    build_yolo()
    build_douyin()
