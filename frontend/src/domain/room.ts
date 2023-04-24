import { UserServices } from './user';

export type Room = {
    name: string;
    feature: string;
    description: string;
    pic: string;
    available?: boolean;
}

export type RoomWithServices = {
  roomName: RoomId;
  services: UserServices[];
}

export const ROOMS: Room[] = [
  {
    name: 'Дом-комфорт',
    description: 'Место, где белки станут вашими новыми соседями! Домик оснащен всем, что нужно для комфортного проживания, включая личный туалет, стулья, столы. Забронируйте этот дом уже сегодня и станьте частью лесной жизни, мы ждем вас, друзья!',
    feature: 'Отличный вид',
    available: true,
    pic: '/rooms/comfort.png',
  },
  {
    name: 'Дом-стандарт',
    description: 'Это идеальное место для того, чтобы насладиться жизнью без интернета. Он расположен в самом центре леса, а внутри есть все необходимое для выживания. Забронируйте этот домик и проведите время вдали от городской суеты!',
    feature: 'Туалет-free',
    available: true,
    pic: '/rooms/standart.png',
  },
  {
    name: 'Eco-домик',
    description: 'Никаких забот о туалете и гигиене, только  природа и безлимитный доступ к деревьям! Здесь вы сможете наслаждаться чистым воздухом и красивыми видами. Будьте готовы к приключениям и новым экспериментам в стиле eco-friendly!',
    feature: 'Туалет-free',
    pic: '/rooms/eco.png',
  },
  {
    name: 'Гамак-домик',
    description: 'Забудьте о скучных кроватях, жестких матрасах и о стенах как о концепции. Насладитесь свежим воздухом, покачиваясь в уютных гамаках. Забронируйте этот гамак-домик и приготовьтесь к самому расслабленному отдыху в своей жизни!',
    feature: 'Редкая находка',
    pic: '/rooms/gamak.png',
  },
  {
    name: 'Место в хостеле',
    description: 'В нашем хостеле всегда много людей, поэтому вы сможете поделиться своими впечатлениями с другими гостями или пообщаться за ужином в столовой. Уже захотелось побороться за нижнюю кровать или вам больше нравится сверху?',
    feature: 'Wi-fi в номере',
    pic: '/rooms/hostel.png',
  },
  {
    name: 'Дом-люкс',
    description: 'Хотите ловить рыбу прямо с веранды? Забронируйте большой домик люкс с выходом к озеру и насладитесь спокойствием природы. Как говорится, «лучше один раз увидеть, чем сто раз услышать, поэтому не упустите свой шанс!',
    feature: 'Первая линия',
    pic: '/rooms/luxury.png',
  },
];
