import { Link } from "react-router-dom";

// il primo link è per i buyer
//il secondo link è per i seller
const DashboardNav = () => {
  const active = window.location.pathname;
  // console.log(active);
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/dashboard/seller" && "active"}`}
          to="/dashboard/seller"
        >
          Auctions Created
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
