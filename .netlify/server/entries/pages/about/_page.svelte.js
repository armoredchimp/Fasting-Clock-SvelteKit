import { c as create_ssr_component, b as compute_rest_props, d as spread, j as escape_attribute_value, f as escape_object, e as escape, k as each, h as add_classes, t as add_styles, v as validate_component, p as setContext, o as getContext, g as add_attribute } from "../../../chunks/ssr.js";
import "../../../chunks/stores2.js";
/* empty css                                                 */
import { w as writable } from "../../../chunks/index.js";
const ChevronRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="M22 16L12 26 10.6 24.6 19.2 16 10.6 7.4 12 6z"></path></svg>`;
});
const SkeletonText = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let widthNum;
  let widthPx;
  let $$restProps = compute_rest_props($$props, ["lines", "heading", "paragraph", "width"]);
  let { lines = 3 } = $$props;
  let { heading = false } = $$props;
  let { paragraph = false } = $$props;
  let { width = "100%" } = $$props;
  const RANDOM = [0.973, 0.153, 0.567];
  if ($$props.lines === void 0 && $$bindings.lines && lines !== void 0)
    $$bindings.lines(lines);
  if ($$props.heading === void 0 && $$bindings.heading && heading !== void 0)
    $$bindings.heading(heading);
  if ($$props.paragraph === void 0 && $$bindings.paragraph && paragraph !== void 0)
    $$bindings.paragraph(paragraph);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  widthNum = parseInt(width, 10);
  widthPx = width.includes("px");
  return ` ${paragraph ? ` <div${spread([escape_object($$restProps)], {})}>${each(
    Array.from({ length: lines }).map((_, i) => {
      const min = widthPx ? widthNum - 75 : 0;
      const max = widthPx ? widthNum : 75;
      const rand = Math.floor(RANDOM[i % 3] * (max - min + 1)) + min + "px";
      return widthPx ? rand : `calc(${width} - ${rand})`;
    }),
    (width2) => {
      return `<p${add_classes(("bx--skeleton__text " + (heading ? "bx--skeleton__heading" : "")).trim())}${add_styles({ width: width2 })}></p>`;
    }
  )}</div>` : ` <p${spread([escape_object($$restProps)], {
    classes: "bx--skeleton__text " + (heading ? "bx--skeleton__heading" : ""),
    styles: { width }
  })}></p>`}`;
});
const AccordionSkeleton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["count", "align", "size", "open"]);
  let { count = 4 } = $$props;
  let { align = "end" } = $$props;
  let { size = void 0 } = $$props;
  let { open = true } = $$props;
  if ($$props.count === void 0 && $$bindings.count && count !== void 0)
    $$bindings.count(count);
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  return `  <ul${spread([escape_object($$restProps)], {
    classes: "bx--skeleton bx--accordion " + (align === "start" ? "bx--accordion--start" : "") + " " + (align === "end" ? "bx--accordion--end" : "") + " " + (size === "sm" ? "bx--accordion--sm" : "") + " " + (size === "xl" ? "bx--accordion--xl" : "")
  })}>${open ? `<li${add_classes("bx--accordion__item bx--accordion__item--active".trim())}><span${add_classes("bx--accordion__heading".trim())}>${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: "bx--accordion__arrow" }, {}, {})} ${validate_component(SkeletonText, "SkeletonText").$$render($$result, { class: "bx--accordion__title" }, {}, {})}</span> <div${add_classes("bx--accordion__content".trim())}>${validate_component(SkeletonText, "SkeletonText").$$render($$result, { width: "90%" }, {}, {})} ${validate_component(SkeletonText, "SkeletonText").$$render($$result, { width: "80%" }, {}, {})} ${validate_component(SkeletonText, "SkeletonText").$$render($$result, { width: "95%" }, {}, {})}</div></li>` : ``} ${each(Array.from({ length: open ? count - 1 : count }, (_, i) => i), (item) => {
    return `<li${add_classes("bx--accordion__item".trim())}><span${add_classes("bx--accordion__heading".trim())}>${validate_component(ChevronRight, "ChevronRight").$$render($$result, { class: "bx--accordion__arrow" }, {}, {})} ${validate_component(SkeletonText, "SkeletonText").$$render($$result, { class: "bx--accordion__title" }, {}, {})}</span> </li>`;
  })}</ul>`;
});
const Accordion = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["align", "size", "disabled", "skeleton"]);
  let { align = "end" } = $$props;
  let { size = void 0 } = $$props;
  let { disabled = false } = $$props;
  let { skeleton = false } = $$props;
  const disableItems = writable(disabled);
  setContext("Accordion", { disableItems });
  if ($$props.align === void 0 && $$bindings.align && align !== void 0)
    $$bindings.align(align);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.skeleton === void 0 && $$bindings.skeleton && skeleton !== void 0)
    $$bindings.skeleton(skeleton);
  {
    disableItems.set(disabled);
  }
  return ` ${skeleton ? `${validate_component(AccordionSkeleton, "AccordionSkeleton").$$render($$result, Object.assign({}, $$restProps, { align }, { size }), {}, {})}` : ` <ul${spread([escape_object($$restProps)], {
    classes: "bx--accordion " + (align === "start" ? "bx--accordion--start" : "") + " " + (align === "end" ? "bx--accordion--end" : "") + " " + (size === "sm" ? "bx--accordion--sm" : "") + " " + (size === "xl" ? "bx--accordion--xl" : "")
  })}>${slots.default ? slots.default({}) : ``}</ul>`}`;
});
const AccordionItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["title", "open", "disabled", "iconDescription"]);
  let { title = "title" } = $$props;
  let { open = false } = $$props;
  let { disabled = false } = $$props;
  let { iconDescription = "Expand/Collapse" } = $$props;
  let initialDisabled = disabled;
  const ctx = getContext("Accordion");
  ctx.disableItems.subscribe((value) => {
    if (!value && initialDisabled)
      return;
    disabled = value;
  });
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.iconDescription === void 0 && $$bindings.iconDescription && iconDescription !== void 0)
    $$bindings.iconDescription(iconDescription);
  return ` <li${spread([escape_object($$restProps)], {
    classes: "bx--accordion__item " + (open ? "bx--accordion__item--active" : "") + " " + (disabled ? "bx--accordion__item--disabled" : "") + "  "
  })}><button type="button"${add_attribute("title", iconDescription, 0)}${add_attribute("aria-expanded", open, 0)} ${disabled ? "disabled" : ""}${add_classes("bx--accordion__heading".trim())}>${validate_component(ChevronRight, "ChevronRight").$$render(
    $$result,
    {
      class: "bx--accordion__arrow",
      "aria-label": iconDescription
    },
    {},
    {}
  )} <div${add_classes("bx--accordion__title".trim())}>${slots.title ? slots.title({}) : `${escape(title)}`}</div></button> <div${add_classes("bx--accordion__content".trim())}>${slots.default ? slots.default({}) : ``}</div></li>`;
});
const css$1 = {
  code: ".card.svelte-piommr{background-color:var(--modal-color);border-radius:0.8rem;padding:2rem;text-align:center;transition:transform 0.3s ease-in-out;display:flex;width:17rem;height:100%;flex-direction:column;align-items:center}.card.svelte-piommr:hover{transform:translateY(-0.5rem)}.icon-cont.svelte-piommr{width:5rem;height:7rem;margin-bottom:1.5rem;display:flex;justify-content:center;align-items:center}.icon.svelte-piommr{max-width:100%;max-height:100%}p.svelte-piommr{font-size:0.9em;margin-top:1rem}",
  map: '{"version":3,"file":"Card.svelte","sources":["Card.svelte"],"sourcesContent":["<script>\\r\\n    import { Accordion, AccordionItem } from \\"carbon-components-svelte\\";\\r\\n    \\r\\n    export let title;\\r\\n    export let svgPath;\\r\\n    export let desc;\\r\\n\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n    .card {\\r\\n        background-color: var(--modal-color);\\r\\n        border-radius: 0.8rem;\\r\\n        padding: 2rem;\\r\\n        text-align: center;\\r\\n        transition: transform 0.3s ease-in-out;\\r\\n        display: flex;\\r\\n        width: 17rem;\\r\\n        height: 100%;\\r\\n        flex-direction: column;\\r\\n        align-items: center;\\r\\n    }\\r\\n\\r\\n    .card:hover {\\r\\n        transform: translateY(-0.5rem);\\r\\n    }\\r\\n\\r\\n    .icon-cont {\\r\\n        width: 5rem;\\r\\n        height: 7rem;\\r\\n        margin-bottom: 1.5rem;\\r\\n        display: flex;\\r\\n        justify-content: center;\\r\\n        align-items: center;\\r\\n    }\\r\\n\\r\\n    .icon {\\r\\n        max-width: 100%;\\r\\n        max-height: 100%;\\r\\n    }\\r\\n\\r\\n    h3 {\\r\\n        margin: 0;\\r\\n        font-size: 1.2em;\\r\\n    }\\r\\n\\r\\n    p {\\r\\n        font-size: 0.9em;\\r\\n        margin-top: 1rem;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\"card\\">\\r\\n    <div class=\\"icon-cont\\">\\r\\n        <img src={svgPath} alt={title} class=\\"icon\\" />\\r\\n    </div>\\r\\n    <Accordion>\\r\\n        <AccordionItem title={title}>\\r\\n            <p>{desc}</p>\\r\\n        </AccordionItem>\\r\\n\\r\\n    </Accordion>\\r\\n\\r\\n</div>"],"names":[],"mappings":"AAWI,mBAAM,CACF,gBAAgB,CAAE,IAAI,aAAa,CAAC,CACpC,aAAa,CAAE,MAAM,CACrB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,WAAW,CACtC,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MACjB,CAEA,mBAAK,MAAO,CACR,SAAS,CAAE,WAAW,OAAO,CACjC,CAEA,wBAAW,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,MAAM,CACrB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MACjB,CAEA,mBAAM,CACF,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,IAChB,CAOA,eAAE,CACE,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,IAChB"}'
};
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { svgPath } = $$props;
  let { desc } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.svgPath === void 0 && $$bindings.svgPath && svgPath !== void 0)
    $$bindings.svgPath(svgPath);
  if ($$props.desc === void 0 && $$bindings.desc && desc !== void 0)
    $$bindings.desc(desc);
  $$result.css.add(css$1);
  return `<div class="card svelte-piommr"><div class="icon-cont svelte-piommr"><img${add_attribute("src", svgPath, 0)}${add_attribute("alt", title, 0)} class="icon svelte-piommr"></div> ${validate_component(Accordion, "Accordion").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(AccordionItem, "AccordionItem").$$render($$result, { title }, {}, {
        default: () => {
          return `<p class="svelte-piommr">${escape(desc)}</p>`;
        }
      })}`;
    }
  })}</div>`;
});
const awsCards = [
  {
    id: 1,
    title: "Lambda",
    svgPath: "/images/Lambda.svg",
    desc: "Integrated with API-Gateway methods and used to query DynamoDB, written in node.js"
  },
  {
    id: 2,
    title: "API Gateway",
    svgPath: "/images/API Gateway.svg",
    desc: "Manages API endpoints, integrating with Lambda functions to handle requests and responses"
  },
  {
    id: 3,
    title: "Cognito",
    svgPath: "/images/Cognito.svg",
    desc: "Provides user authentication and authorization"
  },
  {
    id: 4,
    title: "Amplify",
    svgPath: "/images/Amplify.svg",
    desc: "Simplifies the integration of AWS services into the frontend, handling authentication flows and API calls"
  },
  {
    id: 5,
    title: "DynamoDB",
    svgPath: "/images/DynamoDB.svg",
    desc: "NoSQL database used to store and retrieve user data and fasting records efficiently and at scale"
  }
];
const langCards = [
  {
    id: 1,
    title: "SvelteKit",
    svgPath: "/images/svelte-kit.svg",
    desc: "JavaScript framework used for the majority of the site"
  },
  {
    id: 2,
    title: "JavaScript",
    svgPath: "/images/javascript.svg",
    desc: "Primary programming language used throughout SvelteKit and to store object data"
  },
  {
    id: 3,
    title: "Node.JS",
    svgPath: "/images/nodejs-icon.svg",
    desc: "Backend language used for Lambda functions"
  },
  {
    id: 4,
    title: "TypeScript",
    svgPath: "/images/typescript-icon.svg",
    desc: "Used only to handle user authentication"
  },
  {
    id: 5,
    title: "HTML-5",
    svgPath: "/images/html-5.svg",
    desc: "Markup for every component and page"
  },
  {
    id: 6,
    title: "CSS-3",
    svgPath: "/images/css-3.svg",
    desc: "Styling for the entire site"
  }
];
const css = {
  code: ".main-cont.svelte-y75opo{display:flex;flex-direction:column;gap:6rem}.section-cont.svelte-y75opo{margin-bottom:5rem}.primary.svelte-y75opo{height:30rem}.card-grid.svelte-y75opo{display:grid;grid-template-columns:repeat(auto-fill, minmax(15rem, 1fr));gap:3rem;padding:2rem;justify-items:center;align-items:start}.card-wrapper.svelte-y75opo{display:grid;background-color:var(--modal-color)}h2.svelte-y75opo{text-align:center;margin-bottom:3rem\r\n    }",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n\\r\\n\\timport { onMount } from \\"svelte\\";\\r\\n    import { currPage } from \\"$lib/stores\\";\\r\\n    import Card from \\"$lib/Card.svelte\\";\\r\\n    import { hasStarted } from \\"$lib/stores\\";\\r\\n    import { awsCards, langCards } from \\"$lib/aboutData\\";\\r\\n\\r\\n    onMount(()=>{\\r\\n        currPage.set('/about')\\r\\n    })\\r\\n\\r\\n\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n    .main-cont {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        gap: 6rem;\\r\\n    }\\r\\n\\r\\n    .section-cont {\\r\\n        margin-bottom: 5rem;\\r\\n    }\\r\\n\\r\\n    .primary {\\r\\n        height: 30rem;\\r\\n    }\\r\\n\\r\\n    .card-grid {\\r\\n        display: grid;\\r\\n        grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));\\r\\n        gap: 3rem;\\r\\n        padding: 2rem;\\r\\n        justify-items: center;\\r\\n        align-items: start;\\r\\n    }\\r\\n\\r\\n    .card-wrapper {\\r\\n        display: grid;\\r\\n        background-color: var(--modal-color);\\r\\n    }\\r\\n\\r\\n    .card {\\r\\n        background-color: var(--modal-color);\\r\\n    }\\r\\n\\r\\n    h1 {\\r\\n        text-align: center;\\r\\n        margin-bottom: 2rem;\\r\\n    }\\r\\n\\r\\n    h2 {\\r\\n        text-align: center;\\r\\n        margin-bottom: 3rem\\r\\n    }\\r\\n</style>\\r\\n\\r\\n\\r\\n\\r\\n<div class=\\"main-cont\\">\\r\\n    <div class=\\"section-cont primary\\">\\r\\n        \\r\\n        <h2 style:margin-top=\\"3rem\\">AWS Microservices</h2>\\r\\n        <div class=\\"card-grid\\">\\r\\n        {#each awsCards as card (card.id)}\\r\\n            <div class=\\"card-wrapper\\">\\r\\n            <Card title={card.title} svgPath={card.svgPath} desc={card.desc} />\\r\\n            </div>    \\r\\n            {/each}    \\r\\n        </div>\\r\\n\\r\\n    </div>\\r\\n\\r\\n    <div class=\\"section-cont secondary\\">\\r\\n    <h2 style:margin-top=\\"6rem\\">Languages and Frameworks</h2>\\r\\n\\r\\n        <div class=\\"card-grid\\">\\r\\n        {#each langCards as card (card.id)}\\r\\n            <div class=\\"card-wrapper\\">\\r\\n            <Card title={card.title} svgPath={card.svgPath} desc={card.desc} />\\r\\n            </div>    \\r\\n            {/each}    \\r\\n        </div>\\r\\n    </div>\\r\\n</div>    "],"names":[],"mappings":"AAiBI,wBAAW,CACP,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IACT,CAEA,2BAAc,CACV,aAAa,CAAE,IACnB,CAEA,sBAAS,CACL,MAAM,CAAE,KACZ,CAEA,wBAAW,CACP,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,SAAS,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,CAC5D,GAAG,CAAE,IAAI,CACT,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,MAAM,CACrB,WAAW,CAAE,KACjB,CAEA,2BAAc,CACV,OAAO,CAAE,IAAI,CACb,gBAAgB,CAAE,IAAI,aAAa,CACvC,CAWA,gBAAG,CACC,UAAU,CAAE,MAAM,CAClB,aAAa,CAAE,IAAI;AAC3B,IAAI"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="main-cont svelte-y75opo"><div class="section-cont primary svelte-y75opo"><h2 class="svelte-y75opo"${add_styles({ "margin-top": `3rem` })} data-svelte-h="svelte-12rgl7u">AWS Microservices</h2> <div class="card-grid svelte-y75opo">${each(awsCards, (card) => {
    return `<div class="card-wrapper svelte-y75opo">${validate_component(Card, "Card").$$render(
      $$result,
      {
        title: card.title,
        svgPath: card.svgPath,
        desc: card.desc
      },
      {},
      {}
    )} </div>`;
  })}</div></div> <div class="section-cont secondary svelte-y75opo"><h2 class="svelte-y75opo"${add_styles({ "margin-top": `6rem` })} data-svelte-h="svelte-70gr2n">Languages and Frameworks</h2> <div class="card-grid svelte-y75opo">${each(langCards, (card) => {
    return `<div class="card-wrapper svelte-y75opo">${validate_component(Card, "Card").$$render(
      $$result,
      {
        title: card.title,
        svgPath: card.svgPath,
        desc: card.desc
      },
      {},
      {}
    )} </div>`;
  })}</div></div></div>`;
});
export {
  Page as default
};
