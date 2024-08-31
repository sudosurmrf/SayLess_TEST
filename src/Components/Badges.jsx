export const selectBadges = (badgesArray,idArray) => {
  const selectedImages = [];
  for (let i = 0; i < idArray.length - 1; i++){
    const badgeIndex = idArray[i].id
    selectedImages.push(badgesArray[badgeIndex])
  }
  return selectedImages
}

export const winBadgesArray = [
{image: <img className="user-badge-image" src="images\badges\badge-game-1.png" alt="1 win badge"/>},
{image: <img className="user-badge-image" src="images\badges\badge-game-5.png" alt="5 win badge"/>},
{image: <img className="user-badge-image" src="images\badges\badge-game-10.png" alt="10 win badge"/>},
{image: <img className="user-badge-image" src="images\badges\badge-game-25.png" alt="25 win badge"/>},
{image: <img className="user-badge-image" src="images\badges\badge-game-50.png" alt="50 win badge"/>},
{image: <img className="user-badge-image" src="images\badges\badge-game-100.png" alt="100 win badge"/>},
{image: <img className="user-badge-image" src="images\badges\badge-game-500.png" alt="500 win badge"/>},
{image: <img className="user-badge-image" src="images\badges\badge-game-1000.png" alt="1000 win badge"/>}
];

export const playBadgesArray = [
{image: <img className="user-badge-image" src="images/badges/badge-win-1.png" alt="1 play badge"/>},
{image: <img className="user-badge-image" src="images/badges/badge-win-5.png" alt="5 play badge"/>},
{image: <img className="user-badge-image" src="images/badges/badge-win-10.png" alt="10 play badge"/>},
{image: <img className="user-badge-image" src="images/badges/badge-win-25.png" alt="25 play badge"/>},
{image: <img className="user-badge-image" src="images/badges/badge-win-50.png" alt="50 play badge"/>},
{image: <img className="user-badge-image" src="images/badges/badge-win-100.png" alt="100 play badge"/>},
{image: <img className="user-badge-image" src="images/badges/badge-win-500.png" alt="500 play badge"/>},
{image: <img className="user-badge-image" src="images/badges/badge-win-1000.png" alt="1000 play badge"/>}
];