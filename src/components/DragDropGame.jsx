import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import confetti from 'canvas-confetti';

const initialCards = [
  { id: 'card-1', content: 'Lực lượng lãnh đạo thông qua Đảng' },
  { id: 'card-2', content: 'Lực lượng đông đảo nhất' },
  { id: 'card-3', content: 'Đóng vai trò quyết định phát triển khoa học - công nghệ' },
  { id: 'card-4', content: 'Lực lượng tổ chức sản xuất, kinh doanh' },
  { id: 'card-5', content: 'Đóng góp đa dạng vào sự ổn định xã hội' },
  // Decoy cards
  { id: 'card-6', content: 'Lực lượng bảo vệ an ninh biên giới' },
  { id: 'card-7', content: 'Sáng tạo giá trị văn hóa nghệ thuật thuần túy' },
  { id: 'card-8', content: 'Lực lượng nòng cốt của cách mạng' }
];

const classes = [
  { id: 'box-worker', title: 'Công nhân', matchId: 'card-1', color: 'border-primary' },
  { id: 'box-farmer', title: 'Nông dân', matchId: 'card-2', color: 'border-secondary' },
  { id: 'box-intellectual', title: 'Trí thức', matchId: 'card-3', color: 'border-tertiary' },
  { id: 'box-entrepreneur', title: 'Doanh nhân', matchId: 'card-4', color: 'border-primary' },
  { id: 'box-others', title: 'Các tầng lớp khác', matchId: 'card-5', color: 'border-outline' }
];

const DragDropGame = ({ onComplete }) => {
  const [cards, setCards] = useState(initialCards);
  const [boxes, setBoxes] = useState(classes.map(c => ({ ...c, items: [] })));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onDragEnd = (result) => {
    if (isSubmitted) return;
    if (!result.destination) return;

    const { source, destination } = result;

    const newCards = Array.from(cards);
    const newBoxes = Array.from(boxes);

    // Find and remove dragged item
    let draggedItem;
    if (source.droppableId === 'card-pool') {
      draggedItem = newCards[source.index];
      newCards.splice(source.index, 1);
    } else {
      const sourceBoxIndex = newBoxes.findIndex(b => b.id === source.droppableId);
      draggedItem = newBoxes[sourceBoxIndex].items[source.index];
      newBoxes[sourceBoxIndex].items.splice(source.index, 1);
    }

    // Add dragged item to destination
    if (destination.droppableId === 'card-pool') {
      newCards.splice(destination.index, 0, draggedItem);
    } else {
      const destBoxIndex = newBoxes.findIndex(b => b.id === destination.droppableId);
      newBoxes[destBoxIndex].items.splice(destination.index, 0, draggedItem);
    }

    setCards(newCards);
    setBoxes(newBoxes);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    
    // Check each box
    boxes.forEach(box => {
      // Box is correct if it contains exactly the matchId and no others, 
      // or at least contains the matchId (let's say it must contain the correct one)
      // For strictness: must contain exactly 1 card and it's the correct one.
      if (box.items.length === 1 && box.items[0].id === box.matchId) {
        correctCount++;
      } else if (box.items.some(item => item.id === box.matchId) && box.items.length === 1) {
         // This is redundant but keeping it clear
         correctCount++;
      }
    });

    const score = correctCount * 20; // 5 boxes * 20 = 100 max
    if (score === 100) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }
    
    if (onComplete) {
       // Small delay to let user see result
       setTimeout(() => onComplete(score), 1500);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">Trò chơi 1: Đặt đúng vị trí</h2>
      <p className="text-center mb-8 text-on-surface-variant">Kéo thả đặc điểm vào giai cấp tương ứng. Cẩn thận với các đáp án nhiễu!</p>

      <div className="flex flex-col gap-8">
        <Droppable droppableId="card-pool" direction="horizontal" isDropDisabled={isSubmitted}>
          {(provided) => (
            <div 
              ref={provided.innerRef} 
              {...provided.droppableProps}
              className="flex flex-wrap gap-4 justify-center min-h-[100px] p-4 bg-surface-container rounded-xl"
            >
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index} isDragDisabled={isSubmitted}>
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
            <Droppable key={box.id} droppableId={box.id} isDropDisabled={isSubmitted}>
              {(provided, snapshot) => {
                 let boxBg = isSubmitted ? 
                    (box.items.length === 1 && box.items[0].id === box.matchId ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500') 
                    : (snapshot.isDraggingOver ? 'bg-surface-variant' : 'bg-surface-container-low');
                 
                 return (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-xl border-t-4 min-h-[200px] flex flex-col ${box.color} ${boxBg} transition-colors`}
                >
                  <h3 className="font-bold text-center mb-4">{box.title}</h3>
                  <div className="flex flex-col gap-2 flex-1">
                    {box.items.map((item, idx) => (
                      <Draggable key={item.id} draggableId={item.id} index={idx} isDragDisabled={isSubmitted}>
                        {(provided) => (
                          <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-primary-container text-on-primary-container p-2 rounded text-xs text-center shadow-sm cursor-grab"
                          >
                            {item.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}}
            </Droppable>
          ))}
        </div>
        
        {!isSubmitted && (
          <div className="text-center mt-4">
            <button 
              onClick={handleSubmit}
              className="bg-primary text-on-primary px-8 py-3 rounded-lg font-bold hover:opacity-90 shadow-md text-lg"
            >
              Nộp Bài
            </button>
          </div>
        )}
      </div>
    </DragDropContext>
  );
};

export default DragDropGame;
