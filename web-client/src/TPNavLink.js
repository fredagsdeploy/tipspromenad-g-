import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

const NavLink = ({
  to,
  exact,
  strict,
  location,
  activeClassName,
  className,
  activeStyle,
  style,
  isActive: getIsActive,
  "aria-current": ariaCurrent,
  children,
  ...rest
}) => {
  const path = typeof to === "object" ? to.pathname : to;

  // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202
  const escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

  return (
    <Route
      path={escapedPath}
      exact={exact}
      strict={strict}
      location={location}
      children={({ location, match }) => {
        const isActive = !!(getIsActive ? getIsActive(match, location) : match);

        return (
          <Link
            to={to}
            className={
              isActive
                ? [className, activeClassName].filter(i => i).join(" ")
                : className
            }
            style={isActive ? { ...style, ...activeStyle } : style}
            aria-current={(isActive && ariaCurrent) || null}
            {...rest}
          >
            {children({ isActive })}
          </Link>
        );
      }}
    />
  );
};

export default NavLink;
