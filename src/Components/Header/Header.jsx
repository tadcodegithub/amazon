import React from "react";
import styles from "./header.module.css";
import { BiCart } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from "./LowerHeader";
function Header() {
  return (
    <>
      <section>
        <div className={styles.header_container}>
          <div className={styles.logo_container}>
            {/* for logo */}
            <a href="">
              <img src="/amazon_logo_white.png" alt="" />
            </a>

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
            <BsSearch size={25} />
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
            <a href="" className="">
              <div className="">
                <p>Sign IN</p>
                <span>Account & Lists</span>
              </div>
            </a>
            {/* orders */}
            <a href="">
              <p>Returns</p>
              <span>& orders</span>
            </a>
            {/* cart */}
            <a href="" className={styles.cart}>
              {/* cart icon */}
              <BiCart size={35}/>
              <span>0</span>
            </a>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;
