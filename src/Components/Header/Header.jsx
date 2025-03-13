import React, { useContext } from "react"
import styles from "./header.module.css"
import { BiCart } from "react-icons/bi"
import { BsSearch } from "react-icons/bs"
import { SlLocationPin } from "react-icons/sl"
import LowerHeader from "./LowerHeader"
import { Link } from "react-router-dom"
import { DataContext } from "../DataProvider/DataProvide"
import { auth } from "../../Utility/firebase"
function Header() {
  const [{ basket, user }, dispatch] = useContext(DataContext)
  const totalproduct = basket.reduce((sum, item) => sum + item.amount, 0)

  return (
    <>
      <section className={styles.header_fixed}>
        <div className={styles.header_container}>
          <div className={styles.logo_container}>
            {/* for logo */}
            <Link to="/">
              <img src="/amazon_logo_white.png" alt="" />
            </Link>

            <div className={styles.delivery}>
              <span>
                {/* this is for icon */}
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* serch area */}
          <div className={styles.search}>
            <select name="" id="">
              <option value="">ALL</option>
            </select>
            <input type="text" name="" id="" placeholder="Search product" />
            {/* search icon */}
            <BsSearch size={38} />
          </div>
          <div className={styles.order_container}>
            {/* right side link */}
            <a className={styles.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt=""
              />
              <select name="" id="">
                <option value="en">EN</option>
                <option value="">አማ</option>
                <option value="">CHN</option>
              </select>
            </a>
            {/* sign in  */}
            <Link to={!user && "/auth"} className="">
              <div className="">
                {user ? (
                  <>
                    <p>Hello {user?.email.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    {" "}
                    <p>Hello, Sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
              <div className=""></div>
            </Link>
            {/* orders */}
            <Link to="/orders">
              <p>Returns</p>
              <span>& orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={styles.cart}>
              {/* cart icon */}
              {/* <BiCart size={50} /> */}
              <img src="/cart2.png" alt="" />
              <span>{totalproduct}</span>
            </Link>
          </div>
        </div>
        <LowerHeader />
      </section>
    </>
  )
}

export default Header
