export const selectBadges = (badgesArray,idArray) => {
  const selectedImages = [];
  for (let i = 0; i < idArray.length - 1; i++){
    const badgeIndex = idArray[i].id
    selectedImages.push(badgesArray[badgeIndex])
  }
  return selectedImages
}

export const winBadgesArray = [
  { id: 1, className: "user-badge-image", image: "/images/badges/badge-game-1.png", alt: "1 win badge" },
  { id: 2, className: "user-badge-image", image: "/images/badges/badge-game-5.png", alt: "5 win badge" },
  { id: 3, className: "user-badge-image", image: "/images/badges/badge-game-10.png", alt: "10 win badge" },
  { id: 4, className: "user-badge-image", image: "/images/badges/badge-game-25.png", alt: "25 win badge" },
  { id: 5, className: "user-badge-image", image: "/images/badges/badge-game-50.png", alt: "50 win badge" },
  { id: 6, className: "user-badge-image", image: "/images/badges/badge-game-100.png", alt: "100 win badge" },
  { id: 7, className: "user-badge-image", image: "/images/badges/badge-game-500.png", alt: "500 win badge" },
  { id: 8, className: "user-badge-image", image: "/images/badges/badge-game-1000.png", alt: "1000 win badge" }
]
export const playBadgesArray = [
  { id: 1, className: "user-badge-image", image: "/images/badges/badge-win-1.png", alt: "1 win badge" },
  { id: 2, className: "user-badge-image", image: "/images/badges/badge-win-5.png", alt: "5 play badge" },
  { id: 3, className: "user-badge-image", image: "/images/badges/badge-win-10.png", alt: "10 play badge" },
  { id: 4, className: "user-badge-image", image: "/images/badges/badge-win-25.png", alt: "25 play badge" },
  { id: 5, className: "user-badge-image", image: "/images/badges/badge-win-50.png", alt: "50 play badge" },
  { id: 6, className: "user-badge-image", image: "/images/badges/badge-win-100.png", alt: "100 play badge" },
  { id: 7, className: "user-badge-image", image: "/images/badges/badge-win-500.png", alt: "500 play badge" },
  { id: 8, className: "user-badge-image", image: "/images/badges/badge-win-1000.png", alt: "1000 play badge" }
];