/** @jsxImportSource @revideo/2d/lib */
import { Rect, Txt, makeScene2D } from "@revideo/2d";
import { all, createRef, waitFor } from "@revideo/core";

export default makeScene2D("masaa-job-motion", function* (view) {
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const card1 = createRef<Rect>();
  const card2 = createRef<Rect>();
  const card3 = createRef<Rect>();
  const card4 = createRef<Rect>();
  const cta = createRef<Rect>();

  view.add(
    <Rect width={"100%"} height={"100%"} fill={"#031C18"}>
      <Rect
        width={900}
        height={900}
        radius={450}
        fill={"#0A5B45"}
        opacity={0.22}
        position={[420, -720]}
      />
      <Rect
        width={700}
        height={700}
        radius={350}
        fill={"#F6B744"}
        opacity={0.08}
        position={[-480, 620]}
      />

      <Txt
        ref={title}
        text={"مَسعى وظائف"}
        fontFamily={"Arial, sans-serif"}
        fontSize={112}
        fontWeight={800}
        fill={"#68E8BC"}
        opacity={0}
        position={[0, -650]}
      />
      <Txt
        ref={subtitle}
        text={"فرص وظيفية موثوقة من مصادرها الرسمية"}
        fontFamily={"Arial, sans-serif"}
        fontSize={46}
        fontWeight={600}
        fill={"#FFFFFF"}
        opacity={0}
        position={[0, -505]}
      />

      <Rect ref={card1} width={760} height={190} radius={38} fill={"#F7FBF9"} opacity={0} position={[0, -210]}>
        <Txt text={"حكومي"} fontFamily={"Arial, sans-serif"} fontSize={58} fontWeight={800} fill={"#0A5B45"} />
      </Rect>
      <Rect ref={card2} width={760} height={190} radius={38} fill={"#F7FBF9"} opacity={0} position={[0, 15]}>
        <Txt text={"عسكري"} fontFamily={"Arial, sans-serif"} fontSize={58} fontWeight={800} fill={"#0A5B45"} />
      </Rect>
      <Rect ref={card3} width={760} height={190} radius={38} fill={"#F7FBF9"} opacity={0} position={[0, 240]}>
        <Txt text={"شركات"} fontFamily={"Arial, sans-serif"} fontSize={58} fontWeight={800} fill={"#0A5B45"} />
      </Rect>
      <Rect ref={card4} width={760} height={190} radius={38} fill={"#F7FBF9"} opacity={0} position={[0, 465]}>
        <Txt text={"عن بُعد"} fontFamily={"Arial, sans-serif"} fontSize={58} fontWeight={800} fill={"#0A5B45"} />
      </Rect>

      <Rect ref={cta} width={760} height={150} radius={75} fill={"#F6B744"} opacity={0} position={[0, 760]}>
        <Txt text={"ابدأ مسعاك اليوم"} fontFamily={"Arial, sans-serif"} fontSize={48} fontWeight={900} fill={"#031C18"} />
      </Rect>
    </Rect>,
  );

  yield* all(
    title().opacity(1, 0.5),
    title().position.y(-610, 0.5),
    subtitle().opacity(1, 0.7),
  );

  yield* all(card1().opacity(1, 0.35), card1().scale(1.02, 0.35));
  yield* all(card2().opacity(1, 0.35), card2().scale(1.02, 0.35));
  yield* all(card3().opacity(1, 0.35), card3().scale(1.02, 0.35));
  yield* all(card4().opacity(1, 0.35), card4().scale(1.02, 0.35));

  yield* all(cta().opacity(1, 0.45), cta().scale(1.03, 0.45));
  yield* waitFor(2.2);

  yield* all(
    title().opacity(0, 0.35),
    subtitle().opacity(0, 0.35),
    card1().opacity(0, 0.35),
    card2().opacity(0, 0.35),
    card3().opacity(0, 0.35),
    card4().opacity(0, 0.35),
    cta().opacity(0, 0.35),
  );
  yield* waitFor(0.25);
});
