import { observer } from "mobx-react-lite";
import store from "@/store";
import CardComponent from "@/components/Card/Card";

const CardList = () => {
  const { cards } = store.cardEditorStore;

  const dragging = (event: any) => {};
  return (
    <div>
      {cards.map((card) => {
        return (
          <div
            key={card.id}
            style={{ height: 200, display: "flex", overflow: "hidden" }}
            onDragStart={(e) => {
              e.dataTransfer.setData("id", card.id);
            }}
            onDrag={dragging}
            draggable="true"
          >
            <CardComponent key={card.id} {...card} />
          </div>
        );
      })}
    </div>
  );
};

export default observer(CardList);
