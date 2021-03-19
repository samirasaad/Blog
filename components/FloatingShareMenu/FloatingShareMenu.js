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
import FloatingShareMenuStyles from "./FloatingShareMenu.module.scss";

const FloatingShareMenu = ({ url }) => {
  return (
    <div className={`${FloatingShareMenuStyles.floating_share_menu}`}>
      <p className={`${FloatingShareMenuStyles.share_icon}`}>
        <FacebookShareButton
          children={<FacebookIcon size={32} round={`true`} />}
          url={url}
        />
      </p>
      <p className={`${FloatingShareMenuStyles.share_icon}`}>
        <LinkedinShareButton
          children={<LinkedinIcon size={32} round={`true`} />}
          url={url}
        />
      </p>

      <p className={`${FloatingShareMenuStyles.share_icon}`}>
        <TwitterShareButton
          children={<TwitterIcon size={32} round={`true`} />}
          url={url}
        />
      </p>

      <p className={`${FloatingShareMenuStyles.share_icon}`}>
        <WhatsappShareButton
          children={<WhatsappIcon size={32} round={`true`} />}
          url={url}
        />
      </p>
    </div>
  );
};

export default FloatingShareMenu;
