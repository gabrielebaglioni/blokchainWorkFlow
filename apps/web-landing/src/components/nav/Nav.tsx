import React from "react"
import css from "./Nav.module.scss"
import Link from "../Link"
import HouseBlockLogo from "assets/images/houseblock-logo.svg"
import HamburgerIcon from "assets/icons/hamburger.svg"

const Nav = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div className={`${css["header"]} boundary`}>
        <div>
          <Link href="/" onClick={() => setOpen(false)}>
            <HouseBlockLogo
              className={(() => {
                let className = `${css["ef-logo"]}`

                if (open) {
                  className += ` ${css["open"]}`
                }

                return className
              })()}
            />
          </Link>

          <div
            className={(() => {
              let className = css["hamburger-menu"]

              if (open) {
                className += ` ${css["open"]}`
              }

              return className
            })()}
          >
            <HamburgerIcon onMouseDown={() => setOpen(!open)} />
          </div>
        </div>
      </div>

      <section
        className={`${css["main--menu--container"]} ${open ? css["open"] : ""}`}
        id="main--menu--container"
      >
        <div className={css["mask"]}>
          <div
            className={css["main--menu--internal--container"]}
            id="main--menu--internal--container"
          >
            <div className={`${css["menu--content--container"]}`}>
              <span className={`${css["one"]} ${css["menu-content-dot"]}`}>
                {" "}
                •{" "}
              </span>
              <Link
                onClick={() => setOpen(false)}
                href="/"
                className={`${css["two"]} ${css["menu-content-text"]}`}
              >
                {" "}
                Home{" "}
              </Link>
              <span className={`${css["three"]} ${css["menu-content-dot"]}`}>
                {" "}
                •{" "}
              </span>
              <Link
                onClick={() => setOpen(false)}
                href="/why-exists"
                className={`${css["four"]} ${css["menu-content-text"]}`}
              >
                {" "}
                Why this project exists{" "}
              </Link>
              <span className={`${css["five"]} ${css["menu-content-dot"]}`}>
                {" "}
                •{" "}
              </span>
              <Link
                onClick={() => setOpen(false)}
                href="/ai-layer"
                className={`${css["six"]} ${css["menu-content-text"]}`}
              >
                {" "}
                AI Layer{" "}
              </Link>
              <span className={`${css["seven"]} ${css["menu-content-dot"]}`}>
                {" "}
                •{" "}
              </span>
              <Link
                onClick={() => setOpen(false)}
                href="/identity"
                className={`${css["eight"]} ${css["menu-content-text"]}`}
              >
                {" "}
                An identity, not a company{" "}
              </Link>
              <span className={`${css["nine"]} ${css["menu-content-dot"]}`}>
                {" "}
                •{" "}
              </span>
              <Link
                onClick={() => setOpen(false)}
                href="/output-layer"
                className={`${css["ten"]} ${css["menu-content-text"]}`}
              >
                {" "}
                Output Layer{" "}
              </Link>
              <span className={`${css["eleven"]} ${css["menu-content-dot"]}`}>
                {" "}
                •{" "}
              </span>
              <Link
                onClick={() => setOpen(false)}
                href="/input-layer"
                className={`${css["twelve"]} ${css["menu-content-text"]}`}
              >
                {" "}
                Input Layer{" "}
              </Link>
              <span className={`${css["thirteen"]} ${css["menu-content-dot"]}`}>
                {" "}
                •{" "}
              </span>
              <Link
                onClick={() => setOpen(false)}
                href="/architecture"
                className={`${css["fourteen"]} ${css["menu-content-text"]}`}
              >
                {" "}
                Architecture{" "}
              </Link>
              <span className={`${css["fifteen"]} ${css["menu-content-dot"]}`}>
                {" "}
                •{" "}
              </span>
              <Link
                onClick={() => setOpen(false)}
                href="/publishing"
                className={`${css["sixteen"]} ${css["menu-content-text"]}`}
              >
                {" "}
                Publishing and Dashboard{" "}
              </Link>
              <span className={`${css["seventeen"]} ${css["menu-content-dot"]}`}>
                {" "}
                •{" "}
              </span>
              <Link
                onClick={() => setOpen(false)}
                href="/future"
                className={`${css["eighteen"]} ${css["menu-content-text"]}`}
              >
                {" "}
                Future of the house{" "}
              </Link>
              <span className={`${css["nineteen"]} ${css["menu-content-dot"]}`}>
                {" "}
                •{" "}
              </span>
            </div>
            <div
              className={css["secondary--links--container"]}
              id="secondary--links--container"
            >
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Nav
