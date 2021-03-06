import { shareIcons } from "../../utils/dataSource";
import FloatingShareMenuStyles from "./FloatingShareMenu.module.scss";

const FloatingShareMenu = ({ url }) => {
  return (
    <div className={`${FloatingShareMenuStyles.floating_share_menu}`}>
      {shareIcons.map((item) => (
        <p key={item.id} className={`${FloatingShareMenuStyles.share_icon}`}>
          <item.btn
            quote='https://blog-samirasaad.vercel.ap'
            children={<item.icon size={32} round={`true`} />}
            url={url}
          />
        </p>
      ))}
    </div>
  );
};

export default FloatingShareMenu;
