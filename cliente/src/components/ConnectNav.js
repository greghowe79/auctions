import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";

const { Meta } = Card;

const ConnectNav = () => {
  const { autenticazione } = useSelector((state) => ({ ...state }));
  const { user } = autenticazione;

  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{user.name[0]}</Avatar>}
          title={user.name}
          description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>

      {autenticazione &&
        autenticazione.user &&
        autenticazione.user.stripe_seller &&
        autenticazione.user.stripe_seller.charges_enabled && (
          <>
            <div>Saldo in sospeso</div>
            <div>Impostazioni di pagamento</div>
          </>
        )}
    </div>
  );
};

export default ConnectNav;
