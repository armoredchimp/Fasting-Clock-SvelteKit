import { u as get_store_value, c as create_ssr_component, s as subscribe, g as add_attribute, e as escape, v as validate_component } from "../../chunks/ssr.js";
import { Amplify } from "aws-amplify";
import { a as userStore, u as user } from "../../chunks/userStore.js";
import { s as succeeded, t as totalTime, h as hours, c as currPerc, a as hasStarted, b as futureDate, e as startDate, l as loading, g as currPage } from "../../chunks/stores2.js";
import { n as navigating } from "../../chunks/stores.js";
import { w as writable, d as derived } from "../../chunks/index.js";
import { dequal } from "dequal/lite";
import { signIn, getCurrentUser, signUp, confirmSignUp } from "aws-amplify/auth";
/* empty css                                                */
const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-west-2_PfjaEmH5L",
      userPoolClientId: "1p3j2bg3or47bsmkskv76l44ia",
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true
      }
    }
  }
};
function subscribeOnce(observable) {
  return new Promise((resolve) => {
    observable.subscribe(resolve)();
  });
}
function update(object, path, value) {
  object.update((o) => {
    set(o, path, value);
    return o;
  });
}
function cloneDeep(object) {
  return JSON.parse(JSON.stringify(object));
}
function isNullish(value) {
  return value === void 0 || value === null;
}
function isEmpty(object) {
  return isNullish(object) || Object.keys(object).length <= 0;
}
function getValues(object) {
  let results = [];
  for (const [, value] of Object.entries(object)) {
    const values = typeof value === "object" ? getValues(value) : [value];
    results = [...results, ...values];
  }
  return results;
}
function getErrorsFromSchema(initialValues, schema, errors = {}) {
  for (const key in schema) {
    switch (true) {
      case (schema[key].type === "object" && !isEmpty(schema[key].fields)): {
        errors[key] = getErrorsFromSchema(
          initialValues[key],
          schema[key].fields,
          { ...errors[key] }
        );
        break;
      }
      case schema[key].type === "array": {
        const values = initialValues && initialValues[key] ? initialValues[key] : [];
        errors[key] = values.map((value) => {
          const innerError = getErrorsFromSchema(
            value,
            schema[key].innerType.fields,
            { ...errors[key] }
          );
          return Object.keys(innerError).length > 0 ? innerError : "";
        });
        break;
      }
      default: {
        errors[key] = "";
      }
    }
  }
  return errors;
}
const deepEqual = dequal;
function assignDeep(object, value) {
  if (Array.isArray(object)) {
    return object.map((o) => assignDeep(o, value));
  }
  const copy = {};
  for (const key in object) {
    copy[key] = typeof object[key] === "object" && !isNullish(object[key]) ? assignDeep(object[key], value) : value;
  }
  return copy;
}
function set(object, path, value) {
  if (new Object(object) !== object)
    return object;
  if (!Array.isArray(path)) {
    path = path.toString().match(/[^.[\]]+/g) || [];
  }
  const result = path.slice(0, -1).reduce(
    (accumulator, key, index) => new Object(accumulator[key]) === accumulator[key] ? accumulator[key] : accumulator[key] = Math.trunc(Math.abs(path[index + 1])) === +path[index + 1] ? [] : {},
    object
  );
  result[path[path.length - 1]] = value;
  return object;
}
const util = {
  assignDeep,
  cloneDeep,
  deepEqual,
  getErrorsFromSchema,
  getValues,
  isEmpty,
  isNullish,
  set,
  subscribeOnce,
  update
};
const NO_ERROR = "";
const IS_TOUCHED = true;
function isCheckbox(element) {
  return element.getAttribute && element.getAttribute("type") === "checkbox";
}
function isFileInput(element) {
  return element.getAttribute && element.getAttribute("type") === "file";
}
function resolveValue(element) {
  if (isFileInput(element)) {
    return element.files;
  } else if (isCheckbox(element)) {
    return element.checked;
  } else {
    return element.value;
  }
}
const createForm = (config) => {
  let initialValues = config.initialValues || {};
  const validationSchema = config.validationSchema;
  const validateFunction = config.validate;
  const onSubmit = config.onSubmit;
  const getInitial = {
    values: () => util.cloneDeep(initialValues),
    errors: () => validationSchema ? util.getErrorsFromSchema(initialValues, validationSchema.fields) : util.assignDeep(initialValues, NO_ERROR),
    touched: () => util.assignDeep(initialValues, !IS_TOUCHED)
  };
  const form = writable(getInitial.values());
  const errors = writable(getInitial.errors());
  const touched = writable(getInitial.touched());
  const isSubmitting = writable(false);
  const isValidating = writable(false);
  const isValid = derived(errors, ($errors) => {
    const noErrors = util.getValues($errors).every((field) => field === NO_ERROR);
    return noErrors;
  });
  const modified = derived(form, ($form) => {
    const object = util.assignDeep($form, false);
    for (let key in $form) {
      object[key] = !util.deepEqual($form[key], initialValues[key]);
    }
    return object;
  });
  const isModified = derived(modified, ($modified) => {
    return util.getValues($modified).includes(true);
  });
  function validateField(field) {
    return util.subscribeOnce(form).then((values) => validateFieldValue(field, values[field]));
  }
  function validateFieldValue(field, value) {
    updateTouched(field, true);
    if (validationSchema) {
      isValidating.set(true);
      return validationSchema.validateAt(field, get_store_value(form)).then(() => util.update(errors, field, "")).catch((error) => util.update(errors, field, error.message)).finally(() => {
        isValidating.set(false);
      });
    }
    if (validateFunction) {
      isValidating.set(true);
      return Promise.resolve().then(() => validateFunction({ [field]: value })).then(
        (errs) => util.update(errors, field, !util.isNullish(errs) ? errs[field] : "")
      ).finally(() => {
        isValidating.set(false);
      });
    }
    return Promise.resolve();
  }
  function updateValidateField(field, value) {
    updateField(field, value);
    return validateFieldValue(field, value);
  }
  function handleChange(event) {
    const element = event.target;
    const field = element.name || element.id;
    const value = resolveValue(element);
    return updateValidateField(field, value);
  }
  function handleSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    isSubmitting.set(true);
    return util.subscribeOnce(form).then((values) => {
      if (typeof validateFunction === "function") {
        isValidating.set(true);
        return Promise.resolve().then(() => validateFunction(values)).then((error) => {
          if (util.isNullish(error) || util.getValues(error).length === 0) {
            return clearErrorsAndSubmit(values);
          } else {
            errors.set(error);
            isSubmitting.set(false);
          }
        }).finally(() => isValidating.set(false));
      }
      if (validationSchema) {
        isValidating.set(true);
        return validationSchema.validate(values, { abortEarly: false }).then(() => clearErrorsAndSubmit(values)).catch((yupErrors) => {
          if (yupErrors && yupErrors.inner) {
            const updatedErrors = getInitial.errors();
            yupErrors.inner.map(
              (error) => util.set(updatedErrors, error.path, error.message)
            );
            errors.set(updatedErrors);
          }
          isSubmitting.set(false);
        }).finally(() => isValidating.set(false));
      }
      return clearErrorsAndSubmit(values);
    });
  }
  function handleReset() {
    form.set(getInitial.values());
    errors.set(getInitial.errors());
    touched.set(getInitial.touched());
  }
  function clearErrorsAndSubmit(values) {
    return Promise.resolve().then(() => errors.set(getInitial.errors())).then(() => onSubmit(values, form, errors)).finally(() => isSubmitting.set(false));
  }
  function updateField(field, value) {
    util.update(form, field, value);
  }
  function updateTouched(field, value) {
    util.update(touched, field, value);
  }
  function updateInitialValues(newValues) {
    initialValues = newValues;
    handleReset();
  }
  return {
    form,
    errors,
    touched,
    modified,
    isValid,
    isSubmitting,
    isValidating,
    isModified,
    handleChange,
    handleSubmit,
    handleReset,
    updateField,
    updateValidateField,
    updateTouched,
    validateField,
    updateInitialValues,
    state: derived(
      [
        form,
        errors,
        touched,
        modified,
        isValid,
        isValidating,
        isSubmitting,
        isModified
      ],
      ([
        $form,
        $errors,
        $touched,
        $modified,
        $isValid,
        $isValidating,
        $isSubmitting,
        $isModified
      ]) => ({
        form: $form,
        errors: $errors,
        touched: $touched,
        modified: $modified,
        isValid: $isValid,
        isSubmitting: $isSubmitting,
        isValidating: $isValidating,
        isModified: $isModified
      })
    )
  };
};
const css$3 = {
  code: ".login-cont.svelte-a4pc4s{display:flex;flex-direction:column;align-items:stretch;background-color:var(--primary-color);padding:2rem 2rem 3rem 1rem}.form-group.svelte-a4pc4s{flex:1;margin-bottom:0.7rem}input.svelte-a4pc4s{width:100%;padding:5px;border:1px solid #a5d6a7;border-radius:4px}.error.svelte-a4pc4s{color:#c62828;font-size:0.7em}button.svelte-a4pc4s{background:none;color:white;padding:7px 12px;border:none;border-radius:4px;cursor:pointer;margin-top:2rem;font-size:14px;width:auto;min-width:100px;transition:background-color 0.3s color 0.3s;margin-right:2rem;align-self:flex-end}button.svelte-a4pc4s:hover{background-color:var(--secondary-color)}",
  map: `{"version":3,"file":"Login.svelte","sources":["Login.svelte"],"sourcesContent":["<script>\\r\\n    import {createForm} from \\"svelte-forms-lib\\"\\r\\n    import { signIn, getCurrentUser } from 'aws-amplify/auth';\\r\\n    import { user, userStore } from '$lib/auth/userStore';\\r\\n\\r\\n    const { form, errors, handleChange, handleSubmit } = createForm({\\r\\n        initialValues: {\\r\\n            username: '',\\r\\n            password: '',\\r\\n        },\\r\\n        validate: (values) => {\\r\\n            let errors = {};\\r\\n            if (!values.username) errors.username = 'Username is required';\\r\\n            if (!values.password) errors.password = 'Password is required';\\r\\n            return errors;\\r\\n        },\\r\\n        onSubmit: async (values) => {\\r\\n            try {\\r\\n                await handleLogin(values);\\r\\n            } catch (err) {\\r\\n                console.error('Error', err);\\r\\n            }\\r\\n        }\\r\\n    }); \\r\\n\\r\\n    async function handleLogin(values) {\\r\\n        try {\\r\\n            const { isSignedIn, nextStep } = await signIn({\\r\\n                username: values.username,\\r\\n                password: values.password,\\r\\n            });\\r\\n            if (isSignedIn) {\\r\\n                const currentUser = await getCurrentUser();\\r\\n                userStore.setUser(currentUser);\\r\\n                //Refresh the page to trigger the +layout mount functionality and check for an active fast\\r\\n                window.location.reload();\\r\\n            } else {\\r\\n                console.log('Failed to Login');\\r\\n            }\\r\\n        } catch(err) {\\r\\n            console.error('Login error', err);\\r\\n        }\\r\\n    }\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n    .login-cont {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        align-items: stretch;\\r\\n        background-color: var(--primary-color);\\r\\n        padding: 2rem 2rem 3rem 1rem;\\r\\n    }\\r\\n\\r\\n    .form-group {\\r\\n        flex: 1;\\r\\n        margin-bottom: 0.7rem;\\r\\n    }\\r\\n    input {\\r\\n        width: 100%;\\r\\n        padding: 5px;\\r\\n        border: 1px solid #a5d6a7;\\r\\n        border-radius: 4px;\\r\\n    }\\r\\n    .error {\\r\\n        color: #c62828;\\r\\n        font-size: 0.7em;\\r\\n    }\\r\\n    button {\\r\\n        background: none;\\r\\n        color: white;\\r\\n        padding: 7px 12px;\\r\\n        border: none;\\r\\n        border-radius: 4px;\\r\\n        cursor: pointer;\\r\\n        margin-top: 2rem;\\r\\n        font-size: 14px;\\r\\n        width: auto;\\r\\n        min-width: 100px;\\r\\n        transition: background-color 0.3s color 0.3s;\\r\\n        margin-right: 2rem;\\r\\n        align-self: flex-end;\\r\\n    }\\r\\n    button:hover {\\r\\n        background-color: var(--secondary-color);\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\"login-cont\\">\\r\\n    <form on:submit|preventDefault={handleSubmit}>\\r\\n        <div class=\\"form-group\\">\\r\\n            <input\\r\\n                type=\\"text\\"\\r\\n                id=\\"username\\"\\r\\n                name=\\"username\\"\\r\\n                placeholder=\\"Username\\"\\r\\n                bind:value={$form.username}\\r\\n                on:change={handleChange}\\r\\n            />\\r\\n            {#if $errors.username}\\r\\n                <span class=\\"error\\">{$errors.username}</span>\\r\\n            {/if}\\r\\n        </div>\\r\\n\\r\\n        <div class=\\"form-group\\">\\r\\n            <input\\r\\n                type=\\"password\\"\\r\\n                id=\\"password\\"\\r\\n                name=\\"password\\"\\r\\n                placeholder=\\"Password\\"\\r\\n                bind:value={$form.password}\\r\\n                on:change={handleChange}\\r\\n            />\\r\\n            {#if $errors.password}\\r\\n                <span class=\\"error\\">{$errors.password}</span>\\r\\n            {/if}\\r\\n        </div>\\r\\n\\r\\n        <button type=\\"submit\\">Login</button>\\r\\n    </form>\\r\\n</div>\\r\\n"],"names":[],"mappings":"AA8CI,yBAAY,CACR,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,OAAO,CACpB,gBAAgB,CAAE,IAAI,eAAe,CAAC,CACtC,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAC5B,CAEA,yBAAY,CACR,IAAI,CAAE,CAAC,CACP,aAAa,CAAE,MACnB,CACA,mBAAM,CACF,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,aAAa,CAAE,GACnB,CACA,oBAAO,CACH,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,KACf,CACA,oBAAO,CACH,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,gBAAgB,CAAC,IAAI,CAAC,KAAK,CAAC,IAAI,CAC5C,YAAY,CAAE,IAAI,CAClB,UAAU,CAAE,QAChB,CACA,oBAAM,MAAO,CACT,gBAAgB,CAAE,IAAI,iBAAiB,CAC3C"}`
};
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $errors, $$unsubscribe_errors;
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: { username: "", password: "" },
    validate: (values) => {
      let errors2 = {};
      if (!values.username)
        errors2.username = "Username is required";
      if (!values.password)
        errors2.password = "Password is required";
      return errors2;
    },
    onSubmit: async (values) => {
      try {
        await handleLogin(values);
      } catch (err) {
        console.error("Error", err);
      }
    }
  });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  async function handleLogin(values) {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: values.username,
        password: values.password
      });
      if (isSignedIn) {
        const currentUser = await getCurrentUser();
        userStore.setUser(currentUser);
        window.location.reload();
      } else {
        console.log("Failed to Login");
      }
    } catch (err) {
      console.error("Login error", err);
    }
  }
  $$result.css.add(css$3);
  $$unsubscribe_form();
  $$unsubscribe_errors();
  return `<div class="login-cont svelte-a4pc4s"><form><div class="form-group svelte-a4pc4s"><input type="text" id="username" name="username" placeholder="Username" class="svelte-a4pc4s"${add_attribute("value", $form.username, 0)}> ${$errors.username ? `<span class="error svelte-a4pc4s">${escape($errors.username)}</span>` : ``}</div> <div class="form-group svelte-a4pc4s"><input type="password" id="password" name="password" placeholder="Password" class="svelte-a4pc4s"${add_attribute("value", $form.password, 0)}> ${$errors.password ? `<span class="error svelte-a4pc4s">${escape($errors.password)}</span>` : ``}</div> <button type="submit" class="svelte-a4pc4s" data-svelte-h="svelte-1yamoz0">Login</button></form></div>`;
});
const css$2 = {
  code: "button.svelte-q6jlu5{background:none;color:white;padding:0;border:none;cursor:pointer;color:#e4dede;font:inherit;transition:color 0.3s ease}button.svelte-q6jlu5:hover{color:#c5c2c2}",
  map: `{"version":3,"file":"Logout.svelte","sources":["Logout.svelte"],"sourcesContent":["<script>\\r\\n    import axios from 'axios';\\r\\n    import { aws_stages } from '../aws/stages';\\r\\n\\timport { signOut } from \\"aws-amplify/auth\\";\\r\\n    import { user, userStore } from '$lib/auth/userStore';\\r\\n    import { hours, currPerc, startDate, futureDate, hasStarted, totalTime, succeeded } from '$lib/stores';\\r\\n\\r\\n    async function logOut(){\\r\\n        if($user !== null){\\r\\n            try {\\r\\n                if($hasStarted) {\\r\\n                    await putFast()\\r\\n                } \\r\\n                await signOut({ global: true })\\r\\n                userStore.reset()\\r\\n                $hasStarted = false;\\r\\n                $currPerc = 50; \\r\\n                $hours = 12\\r\\n            }catch(err) {\\r\\n                console.error(err)\\r\\n            }\\r\\n\\r\\n        }\\r\\n    }\\r\\n\\r\\n    async function putFast(){\\r\\n        let data = {\\r\\n            \\"pathParameters\\": {\\r\\n                \\"UserID\\": $user?.username,\\r\\n                \\"StartDate\\": $startDate.getTime(),\\r\\n                \\"EndDate\\": $futureDate.getTime(),\\r\\n                \\"InProgress\\": $hasStarted,\\r\\n                \\"PercentCompleted\\": $currPerc,\\r\\n                \\"ExpectedDuration\\": $hours,\\r\\n                \\"ActualDuration\\": $totalTime, \\r\\n                \\"Succeeded\\": $succeeded\\r\\n            }\\r\\n        }\\r\\n        let url = aws_stages.API_PUT_URL\\r\\n        console.log(data)\\r\\n        axios.put(url, data)\\r\\n        .then(response =>{\\r\\n            console.log(response.data)\\r\\n        })\\r\\n        .catch(error=> {\\r\\n            console.error(\`Error: \${error}\`)\\r\\n        });\\r\\n    }\\r\\n\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n    button {\\r\\n        background: none;\\r\\n        color: white;\\r\\n        padding: 0;\\r\\n        border: none;\\r\\n        cursor: pointer;\\r\\n        color: #e4dede;\\r\\n        font: inherit;\\r\\n        transition: color 0.3s ease;\\r\\n    }\\r\\n\\r\\n    button:hover {\\r\\n        color: #c5c2c2;\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<button type=\\"button\\" on:click={logOut}>Logout</button>"],"names":[],"mappings":"AAqDI,oBAAO,CACH,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,OAAO,CACd,IAAI,CAAE,OAAO,CACb,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,IAC3B,CAEA,oBAAM,MAAO,CACT,KAAK,CAAE,OACX"}`
};
const Logout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_succeeded;
  let $$unsubscribe_totalTime;
  let $$unsubscribe_hours;
  let $$unsubscribe_currPerc;
  let $$unsubscribe_hasStarted;
  let $$unsubscribe_futureDate;
  let $$unsubscribe_startDate;
  let $$unsubscribe_user;
  $$unsubscribe_succeeded = subscribe(succeeded, (value) => value);
  $$unsubscribe_totalTime = subscribe(totalTime, (value) => value);
  $$unsubscribe_hours = subscribe(hours, (value) => value);
  $$unsubscribe_currPerc = subscribe(currPerc, (value) => value);
  $$unsubscribe_hasStarted = subscribe(hasStarted, (value) => value);
  $$unsubscribe_futureDate = subscribe(futureDate, (value) => value);
  $$unsubscribe_startDate = subscribe(startDate, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$result.css.add(css$2);
  $$unsubscribe_succeeded();
  $$unsubscribe_totalTime();
  $$unsubscribe_hours();
  $$unsubscribe_currPerc();
  $$unsubscribe_hasStarted();
  $$unsubscribe_futureDate();
  $$unsubscribe_startDate();
  $$unsubscribe_user();
  return `<button type="button" class="svelte-q6jlu5" data-svelte-h="svelte-1g8vzq9">Logout</button>`;
});
const css$1 = {
  code: ".reg-cont.svelte-1hmijqa{display:flex;flex-direction:column;align-items:stretch;background-color:var(--primary-color);border-bottom-right-radius:0.2rem;padding:2rem 2rem 3rem 1rem}.form-group.svelte-1hmijqa{flex:1;margin-bottom:0.7rem}input.svelte-1hmijqa{width:100%;padding:5px;border:1px solid var(--lighter-color);border-radius:4px}.error.svelte-1hmijqa{color:#c62828;font-size:0.7em}button.svelte-1hmijqa{background:none;color:white;padding:7px 12px;border:none;border-radius:4px;cursor:pointer;margin-top:2rem;font-size:14px;width:auto;min-width:100px;transition:background-color 0.3s color 0.3s;margin-right:2rem;align-self:flex-end}button.svelte-1hmijqa:hover{background-color:var(--secondary-color)}",
  map: `{"version":3,"file":"Register.svelte","sources":["Register.svelte"],"sourcesContent":["<script>\\r\\n    import { createForm } from \\"svelte-forms-lib\\";\\r\\n    import { signUp, confirmSignUp, signIn, getCurrentUser } from 'aws-amplify/auth';\\r\\n    import { userStore } from '$lib/auth/userStore';\\r\\n   \\r\\n    let needsConfirm = false;\\r\\n   \\r\\n    const { form, errors, handleChange, handleSubmit } = createForm({\\r\\n        initialValues: {\\r\\n            username: '',\\r\\n            email: '',\\r\\n            password: '',\\r\\n            confCode: ''\\r\\n        },\\r\\n        validate: (values) => {\\r\\n            let errors = {};\\r\\n            if (!values.username) errors.username = 'Username is required';\\r\\n            if (!values.password) errors.password = 'Password is required';\\r\\n            if (!values.email) errors.email = 'Email is required';\\r\\n            if (needsConfirm && !values.confCode) errors.confCode = 'Confirmation code is required';\\r\\n            return errors;\\r\\n        },\\r\\n        onSubmit: async (values) => {\\r\\n            try {\\r\\n                if (needsConfirm) {\\r\\n                    await handleConfirm(values);\\r\\n                } else {\\r\\n                    await handleRegister(values);\\r\\n                }\\r\\n            } catch (err) {\\r\\n                console.error('Error', err);\\r\\n            }\\r\\n        }\\r\\n    });\\r\\n   \\r\\n    async function handleRegister(values) {\\r\\n        const { isSignUpComplete, userId, nextStep } = await signUp({\\r\\n            username: values.username,\\r\\n            password: values.password,\\r\\n            options: {\\r\\n                userAttributes: {\\r\\n                    email: values.email,\\r\\n                }\\r\\n            }    \\r\\n        });\\r\\n        if (!isSignUpComplete) {\\r\\n            needsConfirm = true;\\r\\n        } else {\\r\\n            userStore.setRegStatus({\\r\\n                completed: true,\\r\\n                username: values.username\\r\\n            });\\r\\n        }\\r\\n    }\\r\\n   \\r\\n    async function handleConfirm(values) {\\r\\n        const { isSignUpComplete, nextStep } = await confirmSignUp({\\r\\n            username: values.username,\\r\\n            confirmationCode: values.confCode\\r\\n        });\\r\\n        if (isSignUpComplete) {\\r\\n            needsConfirm = false;\\r\\n            userStore.setRegStatus({\\r\\n                completed: true,\\r\\n                username: values.username\\r\\n            });\\r\\n            await regLogin(values)\\r\\n        }\\r\\n    }\\r\\n\\r\\n    async function regLogin(values) {\\r\\n        try {\\r\\n            const { isSignedIn, nextStep } = await signIn({\\r\\n                username: values.username,\\r\\n                password: values.password,\\r\\n            });\\r\\n            if (isSignedIn) {\\r\\n                const currentUser = await getCurrentUser();\\r\\n                userStore.setUser(currentUser);\\r\\n            } else {\\r\\n                console.log('Failed to Login after registration');\\r\\n            }\\r\\n        } catch(err) {\\r\\n            console.error('Login error after registration', err);\\r\\n        }\\r\\n}\\r\\n<\/script>\\r\\n\\r\\n<style>\\r\\n    .reg-cont {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        align-items: stretch;\\r\\n        background-color: var(--primary-color);\\r\\n        border-bottom-right-radius: 0.2rem;\\r\\n        padding: 2rem 2rem 3rem 1rem;\\r\\n    }\\r\\n    .form-group {\\r\\n        flex: 1;\\r\\n        margin-bottom: 0.7rem;\\r\\n    }\\r\\n    input {\\r\\n        width: 100%;\\r\\n        padding: 5px;\\r\\n        border: 1px solid var(--lighter-color);\\r\\n        border-radius: 4px;\\r\\n    }\\r\\n    .error {\\r\\n        color: #c62828;\\r\\n        font-size: 0.7em;\\r\\n    }\\r\\n    button {\\r\\n        background: none;\\r\\n        color: white;\\r\\n        padding: 7px 12px;\\r\\n        border: none;\\r\\n        border-radius: 4px;\\r\\n        cursor: pointer;\\r\\n        margin-top: 2rem;\\r\\n        font-size: 14px;\\r\\n        width: auto;\\r\\n        min-width: 100px;\\r\\n        transition: background-color 0.3s color 0.3s;\\r\\n        margin-right: 2rem;\\r\\n        align-self: flex-end;\\r\\n    }\\r\\n    button:hover {\\r\\n        background-color: var(--secondary-color);\\r\\n    }\\r\\n</style>\\r\\n\\r\\n<div class=\\"reg-cont\\">\\r\\n    <form on:submit|preventDefault={handleSubmit}>\\r\\n        <div class=\\"form-group\\">\\r\\n            <input\\r\\n                type=\\"text\\"\\r\\n                id=\\"username\\"\\r\\n                name=\\"username\\"\\r\\n                placeholder=\\"Username\\"\\r\\n                bind:value={$form.username}\\r\\n                on:change={handleChange}\\r\\n            />\\r\\n            {#if $errors.username}\\r\\n                <span class=\\"error\\">{$errors.username}</span>\\r\\n            {/if}\\r\\n        </div>\\r\\n\\r\\n        <div class=\\"form-group\\">\\r\\n            <input\\r\\n                type=\\"email\\"\\r\\n                id=\\"email\\"\\r\\n                name=\\"email\\"\\r\\n                placeholder=\\"Email\\"\\r\\n                bind:value={$form.email}\\r\\n                on:change={handleChange}\\r\\n            />\\r\\n            {#if $errors.email}\\r\\n                <span class=\\"error\\">{$errors.email}</span>\\r\\n            {/if}\\r\\n        </div>\\r\\n\\r\\n        <div class=\\"form-group\\">\\r\\n            <input\\r\\n                type=\\"password\\"\\r\\n                id=\\"password\\"\\r\\n                name=\\"password\\"\\r\\n                placeholder=\\"Password\\"\\r\\n                bind:value={$form.password}\\r\\n                on:change={handleChange}\\r\\n            />\\r\\n            {#if $errors.password}\\r\\n                <span class=\\"error\\">{$errors.password}</span>\\r\\n            {/if}\\r\\n        </div>\\r\\n\\r\\n        {#if needsConfirm}\\r\\n            <div class=\\"form-group\\">\\r\\n                <input\\r\\n                    type=\\"text\\"\\r\\n                    id=\\"confirmationCode\\"\\r\\n                    name=\\"confirmationCode\\"\\r\\n                    placeholder=\\"Confirmation Code\\"\\r\\n                    bind:value={$form.confCode}\\r\\n                    on:change={handleChange}\\r\\n                />\\r\\n                {#if $errors.confCode}\\r\\n                    <span class=\\"error\\">{$errors.confCode}</span>\\r\\n                {/if}\\r\\n            </div>\\r\\n        {/if}\\r\\n\\r\\n        <button type=\\"submit\\">\\r\\n            {needsConfirm ? 'Confirm': 'Register'}\\r\\n        </button>\\r\\n    </form>\\r\\n</div>"],"names":[],"mappings":"AAyFI,wBAAU,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,OAAO,CACpB,gBAAgB,CAAE,IAAI,eAAe,CAAC,CACtC,0BAA0B,CAAE,MAAM,CAClC,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAC5B,CACA,0BAAY,CACR,IAAI,CAAE,CAAC,CACP,aAAa,CAAE,MACnB,CACA,oBAAM,CACF,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,GAAG,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,eAAe,CAAC,CACtC,aAAa,CAAE,GACnB,CACA,qBAAO,CACH,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,KACf,CACA,qBAAO,CACH,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,GAAG,CAAC,IAAI,CACjB,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,gBAAgB,CAAC,IAAI,CAAC,KAAK,CAAC,IAAI,CAC5C,YAAY,CAAE,IAAI,CAClB,UAAU,CAAE,QAChB,CACA,qBAAM,MAAO,CACT,gBAAgB,CAAE,IAAI,iBAAiB,CAC3C"}`
};
const Register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $errors, $$unsubscribe_errors;
  let needsConfirm = false;
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confCode: ""
    },
    validate: (values) => {
      let errors2 = {};
      if (!values.username)
        errors2.username = "Username is required";
      if (!values.password)
        errors2.password = "Password is required";
      if (!values.email)
        errors2.email = "Email is required";
      if (needsConfirm && !values.confCode)
        errors2.confCode = "Confirmation code is required";
      return errors2;
    },
    onSubmit: async (values) => {
      try {
        if (needsConfirm) {
          await handleConfirm(values);
        } else {
          await handleRegister(values);
        }
      } catch (err) {
        console.error("Error", err);
      }
    }
  });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  async function handleRegister(values) {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: values.username,
      password: values.password,
      options: { userAttributes: { email: values.email } }
    });
    if (!isSignUpComplete) {
      needsConfirm = true;
    } else {
      userStore.setRegStatus({
        completed: true,
        username: values.username
      });
    }
  }
  async function handleConfirm(values) {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: values.username,
      confirmationCode: values.confCode
    });
    if (isSignUpComplete) {
      needsConfirm = false;
      userStore.setRegStatus({
        completed: true,
        username: values.username
      });
      await regLogin(values);
    }
  }
  async function regLogin(values) {
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: values.username,
        password: values.password
      });
      if (isSignedIn) {
        const currentUser = await getCurrentUser();
        userStore.setUser(currentUser);
      } else {
        console.log("Failed to Login after registration");
      }
    } catch (err) {
      console.error("Login error after registration", err);
    }
  }
  $$result.css.add(css$1);
  $$unsubscribe_form();
  $$unsubscribe_errors();
  return `<div class="reg-cont svelte-1hmijqa"><form><div class="form-group svelte-1hmijqa"><input type="text" id="username" name="username" placeholder="Username" class="svelte-1hmijqa"${add_attribute("value", $form.username, 0)}> ${$errors.username ? `<span class="error svelte-1hmijqa">${escape($errors.username)}</span>` : ``}</div> <div class="form-group svelte-1hmijqa"><input type="email" id="email" name="email" placeholder="Email" class="svelte-1hmijqa"${add_attribute("value", $form.email, 0)}> ${$errors.email ? `<span class="error svelte-1hmijqa">${escape($errors.email)}</span>` : ``}</div> <div class="form-group svelte-1hmijqa"><input type="password" id="password" name="password" placeholder="Password" class="svelte-1hmijqa"${add_attribute("value", $form.password, 0)}> ${$errors.password ? `<span class="error svelte-1hmijqa">${escape($errors.password)}</span>` : ``}</div> ${needsConfirm ? `<div class="form-group svelte-1hmijqa"><input type="text" id="confirmationCode" name="confirmationCode" placeholder="Confirmation Code" class="svelte-1hmijqa"${add_attribute("value", $form.confCode, 0)}> ${$errors.confCode ? `<span class="error svelte-1hmijqa">${escape($errors.confCode)}</span>` : ``}</div>` : ``} <button type="submit" class="svelte-1hmijqa">${escape(needsConfirm ? "Confirm" : "Register")}</button></form></div>`;
});
const css = {
  code: "@font-face{font-family:'Plus Jakarta Sans Variable';font-style:normal;font-display:swap;font-weight:200 800;src:url(https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}h4.svelte-k840vt.svelte-k840vt{font-family:'Plus Jakarta Sans Variable'}.top-bar.svelte-k840vt.svelte-k840vt{padding-top:2rem;padding-bottom:2rem;display:flex;justify-content:space-around;background-color:var(--primary-color);position:relative;z-index:1001}.submenu.svelte-k840vt.svelte-k840vt{position:absolute;left:0;right:0;background-color:var(--primary-color);padding:0.5rem 0;padding-bottom:1.5rem;display:flex;justify-content:space-evenly;transform:translateY(-0.8rem);z-index:1002}.auth-cont.svelte-k840vt.svelte-k840vt{position:fixed;top:5rem;left:0;width:20rem;height:20rem;background-color:var(--primary-color);border-bottom-right-radius:1rem;z-index:1000;padding:2rem;box-shadow:0 2px 4px rgba(0,0,0,0.1), 1px 0 2px rgba(0,0,0,0.05);border-top:none;margin-top:-1px}.login.svelte-k840vt.svelte-k840vt{height:17rem}.nav-item.svelte-k840vt.svelte-k840vt{font-size:0.9rem;cursor:pointer}.nav-item.svelte-k840vt a.svelte-k840vt{text-decoration:none;color:#e4dede;cursor:pointer;transition:color 0.3s ease}.nav-item.svelte-k840vt a.svelte-k840vt:hover{color:#c5c2c2}.nav-item.svelte-k840vt a.svelte-k840vt:active{color:#aaaaaa}.nav-item.svelte-k840vt.svelte-k840vt:hover{color:#c5c2c2}.nav-item.svelte-k840vt.svelte-k840vt:active{color:#aaaaaa}a.svelte-k840vt.svelte-k840vt{text-decoration:none;color:#e4dede\r\n        }h4.svelte-k840vt.svelte-k840vt{font-size:0.9rem}.registerBtn.svelte-k840vt.svelte-k840vt,.loginBtn.svelte-k840vt.svelte-k840vt{background:none;padding:0;border:none;cursor:pointer;color:#e4dede;font:inherit;transition:color 0.3s ease}.registerBtn.svelte-k840vt.svelte-k840vt:hover,.loginBtn.svelte-k840vt.svelte-k840vt:hover{color:#c5c2c2}.current-page.svelte-k840vt.svelte-k840vt{color:var(--rare-color) !important}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { Amplify } from \\"aws-amplify\\";\\nimport amplifyConfig from \\"$lib/amplifyConfig\\";\\nimport { getCurrentUser, fetchAuthSession } from \\"aws-amplify/auth\\";\\nimport { onMount } from \\"svelte\\";\\nimport { userStore, user } from \\"$lib/auth/userStore\\";\\nimport { hours, currPerc, startDate, futureDate, hasStarted, succeeded, loading, currPage, totalTime } from \\"$lib/stores\\";\\nimport axios from \\"axios\\";\\nimport { aws_stages } from \\"../aws/stages\\";\\nimport { slide } from \\"svelte/transition\\";\\nimport { navigating } from \\"$app/stores\\";\\nimport Login from \\"$lib/Login.svelte\\";\\nimport Logout from \\"$lib/Logout.svelte\\";\\nimport Register from \\"$lib/Register.svelte\\";\\nimport \\"../app.css\\";\\nAmplify.configure(amplifyConfig);\\nlet activeSubmenu = null;\\nlet showReg = false;\\nlet showLogin = false;\\nlet submenuTimer = null;\\n$:\\n  if ($navigating) {\\n    closeSubmenu();\\n  }\\nonMount(async () => {\\n  await checkAuth();\\n});\\nfunction setTheme(theme) {\\n  document.body.classList.remove(\\"nature\\", \\"ocean\\", \\"warmth\\");\\n  if (theme !== \\"default\\") {\\n    document.body.classList.add(theme);\\n  }\\n}\\nasync function checkAuth() {\\n  try {\\n    const { tokens } = await fetchAuthSession();\\n    $loading = true;\\n    if (tokens) {\\n      const currentUser = await getCurrentUser();\\n      userStore.setUser(currentUser);\\n      await checkActiveFast(currentUser.username);\\n      $loading = false;\\n    } else {\\n      userStore.reset();\\n      $loading = false;\\n    }\\n  } catch (err) {\\n    console.error(\\"Not authenticated\\", err);\\n    userStore.reset();\\n    $loading = false;\\n  }\\n}\\nasync function checkActiveFast(username) {\\n  try {\\n    $loading = true;\\n    const url = aws_stages.API_GET_URL.replace(\\"{username}\\", username);\\n    const response = await axios.get(url);\\n    const activeFast = response.data;\\n    if (activeFast) {\\n      console.log(\\"Active fast data: \\", activeFast);\\n      hours.set(Number(activeFast.ExpectedDuration));\\n      currPerc.set(Number(activeFast.PercentRemaining));\\n      startDate.set(new Date(Number(activeFast.StartDate)));\\n      futureDate.set(new Date(Number(activeFast.EndDate)));\\n      hasStarted.set(true);\\n      succeeded.set(activeFast.Succeeded);\\n      $loading = false;\\n      console.log(\\"Stores after setting:\\", {\\n        hours: $hours,\\n        currPerc: $currPerc,\\n        startDate: $startDate,\\n        futureDate: $futureDate,\\n        hasStarted: $hasStarted,\\n        succeeded: $succeeded,\\n        totalTime: $totalTime\\n      });\\n    } else {\\n      console.log(\\"Error loading active fast\\");\\n      hasStarted.set(false);\\n      succeeded.set(false);\\n      $loading = false;\\n    }\\n  } catch (err) {\\n    console.log(\\"Critical error\\");\\n    console.error(err);\\n    $loading = false;\\n  }\\n}\\nfunction toggleAuth(type) {\\n  if (type === \\"register\\") {\\n    showReg = !showReg;\\n    showLogin = false;\\n  } else if (type === \\"login\\") {\\n    showLogin = !showLogin;\\n    showReg = false;\\n  }\\n}\\nfunction toggleSubmenu(menu) {\\n  if (activeSubmenu === menu) {\\n    closeSubmenu();\\n  } else {\\n    if (submenuTimer) {\\n      clearTimeout(submenuTimer);\\n    }\\n    activeSubmenu = menu;\\n    submenuTimer = setTimeout(() => {\\n      closeSubmenu();\\n    }, 4e3);\\n  }\\n}\\nfunction clearSubmenuTimer() {\\n  if (submenuTimer) {\\n    clearTimeout(submenuTimer);\\n    submenuTimer = null;\\n  }\\n}\\nfunction closeSubmenu() {\\n  if (!showReg && !showLogin) {\\n    activeSubmenu = null;\\n    showReg = false;\\n    showLogin = false;\\n  }\\n}\\n<\/script>\\r\\n    <style>\\r\\n            @font-face {\\r\\n            font-family: 'Plus Jakarta Sans Variable';\\r\\n            font-style: normal;\\r\\n            font-display: swap;\\r\\n            /* color: #4777ad4b; */\\r\\n            font-weight: 200 800;\\r\\n            src: url(https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans:vf@latest/latin-wght-normal.woff2) format('woff2-variations');\\r\\n            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;\\r\\n    }\\r\\n    \\r\\n    h1, h2, h3, h4, p {\\r\\n        font-family: 'Plus Jakarta Sans Variable';\\r\\n    }\\r\\n    \\r\\n    .top-bar {\\r\\n        padding-top: 2rem;\\r\\n        padding-bottom: 2rem;\\r\\n        display: flex;\\r\\n        justify-content: space-around;\\r\\n        background-color: var(--primary-color);\\r\\n        position: relative;\\r\\n        z-index: 1001;\\r\\n    }\\r\\n    \\r\\n        .submenu {\\r\\n            position: absolute;\\r\\n            left: 0;\\r\\n            right: 0;\\r\\n            background-color: var(--primary-color);\\r\\n            padding: 0.5rem 0;\\r\\n            padding-bottom: 1.5rem;\\r\\n            display: flex;\\r\\n            justify-content: space-evenly;\\r\\n            transform: translateY(-0.8rem);\\r\\n            z-index: 1002;\\r\\n        }\\r\\n    \\r\\n        .auth-cont {\\r\\n            position: fixed;\\r\\n            top: 5rem;\\r\\n            left: 0;\\r\\n            width: 20rem;\\r\\n            height: 20rem;\\r\\n            background-color: var(--primary-color);\\r\\n            border-bottom-right-radius: 1rem;\\r\\n            z-index: 1000;\\r\\n            padding: 2rem;\\r\\n            box-shadow: 0 2px 4px rgba(0,0,0,0.1), 1px 0 2px rgba(0,0,0,0.05);\\r\\n            border-top: none;\\r\\n            margin-top: -1px;\\r\\n        }\\r\\n    \\r\\n        .login {\\r\\n            height: 17rem;\\r\\n        }\\r\\n     \\r\\n    .nav-item {\\r\\n        font-size: 0.9rem;\\r\\n        cursor: pointer;\\r\\n    }\\r\\n    \\r\\n    .nav-item a {\\r\\n        text-decoration: none;\\r\\n        color: #e4dede;\\r\\n        cursor: pointer;\\r\\n        transition: color 0.3s ease;\\r\\n    }\\r\\n\\r\\n\\r\\n    .nav-item a:hover {\\r\\n        color: #c5c2c2;\\r\\n    }\\r\\n\\r\\n    .nav-item a:active {\\r\\n        color: #aaaaaa;\\r\\n    }\\r\\n\\r\\n        .nav-item:hover {\\r\\n            color: #c5c2c2;\\r\\n            \\r\\n        }\\r\\n    \\r\\n        .nav-item:active {\\r\\n            color: #aaaaaa;\\r\\n        }\\r\\n    \\r\\n        a {\\r\\n            text-decoration: none;\\r\\n            color: #e4dede\\r\\n        }\\r\\n    \\r\\n        h4 {\\r\\n            font-size: 0.9rem;\\r\\n        }\\r\\n       \\r\\n        .registerBtn, .loginBtn {\\r\\n            background: none;\\r\\n            padding: 0;\\r\\n            border: none;\\r\\n            cursor: pointer;\\r\\n            color: #e4dede;\\r\\n            font: inherit;\\r\\n            transition: color 0.3s ease;\\r\\n        }\\r\\n    \\r\\n        .registerBtn:hover, .loginBtn:hover {\\r\\n            color: #c5c2c2;\\r\\n        }\\r\\n\\r\\n        .current-page {\\r\\n            color: var(--rare-color) !important;\\r\\n        }\\r\\n    </style>\\r\\n    \\r\\n    <svelte:head>\\r\\n        <link rel=\\"stylesheet\\" href=\\"https://cdn.jsdelivr.net/npm/@event-calendar/build@3.2.1/event-calendar.min.css\\">\\r\\n    </svelte:head>\\r\\n    \\r\\n    \\r\\n\\r\\n    <div class=\\"top-bar\\">\\r\\n        <h4 class=\\"nav-item\\"><a href='/' class:current-page={$currPage === '/'}>Clock</a></h4>\\r\\n        <h4 class=\\"nav-item\\"><a href='#' on:mouseenter={() => toggleSubmenu('history')} class:current-page={$currPage.startsWith('/history')}>History</a></h4>\\r\\n        <h4 class=\\"nav-item\\"><a href='/analytics' class:current-page={$currPage === '/analytics'}>Analytics</a></h4>\\r\\n        <h4 class=\\"nav-item\\"><a href='#' on:mouseenter={() => toggleSubmenu('theme')}>Theme</a></h4>\\r\\n        <h4 class=\\"nav-item\\"><a href='/about' class:current-page={$currPage === '/about'}>About</a></h4>\\r\\n        <h4 class=\\"nav-item\\">\\r\\n            <a href='#' on:mouseenter={() => toggleSubmenu('user')}>\\r\\n                {#if $user !== null}\\r\\n                    {$user.username}\\r\\n                {:else}\\r\\n                    Sign In\\r\\n                {/if}\\r\\n            </a>\\r\\n        </h4>        \\r\\n    </div>\\r\\n    \\r\\n    {#if activeSubmenu === 'theme'}\\r\\n    <div class=\\"submenu\\" \\r\\n         transition:slide={{ duration: 300, axis: 'y'}}\\r\\n         on:mouseenter={clearSubmenuTimer}\\r\\n         on:mouseleave={() => submenuTimer = setTimeout(closeSubmenu, 6000)}>\\r\\n        <div class=\\"nav-item\\" on:click={() => setTheme('default')}>Default</div>\\r\\n        <div class=\\"nav-item\\" on:click={() => setTheme('nature')}>Nature</div>\\r\\n        <div class=\\"nav-item\\" on:click={() => setTheme('ocean')}>Ocean</div>\\r\\n        <div class=\\"nav-item\\" on:click={() => setTheme('warmth')}>Warmth</div>   \\r\\n    </div>\\r\\n{/if}\\r\\n    \\r\\n{#if activeSubmenu === 'history'}\\r\\n    <div class=\\"submenu\\" \\r\\n         transition:slide={{ duration: 300, axis: 'y'}}\\r\\n         on:mouseenter={clearSubmenuTimer}\\r\\n         on:mouseleave={() => submenuTimer = setTimeout(closeSubmenu, 6000)}>\\r\\n        <a href=\\"/history/calendar\\" class:current-page={$currPage.startsWith('/history/calendar')}>Calendar</a>   \\r\\n        <a href=\\"/history/record\\" class:current-page={$currPage.startsWith('/history/record')}>Record</a>   \\r\\n    </div>\\r\\n{/if}\\r\\n\\r\\n{#if activeSubmenu === 'user'}\\r\\n    <div class=\\"submenu\\" \\r\\n         transition:slide={{ duration: 300, axis: 'y'}}\\r\\n         on:mouseenter={clearSubmenuTimer}\\r\\n         on:mouseleave={() => submenuTimer = setTimeout(closeSubmenu, 6000)}>\\r\\n        {#if $user !== null}\\r\\n            <a href=\\"/user/profile\\">Profile</a>\\r\\n            <a href=\\"/user/settings\\">Settings</a>\\r\\n            <Logout />\\r\\n        {:else}\\r\\n            <button class=\\"registerBtn\\" on:click={() => toggleAuth('register')}>Register</button>    \\r\\n            <button class=\\"loginBtn\\" on:click={() => toggleAuth('login')}>Login</button>  \\r\\n        {/if}    \\r\\n    </div>\\r\\n{/if}\\r\\n    {#if showLogin}\\r\\n         <div class=\\"auth-cont login\\" transition:slide={{ duration: 300, axis: 'x'}}>\\r\\n            <Login />\\r\\n         </div>\\r\\n    {/if}\\r\\n    \\r\\n    {#if showReg}\\r\\n         <div class=\\"auth-cont\\" transition:slide={{ duration: 300, axis: 'x'}}>\\r\\n            <Register />\\r\\n         </div>\\r\\n    {/if}\\r\\n    \\r\\n    <slot />\\r\\n    \\r\\n    \\r\\n    <!-- {#if activeSubmenu === 'theme'}\\r\\n        <div class=\\"submenu\\" transition:slide={{ duration: 300, axis: 'y'}}>\\r\\n                <a href=\\"/theme1\\">Theme 1</a>   \\r\\n         </div>\\r\\n    {/if}\\r\\n    \\r\\n    {#if activeSubmenu === 'user'}\\r\\n        <div class=\\"submenu\\" transition:slide={{ duration: 300, axis: 'y'}}>\\r\\n            {#if $user !== null}\\r\\n                <a href=\\"/profile\\">Profile</a>\\r\\n                <a href=\\"/settings\\">Settings</a>\\r\\n                <Logout />\\r\\n            {/if}    \\r\\n         </div>\\r\\n    {/if} -->"],"names":[],"mappings":"AA4HY,UAAW,CACX,WAAW,CAAE,4BAA4B,CACzC,UAAU,CAAE,MAAM,CAClB,YAAY,CAAE,IAAI,CAElB,WAAW,CAAE,GAAG,CAAC,GAAG,CACpB,GAAG,CAAE,kGAAkG,CAAC,OAAO,kBAAkB,CAAC,CAClI,aAAa,CAAE,WAAW,CAAC,MAAM,CAAC,WAAW,CAAC,WAAW,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,WAAW,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAAM,CAAC,MAChL,CAEY,8BAAM,CACd,WAAW,CAAE,4BACjB,CAEA,oCAAS,CACL,WAAW,CAAE,IAAI,CACjB,cAAc,CAAE,IAAI,CACpB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,YAAY,CAC7B,gBAAgB,CAAE,IAAI,eAAe,CAAC,CACtC,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IACb,CAEI,oCAAS,CACL,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,gBAAgB,CAAE,IAAI,eAAe,CAAC,CACtC,OAAO,CAAE,MAAM,CAAC,CAAC,CACjB,cAAc,CAAE,MAAM,CACtB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,YAAY,CAC7B,SAAS,CAAE,WAAW,OAAO,CAAC,CAC9B,OAAO,CAAE,IACb,CAEA,sCAAW,CACP,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,gBAAgB,CAAE,IAAI,eAAe,CAAC,CACtC,0BAA0B,CAAE,IAAI,CAChC,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACjE,UAAU,CAAE,IAAI,CAChB,UAAU,CAAE,IAChB,CAEA,kCAAO,CACH,MAAM,CAAE,KACZ,CAEJ,qCAAU,CACN,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,OACZ,CAEA,uBAAS,CAAC,eAAE,CACR,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,OAAO,CACd,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,IAC3B,CAGA,uBAAS,CAAC,eAAC,MAAO,CACd,KAAK,CAAE,OACX,CAEA,uBAAS,CAAC,eAAC,OAAQ,CACf,KAAK,CAAE,OACX,CAEI,qCAAS,MAAO,CACZ,KAAK,CAAE,OAEX,CAEA,qCAAS,OAAQ,CACb,KAAK,CAAE,OACX,CAEA,6BAAE,CACE,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,OAAO;AAC1B,QAAQ,CAEA,8BAAG,CACC,SAAS,CAAE,MACf,CAEA,wCAAY,CAAE,qCAAU,CACpB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,OAAO,CACd,IAAI,CAAE,OAAO,CACb,UAAU,CAAE,KAAK,CAAC,IAAI,CAAC,IAC3B,CAEA,wCAAY,MAAM,CAAE,qCAAS,MAAO,CAChC,KAAK,CAAE,OACX,CAEA,yCAAc,CACV,KAAK,CAAE,IAAI,YAAY,CAAC,CAAC,UAC7B"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_loading;
  let $$unsubscribe_totalTime;
  let $$unsubscribe_succeeded;
  let $$unsubscribe_hasStarted;
  let $$unsubscribe_futureDate;
  let $$unsubscribe_startDate;
  let $$unsubscribe_currPerc;
  let $$unsubscribe_hours;
  let $navigating, $$unsubscribe_navigating;
  let $currPage, $$unsubscribe_currPage;
  let $user, $$unsubscribe_user;
  $$unsubscribe_loading = subscribe(loading, (value) => value);
  $$unsubscribe_totalTime = subscribe(totalTime, (value) => value);
  $$unsubscribe_succeeded = subscribe(succeeded, (value) => value);
  $$unsubscribe_hasStarted = subscribe(hasStarted, (value) => value);
  $$unsubscribe_futureDate = subscribe(futureDate, (value) => value);
  $$unsubscribe_startDate = subscribe(startDate, (value) => value);
  $$unsubscribe_currPerc = subscribe(currPerc, (value) => value);
  $$unsubscribe_hours = subscribe(hours, (value) => value);
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  $$unsubscribe_currPage = subscribe(currPage, (value) => $currPage = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  Amplify.configure(amplifyConfig);
  let activeSubmenu = null;
  let showReg = false;
  let showLogin = false;
  function closeSubmenu() {
    if (!showReg && !showLogin) {
      activeSubmenu = null;
      showReg = false;
      showLogin = false;
    }
  }
  $$result.css.add(css);
  {
    if ($navigating) {
      closeSubmenu();
    }
  }
  $$unsubscribe_loading();
  $$unsubscribe_totalTime();
  $$unsubscribe_succeeded();
  $$unsubscribe_hasStarted();
  $$unsubscribe_futureDate();
  $$unsubscribe_startDate();
  $$unsubscribe_currPerc();
  $$unsubscribe_hours();
  $$unsubscribe_navigating();
  $$unsubscribe_currPage();
  $$unsubscribe_user();
  return `${$$result.head += `<!-- HEAD_svelte-tz7pts_START --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@event-calendar/build@3.2.1/event-calendar.min.css"><!-- HEAD_svelte-tz7pts_END -->`, ""} <div class="top-bar svelte-k840vt"><h4 class="nav-item svelte-k840vt"><a href="/" class="${["svelte-k840vt", $currPage === "/" ? "current-page" : ""].join(" ").trim()}" data-svelte-h="svelte-vc72go">Clock</a></h4> <h4 class="nav-item svelte-k840vt"><a href="#" class="${["svelte-k840vt", $currPage.startsWith("/history") ? "current-page" : ""].join(" ").trim()}" data-svelte-h="svelte-ack1u4">History</a></h4> <h4 class="nav-item svelte-k840vt"><a href="/analytics" class="${["svelte-k840vt", $currPage === "/analytics" ? "current-page" : ""].join(" ").trim()}" data-svelte-h="svelte-1ims5v2">Analytics</a></h4> <h4 class="nav-item svelte-k840vt"><a href="#" class="svelte-k840vt" data-svelte-h="svelte-1vek1qy">Theme</a></h4> <h4 class="nav-item svelte-k840vt"><a href="/about" class="${["svelte-k840vt", $currPage === "/about" ? "current-page" : ""].join(" ").trim()}" data-svelte-h="svelte-11kv4n5">About</a></h4> <h4 class="nav-item svelte-k840vt"><a href="#" class="svelte-k840vt">${$user !== null ? `${escape($user.username)}` : `Sign In`}</a></h4></div> ${activeSubmenu === "theme" ? `<div class="submenu svelte-k840vt"><div class="nav-item svelte-k840vt" data-svelte-h="svelte-yvt7hs">Default</div> <div class="nav-item svelte-k840vt" data-svelte-h="svelte-8pmkc4">Nature</div> <div class="nav-item svelte-k840vt" data-svelte-h="svelte-127i4y">Ocean</div> <div class="nav-item svelte-k840vt" data-svelte-h="svelte-1gkkeao">Warmth</div></div>` : ``} ${activeSubmenu === "history" ? `<div class="submenu svelte-k840vt"><a href="/history/calendar" class="${[
    "svelte-k840vt",
    $currPage.startsWith("/history/calendar") ? "current-page" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-1g67cgz">Calendar</a> <a href="/history/record" class="${[
    "svelte-k840vt",
    $currPage.startsWith("/history/record") ? "current-page" : ""
  ].join(" ").trim()}" data-svelte-h="svelte-6sbz9k">Record</a></div>` : ``} ${activeSubmenu === "user" ? `<div class="submenu svelte-k840vt">${$user !== null ? `<a href="/user/profile" class="svelte-k840vt" data-svelte-h="svelte-wwrrvf">Profile</a> <a href="/user/settings" class="svelte-k840vt" data-svelte-h="svelte-uxl70l">Settings</a> ${validate_component(Logout, "Logout").$$render($$result, {}, {}, {})}` : `<button class="registerBtn svelte-k840vt" data-svelte-h="svelte-d4u8jx">Register</button> <button class="loginBtn svelte-k840vt" data-svelte-h="svelte-ewsj35">Login</button>`}</div>` : ``} ${showLogin ? `<div class="auth-cont login svelte-k840vt">${validate_component(Login, "Login").$$render($$result, {}, {}, {})}</div>` : ``} ${showReg ? `<div class="auth-cont svelte-k840vt">${validate_component(Register, "Register").$$render($$result, {}, {}, {})}</div>` : ``} ${slots.default ? slots.default({}) : ``} `;
});
export {
  Layout as default
};
