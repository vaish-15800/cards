import React, { useEffect, useRef, useState } from "react";
import "./Cart.css";

const App = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            setCurrentCard(index);
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const cards = [
    {
      id: 1,
      title: "Step 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, saepe.",
    },
    {
      id: 2,
      title: "Step 2",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, saepe.",
    },
    {
      id: 3,
      title: "Step 3",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, saepe.Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, saepe.",
    },
  ];

  return (
    <div className="container">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`card-info ${index % 2 === 0 ? "left" : "right"} ${
            currentCard === index ? "visible" : "hidden"
          }`}
          ref={(el) => (cardRefs.current[index] = el)}
        >
          <div className="card">
            <h2>{card.title}</h2>
          </div>
          <div className="info">
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
