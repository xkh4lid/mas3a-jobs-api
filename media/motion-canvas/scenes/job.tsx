import {makeScene2D, Rect, Txt} from "@motion-canvas/2d";
import {all, createRef} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  const title = createRef<Txt>();
  const card = createRef<Rect>();

  view.add(
    <Rect ref={card} width={1080} height={1920} fill={"#07342C"} opacity={0}>
      <Txt ref={title} text={"مَسعى وظائف"} fill={"#68E8BC"} fontSize={90} fontWeight={800} y={-550} opacity={0}/>
      <Txt text={"فرصة وظيفية جديدة"} fill={"#F6B744"} fontSize={58} y={-240}/>
      <Txt text={"التقديم من المصدر الرسمي"} fill={"#FFFFFF"} fontSize={42} y={520}/>
    </Rect>
  );

  yield* all(card().opacity(1, 0.8), title().opacity(1, 0.8), title().y(-500, 0.8));
});
