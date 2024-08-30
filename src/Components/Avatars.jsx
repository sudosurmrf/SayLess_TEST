export const selectAvatar = (id) => {
  return avatarArray[id].image
}

export const avatarArray = [
{image: <img className="user-avatar-image" src="images\avatars\avatar-avatar.jpg" alt="some image"/>},
{image: <img className="user-avatar-image" src="images\avatars\avatar-blocks.jpg" alt="A bunch of blocks"/>},
{image: <img className="user-avatar-image" src="images\avatars\avatar cactus.jpg" alt="A cactus"/>},
{image: <img className="user-avatar-image" src="images\avatars\avatar-car.jpg" alt="A car"/>},
{image: <img className="user-avatar-image" src="images\avatars\avatar-dog.jpg" alt="A dog"/>}
];