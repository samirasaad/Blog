import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const socialIconList = [
  {
    id: 1,
    imgSrc: "/assets/images/gitHub.svg",
    alt: "github Logo",
    href: "https://github.com/samirasaad",
  },
  {
    id: 2,
    imgSrc: "/assets/images/linkedin.svg",
    alt: "linkedin Logo",
    href: "https://www.linkedin.com/in/samira-saad-13241b167/",
  },
];
const headerInfo = [
  {
    id: 1,
    text:
      "I can shake off everything as I write; my sorrows disappear, my courage is reborn.",
    author: "Anne Frank",
    imgURL: "/assets/images/header1.jpg",
  },
  {
    id: 2,
    text: "Let me live, love, and say it well in good sentences.",
    author: "Sylvia Plath",
  },
  {
    id: 3,
    text:
      "Reading should not be presented to children as a chore, a duty. It should be offered as a gift.",
    author: "Kate DiCamillo",
  },
  {
    id: 4,
    text:
      "Let’s be reasonable and add an eighth day to the week that is devoted exclusively to reading.",
    author: "Lena Dunham",
  },
  {
    id: 5,
    text:
      "Books and doors are the same thing. You open them, and you go through into another world.",
    author: "Jeanette Winterson",
  },
];

const shareIcons = [
  {
    id: 1,
    btn: FacebookShareButton,
    icon: FacebookIcon,
  },
  {
    id: 2,
    btn: LinkedinShareButton,
    icon: LinkedinIcon,
  },
  {
    id: 3,
    btn: TwitterShareButton,
    icon: TwitterIcon,
  },
  {
    id: 4,
    btn: WhatsappShareButton,
    icon: WhatsappIcon,
  },
];
export { socialIconList, headerInfo, shareIcons };
