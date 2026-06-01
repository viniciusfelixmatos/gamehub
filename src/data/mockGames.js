export const mockGames = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  name: `Epic Game Title ${index + 1}`,
  background_image: `https://picsum.photos/600/400?random=${index}`,
  rating: (Math.random() * 2 + 3).toFixed(1), // Notas entre 3.0 e 5.0
  parent_platforms: [
    { platform: { name: "PC", id: 1 } },
    { platform: { name: "PlayStation", id: 2 } },
    { platform: { name: "Xbox", id: 3 } },
  ],
}));
