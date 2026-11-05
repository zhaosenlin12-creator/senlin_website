import json

PHOTO = (
    "shot on 35mm full-frame camera, 35mm or 50mm lens, f/2.0 shallow depth of field, "
    "natural window light, realistic skin texture with visible pores and natural imperfection, "
    "honest documentary color grading, no plastic skin, no over-smoothed AI look, "
    "no text, no letters, no numbers, no Chinese characters, no watermark, no logo, no signage"
)


def job(name, out, prompt):
    return {
        "name": name,
        "out": out,
        "prompt": prompt + ", " + PHOTO,
    }


JOBS = [
    job(
        "dl-yolo",
        "public/media/scene/dl-yolo.jpg",
        "Photorealistic scene of a real computer vision detection system running inside a "
        "Chinese factory workshop: a wide overhead security camera view of a conveyor line "
        "carrying cardboard boxes and metal parts, with thin glowing cyan rectangular "
        "detection boxes and small keypoint skeleton markers drawn over the objects, faint "
        "tracking trails. In the near foreground, softly out of focus, a Chinese engineer in a "
        "blue work jacket watches a monitor. Real industrial lighting, slight sensor grain, "
        "deep focus with soft foreground blur",
    ),
    job(
        "dl-douyin-agent",
        "public/media/scene/dl-douyin-agent.jpg",
        "Photorealistic over the shoulder photograph of a Chinese content creator desk in a "
        "modern home studio: a large monitor showing a video editing timeline packed with "
        "colorful clips, a second screen showing a grid of storyboard thumbnails, the "
        "creator's hands on the keyboard, a ring light and a microphone softly out of focus in "
        "the background. Warm practical lamp light mixed with cool screen glow",
    ),
    job(
        "k12-stage",
        "public/media/scene/k12-stage.jpg",
        "Candid documentary photograph inside a modern Chinese school auditorium during a "
        "student technology showcase. A 12 year old Chinese boy in a casual hoodie stands on "
        "a small stage holding a wireless microphone, presenting his own game project on a "
        "large LED screen behind him. Rows of Chinese parents and teachers seated in the "
        "audience, softly blurred. Warm mixed stage and daylight lighting, authentic "
        "unposed moment",
    ),
    job(
        "camp-project",
        "public/media/scene/camp-project.jpg",
        "Candid documentary photograph of a Chinese boy around 11 years old debugging a small "
        "wheeled robot car on a wooden classroom table, an open laptop beside him showing a "
        "code editor, wires and small parts scattered around, other students blurred in the "
        "background of a Chinese classroom, bright daylight from tall windows",
    ),
    job(
        "adult-1on1",
        "public/media/scene/adult-1on1.jpg",
        "Candid documentary photograph of a Chinese man in his late twenties working at a small "
        "desk in a bright home office, focused on a laptop, while a Chinese male teacher in "
        "his thirties leans in over his shoulder and points at the screen. Warm morning light "
        "through a window, books and a small plant on the shelf behind them",
    ),
    job(
        "dl-yolo",
        "public/media/scene/dl-yolo.jpg",
        "Photorealistic scene of a real computer vision detection system running inside a "
        "Chinese factory workshop: a wide overhead security camera view of a conveyor line "
        "carrying cardboard boxes and metal parts, with thin glowing cyan rectangular "
        "detection boxes and small keypoint skeleton markers drawn over the objects, faint "
        "tracking trails. In the near foreground, softly out of focus, a Chinese engineer in a "
        "blue work jacket watches a monitor. Real industrial lighting, slight sensor grain, "
        "deep focus with soft foreground blur",
    ),
    job(
        "dl-douyin-agent",
        "public/media/scene/dl-douyin-agent.jpg",
        "Photorealistic over the shoulder photograph of a Chinese content creator desk in a "
        "modern home studio: a large monitor showing a video editing timeline packed with "
        "colorful clips, a second screen showing a grid of storyboard thumbnails, the "
        "creator's hands on the keyboard, a ring light and a microphone softly out of focus in "
        "the background. Warm practical lamp light mixed with cool screen glow",
    ),
    job(
        "dl-enterprise",
        "public/media/scene/dl-enterprise.jpg",
        "Photorealistic photograph of a corporate AI training session in a modern Chinese "
        "office meeting room: about ten Chinese office workers in smart casual clothes seated "
        "around a long table with laptops and notebooks, a Chinese male instructor standing "
        "beside a large projection screen showing colorful charts and diagrams, everyone "
        "engaged and taking notes. Glass walls, indoor plants, large windows with soft daylight",
    ),
    job(
        "dl-office",
        "public/media/scene/dl-office.jpg",
        "Photorealistic candid photograph of a Chinese woman in her thirties working at a "
        "tidy home office desk, an open laptop showing a spreadsheet and a document, a second "
        "monitor showing a simple chat window, an open paper notebook and a glass of coffee, "
        "soft morning window light and green plants. Relaxed natural expression",
    ),
    job(
        "dl-handoff",
        "public/media/scene/dl-handoff.jpg",
        "Photorealistic photograph of a project handover moment in a Chinese tech office: two "
        "Chinese people, one standing and one seated, both looking at a laptop that shows a "
        "working web dashboard, printed documents and two takeaway coffee cups on the desk, "
        "bright neutral office interior with large windows",
    ),
]


if __name__ == "__main__":
    print(json.dumps(JOBS, ensure_ascii=False, indent=2))
