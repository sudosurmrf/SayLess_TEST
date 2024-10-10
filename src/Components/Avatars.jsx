export const selectAvatar = (id) => {
  return avatarArray[id]
}

export const avatarArray = [
  { id: 1, className: "user-avatar-image", image: "/images/avatars/avatar-avatar.jpg", alt: "some image" },
  { id: 2, className: "user-avatar-image", image: "/images/avatars/avatar-blocks.jpg", alt: "A bunch of blocks" },
  { id: 3, className: "user-avatar-image", image: "/images/avatars/avatar cactus.jpg", alt: "A cactus" },
  { id: 4, className: "user-avatar-image", image: "/images/avatars/avatar-car.jpg", alt: "A car" },
  { id: 5, className: "user-avatar-image", image: "/images/avatars/avatar-dog.jpg", alt: "A dog" }
];