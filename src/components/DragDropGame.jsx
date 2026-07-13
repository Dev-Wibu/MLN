import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import confetti from 'canvas-confetti';

const initialCards = [
  { id: 'card-1', content: 'Lực lượng lãnh đạo thông qua Đảng' },
  { id: 'card-2', content: 'Lực lượng đông đảo nhất' },
  { id: 'card-3', content: 'Đóng vai trò quyết định phát triển khoa học - công nghệ' },
  { id: 'card-4', content: 'Lực lượng tổ chức sản xuất, kinh doanh' },
  { id: 'card-5', content: 'Đóng góp đa dạng vào sự ổn định xã hội' }
];

const classes = [
  { id: 'box-worker', title: 'Công nhân', matchId: 'card-1', color: 'border-primary' },
  { id: 'box-farmer', title: 'Nông dân', matchId: 'card-2', color: 'border-secondary' },
  { id: 'box-intellectual', title: 'Trí thức', matchId: 'card-3', color: 'border-tertiary' },
  { id: 'box-entrepreneur', title: 'Doanh nhân', matchId: 'card-4', color: 'border-primary' },
  { id: 'box-others', title: 'Các tầng lớp khác', matchId: 'card-5', color: 'border-outline' }
];

const DragDropGame = () => {
  const [cards, setCards] = useState(initialCards);
  const [boxes, setBoxes] = useState(classes.map(c => ({ ...c, items: [] })));

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === 'card-pool' && destination.droppableId !== 'card-pool') {
      const draggedCard = cards[source.index];
      const targetBox = boxes.find(b => b.id === destination.droppableId);
      
      if (draggedCard.id === targetBox.matchId) {
        // Correct match
        const newCards = Array.from(cards);
        newCards.splice(source.index, 1);
        setCards(newCards);

        const newBoxes = boxes.map(b => {
          if (b.id === destination.droppableId) {
            return { ...b, items: [...b.items, draggedCard] };
          }
          return b;
        });
        setBoxes(newBoxes);

        if (newCards.length === 0) {
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">Trò chơi 1: Đặt đúng vị trí</h2>
      <p className="text-center mb-8 text-on-surface-variant">Kéo thả các đặc điểm vào đúng giai cấp tương ứng.</p>

      <div className="flex flex-col gap-8">
        <Droppable droppableId="card-pool" direction="horizontal">
          {(provided) => (
            <div 
              ref={provided.innerRef} 
              {...provided.droppableProps}
              className="flex flex-wrap gap-4 justify-center min-h-[100px] p-4 bg-surface-container rounded-xl"
            >
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-3 rounded shadow cursor-grab border border-outline-variant max-w-[200px] text-center text-sm"
                    >
                      {card.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {boxes.map(box => (
            <Droppable key={box.id} droppableId={box.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-xl border-t-4 bg-surface-container-low min-h-[200px] flex flex-col ${box.color} ${snapshot.isDraggingOver ? 'bg-surface-variant' : ''}`}
                >
                  <h3 className="font-bold text-center mb-4">{box.title}</h3>
                  <div className="flex flex-col gap-2 flex-1">
                    {box.items.map((item, idx) => (
                      <div key={idx} className="bg-primary-container text-on-primary-container p-2 rounded text-xs text-center shadow-sm">
                        {item.content}
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
        
        {cards.length === 0 && (
          <div className="text-center mt-4">
            <button 
              onClick={() => {
                setCards(initialCards);
                setBoxes(classes.map(c => ({ ...c, items: [] })));
              }}
              className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:opacity-90"
            >
              Chơi lại
            </button>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default DragDropGame;
