import { currencyFormatter } from "../../actions/stripe";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

const SmallCard = ({ a, owner = false, showViewMoreButton = true }) => {
  const history = useHistory();

  return (
    <>
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col -md-4">
            {a.image && a.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/auction/image/${a._id}`}
                alt="auction"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
                alt="default auction"
                className="card-image img img-fluid"
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {a.title}{" "}
                <span className="float-right text-primary">
                  {currencyFormatter({
                    amount: a.startingOffer,
                    currency: "usd",
                  })}
                </span>
              </h3>
              <p className="card-text">{`{${a.description.substring(
                1,
                400
              )}...`}</p>
              <p className="card-text">
                End Auction {new Date(a.endTime).toLocaleDateString()} at{" "}
                {new Date(a.endTime).toLocaleTimeString()}
              </p>

              <div className="d-flex justify-content-between h4">
                {showViewMoreButton && (
                  <button
                    onClick={() => history.push(`/auctions/${a._id}`)}
                    className="btn btn-primary"
                  >
                    Show more
                  </button>
                )}

                {owner && (
                  <>
                    <Link to={`/auction/edit/${a._id}`}>
                      <EditOutlined className="text-warning" />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallCard;
