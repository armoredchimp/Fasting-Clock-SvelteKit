import { c as create_ssr_component, b as compute_rest_props, d as spread, j as escape_attribute_value, f as escape_object, e as escape, o as getContext, v as validate_component, g as add_attribute, h as add_classes, q as missing_component, w as compute_slots, s as subscribe, t as add_styles, x as createEventDispatcher, m as set_store_value } from "../../chunks/ssr.js";
import axios from "axios";
import { i as futureDisplay, a as hasStarted, j as totalDuration, b as futureDate, s as succeeded, c as currPerc, r as remSeconds, h as hours, e as startDate, t as totalTime, k as remHours, m as remMins, n as exceeded, l as loading } from "../../chunks/stores2.js";
/* empty css                                              */
import "dequal/lite";
import { u as user } from "../../chunks/userStore.js";
/* empty css                                                */
import { L as Loading, a as aws_stages } from "../../chunks/Loading.js";
const ButtonSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "size"]);
  let { href = void 0 } = $$props;
  let { size = "default" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  return ` ${href ? `<a${spread(
    [
      { href: escape_attribute_value(href) },
      {
        rel: escape_attribute_value($$restProps.target === "_blank" ? "noopener noreferrer" : void 0)
      },
      { role: "button" },
      escape_object($$restProps)
    ],
    {
      classes: "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : "")
    }
  )}>${escape("")}</a>` : ` <div${spread([escape_object($$restProps)], {
    classes: "bx--skeleton bx--btn " + (size === "field" ? "bx--btn--field" : "") + " " + (size === "small" ? "bx--btn--sm" : "") + " " + (size === "lg" ? "bx--btn--lg" : "") + " " + (size === "xl" ? "bx--btn--xl" : "")
  })}></div>`}`;
});
const Button = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasIconOnly;
  let iconProps;
  let buttonProps;
  let $$restProps = compute_rest_props($$props, [
    "kind",
    "size",
    "expressive",
    "isSelected",
    "icon",
    "iconDescription",
    "tooltipAlignment",
    "tooltipPosition",
    "as",
    "skeleton",
    "disabled",
    "href",
    "tabindex",
    "type",
    "ref"
  ]);
  let $$slots = compute_slots(slots);
  let { kind = "primary" } = $$props;
  let { size = "default" } = $$props;
  let { expressive = false } = $$props;
  let { isSelected = false } = $$props;
  let { icon = void 0 } = $$props;
  let { iconDescription = void 0 } = $$props;
  let { tooltipAlignment = "center" } = $$props;
  let { tooltipPosition = "bottom" } = $$props;
  let { as = false } = $$props;
  let { skeleton = false } = $$props;
  let { disabled = false } = $$props;
  let { href = void 0 } = $$props;
  let { tabindex = "0" } = $$props;
  let { type = "button" } = $$props;
  let { ref = null } = $$props;
  const ctx = getContext("ComposedModal");
  if ($$props.kind === void 0 && $$bindings.kind && kind !== void 0)
    $$bindings.kind(kind);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.expressive === void 0 && $$bindings.expressive && expressive !== void 0)
    $$bindings.expressive(expressive);
  if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
    $$bindings.isSelected(isSelected);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  if ($$props.tooltipAlignment === void 0 && $$bindings.tooltipAlignment && tooltipAlignment !== void 0)
    $$bindings.tooltipAlignment(tooltipAlignment);
  if ($$props.tooltipPosition === void 0 && $$bindings.tooltipPosition && tooltipPosition !== void 0)
    $$bindings.tooltipPosition(tooltipPosition);
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  {
    if (ctx && ref) {
      ctx.declareRef(ref);
    }
  }
  hasIconOnly = (icon || $$slots.icon) && !$$slots.default;
  iconProps = {
    "aria-hidden": "true",
    class: "bx--btn__icon",
    "aria-label": iconDescription
  };
  buttonProps = {
    type: href && !disabled ? void 0 : type,
    tabindex,
    disabled: disabled === true ? true : void 0,
    href,
    "aria-pressed": hasIconOnly && kind === "ghost" && !href ? isSelected : void 0,
    ...$$restProps,
    class: [
      "bx--btn",
      expressive && "bx--btn--expressive",
      (size === "small" && !expressive || size === "sm" && !expressive || size === "small" && !expressive) && "bx--btn--sm",
      size === "field" && !expressive || size === "md" && !expressive && "bx--btn--md",
      size === "field" && "bx--btn--field",
      size === "small" && "bx--btn--sm",
      size === "lg" && "bx--btn--lg",
      size === "xl" && "bx--btn--xl",
      kind && `bx--btn--${kind}`,
      disabled && "bx--btn--disabled",
      hasIconOnly && "bx--btn--icon-only",
      hasIconOnly && "bx--tooltip__trigger",
      hasIconOnly && "bx--tooltip--a11y",
      hasIconOnly && tooltipPosition && `bx--btn--icon-only--${tooltipPosition}`,
      hasIconOnly && tooltipAlignment && `bx--tooltip--align-${tooltipAlignment}`,
      hasIconOnly && isSelected && kind === "ghost" && "bx--btn--selected",
      $$restProps.class
    ].filter(Boolean).join(" ")
  };
  return ` ${skeleton ? `${validate_component(ButtonSkeleton, "ButtonSkeleton").$$render($$result, Object.assign({}, { href }, { size }, $$restProps, { style: hasIconOnly && "width: 3rem;" }), {}, {})}` : `${as ? `${slots.default ? slots.default({ props: buttonProps }) : ``}` : `${href && !disabled ? `  <a${spread([escape_object(buttonProps)], {})}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes("bx--assistive-text".trim())}>${escape(iconDescription)}</span>` : ``} ${slots.default ? slots.default({}) : ``} ${$$slots.icon ? `${slots.icon ? slots.icon({
    style: hasIconOnly ? "margin-left: 0" : void 0,
    ...iconProps
  }) : ``}` : `${icon ? `${validate_component(icon || missing_component, "svelte:component").$$render(
    $$result,
    Object.assign(
      {},
      {
        style: hasIconOnly ? "margin-left: 0" : void 0
      },
      iconProps
    ),
    {},
    {}
  )}` : ``}`}</a>` : `<button${spread([escape_object(buttonProps)], {})}${add_attribute("this", ref, 0)}>${hasIconOnly ? `<span${add_classes("bx--assistive-text".trim())}>${escape(iconDescription)}</span>` : ``} ${slots.default ? slots.default({}) : ``} ${$$slots.icon ? `${slots.icon ? slots.icon({
    style: hasIconOnly ? "margin-left: 0" : void 0,
    ...iconProps
  }) : ``}` : `${icon ? `${validate_component(icon || missing_component, "svelte:component").$$render(
    $$result,
    Object.assign(
      {},
      {
        style: hasIconOnly ? "margin-left: 0" : void 0
      },
      iconProps
    ),
    {},
    {}
  )}` : ``}`}</button>`}`}`}`;
});
const css$6 = {
  code: ".label.svelte-1mexru7{transform:translateY(-1rem);transform:translateX(3rem)}.main-clock.svelte-1mexru7{transform:translateX(-3rem);font-size:4rem}",
  map: `{"version":3,"file":"TargetClock.svelte","sources":["TargetClock.svelte"],"sourcesContent":["<script>\\r\\n    // import { onMount } from \\"svelte\\";\\r\\n    import { futureDisplay } from \\"./stores\\";\\r\\n\\r\\n    // let date = new Date();\\r\\n    // $: hour = date.getHours();\\r\\n    // $: min = date.getMinutes();\\r\\n    // $: sec = date.getSeconds();\\r\\n\\r\\n    // let amPM = 'AM';\\r\\n    // let amPM2 = amPM;\\r\\n\\r\\n    const formatter = new Intl.DateTimeFormat(\\r\\n        'en',\\r\\n        {\\r\\n            hour12: true,\\r\\n            hour: 'numeric',\\r\\n            minute: '2-digit',\\r\\n            second: '2-digit'\\r\\n        }\\r\\n    )\\r\\n\\r\\n    // onMount( ()=>{\\r\\n    //     const interval = setInterval(()=>{\\r\\n    //         date = new Date();\\r\\n    //         let curr = (lengthVal + (hour - 12))\\r\\n    //         amPM = (hour >= 12) ? \\"PM\\" : \\"AM\\"; \\r\\n    //         let ampPMreverse = \\"AM\\"\\r\\n    //         ampPMreverse = (amPM === \\"AM\\") ? \\"PM\\" : \\"AM\\"\\r\\n    //         amPM2 =((curr / 12) >= 1 && (curr / 12) < 2) ? ampPMreverse : amPM   \\r\\n    //     }, 1000);\\r\\n    // });\\r\\n    \\r\\n    // onMount( ()=>{\\r\\n    //     const interval = setInterval(()=>{\\r\\n    //        let now = new Date();\\r\\n\\r\\n    //     }, 1000);\\r\\n    // });\\r\\n\\r\\n    \\r\\n    // $: currHour = ($hours + (hour -12)) % 12\\r\\n\\r\\n\\r\\n   \\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n\\r\\n.label {\\r\\n    transform: translateY(-1rem);\\r\\n    transform: translateX(3rem);\\r\\n}    \\r\\n\\r\\n.main-clock {\\r\\n    transform: translateX(-3rem);\\r\\n    font-size: 4rem;\\r\\n}    \\r\\n    \\r\\n</style>\\r\\n\\r\\n\\r\\n<h4 class=\\"label\\">Ending Time:</h4>\\r\\n<h1 class=\\"main-clock\\">{formatter.format($futureDisplay)}</h1>\\r\\n<!-- <h1>{(currHour === 0 ? 12 : currHour) < 10 ? '\\\\u00A0\\\\u00A0' + (currHour === 0 ? 12 : currHour) : (currHour === 0 ? 12 : currHour)} : {min < 10 ? '0' + min : min} : {sec < 10 ? '0' + sec : sec} {amPM2}</h1> -->\\r\\n"],"names":[],"mappings":"AAiDA,qBAAO,CACH,SAAS,CAAE,WAAW,KAAK,CAAC,CAC5B,SAAS,CAAE,WAAW,IAAI,CAC9B,CAEA,0BAAY,CACR,SAAS,CAAE,WAAW,KAAK,CAAC,CAC5B,SAAS,CAAE,IACf"}`
};
const TargetClock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $futureDisplay, $$unsubscribe_futureDisplay;
  $$unsubscribe_futureDisplay = subscribe(futureDisplay, (value) => $futureDisplay = value);
  const formatter = new Intl.DateTimeFormat(
    "en",
    {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    }
  );
  $$result.css.add(css$6);
  $$unsubscribe_futureDisplay();
  return `<h4 class="label svelte-1mexru7" data-svelte-h="svelte-ffy11">Ending Time:</h4> <h1 class="main-clock svelte-1mexru7">${escape(formatter.format($futureDisplay))}</h1> `;
});
const css$5 = {
  code: ".circle.svelte-i3herd{position:relative;top:0;height:55rem;width:55rem;border-radius:50%;overflow:hidden;background-color:var(--alternate-primary);box-shadow:0 10px 12px rgba(0, 0, 0, 0.1)}.overlay.svelte-i3herd{position:absolute;bottom:0.01px;height:50%;width:100%;background-color:var(--secondary-color)}.target-clock.svelte-i3herd{position:absolute;top:24.5rem;left:20rem;z-index:1}.perc.svelte-i3herd{position:absolute;top:25.5rem;left:20.5rem;z-index:1}.complete.svelte-i3herd{position:absolute;top:25.5rem;left:18rem;z-index:1}h1.svelte-i3herd{font-size:4rem;font-weight:bold}",
  map: `{"version":3,"file":"Circle.svelte","sources":["Circle.svelte"],"sourcesContent":["<script>\\r\\n    \\r\\n    \\r\\n    import { totalDuration, futureDate, currPerc, hasStarted, remSeconds, succeeded } from './stores';\\r\\n    import TargetClock from './TargetClock.svelte';\\r\\n\\timport { afterUpdate } from 'svelte';\\r\\n\\r\\n\\t\\r\\n    let remainingTime = 0;\\r\\n    \\r\\n    function calcRemPerc(){\\r\\n        if($hasStarted === true){\\r\\n        let currentTime = new Date();\\r\\n        // futureDate.update((n)=>end = n);\\r\\n        remainingTime = $futureDate.getTime() - currentTime.getTime()\\r\\n        if(remainingTime > 0){\\r\\n            currPerc.update((n)=>n = (remainingTime / $totalDuration) * 100)\\r\\n        }\\r\\n    }   \\r\\n}\\r\\n\\r\\n\\r\\n    afterUpdate(()=>{\\r\\n        if($hasStarted === true){\\r\\n        setInterval(()=>{\\r\\n            calcRemPerc()\\r\\n        }, 1000);\\r\\n        }\\r\\n    }\\r\\n    )\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n   .circle {\\r\\n    position: relative;\\r\\n    top: 0;\\r\\n    height: 55rem;\\r\\n    width: 55rem;\\r\\n    border-radius: 50%;\\r\\n    overflow: hidden;\\r\\n    background-color: var(--alternate-primary);\\r\\n    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.1);\\r\\n   }\\r\\n\\r\\n   .overlay {\\r\\n    position: absolute;\\r\\n    bottom: 0.01px;\\r\\n    height: 50%;\\r\\n    width: 100%;\\r\\n    background-color: var(--secondary-color);\\r\\n   }\\r\\n\\r\\n\\r\\n   .target-clock {\\r\\n    position: absolute;\\r\\n    top: 24.5rem;\\r\\n    left: 20rem;\\r\\n    z-index: 1;\\r\\n   }\\r\\n\\r\\n   .perc {\\r\\n    position: absolute;\\r\\n    top: 25.5rem;\\r\\n    left: 20.5rem;\\r\\n    z-index: 1;\\r\\n   }\\r\\n\\r\\n   .complete {\\r\\n    position: absolute;\\r\\n    top: 25.5rem;\\r\\n    left: 18rem;\\r\\n    z-index: 1;\\r\\n   }\\r\\n \\r\\n   h1 {\\r\\n    font-size: 4rem;\\r\\n    font-weight: bold;\\r\\n   }\\r\\n</style>\\r\\n\\r\\n<div class=\\"circle\\">\\r\\n    {#if !$succeeded}\\r\\n    <div class=\\"overlay\\" style=\\"height: {$currPerc}%; transition: 0.1s ease-in\\"></div>\\r\\n    {/if}\\r\\n    {#if $hasStarted === false && $succeeded === false}\\r\\n   \\r\\n    <div class=\\"target-clock\\" >\\r\\n        <TargetClock />\\r\\n    </div>\\r\\n    {:else if $remSeconds > 0}\\r\\n    <div class=\\"perc\\">\\r\\n        <h1>{$currPerc.toFixed(2)} %</h1>\\r\\n    </div>\\r\\n    {:else if $succeeded}\\r\\n    <div class=\\"complete\\">\\r\\n        <h1>Complete!</h1>\\r\\n    </div>\\r\\n    {/if}\\r\\n\\r\\n</div>"],"names":[],"mappings":"AAiCG,qBAAQ,CACP,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,aAAa,CAAE,GAAG,CAClB,QAAQ,CAAE,MAAM,CAChB,gBAAgB,CAAE,IAAI,mBAAmB,CAAC,CAC1C,UAAU,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC1C,CAEA,sBAAS,CACR,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,MAAM,CACd,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,IAAI,CACX,gBAAgB,CAAE,IAAI,iBAAiB,CACxC,CAGA,2BAAc,CACb,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,OAAO,CACZ,IAAI,CAAE,KAAK,CACX,OAAO,CAAE,CACV,CAEA,mBAAM,CACL,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,OAAO,CACZ,IAAI,CAAE,OAAO,CACb,OAAO,CAAE,CACV,CAEA,uBAAU,CACT,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,OAAO,CACZ,IAAI,CAAE,KAAK,CACX,OAAO,CAAE,CACV,CAEA,gBAAG,CACF,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IACd"}`
};
const Circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hasStarted, $$unsubscribe_hasStarted;
  let $$unsubscribe_totalDuration;
  let $$unsubscribe_futureDate;
  let $succeeded, $$unsubscribe_succeeded;
  let $currPerc, $$unsubscribe_currPerc;
  let $remSeconds, $$unsubscribe_remSeconds;
  $$unsubscribe_hasStarted = subscribe(hasStarted, (value) => $hasStarted = value);
  $$unsubscribe_totalDuration = subscribe(totalDuration, (value) => value);
  $$unsubscribe_futureDate = subscribe(futureDate, (value) => value);
  $$unsubscribe_succeeded = subscribe(succeeded, (value) => $succeeded = value);
  $$unsubscribe_currPerc = subscribe(currPerc, (value) => $currPerc = value);
  $$unsubscribe_remSeconds = subscribe(remSeconds, (value) => $remSeconds = value);
  $$result.css.add(css$5);
  $$unsubscribe_hasStarted();
  $$unsubscribe_totalDuration();
  $$unsubscribe_futureDate();
  $$unsubscribe_succeeded();
  $$unsubscribe_currPerc();
  $$unsubscribe_remSeconds();
  return `<div class="circle svelte-i3herd">${!$succeeded ? `<div class="overlay svelte-i3herd" style="${"height: " + escape($currPerc, true) + "%; transition: 0.1s ease-in"}"></div>` : ``} ${$hasStarted === false && $succeeded === false ? `<div class="target-clock svelte-i3herd">${validate_component(TargetClock, "TargetClock").$$render($$result, {}, {}, {})}</div>` : `${$remSeconds > 0 ? `<div class="perc svelte-i3herd"><h1 class="svelte-i3herd">${escape($currPerc.toFixed(2))} %</h1></div>` : `${$succeeded ? `<div class="complete svelte-i3herd" data-svelte-h="svelte-1ni4xk3"><h1 class="svelte-i3herd">Complete!</h1></div>` : ``}`}`}</div>`;
});
const css$4 = {
  code: "h2.svelte-1luksjg{min-width:10rem}",
  map: `{"version":3,"file":"Clock.svelte","sources":["Clock.svelte"],"sourcesContent":["<script>\\r\\n    import { onMount } from \\"svelte\\";\\r\\n    \\r\\n    let date = new Date();\\r\\n\\r\\n    const formatter = new Intl.DateTimeFormat(\\r\\n        'en',\\r\\n        {\\r\\n            hour12: true,\\r\\n            hour: 'numeric',\\r\\n            minute: '2-digit',\\r\\n            second: '2-digit'\\r\\n        }\\r\\n    )\\r\\n\\r\\n\\r\\n\\r\\n    onMount( ()=>{\\r\\n        const interval = setInterval(()=>{\\r\\n            date = new Date();\\r\\n            // amPM = (hour >= 12) ? \\"PM\\" : \\"AM\\";\\r\\n        }, 1000);\\r\\n    });\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n    h2 {\\r\\n        min-width: 10rem;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<h3>Current Time:</h3>\\r\\n<h2>{formatter.format(date)}&nbsp;&nbsp;</h2>\\r\\n<!-- <h1>{(mainHour === 0 ? 12 : mainHour) < 10 ? '\\\\u00A0\\\\u00A0' + (mainHour === 0 ? 12 : mainHour) : (mainHour === 0 ? 12 : mainHour)} : {min < 10 ? '0' + min : min} : {sec < 10 ? '0' + sec : sec} {amPM}</h1> -->"],"names":[],"mappings":"AA2BI,iBAAG,CACC,SAAS,CAAE,KACf"}`
};
const Clock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let date = /* @__PURE__ */ new Date();
  const formatter = new Intl.DateTimeFormat(
    "en",
    {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit"
    }
  );
  $$result.css.add(css$4);
  return `<h3 data-svelte-h="svelte-t33caa">Current Time:</h3> <h2 class="svelte-1luksjg">${escape(formatter.format(date))}  </h2> `;
});
const css$3 = {
  code: "@font-face{font-family:'Plus Jakarta Sans Variable';font-style:normal;font-display:swap;font-weight:200 800;src:url(https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}input.svelte-12jayqr{font-family:'Plus Jakarta Sans Variable'}",
  map: `{"version":3,"file":"LengthInput.svelte","sources":["LengthInput.svelte"],"sourcesContent":["<script>\\r\\n    \\r\\n    import { hours, currPerc, futureDate } from \\"./stores\\";\\r\\n\\r\\n    let length = $hours;\\r\\n    \\r\\n\\r\\n    function displayPerc(){\\r\\n        currPerc.update((n)=> length * 4.2)       \\r\\n    }\\r\\n\\r\\n    function hoursChange(){\\r\\n        hours.update((n)=> n = length)\\r\\n    }\\r\\n\\r\\n    function futureUpdate(){\\r\\n        let now = new Date()\\r\\n        let end = new Date(now.getTime() + $hours * 60 * 60 * 1000)\\r\\n        futureDate.update((n)=> n = end)\\r\\n    }\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n    @font-face {\\r\\n    font-family: 'Plus Jakarta Sans Variable';\\r\\n    font-style: normal;\\r\\n    font-display: swap;\\r\\n    font-weight: 200 800;\\r\\n    src: url(https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');\\r\\n    unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;\\r\\n}\\r\\n\\r\\ninput {\\r\\n    font-family: 'Plus Jakarta Sans Variable';\\r\\n}\\r\\n\\r\\n</style>\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n<h3  style:margin-bottom=\\"2rem\\">Fasting Length</h3>\\r\\n<label>\\r\\n    <!-- <input type=\\"number\\" bind:value={length} on:input={displayPerc} on:input={hoursChange} on:input={futureUpdate} min=\\"1\\" max=\\"24\\" /> -->\\r\\n    <input type=\\"range\\" bind:value={length} on:input={displayPerc} on:input={hoursChange} on:input={futureUpdate} min=\\"1\\" max=\\"24\\" />\\r\\n</label>\\r\\n{#if length === 24}\\r\\n<p>The fast will be for {$hours} hours!</p>\\r\\n{:else if length === 1}\\r\\n<p>The fast will be for {$hours} hour.</p>\\r\\n{:else}\\r\\n<p>The fast will be for {$hours} hours.</p>\\r\\n{/if}"],"names":[],"mappings":"AAwBI,UAAW,CACX,WAAW,CAAE,4BAA4B,CACzC,UAAU,CAAE,MAAM,CAClB,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,GAAG,CAAC,GAAG,CACpB,GAAG,CAAE,kGAAkG,CAAC,OAAO,kBAAkB,CAAC,CAClI,aAAa,CAAE,WAAW,CAAC,MAAM,CAAC,WAAW,CAAC,WAAW,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,WAAW,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAC5K,CAEA,oBAAM,CACF,WAAW,CAAE,4BACjB"}`
};
const LengthInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $hours, $$unsubscribe_hours;
  $$unsubscribe_hours = subscribe(hours, (value) => $hours = value);
  let length = $hours;
  $$result.css.add(css$3);
  $$unsubscribe_hours();
  return `<h3${add_styles({ "margin-bottom": `2rem` })} data-svelte-h="svelte-12u0z4c">Fasting Length</h3> <label> <input type="range" min="1" max="24" class="svelte-12jayqr"${add_attribute("value", length, 0)}></label> ${length === 24 ? `<p>The fast will be for ${escape($hours)} hours!</p>` : `${length === 1 ? `<p>The fast will be for ${escape($hours)} hour.</p>` : `<p>The fast will be for ${escape($hours)} hours.</p>`}`}`;
});
const css$2 = {
  code: "@font-face{font-family:'Plus Jakarta Sans Variable';font-style:normal;font-display:swap;font-weight:200 800;src:url(https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}",
  map: `{"version":3,"file":"Start.svelte","sources":["Start.svelte"],"sourcesContent":["<script>\\r\\n    \\r\\n    import { hours, startDate, futureDate, hasStarted } from './stores'\\r\\n    import { createEventDispatcher } from 'svelte';\\r\\n    import { Button } from 'carbon-components-svelte';\\r\\n\\r\\n    const dispatch = createEventDispatcher();\\r\\n\\r\\n    \\r\\n    let end = new Date()\\r\\n\\r\\n\\r\\n\\r\\n    function begin(){\\r\\n        \\r\\n        let now = new Date()\\r\\n        end = new Date(now.getTime() + $hours * 60 * 60 * 1000)\\r\\n        startDate.update((n)=> n = now) \\r\\n        futureDate.update((n)=> n = end)\\r\\n        console.log(end)\\r\\n        hasStarted.update((n)=>n = true)\\r\\n        dispatch('started',{\\r\\n            now: now\\r\\n        })\\r\\n    }\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n        @font-face {\\r\\n        font-family: 'Plus Jakarta Sans Variable';\\r\\n        font-style: normal;\\r\\n        font-display: swap;\\r\\n        font-weight: 200 800;\\r\\n        src: url(https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');\\r\\n        unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;\\r\\n}\\r\\n\\r\\n\\r\\n\\r\\n</style>\\r\\n\\r\\n\\r\\n<Button kind=\\"secondary\\" on:click={begin}>Begin Fast</Button>"],"names":[],"mappings":"AA6BQ,UAAW,CACX,WAAW,CAAE,4BAA4B,CACzC,UAAU,CAAE,MAAM,CAClB,YAAY,CAAE,IAAI,CAClB,WAAW,CAAE,GAAG,CAAC,GAAG,CACpB,GAAG,CAAE,kGAAkG,CAAC,OAAO,kBAAkB,CAAC,CAClI,aAAa,CAAE,WAAW,CAAC,MAAM,CAAC,WAAW,CAAC,WAAW,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,WAAW,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAChL"}`
};
const Start = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_hours;
  $$unsubscribe_hours = subscribe(hours, (value) => value);
  createEventDispatcher();
  $$result.css.add(css$2);
  $$unsubscribe_hours();
  return `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
    default: () => {
      return `Begin Fast`;
    }
  })}`;
});
const Stop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  return `${validate_component(Button, "Button").$$render($$result, { kind: "secondary" }, {}, {
    default: () => {
      return `Stop Fast`;
    }
  })}`;
});
const css$1 = {
  code: ".stats-box.svelte-1mxtxkg{display:grid;margin-top:5rem;height:10rem;margin-left:3rem;grid-gap:3rem}h3.svelte-1mxtxkg{letter-spacing:0.15rem;font-size:1.2rem}",
  map: `{"version":3,"file":"Stats.svelte","sources":["Stats.svelte"],"sourcesContent":["<script>\\r\\n    import { hours, currPerc, totalTime, succeeded, startDate, futureDate, hasStarted, remHours, remMins, remSeconds } from '$lib/stores';\\r\\n    \\r\\n    function formatTime(milliseconds) {\\r\\n        let hours = Math.floor(milliseconds / (1000 * 60 * 60));\\r\\n        let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));\\r\\n        return \`\${hours}h \${minutes}m\`;\\r\\n    }\\r\\n\\r\\n    $: expectedDuration = $hours * 60 * 60 * 1000;\\r\\n    $: actualDuration = $hasStarted ? $totalTime : ($futureDate - $startDate);\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n    .stats-box {\\r\\n        display: grid;\\r\\n        margin-top: 5rem;\\r\\n        height: 10rem;\\r\\n        margin-left: 3rem;\\r\\n        grid-gap: 3rem;\\r\\n    }\\r\\n    h3 {\\r\\n        letter-spacing: 0.15rem;\\r\\n        font-size: 1.2rem;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\"stats-box\\">\\r\\n    {#if $hasStarted && !$succeeded}\\r\\n        <h3>There is currently {$remHours} {$remHours === 1 ? 'hour' : 'hours'} and {$remMins % 60} {$remMins === 1 ? 'minute' : 'minutes'} left for the fast.</h3>\\r\\n        <h3>The fast will end at {$futureDate.toLocaleString()}.</h3>\\r\\n        <h3>{$remSeconds} {$remSeconds === 1 ? 'second' : 'seconds'} remain</h3>\\r\\n        <h3>Expected duration: {formatTime(expectedDuration)}</h3>\\r\\n        <h3>Current duration: {formatTime(actualDuration)}</h3>\\r\\n    {:else if $succeeded}\\r\\n        <h3>The {$hours}h fast was completed at {$futureDate.toLocaleString()}, good job!</h3>\\r\\n        <h3>Expected duration: {formatTime(expectedDuration)}</h3>\\r\\n        <h3>Actual duration: {formatTime(actualDuration)}</h3>\\r\\n    \\r\\n        <h3>Exceeded by: {formatTime($totalTime - expectedDuration)}</h3>\\r\\n        \\r\\n    {/if}\\r\\n</div>"],"names":[],"mappings":"AAcI,yBAAW,CACP,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,KAAK,CACb,WAAW,CAAE,IAAI,CACjB,QAAQ,CAAE,IACd,CACA,iBAAG,CACC,cAAc,CAAE,OAAO,CACvB,SAAS,CAAE,MACf"}`
};
function formatTime(milliseconds) {
  let hours2 = Math.floor(milliseconds / (1e3 * 60 * 60));
  let minutes = Math.floor(milliseconds % (1e3 * 60 * 60) / (1e3 * 60));
  return `${hours2}h ${minutes}m`;
}
const Stats = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let expectedDuration;
  let actualDuration;
  let $startDate, $$unsubscribe_startDate;
  let $futureDate, $$unsubscribe_futureDate;
  let $totalTime, $$unsubscribe_totalTime;
  let $hasStarted, $$unsubscribe_hasStarted;
  let $hours, $$unsubscribe_hours;
  let $succeeded, $$unsubscribe_succeeded;
  let $remHours, $$unsubscribe_remHours;
  let $remMins, $$unsubscribe_remMins;
  let $remSeconds, $$unsubscribe_remSeconds;
  $$unsubscribe_startDate = subscribe(startDate, (value) => $startDate = value);
  $$unsubscribe_futureDate = subscribe(futureDate, (value) => $futureDate = value);
  $$unsubscribe_totalTime = subscribe(totalTime, (value) => $totalTime = value);
  $$unsubscribe_hasStarted = subscribe(hasStarted, (value) => $hasStarted = value);
  $$unsubscribe_hours = subscribe(hours, (value) => $hours = value);
  $$unsubscribe_succeeded = subscribe(succeeded, (value) => $succeeded = value);
  $$unsubscribe_remHours = subscribe(remHours, (value) => $remHours = value);
  $$unsubscribe_remMins = subscribe(remMins, (value) => $remMins = value);
  $$unsubscribe_remSeconds = subscribe(remSeconds, (value) => $remSeconds = value);
  $$result.css.add(css$1);
  expectedDuration = $hours * 60 * 60 * 1e3;
  actualDuration = $hasStarted ? $totalTime : $futureDate - $startDate;
  $$unsubscribe_startDate();
  $$unsubscribe_futureDate();
  $$unsubscribe_totalTime();
  $$unsubscribe_hasStarted();
  $$unsubscribe_hours();
  $$unsubscribe_succeeded();
  $$unsubscribe_remHours();
  $$unsubscribe_remMins();
  $$unsubscribe_remSeconds();
  return `<div class="stats-box svelte-1mxtxkg">${$hasStarted && !$succeeded ? `<h3 class="svelte-1mxtxkg">There is currently ${escape($remHours)} ${escape($remHours === 1 ? "hour" : "hours")} and ${escape($remMins % 60)} ${escape($remMins === 1 ? "minute" : "minutes")} left for the fast.</h3> <h3 class="svelte-1mxtxkg">The fast will end at ${escape($futureDate.toLocaleString())}.</h3> <h3 class="svelte-1mxtxkg">${escape($remSeconds)} ${escape($remSeconds === 1 ? "second" : "seconds")} remain</h3> <h3 class="svelte-1mxtxkg">Expected duration: ${escape(formatTime(expectedDuration))}</h3> <h3 class="svelte-1mxtxkg">Current duration: ${escape(formatTime(actualDuration))}</h3>` : `${$succeeded ? `<h3 class="svelte-1mxtxkg">The ${escape($hours)}h fast was completed at ${escape($futureDate.toLocaleString())}, good job!</h3> <h3 class="svelte-1mxtxkg">Expected duration: ${escape(formatTime(expectedDuration))}</h3> <h3 class="svelte-1mxtxkg">Actual duration: ${escape(formatTime(actualDuration))}</h3> <h3 class="svelte-1mxtxkg">Exceeded by: ${escape(formatTime($totalTime - expectedDuration))}</h3>` : ``}`}</div>`;
});
const css = {
  code: `@font-face{font-family:'Plus Jakarta Sans Variable';font-style:normal;font-display:swap;font-weight:200 800;src:url(https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}p.svelte-gg2mvm{font-family:'Plus Jakarta Sans Variable'}.top-container.svelte-gg2mvm{display:flex;justify-content:space-between;padding:0.5rem;border-radius:0.3rem;height:10rem;margin-bottom:3rem}.title-container.svelte-gg2mvm{flex:1;display:flex;justify-content:center;align-items:center}.circle-stats.svelte-gg2mvm{max-width:"40rem";font-family:'Plus Jakarta Sans Variable';display:flex;justify-content:space-evenly;transform:translateY(3rem)}.clock.svelte-gg2mvm{margin-bottom:7rem}.info-section.svelte-gg2mvm{margin-top:6rem;margin-bottom:2rem;background-color:var(--modal-color);height:34rem;min-width:21rem;padding:4rem;border-radius:1rem;box-shadow:0 4px 6px rgba(0, 0, 0, 0.1)}.circle-cont.svelte-gg2mvm{transform:translateY(-6rem)}.start.svelte-gg2mvm{margin-top:5rem}.stop.svelte-gg2mvm{margin-top:15rem;transform:translateX(3rem)}.stats-box.svelte-gg2mvm{margin-top:5rem}.gottaLogin.svelte-gg2mvm{transform:translateY(5rem)}`,
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n    import axios from \\"axios\\";\\r\\n    import { afterUpdate, onMount } from \\"svelte\\";\\r\\n    import { Loading } from \\"carbon-components-svelte\\";\\r\\n    import Circle from \\"$lib/Circle.svelte\\";\\r\\n    import Card from \\"$lib/Card.Svelte\\";\\r\\n    import Clock from \\"$lib/Clock.svelte\\";\\r\\n    import LengthInput from \\"$lib/LengthInput.svelte\\";\\r\\n    import Start from \\"$lib/Start.svelte\\";\\r\\n    import Stop from \\"$lib/Stop.svelte\\";\\r\\n    import Stats from \\"$lib/Stats.svelte\\";\\r\\n    import Login from \\"$lib/Login.svelte\\";\\r\\n    import { loading, hours, currPerc, succeeded, exceeded, startDate, futureDate, hasStarted,  remHours, remMins, remSeconds, currPage, totalTime } from '$lib/stores';\\r\\n    import { aws_stages } from \\"../aws/stages\\";\\r\\n    import { user, registrationStatus } from \\"$lib/auth/userStore\\";\\r\\n\\timport Logout from \\"$lib/Logout.svelte\\";\\r\\n    \\r\\n\\r\\n\\r\\n   \\r\\n    \\r\\n    \\r\\n   onMount(()=>{\\r\\n    currPage.set('/')\\r\\n   }) \\r\\n  \\r\\n    \\r\\n    \\r\\n  \\r\\n\\r\\n    \\r\\n\\r\\n   \\r\\n\\r\\n    function handleStart(){\\r\\n        console.log('start received') \\r\\n        $succeeded = false;\\r\\n        $currPerc = 100;\\r\\n        \\r\\n        putFast()\\r\\n        calcRemTime()\\r\\n    }\\r\\n\\r\\n   export function handleStop(){\\r\\n        console.log('stop received')\\r\\n        $hasStarted = false;\\r\\n        putFast()\\r\\n        $succeeded = false;\\r\\n        $currPerc = 50;\\r\\n        $hours = 12;\\r\\n        $loading = true;\\r\\n        setTimeout(()=>{\\r\\n            $loading = false;\\r\\n            window.location.reload();\\r\\n        }, 1300)\\r\\n    }\\r\\n  \\r\\n    function calcRemTime(){\\r\\n        if( $hasStarted === true && !$succeeded){\\r\\n            if($remSeconds <= 0){\\r\\n                success()\\r\\n            }\\r\\n    }\\r\\n}\\r\\n\\r\\n\\r\\n    function success(){\\r\\n        console.log('success')\\r\\n        if($currPerc <= 0){\\r\\n            $exceeded = true\\r\\n        }\\r\\n        $succeeded = true;\\r\\n        putFast()\\r\\n    }\\r\\n\\r\\n    afterUpdate(()=>{\\r\\n        if($hasStarted === true){\\r\\n        setInterval(()=>{\\r\\n            if (!$succeeded){\\r\\n\\r\\n                calcRemTime()\\r\\n            }\\r\\n        }, 1000);\\r\\n        }\\r\\n    }\\r\\n    )\\r\\n\\r\\n    async function putFast(){\\r\\n        let data = {\\r\\n            \\"pathParameters\\": {\\r\\n                \\"UserID\\": $user?.username,\\r\\n                \\"StartDate\\": $startDate.getTime(),\\r\\n                \\"EndDate\\": $futureDate.getTime(),\\r\\n                \\"InProgress\\": $hasStarted,\\r\\n                \\"PercentRemaining\\": $currPerc,\\r\\n                \\"ExpectedDuration\\": $hours,\\r\\n                \\"ActualDuration\\": $totalTime,\\r\\n                \\"Succeeded\\": $succeeded\\r\\n            }\\r\\n        }\\r\\n        let url = aws_stages.API_PUT_URL\\r\\n        console.log(data)\\r\\n        axios.put(url, data)\\r\\n        .then(response =>{\\r\\n            console.log(response.data)\\r\\n        })\\r\\n        .catch(error=> {\\r\\n            console.error(\`Error: \${error}\`)\\r\\n        });\\r\\n    }\\r\\n\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n    @font-face {\\r\\n        font-family: 'Plus Jakarta Sans Variable';\\r\\n        font-style: normal;\\r\\n        font-display: swap;\\r\\n        /* color: #4777ad4b; */\\r\\n        font-weight: 200 800;\\r\\n        src: url(https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');\\r\\n        unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;\\r\\n}\\r\\n\\r\\n\\r\\nh1, h2, p {\\r\\n    font-family: 'Plus Jakarta Sans Variable';\\r\\n}\\r\\n\\r\\n    .top-container {\\r\\n        display: flex;\\r\\n        justify-content: space-between;\\r\\n        /* background-color: #4777ad4b; */\\r\\n        padding: 0.5rem;\\r\\n        border-radius: 0.3rem;\\r\\n        height: 10rem;\\r\\n        margin-bottom: 3rem;\\r\\n    }\\r\\n\\r\\n    /* .auth-section {\\r\\n        width: 12rem;\\r\\n        transform: translate(-1rem, -1rem);\\r\\n    } */\\r\\n\\r\\n    .title-container {\\r\\n        /* position: relative; */\\r\\n        flex: 1;\\r\\n        display: flex;\\r\\n        justify-content: center;\\r\\n        align-items: center;\\r\\n    }\\r\\n\\r\\n    .title {\\r\\n        font-size: 3.5rem;\\r\\n        text-overflow: ellipsis;  \\r\\n        white-space: no-wrap;\\r\\n        margin-top: 5rem;\\r\\n        font-weight: 500;\\r\\n        letter-spacing: 0.4rem;\\r\\n        /* position: absolute; */\\r\\n        transform: translateX(3.5rem);\\r\\n\\r\\n    }\\r\\n\\r\\n    .circle-stats {\\r\\n        /* margin: \\"0 auto\\";  */\\r\\n        max-width: \\"40rem\\";  \\r\\n        /* position: \\"relative\\";  */\\r\\n        font-family: 'Plus Jakarta Sans Variable';\\r\\n        display: flex;\\r\\n        justify-content: space-evenly;\\r\\n        transform: translateY(3rem);\\r\\n    }\\r\\n\\r\\n    .clock {\\r\\n        margin-bottom: 7rem;\\r\\n        /* margin-bottom: 2rem */\\r\\n    }\\r\\n\\r\\n    /* .length-input {\\r\\n        margin-bottom: 2rem;\\r\\n    } */\\r\\n\\r\\n    .info-section {\\r\\n        margin-top: 6rem;\\r\\n        margin-bottom: 2rem;\\r\\n        background-color: var(--modal-color);\\r\\n        /* padding-left:7rem;\\r\\n        padding-top:7rem; */\\r\\n        height: 34rem;\\r\\n        min-width: 21rem;\\r\\n        padding: 4rem;\\r\\n        border-radius: 1rem;\\r\\n        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\\r\\n    }\\r\\n\\r\\n    .circle-cont {\\r\\n        transform: translateY(-6rem);\\r\\n    }\\r\\n\\r\\n    .start {\\r\\n        margin-top: 5rem;\\r\\n    }\\r\\n\\r\\n    .stop {\\r\\n        margin-top: 15rem;\\r\\n        transform: translateX(3rem);\\r\\n    }\\r\\n    .stats-box {\\r\\n        margin-top: 5rem;\\r\\n    }\\r\\n    .gottaLogin {\\r\\n        transform: translateY(5rem);\\r\\n    }\\r\\n</style>\\r\\n{#if !$loading}\\r\\n<div class=\\"top-container\\" >\\r\\n    \\r\\n    <div class=\\"title-container\\">\\r\\n        <!-- <h1 class=\\"title\\">Fasting Clock</h1> -->\\r\\n    </div>\\r\\n    <div style=\\"width: 10rem\\">\\r\\n        <!-- <h4>{$hasStarted}</h4>\\r\\n        <h4>{$succeeded}</h4>\\r\\n        <h4>{$futureDate}</h4>\\r\\n        <h4>{$startDate}</h4>\\r\\n        <h4>{$currPerc.toFixed(2)}</h4>\\r\\n        <h4>{$remSeconds}</h4> -->\\r\\n    </div>\\r\\n</div>\\r\\n\\r\\n<div class=\\"circle-stats\\">\\r\\n    <div></div>\\r\\n    <div style:margin-left=\\"1rem\\">\\r\\n        {#if $hasStarted === false && $succeeded === false}    \\r\\n    \\r\\n    \\r\\n        <div class=\\"info-section\\" >\\r\\n            <div class=\\"clock\\"><Clock /></div>\\r\\n            <div class=\\"length-input\\"><LengthInput/></div>\\r\\n        {#if $user !== null}    \\r\\n            <div class=\\"start\\"><Start on:started={handleStart}/></div>\\r\\n        {:else}\\r\\n            <div class=\\"gottaLogin\\"><p>Log in to begin a fast!</p></div>    \\r\\n        {/if}    \\r\\n        </div>\\r\\n        {:else}\\r\\n        <div style:min-width=\\"1rem\\"></div>\\r\\n        <div class=\\"stats-box\\" >\\r\\n           \\r\\n            <Stats/>\\r\\n    \\r\\n           <div class=\\"stop\\"><Stop on:stopped={handleStop} /></div> \\r\\n        </div>\\r\\n        {/if}\\r\\n    </div>\\r\\n\\r\\n    <div style:min-width=\\"5rem\\"></div>\\r\\n    <div class=\\"circle-cont\\"><Circle /></div>\\r\\n    \\r\\n    <div>\\r\\n    </div>\\r\\n</div>\\r\\n{:else}\\r\\n<Loading />\\r\\n{/if}\\r\\n\\r\\n    <!-- <div  >\\r\\n        {#if $user !== null && $hasStarted === true}\\r\\n        <Stop on:stopped={handleStop}/>\\r\\n       \\r\\n        \\r\\n        {:else if $user !== null && $hasStarted === false}\\r\\n        <Start on:started={handleStart}/>\\r\\n        <div style:width=\\"22rem\\">\\r\\n            <Login />\\r\\n        </div>\\r\\n        \\r\\n        {/if}   \\r\\n        </div>\\r\\n         -->\\r\\n    \\r\\n   \\r\\n  \\r\\n<!-- <div>        \\r\\n    {#if $succeeded === true}\\r\\n    <div style:margin-top=\\"5rem\\" style:margin-left=\\"3rem\\">\\r\\n        <p>The fast has been completed, good job!</p>\\r\\n        <p>The fast started at {$startDate.toLocaleString()} and took {$hours} hours.</p>\\r\\n    </div>    \\r\\n    {/if}\\r\\n\\r\\n</div> -->\\r\\n"],"names":[],"mappings":"AAmHI,UAAW,CACP,WAAW,CAAE,4BAA4B,CACzC,UAAU,CAAE,MAAM,CAClB,YAAY,CAAE,IAAI,CAElB,WAAW,CAAE,GAAG,CAAC,GAAG,CACpB,GAAG,CAAE,kGAAkG,CAAC,OAAO,kBAAkB,CAAC,CAClI,aAAa,CAAE,WAAW,CAAC,MAAM,CAAC,WAAW,CAAC,WAAW,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,WAAW,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAChL,CAGQ,eAAE,CACN,WAAW,CAAE,4BACjB,CAEI,4BAAe,CACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAE9B,OAAO,CAAE,MAAM,CACf,aAAa,CAAE,MAAM,CACrB,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,IACnB,CAOA,8BAAiB,CAEb,IAAI,CAAE,CAAC,CACP,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MACjB,CAcA,2BAAc,CAEV,SAAS,CAAE,OAAO,CAElB,WAAW,CAAE,4BAA4B,CACzC,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,YAAY,CAC7B,SAAS,CAAE,WAAW,IAAI,CAC9B,CAEA,oBAAO,CACH,aAAa,CAAE,IAEnB,CAMA,2BAAc,CACV,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,CACnB,gBAAgB,CAAE,IAAI,aAAa,CAAC,CAGpC,MAAM,CAAE,KAAK,CACb,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAC3C,CAEA,0BAAa,CACT,SAAS,CAAE,WAAW,KAAK,CAC/B,CAEA,oBAAO,CACH,UAAU,CAAE,IAChB,CAEA,mBAAM,CACF,UAAU,CAAE,KAAK,CACjB,SAAS,CAAE,WAAW,IAAI,CAC9B,CACA,wBAAW,CACP,UAAU,CAAE,IAChB,CACA,yBAAY,CACR,SAAS,CAAE,WAAW,IAAI,CAC9B"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $succeeded, $$unsubscribe_succeeded;
  let $totalTime, $$unsubscribe_totalTime;
  let $hours, $$unsubscribe_hours;
  let $currPerc, $$unsubscribe_currPerc;
  let $hasStarted, $$unsubscribe_hasStarted;
  let $futureDate, $$unsubscribe_futureDate;
  let $startDate, $$unsubscribe_startDate;
  let $user, $$unsubscribe_user;
  let $$unsubscribe_exceeded;
  let $$unsubscribe_remSeconds;
  let $loading, $$unsubscribe_loading;
  $$unsubscribe_succeeded = subscribe(succeeded, (value) => $succeeded = value);
  $$unsubscribe_totalTime = subscribe(totalTime, (value) => $totalTime = value);
  $$unsubscribe_hours = subscribe(hours, (value) => $hours = value);
  $$unsubscribe_currPerc = subscribe(currPerc, (value) => $currPerc = value);
  $$unsubscribe_hasStarted = subscribe(hasStarted, (value) => $hasStarted = value);
  $$unsubscribe_futureDate = subscribe(futureDate, (value) => $futureDate = value);
  $$unsubscribe_startDate = subscribe(startDate, (value) => $startDate = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_exceeded = subscribe(exceeded, (value) => value);
  $$unsubscribe_remSeconds = subscribe(remSeconds, (value) => value);
  $$unsubscribe_loading = subscribe(loading, (value) => $loading = value);
  function handleStop() {
    console.log("stop received");
    set_store_value(hasStarted, $hasStarted = false, $hasStarted);
    putFast();
    set_store_value(succeeded, $succeeded = false, $succeeded);
    set_store_value(currPerc, $currPerc = 50, $currPerc);
    set_store_value(hours, $hours = 12, $hours);
    set_store_value(loading, $loading = true, $loading);
    setTimeout(
      () => {
        set_store_value(loading, $loading = false, $loading);
        window.location.reload();
      },
      1300
    );
  }
  async function putFast() {
    let data = {
      "pathParameters": {
        "UserID": $user?.username,
        "StartDate": $startDate.getTime(),
        "EndDate": $futureDate.getTime(),
        "InProgress": $hasStarted,
        "PercentRemaining": $currPerc,
        "ExpectedDuration": $hours,
        "ActualDuration": $totalTime,
        "Succeeded": $succeeded
      }
    };
    let url = aws_stages.API_PUT_URL;
    console.log(data);
    axios.put(url, data).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error(`Error: ${error}`);
    });
  }
  if ($$props.handleStop === void 0 && $$bindings.handleStop && handleStop !== void 0)
    $$bindings.handleStop(handleStop);
  $$result.css.add(css);
  $$unsubscribe_succeeded();
  $$unsubscribe_totalTime();
  $$unsubscribe_hours();
  $$unsubscribe_currPerc();
  $$unsubscribe_hasStarted();
  $$unsubscribe_futureDate();
  $$unsubscribe_startDate();
  $$unsubscribe_user();
  $$unsubscribe_exceeded();
  $$unsubscribe_remSeconds();
  $$unsubscribe_loading();
  return `${!$loading ? `<div class="top-container svelte-gg2mvm" data-svelte-h="svelte-hkq52y"><div class="title-container svelte-gg2mvm"></div> <div style="width: 10rem"></div></div> <div class="circle-stats svelte-gg2mvm"><div></div> <div${add_styles({ "margin-left": `1rem` })}>${$hasStarted === false && $succeeded === false ? `<div class="info-section svelte-gg2mvm"><div class="clock svelte-gg2mvm">${validate_component(Clock, "Clock").$$render($$result, {}, {}, {})}</div> <div class="length-input">${validate_component(LengthInput, "LengthInput").$$render($$result, {}, {}, {})}</div> ${$user !== null ? `<div class="start svelte-gg2mvm">${validate_component(Start, "Start").$$render($$result, {}, {}, {})}</div>` : `<div class="gottaLogin svelte-gg2mvm" data-svelte-h="svelte-ttfgrd"><p class="svelte-gg2mvm">Log in to begin a fast!</p></div>`}</div>` : `<div${add_styles({ "min-width": `1rem` })}></div> <div class="stats-box svelte-gg2mvm">${validate_component(Stats, "Stats").$$render($$result, {}, {}, {})} <div class="stop svelte-gg2mvm">${validate_component(Stop, "Stop").$$render($$result, {}, {}, {})}</div></div>`}</div> <div${add_styles({ "min-width": `5rem` })}></div> <div class="circle-cont svelte-gg2mvm">${validate_component(Circle, "Circle").$$render($$result, {}, {}, {})}</div> <div data-svelte-h="svelte-1bipc6g"></div></div>` : `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}`}  `;
});
export {
  Page as default
};
