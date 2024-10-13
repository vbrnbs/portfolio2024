'use client'

import { useState } from 'react';
import { Card } from '@/lib/interfaces';
import { Button } from './ui/button';
import { ExpandableCard } from './ui/ExpandableCard';

export default function BlogPostFilter({ cards }: { cards: Card[] }) {
  const [filter, setFilter] = useState<string | null>(null);
  const [filteredCards, setFilteredCards] = useState<Card[]>(cards);
  
  const categories = Array.from(new Set(cards.flatMap(card => card.categories.map(category => category.title))));

  const handleFilter = (category: string | null) => {
    setFilter(category);
    const filteredPosts = cards.filter(card => 
      category ? card.categories.some(cat => cat.title === category) : true
    );
    console.log(filteredPosts);
    setFilteredCards(filteredPosts);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 p-4">
        {
          <Button 
            variant={filter === null ? "default" : "outline"}
            onClick={() => handleFilter(null)}
          >
            All
          </Button>
        }
        {categories.map((category, index) => (
          <Button 
            key={index} 
            variant={filter === category ? "default" : "outline"}
            onClick={() => handleFilter(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      {/* <ExpandableCard cards={filteredCards} setFilteredCards={setFilteredCards}/> */}
      <ExpandableCard cards={filteredCards} />
    </div>
  );
}
