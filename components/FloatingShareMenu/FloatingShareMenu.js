
import { shareIcons } from "../../utils/dataSource";
import FloatingShareMenuStyles from "./FloatingShareMenu.module.scss";

const FloatingShareMenu = ({ url }) => {
 
  return (
    <div className={`${FloatingShareMenuStyles.floating_share_menu}`}>
      {shareIcons.map((item, index) => (
        <p className={`${FloatingShareMenuStyles.share_icon}`}>
          <item.btn
            children={<item.icon size={32} round={`true`} />}
            url={url}
          />
        </p>
      ))}
    </div>
  );
};

export default FloatingShareMenu;
