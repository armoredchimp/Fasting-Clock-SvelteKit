import { c as create_ssr_component, b as compute_rest_props, d as spread, f as escape_object, g as add_attribute, h as add_classes, e as escape, j as escape_attribute_value } from "./ssr.js";
const aws_stages = {
  API_PUT_URL: "https://7tt6gifpn5.execute-api.us-west-2.amazonaws.com/dev/users",
  API_GET_URL: "https://7tt6gifpn5.execute-api.us-west-2.amazonaws.com/dev/users/{username}",
  API_GET_ALL_URL: "https://7tt6gifpn5.execute-api.us-west-2.amazonaws.com/dev/users/{username}/all"
};
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let spinnerRadius;
  let $$restProps = compute_rest_props($$props, ["small", "active", "withOverlay", "description"]);
  let { small = false } = $$props;
  let { active = true } = $$props;
  let { withOverlay = true } = $$props;
  let { description = "loading" } = $$props;
  if ($$props.small === void 0 && $$bindings.small && small !== void 0)
    $$bindings.small(small);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.withOverlay === void 0 && $$bindings.withOverlay && withOverlay !== void 0)
    $$bindings.withOverlay(withOverlay);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  spinnerRadius = small ? "42" : "44";
  return `${withOverlay ? `<div${spread([escape_object($$restProps)], {
    classes: "bx--loading-overlay " + (!active ? "bx--loading-overlay--stop" : "")
  })}><div aria-atomic="true"${add_attribute("aria-live", active ? "assertive" : "off", 0)}${add_classes(("bx--loading " + (small ? "bx--loading--small" : "") + " " + (!active ? "bx--loading--stop" : "")).trim())}><svg viewBox="0 0 100 100"${add_classes("bx--loading__svg".trim())}><title>${escape(description)}</title>${small ? `<circle cx="50%" cy="50%"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__background".trim())}></circle>` : ``}<circle cx="50%" cy="50%"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__stroke".trim())}></circle></svg></div></div>` : `<div${spread(
    [
      { "aria-atomic": "true" },
      {
        "aria-live": escape_attribute_value(active ? "assertive" : "off")
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--loading " + (small ? "bx--loading--small" : "") + " " + (!active ? "bx--loading--stop" : "")
    }
  )}><svg viewBox="0 0 100 100"${add_classes("bx--loading__svg".trim())}><title>${escape(description)}</title>${small ? `<circle cx="50%" cy="50%"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__background".trim())}></circle>` : ``}<circle cx="50%" cy="50%"${add_attribute("r", spinnerRadius, 0)}${add_classes("bx--loading__stroke".trim())}></circle></svg></div>`}`;
});
export {
  Loading as L,
  aws_stages as a
};
